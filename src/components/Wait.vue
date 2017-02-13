<template lang="html">
  <div class="text-center">
           <h3>{{msg}}<br><small>Please wait<br></small></h3>
           <i class="fa fa-spinner fa-spin fa-5x"></i>
       </div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      require: true
    }
  }
}
</script>

<style lang="css">
</style>
