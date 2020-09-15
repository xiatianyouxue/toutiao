import Vue from 'vue'
import App from './App.vue'
import Vant from 'vant'
// 清空默认样式和解决移动端1像素问题
import './styles/reset.css'
import './styles/border.css'
import 'vant/lib/index.css'
// 自动适配rem基准值(html字体大小)
import 'amfe-flexible'
import router from './router'
import store from './store'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
