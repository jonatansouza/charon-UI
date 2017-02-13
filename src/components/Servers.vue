<template>
<div class="container-fluid">
  <h1 class="page-header">Servers</h1>
  <div v-if="!waiting" v-for="(server,index) in servers" :class="(index + 1) % 3 ? '' : 'row'">
    <card :card="server" imageUrl="server" category="servers" class="col-md-4 "></card>
  </div>
  <wait v-if="waiting" msg="Fetching Server List From Cloud"></wait>
</div>

</template>

<script>
import Card from 'components/Card'
import Wait from 'components/Wait'

export default {
  data() {
    return {
      servers: [],
      waiting: true
    }
  },
  components:{
    Card, Wait
  },
  created() {
    this.fetchServersList()
  },
  methods: {
    fetchServersList() {
      var self = this;
      self.axios.get('/servers')
        .then((response) => {
          self.servers = response.data
          self.waiting = false
        })
        .catch((error) => {
          console.log(error)
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
