<style lang="css">

@media (min-width: 1024px) {
    .mobile {
        display: none;
    }
}
@media (max-width: 1024px) {
    .desktop {
        display: none;
    }
}

</style>

<template lang="html">

<div>
  <a href="#/servers" class="btn btn-default btn-lg"><i class="fa fa-arrow-left"></i> Back</a>
    <wait v-if="!server.id && !actionStatus.status" :msg="info.FETCH_SERVER_MSG"></wait>
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
            <div class="mobile">
                <a class="btn btn-default btn-lg btn-block" data-toggle="tooltip" data-placement="left" title="Power-on or Power-of Server"><i class="fa fa-power-off"></i> Power-on/off</a>
                <a class="btn btn-default btn-lg btn-block" data-toggle="tooltip" data-placement="bottom" title="Create a template of Server"><i class="fa fa-clone"></i> Create Template</a>
                <a class="btn btn-default btn-lg btn-block" data-toggle="tooltip" data-placement="left" title="Associate Floating IP"><i class="fa fa-desktop"></i> Add Floating IP</a>
                <a @click="showModal = true" class="btn btn-danger btn-lg btn-block" data-toggle="tooltip" data-placement="right" title="Delete your Server"><i class="fa fa-trash"></i> Delete</a>
            </div>
            <div class="desktop">
                <a @click="changeState" class="btn btn-default btn-lg " :class="statusServer()" data-toggle="tooltip" data-placement="left" title="Power-on or Power-of Server"><i class="fa fa-power-off"></i></a>
                <a class="btn btn-default btn-lg" data-toggle="tooltip" data-placement="bottom" title="Create a template of Server"><i class="fa fa-clone"></i></a>
                <a @click="associateFloatingIp" class="btn btn-default btn-lg" data-toggle="tooltip" data-placement="left" title="Associate Floating IP"><i class="fa fa-desktop"></i></a>
                <a @click="showModal = true" class="btn btn-danger btn-lg" data-toggle="tooltip" data-placement="right" title="Delete your Server"><i class="fa fa-trash"></i></a>
            </div>
            <modal v-if="showModal" :component="server" @close="showModal = false"></modal>
        </div>
    </div>
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
                alertMessage('Server')
                self.$store.dispatch('deleteServer', self.server.id)
            });

        },
        methods: {
            statusServer() {
              var self = this;
              return self.server.status == self.info.OPENSTACK_STOP ? 'btn-default': 'btn-warning'
            },
            loadImg: () => {
                return require('../assets/server.svg');
            },
            associateFloatingIp(){
              var self = this;
              self.$store.dispatch('addFloatingIp', self.server);
            },
            changeState () {
              var self = this;
              self.$store.dispatch('updateStateServer', self.server);
            },
            formatDate: (value) => {
                if (value) {
                    return moment(String(value)).format('MM/DD/YYYY hh:mm')
                }
            },
            alertMessage(msg, type) {
              var message = {
                text: msg,
                type: type
              }
              self.$parent.$refs['alert-message'].$emit('alert-message', message);
            }
        }
}

</script>
