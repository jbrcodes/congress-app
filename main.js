import Vue from 'vue';

import Framework7 from 'framework7/framework7.esm.bundle.js';
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';
// eslint-disable-next-line
import Framework7Styles from 'framework7/css/framework7.css';

Framework7.use(Framework7Vue);

import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
    el: '#app',
    render: (h) => h(App)
});
