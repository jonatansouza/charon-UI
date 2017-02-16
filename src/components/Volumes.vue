<style scoped>

</style>

<template>
<div class="container-fluid">
  <h1 class="page-header">Volumes</h1>
  <div v-if="volumes.length">
    <div v-for="(volume,index) in volumes" :class="(index + 1) % 4 ? '' : 'row'">
      <card :card="volume" imageUrl="volume" category="volumes" class="col-md-3"></card>
    </div>
  </div>
  <div v-if="!volumes.length">
    <wait msg="fetching Volumes list from API"></wait>
  </div>
</div>
</template>

<script>
import Card from 'components/Card'
import Wait from 'components/Wait'

import {
  mapGetters,
  mapAction
}
from 'vuex'

export default {
  components: {
    Card, Wait
  },
  computed: mapGetters({
    volumes: 'allVolumes',
    actionStatus: 'actionStatus'
  }),
  created() {
    this.$store.dispatch('getAllVolumes');
  }
}
</script>
