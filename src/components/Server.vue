<template lang="html">
  <div class="aa">

  <div class="container text-center">
  <h1 class="page-header">{{server.name}} <small>Server</small></h1>
      <img :src="loadImg()" class="img-thumbnail-o" alt="avatar">
    <ul class="list-unstyled">
        <li><strong>ID: </strong>{{server.id}}</li>
        <li><strong>Name: </strong>{{server.name}}</li>
        <li><strong>Status: </strong>{{server.status}}</li>
        <li><strong>Created: </strong>{{formatDate(server.created)}}</li>
        <li><strong>Last Update: </strong>{{formatDate(server.updated)}}</li>
      </ul>
      <ul class="list-unstyled" v-for="(address, index) in addrs">
        <li><strong>IP {{index+1}}</strong></li>
        <li><strong>version</strong>: IPV{{address.version}}</li>
        <li><strong>Address</strong>: {{address.addr}}</li>
        <li><strong>Type</strong>: {{address['OS-EXT-IPS:type']}}</li>
    </ul>

    <a href="#" class="btn btn-warning btn-lg" data-toggle="tooltip" data-placement="left" title="Power-on or Power-of Server"><i class="fa fa-power-off"></i></a>
  <a class="btn btn-default btn-lg" data-toggle="tooltip" data-placement="bottom" title="Create a template of Server"><i class="fa fa-clone"></i></a>
  <a @click="showModal = true" class="btn btn-danger btn-lg" data-toggle="tooltip" data-placement="right" title="Delete your Server"><i class="fa fa-trash"></i></a>
  <modal v-if="showModal" :component="server" @close="showModal = false"></modal>
</div>
  </div>
  </template>
<script>
import moment from 'moment'
import Modal from 'components/ModalDanger'
import {
  mapGetters,
  mapAction
} from 'vuex'

export default {
  data() {
    return {
      showModal: false,
    }
  },
  components: {
    Modal
  },
  computed: mapGetters({
    server: 'byIdServer',
    addrs: 'addrsServer'
  }),
  created() {
    var self = this;
    //self.fixAddrs();
    //fetch server
    self.$store.dispatch('getServerById', self.$route.params.id)

    self.$on('delete', function() {
      self.$store.dispatch('deleteServer', self.server.id)
    });
  },
  methods: {
    loadImg: () => {
      return require('../assets/server.svg');
    },
    fixAddrs() {
      this.self;
      self.server.addresses = {};
      self.server.addresses.private = [];
    },
    formatDate: (value) => {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
      }
    },
    showImageDetails(event) {
      console.log('over');
    }
  }
}
</script>
<style lang="css">
</style>
