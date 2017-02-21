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
    <default-page v-if="!alive"></default-page>
    <div v-if="alive">
        <wait v-if="request == info.WAIT " :msg="msg"></wait>
        <div class="container" v-if="request != info.WAIT">
            <section id="content" class="text-center">
                <ul class="list-group">
                    <li class="list-group-item">
                        <img :src="loadImg()" class="img-thumbnail-o" alt="avatar">
                        <h3>General Information</h3>
                        <ul class="list-unstyled">
                            <li><strong>Status: </strong>{{server.status}}</li>
                            <li><strong>ID: </strong>{{server.id}}</li>
                            <li><strong>Name: </strong>{{server.name}}</li>
                            <li><strong>Created: </strong>{{formatDate(server.created)}}</li>
                            <li><strong>Last Update: </strong>{{formatDate(server.updated)}}</li>
                            <li><strong>Image ID: </strong>{{server.image.id}}</li>
                            <li><strong>Image name: </strong>{{server.image.name}}</li>
                            <li><strong>Image status: </strong>{{server.image.status}}</li>
                            <li><strong>Image Created: </strong>{{formatDate(server.image.created)}}</li>
                        </ul>
                    </li>
                </ul>
                <ul class="list-group" v-for="(address, index) in server.addresses.private">
                    <li class="list-group-item">
                        <ul class="list-unstyled">
                            <li><strong>IP {{index+1}}</strong></li>
                            <li><strong>version</strong>: IPV{{address.version}}</li>
                            <li><strong>Address</strong>: {{address.addr}}</li>
                            <li><strong>Type</strong>: {{address['OS-EXT-IPS:type']}}</li>
                        </ul>
                    </li>
                </ul>
            </section>
            <section id="tools" class="text-center">
                <h1>Tools</h1>
                <div class="mobile">
                    <!-- CUSTOM BUTTONS MOBILE -->
                </div>
                <div class="desktop">
                    <a @click="changeState" class="btn btn-default btn-lg " :class="statusServer()" data-toggle="tooltip" data-placement="left" title="Power-on or Power-of Server"><i class="fa fa-power-off"></i></a>
                    <a class="btn btn-default btn-lg" data-toggle="tooltip" data-placement="bottom" title="Create a template of Server"><i class="fa fa-clone"></i></a>
                    <a @click="associateFloatingIp" class="btn btn-default btn-lg" :class="floatingIpCustom()" data-toggle="tooltip" data-placement="left" title="Associate Floating IP"><i class="fa fa-signal"></i></a>
                    <a @click="showModal = true" class="btn btn-danger btn-lg" data-toggle="tooltip" data-placement="right" title="Delete your Server"><i class="fa fa-trash"></i></a>
                </div>
            </section>
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
import DefaultPage from 'components/DefaultPage'
import * as info from '../store/default-messages'

