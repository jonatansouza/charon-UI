import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

var instance = axios.create({
  baseURL: 'http://192.168.1.110:5000/api/openstack'
});

Vue.use(VueAxios, instance)
