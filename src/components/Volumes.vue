<style scoped>

.adjust-btn {
    position: absolute;
    right: 1%;
}

</style>

<template>

<div class="container-fluid">
    <h1 class="page-header">Volumes <span class="adjust-btn"><a href="#/create-volume" class="btn btn-primary btn-lg btn-rounded"><i class="fa fa-plus"></i></a></span></h1>
    <div v-if="volumes.length">
        <div v-for="(volume,index) in volumes" :class="(index + 1) % 4 ? '' : 'row'">
            <card v-if="volume.status != info.DELETE" :card="volume" imageUrl="volume" category="volumes" class="col-md-3 "></card>
        </div>
    </div>
    <div v-if="request == info.WAIT">
        <wait :msg="msg"></wait>
    </div>
</div>

</template>

<script>

import Card from 'components/Card'
import Wait from 'components/Wait'
import * as info from '../store/default-messages'

export default {
    data() {
            return {
                volumes: [],
                request: "",
                msg: "",
                info: {}
            }
        },
        components: {
            Card,
            Wait
        },
        created() {
            var self = this;
            self.info = info;
            self.msg = info.FETCH_VOLUMES_MSG;
            self.request = info.WAIT;
            this.fetchVolumeList();
        },
        methods: {
            fetchVolumeList() {
                var self = this;
                self.axios.get('/volumes')
                    .then((response) => {
                        self.request = info.SUCCESS;
                        self.volumes = response.data;
                    }).catch((err) => console.log(err))
            }
        }
}

</script>
