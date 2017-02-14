<template lang="html">
<div class="container">
        <div class="row">
          <alert-msg v-if="nameInvalid" msg="invalid name!" category="danger"></alert-msg>
            <h3 class="text-center">Create Server</h3>
            <div class="form-group">
                <label for="instance">Name</label>
                <input type="text" class="form-control" id="instance" v-model="nameInstance" @keyup="updateName" placeholder="Server Name" required>
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <select class="form-control" v-model="imageSelected">
                <option v-for="(image, index) in images" :value="image">{{image.name}}</option></select>
            </div>
            <div class="form-group">
                <label for="flavor">Flavor</label>
                <select class="form-control" v-model="flavorSelected"><option v-for="flavor in flavors" :value="flavor">{{flavor.name}}</option></select>
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary btn-block" @click="createServer($event)">Create</button>
            </div>
          </div>
      </div>
</template>

<script>
import AlertMsg from 'components/AlertMsg'
export default {
  data() {
    return {
      images: [],
      flavors: [],
      imageSelected: {},
      flavorSelected: {},
      nameInstance: "",
      nameInvalid: false
    }
  },
  components : {
    AlertMsg
  },
  created() {
    this.fetchImagesList();
    this.fetchFlavorsList();
  },
  methods: {
    fetchImagesList() {
      var self = this;
      self.axios.get('/images')
        .then((response) => {
          self.images = response.data;
          self.imageSelected = self.images[0];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchFlavorsList() {
      var self = this;
      self.axios.get('/flavors')
        .then((response) => {
          self.flavors = response.data;
          self.flavorSelected = self.flavors[2];
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateName() {
      var self = this;
      self.nameInvalid = false;
    },
    createServer(event) {
      event.preventDefault();

      var self = this;

      if (self.nameInstance == "" || self.nameInstance.indexOf(' ') >= 0) {
        self.nameInvalid = true;
      } else {
        var data = {
          'name': self.nameInstance,
          'image': self.imageSelected.id,
          'flavor': self.flavorSelected.id
        }
        self.axios.post('/servers', data)
          .then(function(response) {
            console.log(response);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
}
</script>

<style scoped>

</style>
