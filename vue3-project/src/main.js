import { createApp } from 'vue'
import App from './App.vue'

// 1. 以App作为参数生成一个实例对象
// 2. 将实例对象挂载到id为app的元素上
createApp(App).mount('#app')

// Vue2中
// new Vue()来创建Vue实例