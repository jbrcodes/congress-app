<!-- pages/Home.vue -->


<template>
    <f7-page>
        <f7-navbar title="Jbr App (Home)">
            <f7-nav-right>
                <f7-link panel-open="right"><f7-icon fa="bars"></f7-icon></f7-link>
            </f7-nav-right>
        </f7-navbar>
        <f7-block>
            <h1>This is Home.</h1>
            <p>Mauris posuere sit amet metus id venenatis. Ut ante dolor, tempor nec commodo rutrum, varius at sem. Nullam ac nisi non neque ornare pretium.</p>
            <p>Go to the
            <f7-link href="/about/">About</f7-link>
            page.</p>
            <state-list />
        </f7-block>
    </f7-page>
</template>


<script>
    import StateList from '../components/StateList.vue';
    
    export default {
        components: {
            'state-list': StateList
        }
    }
</script>