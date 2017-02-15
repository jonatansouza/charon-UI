<template lang="html">

<div class="">
  <div class="alert alert-info text-center" role="alert"><strong>Under Develop</strong></div>
    <h3>storage {{servers}}</h3>
</div>
</template>

<script>
import {
  mapGetters,
  mapAction
} from 'vuex'

export default {
  computed: mapGetters({
    servers: 'byIdServer'
  }),
  mounted() {
    this.$store.dispatch('getServerById', '1fec33de-9d3c-4df1-b0be-e8b8f36444ed')
  }
}
</script>

<style lang="css">
</style>
