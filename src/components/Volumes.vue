<template>
<div class="container-fluid">
  <h1 class="page-header">Volumes</h1>
  <div v-for="(volume,index) in volumes" :class="(index + 1) % 4 ? '' : 'row'">
    <card :card="volume" imageUrl="volume" category="volumes" class="col-md-3"></card>
  </div>

</div>
</template>

<script>
import Card from 'components/Card'
import {
  mapGetters,
  mapAction
} from 'vuex'

export default {
  components: {
    Card
  },
  computed: mapGetters({
    volumes: 'allVolumes'
  }),
  created() {
    this.$store.dispatch('getAllVolumes');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
