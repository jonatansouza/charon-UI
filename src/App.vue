<style>



</style>

<template>

<div id="app">
    <navbar></navbar>
    <alert-msg ref="alert-message" msg="teste" category="success"></alert-msg>
    <router-view></router-view>
</div>

</template>

<script>

import Navbar from 'components/Navbar'
import AlertMsg from 'components/AlertMsg'
export default {
    name: 'app',
    components: {
        Navbar, AlertMsg
    }
}

</script>
