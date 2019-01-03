<!-- pages/SenatorListPage.vue -->


<template>
    <f7-page>
        <f7-navbar :title="stateLabel + ' Senators'" back-link="Back">
            <f7-nav-right>
                <f7-link panel-open="right"><f7-icon fa="bars"></f7-icon></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-block>
            <f7-list>
                <f7-list-item v-for="m in members" 
                    :key="m.id" 
                    :title="m.name" 
                    :link="'/member/' + m.id + '/'"
                />
            </f7-list>
        </f7-block>
    </f7-page>
</template>


<script>
    import * as cd from '../CongressData.js';
    
    export default {

        data: function () {
            return {
                members: [],
                stateLabel: ''
            }
        },

        created: function () {
            var state = this.$f7route.params.stateAbbrev;
            this.stateLabel = this.$f7route.query.label;
            
            var esto = this;
            cd.GetChamber('senate', state, function (members) {
                esto.members = members;
            });
        }
        
    };
</script>