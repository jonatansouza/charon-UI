<template>
<div class="container-fluid">
  <h1 class="page-header">Servers <span class="adjust-btn"><a href="#/create-server" class="btn btn-primary btn-lg btn-rounded"><i class="fa fa-plus"></i></a></span></h1>
  <div v-for="(server,index) in servers" :class="(index + 1) % 4 ? '' : 'row'">
    <card :card="server" imageUrl="server" category="servers" class="col-md-3 "></card>
  </div>
</div>

</template>

<script>
import Card from 'components/Card'
import {mapGetters,mapAction} from 'vuex'

export default {
  components:{
    Card
  },
  computed: mapGetters({
    servers: 'allServers'
  }),
  created() {
    this.$store.dispatch('getAllServers')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.adjust-btn{
  position: absolute;
  right: 1%;
}
</style>
