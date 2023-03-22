import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)
const store = createStore({
  state () {
    return {
      userInfo: {
        id: '',
        username: '',
        name: '',
      },
    }
  },
  mutations: {
    setUserInfo (state, _userInfo) {
      state.userInfo = _userInfo
    },
  }
})

app.use(router)
app.use(store)
app.mount('#app')