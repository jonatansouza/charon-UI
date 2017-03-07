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
    <a href="#/volumes" class="btn btn-default btn-lg"><i class="fa fa-arrow-left"></i> Back</a>
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
                            <li><strong>Status: </strong>{{volume.status}}</li>
                            <li><strong>ID: </strong>{{volume.id}}</li>
                            <li><strong>Name: </strong>{{volume.name}}</li>
                            <li><strong>Size: </strong>{{volume.size}} GB</li>
                            <li><strong>Created: </strong>{{formatDate(volume.createdAt)}}</li>
                        </ul>
                    </li>
                </ul>
            </section>
            <section id="tools" class="text-center">
                <h1>Tools</h1>
                <div class="desktop">
                    <a @click="attachDetachVolume('volume')" class="btn btn-default btn-lg" :class="statusVolume()" data-toggle="tooltip" data-placement="bottom" title="attach or dettach Volume"><i class="fa fa-paperclip"></i></a>
                    <a @click="modalHandler('danger')" class="btn btn-danger btn-lg" data-toggle="tooltip" data-placement="right" title="Delete your Volume"><i class="fa fa-trash"></i></a>
                </div>
                <div class="mobile">
                    <a @click="attachDetachVolume('volume')" class="btn btn-default btn-lg btn-block" :class="statusVolume()" data-toggle="tooltip" data-placement="bottom" title="attach or dettach Volume"><i class="fa fa-paperclip"></i> Attach / Detach</a>
                    <a @click="modalHandler('danger')" class="btn btn-danger btn-lg btn-block" data-toggle="tooltip" data-placement="right" title="Delete your Volume"><i class="fa fa-trash"></i> Delete</a>
                </div>
            </section>
            <modal v-if="showModal" :component="volume" :itens="servers" :category="category" @close="showModal = false"></modal>
        </div>
    </div>

</div>

</template>

<script>

import moment from 'moment'
import Modal from 'components/Modal'
import Wait from 'components/Wait'
import AlertMsg from 'components/AlertMsg'
import DefaultPage from 'components/DefaultPage'
import * as info from '../store/default-messages'
import {
    mapGetters
}
from 'vuex'

export default {
    name: 'volume',
    data() {
        return {
            showModal: false,
            msg: info.FETCH_VOLUME_MSG,
            info: {},
            request: info.WAIT,
            alive: true,
            volume: {},
            category: ""
        }
    },
    components: {
        Modal,
        Wait,
        AlertMsg,
        DefaultPage
    },
    computed: mapGetters({
        servers: 'allServers'
    }),
    created() {
        var self = this;
        self.info = info;
        self.$store.dispatch('getAllServers')
        self.fetchVolume();
        self.$on('deleteComponent', function() {
            self.deleteVolume();
        });
        self.$on('selectComponent', function(item) {
            self.selectComponent(item);
        });

    },
    methods: {
        fetchVolume() {
                var self = this;
                self.axios.get('/volumes/' + self.$route.params.id)
                    .then((response) => {
                        self.volume = response.data;
                        self.request = "";
                    }).catch((err) => {
                        if (err.response.data.statusCode == 404) {
                            self.alive = false;
                        }
                    });
            },
            statusVolume(){
              var self = this;
              return (self.volume.status == info.USED) ?  'btn-warning' : 'btn-default'
            },
            attachDetachVolume(item) {
                var self = this;
                if (self.volume.status == self.info.USED) {
                    var server;
                    var volume;
                    self.volume.attachments.forEach((el, idx, array) => {
                        server = el.server_id;
                        volume = el;
                    })
                    var data = {
                        volume: volume,
                        server: server
                    }
                    console.log(data);
                    self.request = info.WAIT;
                    self.msg = info.DETTACH_VOLUME_MSG;
                    self.submitVolume(data);
                } else {
                  console.log('here');
                    self.modalHandler('volume');
                }
            },
            modalHandler(category) {
                var self = this;
                self.category = category;
                self.showModal = true;
            },
            loadImg: () => {
                return require('../assets/volume.svg');
            },
            deleteVolume() {
                var self = this;
                self.request = info.WAIT;
                self.msg = info.DELETE_VOLUME_MSG;
                var volume = self.volume;
                var attemp = 0;
                self.axios.delete('/volumes/' + volume.id)
                    .then((response) => {
                        var interval = setInterval(() => {
                                self.axios.get('/volumes/' + volume.id)
                                    .then((response) => {
                                        volume = response.data;
                                        attemp++;
                                        console.log(attemp + ' delete ' + volume.id);
                                        if (attemp == 10) {
                                            self.request = info.SUCCESS;
                                            self.alive = false;
                                            self.request = info.SUCCESS;
                                            self.alertMessage({
                                                text: info.DELETE_VOLUME_WAIT,
                                                type: info.WARNING
                                            });
                                            clearInterval(interval);
                                        }
                                    }).catch((err) => {
                                        if (err.response.data.statusCode == 404) {
                                            self.request = info.SUCCESS;
                                            self.alive = false;
                                            self.request = info.SUCCESS;
                                            self.alertMessage({
                                                text: info.DELETE_VOLUME_MSG + volume.name,
                                                type: info.INFO
                                            })
                                            clearInterval(interval);
                                        }
                                    });
                            },
                            5000);
                    }).catch((err) => {

                    })
            },
            selectComponent(item) {
                var self = this;
                var data = {
                    server: item,
                    volume: self.volume
                }
                self.request = info.WAIT;
                self.msg = info.ATTACH_VOLUME_MSG;
                self.submitVolume(data);
            },
            submitVolume(data) {
                var self = this;
                self.axios.post('/volume', data)
                    .then((response) => {
                        var volume = self.volume;
                        var attemp = 0;
                        var interval = setInterval(() => {
                                self.axios.get('/volumes/' + volume.id)
                                    .then((response) => {
                                        volume = response.data;
                                        if ((info.ATTACHING != volume.status) && (info.DETACHING != volume.status)) {
                                            self.volume = volume;
                                            self.request = info.SUCCESS;
                                            if(volume.status == info.USED){
                                              self.alertMessage({
                                                text: info.ATTACH_VOLUME,
                                                type: info.INFO
                                              })
                                            }else {
                                              self.alertMessage({
                                                text: info.DETACH_VOLUME,
                                                type: info.INFO
                                              })
                                            }
                                            clearInterval(interval);
                                        }else{
                                          console.log((++attemp)+' executing '+volume.status);
                                        }
                                    }).catch((err) => {

                                    });
                            },
                            2000);
                    }).catch((err) => {
                        self.request = info.FAILURE;
                        self.alertMessage({
                            text: err,
                            type: info.DANGER,
                            important: true
                        })
                    });


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
