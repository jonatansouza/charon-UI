<style lang="css">



</style>

<template lang="html">

<div class="">
    <wait v-if="request == info.WAIT " :msg="msg"></wait>
    <div class="container-fluid" v-if="request != info.WAIT">
        <h1 class="page-header">Images</h1>
        <div class="table-responsive">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>status</th>
                        <th>Create At</th>
                        <th>Updated At</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="image in images">
                        <td>{{image.id}}</td>
                        <td>{{image.name}}</td>
                        <td>{{image.status}}</td>
                        <td>{{formatDate(image.created)}}</td>
                        <td>{{formatDate(image.updated)}}</td>
                        <td>
                            <button @click="modalHandler('danger', image)" class="btn btn-danger"><i class="fa fa-trash"></i></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <modal v-if="showModal" :component="image" :category="category" @close="showModal = false"></modal>
    </div>
</div>

</template>

<script>

import moment from 'moment'
import Modal from 'components/Modal'
import Wait from 'components/Wait'
import * as info from '../store/default-messages'

export default {
    name: 'images',
    data() {
        return {
            images: [],
            image: {},
            request: "",
            info: info,
            msg: "",
            showModal: false
        }
    },
    components: {
        Wait, Modal
    },
    created() {
        var self = this;
        self.request = info.WAIT
        self.msg = info.FETCH_IMAGES_MSG
        self.fetchImageList();
        self.$on('deleteComponent', function(component) {
            self.deleteImage(component);
        });
    },
    methods: {
        fetchImageList() {
                var self = this;
                self.axios.get('/images')
                    .then((response) => {
                        self.images = response.data;
                        self.request = info.SUCCESS;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            },
            formatDate(value) {
                if (value) {
                    return moment(String(value)).format('MM/DD/YYYY hh:mm')
                }
            },
            modalHandler(category, image) {
                var self = this;
                self.image = image;
                self.category = category;
                self.showModal = true;
            },
            deleteImage(component) {
                var self = this;
                self.request = info.WAIT;
                self.msg = info.DELETE_IMAGE_WAIT;
                var image = component;
                self.axios.delete('/images/' + image.id)
                    .then((response) => {
                        var interval = setInterval(() => {
                                self.axios.get('/images/' + image.id)
                                    .then((response) => {
                                        image = response.data
                                        if (image.status == info.OPENSTACK_DELETE_IMAGE) {
                                            self.request = info.SUCCESS;
                                            self.alertMessage({
                                                text: info.DELETE_IMAGE_MSG + image.name,
                                                type: info.INFO
                                            })
                                            self.fetchImageList();
                                            clearInterval(interval);
                                        }else{
                                          console.log('attemp delete ' + image.id);
                                        }
                                    }).catch((err) => {
                                        console.log(err);
                                    });
                            },
                            2000);
                    }).catch((err) => {
                        console.log(err);
                    })
            },
            alertMessage(message) {
                var self = this;
                self.$parent.$emit('alert-message', message);
            }
    }
}

</script>
