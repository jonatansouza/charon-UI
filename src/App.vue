<style>



</style>

<template>

<div id="app">
    <navbar></navbar>
    <alert-msg @close="showAlertMessage = false" v-if="showAlertMessage" :message="msg"></alert-msg>
    <router-view></router-view>
</div>

</template>

<script>

import Navbar from 'components/Navbar'
import AlertMsg from 'components/AlertMsg'
export default {
    name: 'app',
    components: {
        Navbar,
        AlertMsg
    },
    data() {
        return {
            showAlertMessage: false,
            msg: {}
        }
    },
    created() {
        var self = this;
        self.$on('alert-message', (message) => {
            self.msg = {
                text: (typeof message.text == 'undefined') ? 'EMPTY MESSAGE' : message.text,
                type: (typeof message.type == 'undefined') ? 'info' : message.type,
                important: (typeof message.important == 'undefined') ? false : message.important
            }
            self.showAlertMessage = true;
            if (!self.msg.important) {
                setTimeout(() => {self.showAlertMessage = false}, 5000);
            }
        });
    }
}

</script>
