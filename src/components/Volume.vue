<template lang="html">
  <div class="container text-center">
    <h3 class="page-header">Volume</h3>
    <ul class="list-unstyled">
      <li><strong>ID: </strong>{{volume.id}}</li>
      <li><strong>Name: </strong>{{volume.name}}</li>
      <li><strong>Status: </strong>{{volume.status}}</li>
      <li><strong>Description: </strong>{{volume.description}}</li>
      <li><strong>Created: </strong>{{formatDate(volume.createdAt)}}</li>
    </ul>
    <h3 class="page-header">Configuration</h3>
    <ul class="list-unstyled">
      <li><strong>Size </strong>{{volume.size}}</li>
      <li><strong>Type: </strong>{{volume.volumeType}}</li>
      <li><strong>Attachments: </strong><ul class="list-unstyled" v-for="(attch, index) in volume.attachments">
        <li><strong>ID: </strong>{{attch.attachment_id}}</li>
        <li><strong>ServerID: </strong>{{attch.server_id}}</li>
        <li><strong>Device: </strong>{{attch.device}}</li>
        <li>{{attch.server}}</li>
      </ul></li>
    </ul>
    <a href="#" class="btn btn-default btn-lg" data-toggle="tooltip" data-placement="left" title="Attch volume to server"><i class="fa fa-paperclip"></i>
</a>
    <a @click="showModal = true" class="btn btn-danger btn-lg" data-toggle="tooltip" data-placement="right" title="Delete Volume"><i class="fa fa-trash"></i></a>
    <modal v-if="showModal" :component="volume" @close="showModal = false"></modal>
  </div>
</template>

<script>
import moment from 'moment'
import Modal from 'components/ModalDanger'

export default {
  data() {
    return {
      volume: {},
      showModal: false
    }
  },
  components: {
    Modal
  },
  created() {
    this.fetchVolume()
  },
  methods: {
    fetchVolume() {
      var self = this;
      self.axios.get('/volumes/' + self.$route.params.id)
        .then((response) => {
          self.volume = response.data
        })
        .catch((error) => {
          console.log(error)
        });
    },
    formatDate: (value) => {
      if (value) {
        return moment(String(value)).format('MM/DD/YYYY hh:mm')
      }
    }
  }
}
</script>

<style lang="css">
</style>
