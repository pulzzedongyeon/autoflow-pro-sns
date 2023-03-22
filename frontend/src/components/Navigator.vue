<script setup>
  import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="navigator">
    <div class="logo">
      <img src="@/assets/images/basic_logo.png"/>
    </div>
    <div class="menu">
      <RouterLink class="menu-wrapper" :class="active === 'home' ? 'active' : ''" to="/">
        <div class="menu-box">
          <div class="menu-icon"><SvgIcon type="mdi" :path="getIcon('home')" :size="32"/></div>
          <div class="menu-text">Home</div>
        </div>
      </RouterLink>
      <!-- <div class="menu-wrapper" :class="active === 'search' ? 'active' : ''" @click="searchClicked">
        <div class="menu-box">
          <div class="menu-icon"><SvgIcon type="mdi" :path="icon.search" :size="32" :stroke="active === 'search' ? 'black' : ''"/></div>
          <div class="menu-text">Search</div>
        </div>
      </div> -->
      <div class="menu-wrapper" :class="active === 'create' ? 'active' : ''" @click="createClicked">
        <div class="menu-box">
          <div class="menu-icon"><SvgIcon type="mdi" :path="getIcon('create')" :size="32"/></div>
          <div class="menu-text">Create</div>
        </div>
      </div>
      <RouterLink class="menu-wrapper" :class="active === 'profile' ? 'active' : ''" to="/profile">
        <div class="menu-box">
          <div class="menu-icon"><SvgIcon type="mdi" :path="getIcon('profile')" :size="32"/></div>
          <div class="menu-text">Profile</div>
        </div>
      </RouterLink>
      <div class="menu-wrapper logout" @click="logoutClicked">
        <div class="menu-box">
          <div class="menu-icon"><SvgIcon type="mdi" :path="icon.logout" :size="32"/></div>
          <div class="menu-text">Logout</div>
        </div>
      </div>
    </div>
  </div>

  <PostWritePopup v-if="showWritePopup" @closed="createClosed"/>
</template>

<script>

  import Cookies from 'js-cookie'
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiHomeVariant, mdiHomeVariantOutline, mdiAccountCircle, mdiAccountCircleOutline, mdiPlusBox, mdiPlusBoxOutline, mdiMagnify, mdiLogout } from '@mdi/js';

  import PostWritePopup from '@/components/Post/PostWritePopup.vue';

  export default {
    name: "Navigator",
    components: {
      SvgIcon,
      PostWritePopup,
    },
    data () {
      return {
        active: 'home',
        icon: {
          home: {
            active: mdiHomeVariant,
            inactive: mdiHomeVariantOutline
          },
          search: mdiMagnify,
          create: {
            active: mdiPlusBox,
            inactive: mdiPlusBoxOutline
          },
          profile: {
            active: mdiAccountCircle,
            inactive: mdiAccountCircleOutline
          },
          logout: mdiLogout,
        },
        showWritePopup: false,
        showSearch: false,
      }
    },
    watch: {
      $route(to, form) {
        this.setActive(to.path)
      },
    },
    methods: {
      setActive (path) {
        this.active = path.replace('/', '')
        if (this.active === '') this.active = 'home'
      },
      searchClicked () {
        this.setActive('search')
        this.showSearch = true
      },
      searchClosed() {
        this.setActive(this.$route.path)
        this.showSearch = true
      },
      createClicked () {
        this.setActive('create')
        this.showWritePopup = true
      },
      createClosed () {
        this.setActive(this.$route.path)
        this.showWritePopup = false
      },
      logoutClicked () {
        Cookies.remove('auth')
        location.href = '/account/login'
      },
      getIcon (route) {
        if (this.active === route) return this.icon[route].active
        else return this.icon[route].inactive
      }
    },
  }

</script>

<style scoped>

  .navigator {
    width: 245px;
    height: 100%;
    border-right: 1px solid lightgray;
    background-color: white;
    padding: 20px 10px;
  }

  .logo img {
    width: 155px;
    margin: 20px 10px;
  }

  .menu .menu-wrapper {
    cursor: pointer;
    display: block;
    text-decoration: none;
    background-color: transparent;
    border-radius: 20px;
  }
  .menu .menu-wrapper.logout {
    position: absolute;
    bottom: 20px;
  }
  .menu .menu-wrapper:hover {
    background-color: rgb(250, 250, 250);
  }
  .menu .menu-wrapper .menu-box {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 12px;
  }
  .menu .menu-wrapper .menu-box .menu-icon {
    color: #353535
  }
  .menu .menu-wrapper .menu-box .menu-text {
    font-size: 16px;
    line-height: 24px;
    text-decoration: none;
    color: #353535;
  }
  .menu .menu-wrapper.active .menu-box .menu-text {
    font-weight: bold;
  }

</style>
