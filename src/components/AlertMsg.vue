<template lang="html">
  <div :class="classAlert" class="alert text-center" role="alert"><span class="pull-left"><i class="fa fa-exclamation-triangle fa-2x" aria-hidden="true"></i></span>
<strong>{{msg}}</strong><a class="pull-right custom-close" href="#">X</a></div>
</template>

<script>
export default {
  props: {
    msg: {
      type: String,
      require: true
    },
    category: {
      type: String,
      require: true
    }
  },
  computed: {
    classAlert() {
      var self = this;
      return 'alert-' + self.category
    }
  }

}
</script>

<style scoped>
.custom-close {
  text-decoration: none;
  color: inherit;
}
</style>
