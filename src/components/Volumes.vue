<template>
<div class="container-fluid">
  <h1 class="page-header">Volumes</h1>
  <div v-if="!waiting" v-for="(volume,index) in volumes" :class="(index + 1) % 3 ? '' : 'row'">
    <card :card="volume" imageUrl="volume" category="volumes" class="col-md-4"></card>
  </div>
  <wait v-if="waiting" msg="Fetching Volume List From Cloud"></wait>
</div>
</template>

<script>
import Card from 'components/Card'
import Wait from 'components/Wait'
export default {
  data() {
    return {
      volumes: [],
      waiting: true
    }
  },
  components: {
    Card, Wait
  },
  created() {
    this.fetchVolumesList()
  },
  methods: {
    fetchVolumesList() {
      var self = this;
      self.axios.get('/volumes')
        .then((response) => {
          self.volumes = response.data;
          self.waiting = false;
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
