<style>

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    display: table;
    transition: opacity .3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 300px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: red;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}


/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

</style>

<template type="text/x-template" id="modal-template">

<transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container">
                <div class="modal-header">
                    <h3 class="">Warning</h3>
                </div>
                <div class="modal-body">
                    <p>
                        Are you sure you want delete <strong>{{component.name}}</strong>?
                    </p>
                    <p>
                        <button class="btn btn-default" @click="$emit('close')">
                            cancel
                        </button>
                        <button class="btn btn-danger" @click="deleteComponent">
                            delete
                        </button>
                    </p>
                </div>
            </div>
        </div>
    </div>
    </div>
</transition>

</template>

<script>

export default {
    props: {
        component: {
            type: Object,
            require: true
        }
    },
    methods: {
        deleteComponent() {
            var self = this;
            self.$parent.$emit('delete');
            self.$emit('close');
        }
    }
}

</script>
