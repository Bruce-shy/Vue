// import Vue from 'vue'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import App from './App.vue'
import 'element-plus/dist/index.css'



const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')

// import Vue from 'vue'
import { nextTick } from 'vue'
import Loading from './components/Loading.vue'

const Mask = app.extend(Loading)

const toggleLoading = (el, binding) => {
  if (binding.value) {
    nextTick(() => {
      // 控制loading组件显示
      el.instance.visible = true
      // 插入到目标元素
      insertDom(el, el, binding)
    })
  } else {
    el.instance.visible = false
  }
}

const insertDom = (parent, el) => {
  parent.appendChild(el.mask)
}

const sb =  {
  bind: function (el, binding, vnode) {
    const mask = new Mask({
      el: document.createElement('div'),
      data () {}
    })
    el.instance = mask
    el.mask = mask.$el
    el.maskStyle = {}
    binding.value && toggleLoading(el, binding)
  },
  update: function (el, binding) {
    if (binding.oldValue !== binding.value) {
      toggleLoading(el, binding)
    }
  },
  unbind: function (el, binding) {
    el.instance && el.instance.$destroy()
  }
}














// Vue.directive('sloading', sb)
app.directive('sloading', sb)
// app.directive()
// 注册自定义指令
// Object.keys(directives).forEach(key => {
//   console.log('key', key);
//   Vue.directive(key, directives[key])
// })

