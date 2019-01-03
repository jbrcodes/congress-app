<!-- App.vue -->


<template>
    <f7-app :params="f7params">
        <f7-statusbar></f7-statusbar>
        
        <f7-panel right cover>
            <f7-view url="/right-panel/"></f7-view>
        </f7-panel>
        
        <f7-view id="main-view" url="/" main></f7-view>
    </f7-app>
</template>


<script>
    import routes from './routes.js';

    export default {
        data: function () {
            return {
                f7params: {
                  // Array with app routes
                  routes: routes,
                  // App Name
                  name: 'My App',
                  // App id
                  id: 'com.jbrcodes.CongNavApp',
                  // ...
                }
            }
        }
    }
</script>


<style>
    .page-content {
        font-size: 125%;
    }
    .zzz-block-title {
        font-weight: bold;
    }
</style>
