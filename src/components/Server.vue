<template lang="html">
  <div class="container text-center">
    <h3 class="page-header">Server</h3>
    <ul class="list-unstyled">
      <li><strong>ID: </strong>{{server.id}}</li>
      <li><strong>Name: </strong>{{server.name}}</li>
      <li><strong>Status: </strong>{{server.status}}</li>
      <li><strong>Created: </strong>{{formatDate(server.created)}}</li>
      <li><strong>Last Update: </strong>{{formatDate(server.updated)}}</li>
    </ul>
      <h3 class="page-header">Network</h3>
      <h4>address:</h4>
      <ul class="list-unstyled" v-for="(address, index) in addresses">
        <li><strong>{{index+1}}</strong></li>
        <li><strong>version</strong>: IPV{{address.version}}
        <li><strong>Address</strong>: {{address.addr}}
        <li><strong>Type</strong>: {{address['OS-EXT-IPS:type']}}
    </ul>
    <h3 class="page-header">Image</h3>
    <ul class="list-unstyled">
      <li><strong>ID: </strong>{{image.id}}</li>
      <li><strong>Name: </strong>{{image.name}}</li>
      <li><strong>Status: </strong>{{image.status}}</li>
      <li><strong>Created: </strong>{{formatDate(image.created)}}</li>
    </ul>
    <a href="#" class="btn btn-warning btn-lg" data-toggle="tooltip" data-placement="left" title="Power-on or Power-of Server"><i class="fa fa-power-off"></i></a>
    <a class="btn btn-default btn-lg" data-toggle="tooltip" data-placement="bottom" title="Create a template of Server"><i class="fa fa-clone"></i></a>
    <a @click="showModal = true" class="btn btn-danger btn-lg" data-toggle="tooltip" data-placement="right" title="Delete your Server"><i class="fa fa-trash"></i></a>
    <modal v-if="showModal" :component="server" @close="showModal = false"></modal>
  </div>
  </template>
<script>
import moment from 'moment'
import Modal from 'components/ModalDanger'

export default {
  data() {
    return {
      server: {},
      addresses: [],
      image: {},
      showModal: false
    }
  },
  components: {
    Modal
  },
  created() {
    var self = this;
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
          self.server = response.data
          self.addresses = self.server.addresses.private;
          self.axios.get('/images/' + self.server.imageId)
            .then((response) => {
              self.image = response.data;
            })
            .catch((error) => {
              console.log(error)
            });

        })
        .catch((error) => {
          console.log(error)
        });
    },
    formatDate: (value) => {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
      }
    },
    deleteServer () {
    var self = this;
      self.axios.delete('/servers/' + self.server.id)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }
}
</script>

<style lang="css">
</style>
