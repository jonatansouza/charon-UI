
<template lang="html">

<div class="">
    <div class="alert alert-info text-center" role="alert"><strong>Under Develop</strong></div>
    <h3>storage {{fullname}}</h3>
    <input v-model="name" />
    <input v-model="lastName" />
</div>

</template>

<script>

import {
    mapGetters,
    mapAction
}
from 'vuex'

export default {
    data() {
      return {
        name: "asd",
        lastName: ""
      }
    },
    computed: {
      fullname( ) {
          return this.name + " " + this.lastName
      }
    }
}

</script>
