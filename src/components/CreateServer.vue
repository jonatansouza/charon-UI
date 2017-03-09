<style scoped>



</style>

<template lang="html">

<div class="container">
    <div class="row">
        <wait :msg=msg v-if="request == info.WAIT"></wait>
        <div v-if="request != info.WAIT">
            <h3 class="text-center">Create Server</h3>
            <div class="form-group">
                <label for="instance">Name</label>
                <input type="text" class="form-control" id="instance" v-model="nameInstance" placeholder="Server Name" required>
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <select class="form-control" v-model="imageSelected = images[0]">
                    <option v-for="(image, index) in images" :value="image">{{image.name}}</option>
                </select>
            </div>
            <div class="form-group" v-if="flavors != null">
                <label for="flavor">Flavor</label>
                <select class="form-control" v-model="flavorSelected = flavors[2]">
                    <option v-for="(flavor, index) in flavors" :value="flavor">{{flavor.name}}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="image">Cloud Init</label>
                <textarea rows="5" class="form-control" v-model="cloudInit" placeholder="Leave Empty for defaut cloud init"></textarea>
            </div>
            <div class="form-group" v-if="flavors.length">
            <h4 class="page-header">Server Resources</h4>
              <flavor-limits :flavor="flavorSelected || flavors[0]" :limits="limits"></flavor-limits>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block" @click="createServer()">Create</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import Wait from 'components/Wait'
import FlavorLimits from 'components/FlavorLimits'
import * as info from '../store/default-messages'
import {
    mapGetters,
    mapAction
}
from 'vuex'
export default {
    data() {
            return {
                imageSelected: null,
                flavorSelected: null,
                nameInstance: "",
                cloudInit: "",
                nameInvalid: false,
                info: info,
                request: ""
            }
        },
        components: {
            Wait, FlavorLimits
        },
        computed: mapGetters({
            images: 'allImages',
            flavors: 'allFlavors',
            limits: 'allLimits'
        }),
        mounted() {
            var self = this;
            self.info = info;
            self.$store.dispatch('getAllFlavors');
            self.$store.dispatch('getAllLimits');
            self.$store.dispatch('getAllImages');
        },
        methods: {
            createServer() {
                    var self = this;
                    if (self.nameInstance == "" || self.nameInstance.indexOf(' ') >= 0) {
                        self.$parent.$emit('alert-message', {
                            text: info.INVALID_NAME,
                            type: "warning"
                        });
                    } else {
                        self.request = info.WAIT
                        self.msg = info.CREATE_SERVER_MSG + self.nameInstance
                        var data = {
                            'name': self.nameInstance,
                            'image': self.imageSelected.id,
                            'flavor': self.flavorSelected.id
                        }
                        if(self.cloudInit){
                            data.cloudConfig = new Buffer(self.cloudInit).toString('base64');
                        }
                        self.axios.post('/servers', data)
                            .then((response) => {
                                self.axios.get('/servers/' + response.data.id)
                                    .then((response) => {
                                        var server = response.data;
                                        var currentState = server.status
                                        var attemp = 0;
                                        var interval = setInterval(() => {
                                                self.axios.get('/servers/' + server.id)
                                                    .then((response) => {
                                                        server = response.data
                                                        if (server.status != currentState || attemp == 100) {
                                                            self.request = info.SUCCESS;
                                                            self.alertMessage({
                                                                text: info.CREATED,
                                                                type: "success"
                                                            });
                                                            clearInterval(interval);
                                                        } else {
                                                            attemp++;
                                                            console.log(attemp+ 'attemp ' + server.status);
                                                        }
                                                    }).catch((err) => {
                                                        console.log(err);
                                                    });
                                            },
                                            2000);
                                    }).catch((err) => {
                                        console.log(err);
                                    });
                            }).catch((err) => {
                                self.request = info.FAILURE;
                                self.alertMessage({
                                    text: err.response.data.result,
                                    type: info.DANGER,
                                    important: true
                                });
                            })
                    }
                },
                alertMessage(message) {
                    var self = this;
                    self.$parent.$emit('alert-message', message);
                }
        }
}

</script>
