<style scoped>

.custom-thumb {
    text-decoration: none !important;
    color: inherit;
}

</style>

<template lang="html">

<div>
    <h1 class="page-header">Flavors</h1>
    <div class="container">
        <div class="row" v-for="flavor in flavors">
            <a class="thumbnail custom-thumb">
              <h3 class="text-center">{{flavor.name}}</h3>
                <flavor-limits :flavor="flavor" :limits="limits"></flavor-limits>
            </a>
        </div>
    </div>
</div>

</template>

<script>

import FlavorLimits from 'components/FlavorLimits'
import {
    mapGetters,
    mapAction
}
from 'vuex'
export default {
    data() {
            return {
                flavors: []
            }
        },
        components: {
            FlavorLimits
        },
        created() {
            var self = this;
            self.fetchFlavorsList();
            self.$store.dispatch('getAllLimits');
        },
        computed: mapGetters({
          limits: 'allLimits'
        }),
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
            }
        }
}

</script>
