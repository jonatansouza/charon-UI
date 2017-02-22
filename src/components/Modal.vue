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

.scroll-itens {
    max-height: 300px;
    overflow-y: scroll;
}

a.custom-href {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
}

</style>

<template type="text/x-template" id="modal-template">

<transition name="modal">
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div v-if="category == 'danger'">
                <div class="modal-container text-center">
                    <div class="modal-header">
                        <h3 class="text-danger">Warning</h3>
                    </div>
                    <div class="modal-body">
                        <p>
                            Are you sure you want delete <strong>{{component.name}}</strong>?
                        </p>
                    </div>
                    <div class="modal-footer text-center center-block">
                        <button class="btn btn-default" @click="$emit('close')">
                            cancel
                        </button>
                        <button class="btn btn-danger" @click="deleteComponent">
                            delete
                        </button>
                    </div>
                </div>

            </div>
            <div v-if="category == 'info'">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3 class="text-info text-center">Create Template</h3>
                    </div>
                    <div class="modal-body">
                        <div class="form-group" :class="{'has-error': nameInvalid}">
                            <input type="text" @keyup="validName()" placeholder="type a name (e.g myTemplate)" class="form-control" id="usr" v-model="templateName">
                        </div>
                    </div>
                    <div class="modal-footer text-center center-block">
                        <button class="btn btn-default" @click="$emit('close')">
                            Cancel
                        </button>
                        <button class="btn btn-success" :class="{disabled : nameInvalid}" @click="createComponent">
                            Create
                        </button>
                    </div>
                </div>
            </div>
            <div v-if="category == 'volume'">
                <div class="modal-container">
                    <div class="modal-header">
                        <h3 class="text-info text-center">Attach Volume</h3>
                    </div>
                    <div class="modal-body">
                        <h4>Select a server:</h4>
                        <div class="scroll-itens">
                            <ul class="list-group" v-for="(item, idx) in itens">
                                <a class="custom-href" @click="handlerItemSelected(item)">
                                    <li class="list-group-item">{{item.name}}
                                        <span class="pull-right">
                                        <i :class="iconSet(item)"></i>
                                    </span>
                                    </li>
                                </a>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer text-center center-block">
                        <button class="btn btn-default" @click="$emit('close')">
                            Cancel
                        </button>
                        <button class="btn btn-success" @click="selectComponent">
                            Select
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</transition>

</template>

<script>

export default {
    data() {
            return {
                templateName: "",
                nameInvalid: true,
                itemSeleted: {}
            }
        },
        props: {
            component: {
                type: Object,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            itens: {
                type: Array,
                required: false
            }
        },
        methods: {
            deleteComponent() {
                    var self = this;
                    self.$parent.$emit('deleteComponent');
                    self.$emit('close');
                },
                iconSet(item) {
                    var self = this;
                    if (item == self.itemSeleted) {
                        return 'fa fa-check text-success'
                    } else {
                        return 'fa fa-circle-o'
                    }
                },
                createComponent() {
                    var self = this;
                    if (!self.nameInvalid) {
                        self.$parent.$emit('createComponent', self.templateName);
                        self.$emit('close');
                    }
                },
                validName() {
                    var self = this;
                    if (self.templateName == "" || self.templateName.indexOf(' ') >= 0) {
                        self.nameInvalid = true;
                    } else {
                        self.nameInvalid = false;
                    }
                },
                selectComponent() {
                    var self = this;
                    self.$parent.$emit('selectComponent', self.itemSeleted);
                    self.$emit('close');
                },
                handlerItemSelected(item) {
                    var self = this;
                    self.itemSeleted = item;
                }
        }
}

</script>
