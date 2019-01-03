/* routes.js */


import AboutPage from './pages/About.vue';
import HomePage from './pages/Home.vue';
import MemberPage from './pages/Member.vue';
import SenatorListPage from './pages/SenatorListPage.vue';

import RightPanel from './panels/Right.vue';


export default [
    {
        path: '/',
        component: HomePage
    },
    {
        path: '/about/',
        component: AboutPage
    },
    {
        path: '/state/:stateAbbrev/',
        component: SenatorListPage
    },
    {
        path: '/member/:memberId/',
        component: MemberPage
    },
    {
        path: '/right-panel/',
        component: RightPanel,
    }
];