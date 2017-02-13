<template lang="html">
  <div class="">
  <div class="thumbnail">
      <img :src="loadImg(imageUrl)" alt="cardimage">
      <div class="caption text-center">
        <h3>{{card.name}}</h3>
        <p><strong>status:</strong>{{card.status}}</p>
        <p><a :href="'#/'+category+'/'+card.id" class="btn btn-primary btn-block" role="button"><i class="fa fa-eye"></i> View</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      require: true
    },
    imageUrl: {
      type: String,
      require: true
    },
    category:{
      type: String,
      require: true
    }
  },
  methods: {
    loadImg: (path) => {
      console.log(path);
      return require('../assets/' + path + '.svg');

    }
  }
}
</script>

<style lang="css">
</style>
