<style scoped>

.custom-close {
    text-decoration: none;
    color: inherit;
}
/* Enter and leave animations can use different */
/* durations and timing functions.              */
.slide-fade-enter-active {
  transition: all .9s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<template lang="html">
<transition name="slide-fade">
    <div id="alert-message" class="text-center" v-if="message">
        <div :class="'alert alert-dismissible alert-'+message.type" role="alert" transition="fade">
            <!-- {{message.handleShowEvent()}} -->
            <button type="btn btn-default" class="close" @click="$emit('close')">
                <strong><span aria-hidden="true">&times;</span></strong>
            </button>
            <strong>{{uppercase(message.type)}}: </strong> {{message.text}}
        </div>
    </div>
</transition>

</template>

<script>

export default {
    props: ['message'],
    methods: {
      uppercase (msg) {
        return msg.toUpperCase();
      }
    }
}

</script>
