<style lang="css">



</style>

<template lang="html">

<div class="container">
    <wait :msg=msg v-if="request == info.WAIT"></wait>
    <div v-if="request != info.WAIT">
        <h3 class="text-center">Create Volume</h3>
        <div class="form-horizontal">
            <div class="form-group">
                <label for="instance">Name</label>
                <input type="text" class="form-control" id="instance" v-model="nameVolume" placeholder="Volume Name" required>
            </div>
            <div class="form-group">
                <label for="desc">description</label>
                <input type="text" class="form-control" id="desc" v-model="descriptionVolume" placeholder="Volume description" required>
            </div>
            <div class="form-group">
                <label for="size">Size</label>
                <div class="range range-primary">
                    <input type="range" name="range" min="1" max="100" v-model="sizeVolume">
                    <output>{{sizeVolume}} GB</output>
                </div>
            </div>
            <div class="form-group">
                <button @click="createVolume" class="btn btn-primary btn-block">Create</button>
            </div>
        </div>

    </div>
</div>

</template>

<script>

import Wait from 'components/Wait'
import * as info from '../store/default-messages'

export default {
    data() {
            return {
                sizeVolume: 5,
                descriptionVolume: "",
                nameVolume: "",
                request: "",
                info: info,
            }
        },
        components: {
            Wait
        },
        created() {
            var self = this;
            self.$store.dispatch('getAllTypes');
        },
        methods: {
            createVolume() {
                    var self = this;
                    if (self.nameVolume == "" || self.nameVolume.indexOf(' ') >= 0) {
                        self.$parent.$emit('alert-message', {
                            text: info.INVALID_NAME,
                            type: "warning"
                        });
                    } else {
                        self.request = info.WAIT
                        self.msg = info.CREATE_VOLUME_MSG + self.nameVolume
                        var data = {
                            name: self.nameVolume, // required
                            description: self.descriptionVolume, // required
                            size: self.sizeVolume // 100-1000 gb
                                //volumeType: typeSelected // optional, defaults to spindles
                        }
                        self.axios.post('/volumes', data)
                            .then((response) => {
                                self.axios.get('/volumes/' + response.data.id)
                                    .then((response) => {
                                        var volume = response.data;
                                        var currentState = volume.status
                                        var interval = setInterval(() => {
                                                self.axios.get('/volumes/' + volume.id)
                                                    .then((response) => {
                                                        volume = response.data
                                                        if (volume.status != currentState) {
                                                            self.request = info.SUCCESS;
                                                            alertMessage({
                                                                text: info.CREATED,
                                                                type: info.SUCCESS
                                                            });
                                                            clearInterval(interval);
                                                        } else {
                                                            console.log('attemp ' + volume.status);
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
