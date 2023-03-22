<script setup>
  import { RouterView } from 'vue-router'
  import Navigator from './components/Navigator.vue'
</script>

<template>
  <link rel="preconnect" href="https://rsms.me/">
  <link rel="stylesheet" href="https://rsms.me/inter/inter.css">
  <link rel="stylesheet" href="/src/assets/styles/app.css">
  <div id="app">
    <header class="header" v-if="!isAccountPage">
      <Navigator/>
    </header>
    <main class="main">
      <RouterView />
    </main>
  </div>
</template>

<script>

  import api from '@/utils/api'
  import endpoints from '@/utils/endpoints'

  export default {
    computed: {
      isAccountPage () {
        return /^\/account\//.test(location.pathname)
      }
    },
    mounted () {
      if (!this.isAccountPage) {
        api({
          ...endpoints.user.info
        }).then(res => {
          this.$store.commit('setUserInfo', res.data)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }

</script>


<style scoped>

  #app {
    display: flex;
    font-family: Inter, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #353535;
    background-color: rgb(250, 250, 250);
  }
  .header {
    height: 100vh;
  }
  .main {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 100vh;
    overflow-y: scroll;
  }

</style>
