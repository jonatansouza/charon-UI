<style lang="css">



</style>

<template lang="html">

<div>
    <h1 class="page-header">Flavors</h1>
    <div v-for="flavor in flavors">
      <flavor-limits :flavor="flavor" :limits="limits"></flavor-limits>
    </div>
</div>
</template>

<script>

import FlavorLimits from 'components/FlavorLimits'
export default {
    data() {
            return {
                flavors: [],
                limits: {}
            }
        },
        components: {
            FlavorLimits
        },
        created() {
            var self = this;
            self.fetchFlavorsList();
            self.fetchLimitsList();
        },
        methods: {
            fetchFlavorsList() {
                    var self = this;
                    self.axios.get('/flavors')
                        .then((response) => {
                            self.flavors = response.data
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                },
                fetchLimitsList() {
                    var self = this;
                    self.axios.get('limits')
                        .then((response) => {
                            self.limits = response.data.absolute;
                            self.limits.maxDiskSize = 200;

                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
        }
}

</script>
