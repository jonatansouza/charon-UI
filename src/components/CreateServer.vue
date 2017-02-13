<template lang="html">
  <div class="container">
  <form>
        <div class="row">
            <h3 class="text-center">Create Server</h3>
            <div class="form-group">
                <label for="instance">Name</label>
                <input type="text" class="form-control" id="instance" ng-model="nameInstance" placeholder="Server Name" required>
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <select class="form-control" v-model="imageSelected"></select>
            </div>
            <div class="form-group">
                <label for="flavor">Flavor</label>
                <select class="form-control" v-model="flavorSelected"></select>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block">Create</button>
            </div>
          </div>
        </form>

      </div>
</template>

<script>
export default {
  data () {
    return {
      imageSelected: {},
      flavorSelected: {}
    }
  }
}
</script>

<style lang="css">
</style>
