<style scoped>

.adjust-btn {
    position: absolute;
    right: 1%;
}

</style>

<template>

<div class="container-fluid">
    <h1 class="page-header">Servers <small>Instances {{limits.totalInstancesUsed}}/{{limits.maxTotalInstances}}</small> <span class="adjust-btn"><a href="#/create-server" class="btn btn-primary btn-lg btn-rounded"><i class="fa fa-plus"></i></a></span></h1>
    <div v-if="servers.length">
        <div v-for="(server,index) in servers" :class="(index + 1) % 4 ? '' : 'row'">
            <card :card="server" imageUrl="server" category="servers" class="col-md-3 "></card>
        </div>
    </div>
    <div v-if="request == info.WAIT">
      <wait :msg="msg"></wait>
    </div>
</div>

</template>

<script>
import {mapGetters} from 'vuex'
import Card from 'components/Card'
import Wait from 'components/Wait'
import * as info from '../store/default-messages'

export default {
    data () {
      return {
        servers: [],
        request: "",
        msg: "",
        info: {}
      }
    },
    components: {
        Card, Wait
    },
    computed: mapGetters({
        limits: 'allLimits'
    }),
    created() {
        var self = this;
        self.$store.dispatch('getAllLimits');
        self.info = info;
        self.msg = info.FETCH_SERVERS_MSG;
        self.request = info.WAIT;
        this.fetchServerList();
    },
    methods: {
      fetchServerList() {
        var self = this;
        self.axios.get('/servers')
          .then((response) => {
            self.request = info.SUCCESS;
            self.servers = response.data;
          }).catch((err) => console.log(err))
      }
    }
}

</script>