export default {
    name: 'server',
    data() {
        return {
            showModal: false,
            msg: info.FETCH_SERVER_MSG,
            info: {},
            request: info.WAIT,
            alive: true,
            server: {}
        }
    },
    components: {
        Modal,
        Wait,
        AlertMsg,
        DefaultPage
    },
    created() {
        var self = this;
        self.info = info;
        self.fetchServer();
        self.$on('delete', function() {
            self.deleteServer();
        });

    },
    methods: {
        fetchServer() {
                var self = this;
                self.axios.get('/servers/' + self.$route.params.id)
                    .then((response) => {
                        var server = response.data
                        self.axios.get('/images/' + server.imageId)
                            .then((response) => {
                                server.image = response.data
                                self.server = server;
                                self.request = "";
                            }).catch((err) => console.log(err))
                    }).catch((err) => {
                        if (err.response.data.statusCode == 404) {
                            self.alive = false;
                        }
                    });
            },
            floatingIpCustom() {
                var self = this;
                if (self.server) {
                    var floating = false;
                    self.server.addresses.private.forEach((el, idx, array) => {
                        if (el['OS-EXT-IPS:type'] == info.OPENSTACK_FLOATING) {
                            console.log('equals');
                            floating = true;
                        }
                    });
                    return floating ? 'btn-warning' : 'btn-info'
                }
            },
            statusServer() {
                var self = this;
                return (self.server.status == self.info.OPENSTACK_STOP) ? 'btn-default' : 'btn-warning'

            },
            loadImg: () => {
                return require('../assets/server.svg');
            },
            associateFloatingIp() {
                var self = this;
                var floating = null;
                self.server.addresses.private.forEach((el, idx, array) => {
                    if (el['OS-EXT-IPS:type'] == info.OPENSTACK_FLOATING) {
                        floating = el.addr;
                    }
                });
                if (floating) {
                    self.msg = info.FLOATING_IP_REMOVE_SERVER_MSG;
                    self.request = info.WAIT;
                    self.axios.post('/server/ip/rm', {
                        server: self.server,
                        floatingIp: floating
                    }).then((response) => {
                        self.fetchServer();
                        self.request = info.SUCCESS
                        self.$parent.$emit('alert-message', {
                            text: info.FLOATING_IP_REMOVE + response.data.server,
                            type: info.SUCCESS
                        });
                    }).catch((err) => {
                        self.request = info.FAILURE;
                        self.alertMessage({
                            text: err.response.data,
                            type: info.DANGER,
                            important: true
                        });
                    });
                } else {
                    self.msg = info.FLOATING_IP_ADD_SERVER_MSG;
                    self.request = info.WAIT;
                    self.axios.post('/server/ip/add', self.server)
                        .then((response) => {
                            self.fetchServer();
                            self.request = info.SUCCESS
                            self.$parent.$emit('alert-message', {
                                text: info.FLOATING_IP_ADD + response.data.ip,
                                type: info.SUCCESS
                            });
                        }).catch((err) => {
                            self.request = info.FAILURE;
                            self.alertMessage({
                                text: err.response.data,
                                type: info.DANGER,
                                important: true
                            });
                        });
                }
            },
            deleteServer() {
                var self = this;
                self.request = info.WAIT;
                self.msg = info.DELETE_SERVER_MSG;
                var server = self.server;
                self.axios.delete('/servers/' + server.id)
                    .then((response) => {
                        var interval = setInterval(() => {
                                self.axios.get('/servers/' + server.id)
                                    .then((response) => {
                                        server = response.data
                                        console.log('attemp delete ' + server.id);
                                    }).catch((err) => {
                                        if (err.response.data.statusCode == 404) {
                                            self.request = info.SUCCESS;
                                            self.alive = false;
                                            self.request = info.SUCCESS;
                                            self.alertMessage({
                                                text: info.DELETE_SERVER_MSG + server.name,
                                                type: info.INFO
                                            })
                                            clearInterval(interval);
                                        }
                                    });
                            },
                            2000);
                    }).catch((err) => {

                    })
            },
            changeState() {
                var self = this;
                var server = self.server;
                var currentState = server.status;
                self.request = info.WAIT;
                self.msg = info.UPDATE_SERVER_MSG;
                self.axios.post('/server', server)
                    .then((response) => {
                        var interval = setInterval(() => {
                            self.axios.get('/servers/' + server.id)
                                .then((response) => {
                                    server = response.data
                                    if (server.status != currentState) {
                                        self.axios.get('/images/' + server.imageId)
                                            .then((response) => {
                                                server.image = response.data
                                                self.server = server;
                                                self.request = info.SUCCESS;
                                                clearInterval(interval);
                                            }).catch((err) => {
                                                console.log(err);
                                            });

                                    }
                                }).catch((err) => console.log(err))
                        }, 2000);
                    }).catch((err) => console.log(err))
            },
            formatDate: (value) => {
                if (value) {
                    return moment(String(value)).format('MM/DD/YYYY hh:mm')
                }
            },
            alertMessage(message) {
                var self = this;
                self.$parent.$emit('alert-message', message);
            }
    }
}

</script>
