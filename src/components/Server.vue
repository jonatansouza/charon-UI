<style lang="css">



</style>

<template lang="html">

<div>
    <div v-if="server.id">
        <div class="container text-center">
            <h1 class="page-header">{{server.name}} <small>Server</small></h1>
            <img :src="loadImg()" class="img-thumbnail-o" alt="avatar">
            <ul class="list-unstyled">
                <li><strong>ID: </strong>{{server.id}}</li>
                <li><strong>Name: </strong>{{server.name}}</li>
                <li><strong>Status: </strong>{{server.status}}</li>
                <li><strong>Created: </strong>{{formatDate(server.created)}}</li>
                <li><strong>Last Update: </strong>{{formatDate(server.updated)}}</li>
                <li><strong>Image ID: </strong>{{server.image.id}}</li>
                <li><strong>Image name: </strong>{{server.image.name}}</li>
                <li><strong>Image status: </strong>{{server.image.status}}</li>
                <li><strong>Image Created: </strong>{{formatDate(server.image.created)}}</li>
            </ul>
            <div v-if="server.addresses">
                <ul class="list-unstyled" v-for="(address, index) in server.addresses.private">
                    <li><strong>IP {{index+1}}</strong></li>
                    <li><strong>version</strong>: IPV{{address.version}}</li>
                    <li><strong>Address</strong>: {{address.addr}}</li>
                    <li><strong>Type</strong>: {{address['OS-EXT-IPS:type']}}</li>
                </ul>
            </div>
            <h1 class="page-header">Tools</h1>
            <a class="btn btn-default btn-lg" data-toggle="tooltip" data-placement="left" title="Power-on or Power-of Server"><i class="fa fa-power-off"></i></a>
            <a class="btn btn-default btn-lg" data-toggle="tooltip" data-placement="bottom" title="Create a template of Server"><i class="fa fa-clone"></i></a>
            <a class="btn btn-default btn-lg" data-toggle="tooltip" data-placement="left" title="Associate Floating IP"><i class="fa fa-desktop"></i></a>
            <a @click="showModal = true" class="btn btn-danger btn-lg" data-toggle="tooltip" data-placement="right" title="Delete your Server"><i class="fa fa-trash"></i></a>
            <modal v-if="showModal" :component="server" @close="showModal = false"></modal>
        </div>
    </div>
    <wait :msg="msg" v-if="(actionStatus == info.WAIT)"></wait>
    <alert-msg v-if="actionStatus == info.SUCCESS" msg="Server DELETED" category="success"></alert-msg>
</div>

</template>

<script>

import moment from 'moment'
import Modal from 'components/ModalDanger'
import Wait from 'components/Wait'
import AlertMsg from 'components/AlertMsg'
import * as info from '../store/default-messages'
import {
    mapGetters,
    mapAction
}
from 'vuex'

export default {
    data() {
            return {
                showModal: false,
                msg: "",
                info: {}
            }
        },
        components: {
            Modal,
            Wait,
            AlertMsg
        },
        computed: mapGetters({
            server: 'byIdServer',
            image: 'byIdImage',
            actionStatus: 'actionStatus'
        }),
        created() {
            var self = this;
            self.info = info;
            self.$store.dispatch('actionReset')
            self.msg = info.FETCH_SERVER_MSG
            self.$store.dispatch('getServerById', self.$route.params.id)
            self.$on('delete', function() {
                self.$store.dispatch('deleteServer', self.server.id)
                self.msg = info.DELETE_SERVER_MSG
            });
        },
        methods: {
            loadImg: () => {
                return require('../assets/server.svg');
            },
            formatDate: (value) => {
                if (value) {
                    return moment(String(value)).format('MM/DD/YYYY hh:mm')
                }
            }
        }
}

</script>
