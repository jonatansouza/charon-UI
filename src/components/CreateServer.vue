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
                <select class="form-control" v-model="imageSelected">
                    <option v-for="(image, index) in images" :value="image">{{image.name}}</option>
                </select>
            </div>
            <div class="form-group">
                <label for="flavor">Flavor</label>
                <select class="form-control" v-model="flavorSelected">
                    <option v-for="flavor in flavors" :value="flavor">{{flavor.name}}</option>
                </select>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block" @click="createServer()">Create</button>
            </div>
        </div>
    </div>
</div>

</template>

<script>

import AlertMsg from 'components/AlertMsg'
import Wait from 'components/Wait'
import * as info from '../store/default-messages'
import {
    mapGetters,
    mapAction
}
from 'vuex'
export default {
    data() {
            return {
                imageSelected: {},
                flavorSelected: {},
                nameInstance: "",
                nameInvalid: false,
                info: info,
                request: ""
            }
        },
        components: {
            Wait
        },
        computed: mapGetters({
            images: 'allImages',
            flavors: 'allFlavors'
        }),
        created() {
            var self = this;
            self.info = info;
            self.$store.dispatch('getAllFlavors');
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
                    self.axios.post('/servers', data)
                        .then((response) => {
                            self.axios.get('/servers/' + response.data.id)
                                .then((response) => {
                                    var server = response.data;
                                    var currentState = server.status
                                    var interval = setInterval(() => {
                                            self.axios.get('/servers/' + server.id)
                                                .then((response) => {
                                                    server = response.data
                                                    if (server.status != currentState) {
                                                        self.request = info.SUCCESS;
                                                        self.$parent.$emit('alert-message', {
                                                            text: info.CREATED,
                                                            type: "success"
                                                        });
                                                        clearInterval(interval);
                                                    } else {
                                                        console.log('attemp ' + server.status);
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
                            console.log(err);
                        })
                }
            }
        }
}

</script>
