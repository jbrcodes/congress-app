/*

File: CongressData.js

Provide fetching and caching for all congress data

*/

import axios from 'axios';
import theStates from './components/states.js';


// ------------------------------------------------------------------
// Private data
// ------------------------------------------------------------------

var _PppsBaseUrl = 'http://rest.jbrcodes.com/ppps/v1/';
var _ContribBaseUrl = 'http://www.jbrcodes.com/congress-nav-data/';

var _Cache = {
    members: {},    // 'A123456' => { member obj }
    house: {},      // 'MN' => [ sorted mini-objs ]
    senate: {},     // 'MN' => [ sorted mini-objs ]
    contribs: {}    // 'A123456' => { contribution obj } 
};

var _BioFec = {};
var _StatesDict = {};

// ------------------------------------------------------------------
// Public methods
// ------------------------------------------------------------------

export function GetChamber(chamber, state, callback) {
    if (state in _Cache[chamber]) {
        callback( _Cache[chamber][state] );
    } else {
        _fetchChamber(chamber, state, callback);
    } 
}

export function GetMember(memberId, callback) {
    if (memberId in _Cache.members) {
        callback( _Cache.members[memberId] );
    } else {
        _fetchMember(memberId, callback);
    }
}

export function GetContributions(memberId, callback) {
    if (memberId in _Cache.contribs) {
        callback( _Cache.contribs[memberId] );
    } else {
        _fetchContribs(memberId, callback);
    }
}

// ------------------------------------------------------------------
// Private methods
// ------------------------------------------------------------------

function _fetchChamber(chamber, state, callback) {
    var url = _PppsBaseUrl + chamber + '/' + state + '/current.json';
    axios.get(url)
        .then(function (response) {
            var members = response.data.results;
            _Cache[chamber][state] = members;
            callback(members);
        })
        .catch(function (error) {
            // eslint-disable-next-line
            console.log('CongressData._fetchChamber: AXIOS GET ERROR: '+error);
            callback(null);
        });
}

function _fetchContribs(memberId, callback) {
    if (Object.keys(_BioFec).length == 0) {
        // eslint-disable-next-line
        console.log('CongressData._fetchContribs: _BioFec is empty !!');
        callback(null);
    }
    
    if ( !(memberId in _BioFec) ) {
        callback(null);
    }
    
    var url = _ContribBaseUrl + 'contribs/' + _BioFec[memberId] + '.json';
    // eslint-disable-next-line
    // console.log('_fetchContribs  memId '+memberId+' URL '+url);
    
    axios.get(url)
        .then(function (response) {
            _Cache.contribs[memberId] = response.data;
            callback(response.data);
        })
        .catch(function (error) {
            // eslint-disable-next-line
            console.log('CongressData._fetchContribs: AXIOS GET ERROR: '+error);
            callback(null);
        });
}

function _fetchMember(memberId, callback) {
    var url = _PppsBaseUrl + memberId + '.json';
    axios.get(url)
        .then(function (response) {
            var mem = response.data.results[0];
            _Cache.members[memberId] = _mashMem(mem);
            callback(mem);
        })
        .catch(function (error) {
            // eslint-disable-next-line
            console.log('CongressData._fetchMember: AXIOS GET ERROR: '+error);
            callback(null);
        });
}

/*
New fields I'm "creating":
mem.role
state.abbrev and state.label
mem.full_name
*/

function _mashMem(mem) {
    // only save role for current legislative session
    mem.role = mem.roles[0];
    delete mem.roles;
    
    // add state info
    mem.state = {
        abbrev: mem.role.state,
        label: _StatesDict[ mem.role.state ]
    };

    // save full name from summary
    for (let m of _Cache.senate[mem.state.abbrev]) {
        if (mem.member_id == m.id) {
            mem.full_name = m.name;
            break;
        }
    }
    
    // expand party
    var p = { R: 'Republican', D: 'Democrat', I: 'Independent' };
    mem.party = p[ mem.current_party ];
    
    return mem;
}

function _init() {
    var url = _ContribBaseUrl + 'legislators-current.json';
    var bio_fec = {};
    axios.get(url)
        .then(function (response) {
            for (let mem of response.data) {
                bio_fec[ mem.id.bioguide ] = mem.id.fec[0];  // > 1 fec is possible
            }
            _BioFec = bio_fec;
        })
        .catch(function (error) {
            // eslint-disable-next-line
            console.log('CongressData._init: AXIOS GET ERROR: '+error);
        });
    
    for (let sd of theStates) {
        _StatesDict[ sd.abbrev ] = sd.label;
    }
}
    
// ------------------------------------------------------------------
// Bootstrap
// ------------------------------------------------------------------

if (Object.keys(_BioFec).length == 0) {
    _init();
}
