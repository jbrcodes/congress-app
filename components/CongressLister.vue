/* File: components/CongressLister.vue */


<template>
    <div class="congress-lister">
        <member-list :url="url" />
    </div>
</template>


<script>
    import MemberList from './MemberList.vue';
    export default {
        
        props: {
            url: String
        },
        
        components: {
            'member-list': MemberList
        }

    };
</script>