<style scoped>

.custom-close {
    text-decoration: none;
    color: inherit;
}

</style>

<template lang="html">

<div id="alert-message" class="text-center" v-if="message">
    <div :class="'alert alert-dismissible alert-'+message.type" role="alert" transition="fade">
        <!-- {{message.handleShowEvent()}} -->
        <button type="button" class="close" v-show="message.important" @click="message.remove()">
            <span aria-hidden="true">&times;</span>
        </button>
        <strong>{{message.type}} </strong> {{message.text}}
    </div>


</div>

</template>

<script>

export default {
    data() {
            return {
                message: {}
            }
        },
        created() {
            var self = this;
            self.$on('alert-message', function(message) {
                console.log('alert-message');
                var self = this;
                self.createAlertMessage(message)
            })
        },
        methods: {
            createAlertMessage(message) {
                var self = this;
                self.message = {
                    text: (typeof message.text == 'undefined') ? 'EMPTY MESSAGE' : message.text,
                    type: (typeof message.type == 'undefined') ? 'info' : message.type
                }
            }
        }
}

</script>
