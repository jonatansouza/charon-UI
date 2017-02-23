<template lang="html">
  <div>
    <h1 class="page-header">Flavors</h1>
    <div v-for="flavor in flavors">
      <commit-chart :flavor="flavor" :limits="limits"></commit-chart>
      {{flavor}}
    </div>
  </div>
</template>

<script>
// MonthlyIncome.js
import CommitChart from '../charts/flavorChart'
export default {
  data () {
    return {
      flavors: [],
      limits: {}
    }
  },
  components: { CommitChart },
  created () {
    var self = this;
    self.fetchFlavorsList();
    self.fetchLimitsList();
  },
  methods: {
    fetchFlavorsList () {
      var self = this;
      self.axios.get('/flavors')
        .then((response) => {
            self.flavors = response.data
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchLimitsList () {
      var self = this;
      self.axios.get('limits')
      .then((response) =>{
        self.limits = response.data.absolute;
        console.log(JSON.stringify(self.limits));
      })
      .catch((err)=>{
          console.log(err);
      });
    }
  }
}

</script>

<style lang="css">
</style>
