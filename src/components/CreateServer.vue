<style scoped>



</style>

<template lang="html">

<div class="container">
    <div class="row">
      <h3 class="text-center">Create Server</h3>
        <alert-msg v-if="nameInvalid" msg="invalid name!" category="danger"></alert-msg>
        <alert-msg v-if="actionStatus.status == info.FAILURE" :msg="actionStatus.msg" category="danger"></alert-msg>
        <alert-msg v-if="actionStatus.status == info.SUCCESS" :msg="'Server '+ actionStatus.msg.name +' created'" category="success"></alert-msg>
        <wait :msg="'Creating Server'+nameInstance" v-if="actionStatus.status == info.WAIT"></wait>
        <div v-if="actionStatus.status != info.WAIT">
            <div class="form-group">
                <label for="instance">Name</label>
                <input type="text" class="form-control" id="instance" v-model="nameInstance" @keyup="updateName" placeholder="Server Name" required>
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
    mapGetters, mapAction
}
from 'vuex'
export default {
    data() {
            return {
                imageSelected: {},
                flavorSelected: {},
                nameInstance: "",
                nameInvalid: false,
                info: info
            }
        },
        components: {
            AlertMsg, Wait
        },
        computed: mapGetters({
            images: 'allImages',
            flavors: 'allFlavors',
            actionStatus: 'actionStatus'
        }),
        created() {
            this.$store.dispatch('actionReset')
            this.$store.dispatch('getAllImages');
            this.$store.dispatch('getAllFlavors');
        },
        methods: {
            updateName() {
                    var self = this;
                    self.nameInvalid = false;
                },
                createServer() {
                    var self = this;
                    if (self.nameInstance == "" || self.nameInstance.indexOf(' ') >= 0) {
                        self.nameInvalid = true;
                    } else {
                        var data = {
                            'name': self.nameInstance,
                            'image': self.imageSelected.id,
                            'flavor': self.flavorSelected.id
                        }
                        self.$store.dispatch('createServer', data);
                    }
                }
        }
}

</script>
