/* File: components/MemberList.vue */


<template>
    <div class="member-list">
        <table>
            <filter-bar @on-filter-change="onFilterChange" />
            <tbody>
                <tr v-for="mem in filteredMembers" :key="mem.name">
                    <td>{{ mem.name }}</td>
                    <td>{{ mem.state }}</td>
                    <td>{{ mem.party }}</td>
                    <td>{{ mem.chamber }}</td>
                    <td><a v-bind:href="mem.url">{{ mem.url }}</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script>
    import axios from 'axios';
    import FilterBar from './FilterBar.vue';

    export default {

        props: {
            url: String
        },
        
        data: function () {
            return {
                members: [],
                filters: {
                    'state': '',
                    'party': '',
                    'chamber': ''
                }
            }
        },

        components: {
            'filter-bar': FilterBar
        },
        
        computed: {
            filteredMembers: function () {
                var esto = this;
                var filtArr = this.members.filter(function (mem) {
                    var f = esto.filters;
                    var showChamber = (f.chamber == '') || (mem.chamber == f.chamber);
                    var showParty = (f.party == '') || (mem.party == f.party);
                    var showState = (f.state == '') || (mem.state == f.state);

                    return showChamber && showParty && showState;
                });

                return filtArr;
            }
        },

        created: function () {
            var esto = this;
            axios.get(this.url)
                .then(function (result) {
                    esto.members = esto._buildMemArr(result.data);
                    esto.members.sort(function (m1, m2) {
                        return ((m1._sn == m2._sn) ? 0 : ((m1._sn > m2._sn) ? 1 : -1 ));
                    });
                })
                .catch(function (error) {
                    // eslint-disable-next-line
                    console.log('AXIOS GET ERROR: '+error);
                });

        },
        
        methods: {
            
            onFilterChange: function (event) {
                this.filters[ event.target.id ] = event.target.value;
            },
            
            _buildMemArr: function (jsonObj) {
                var memArr = jsonObj.map(function (mem) {
                    var lastTerm = mem.terms[ mem.terms.length - 1 ];
                    return {
                        name: mem.name.official_full,
                        party: lastTerm.party,
                        state: lastTerm.state,
                        chamber: (lastTerm.type == 'rep') ? 'House' : 'Senate',
                        url: lastTerm.url,
                        _sn: mem.name.last + ' ' + mem.name.first  // sorting
                    }
                });

                return memArr;
            }
        }
        
    };
</script>


<style>
    .member-list table {
        padding: 5px;
        border: 1px solid #ccc;
    }
</style>