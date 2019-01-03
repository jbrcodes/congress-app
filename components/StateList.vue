<!-- components/StateList.vue -->


<template>
    <f7-list>
        <f7-list-item v-for="s in states" 
            :key="s.abbrev" 
            :title="s.label" 
            :link="'/state/' + s.abbrev + '/?label='+encodeURIComponent(s.label)"
        />
    </f7-list>
</template>


<script>
    import theStates from './states.js';
    
    export default {
        data: function () {
            return {
                states: []
            };
        },
        
        created: function () {
            this.states = theStates;
        }
        
    };
</script>