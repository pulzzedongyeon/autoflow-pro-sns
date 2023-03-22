<template>
  <div class="container auth-container">
    <div class="intro-box">
      <img src="@/assets/images/basic_logo.png" class="logo"/>
      <div class="text">API AutoFlow SNS Template</div>
    </div>
    <div class="container-box">
      <div class="header">
        <h2 class="header-title">Login</h2>
      </div>
      <form>
        <div v-show="this.errMessage" class="alert alert-danger err-msg">
          {{ this.errMessage }}
        </div>
        <LabelInputText v-model="username" label="Username"/>
        <LabelInputText v-model="password" label="Password" type="password"/>
        <div class="options">
          <button
            type="submit"
            class="btn btn-primary btn-block auth-btn"
            @click.prevent="login"
            >
            Log In
          </button>
        </div>
        <div class="options">
          <div class="option-text">
            <a href="/account/forgot-password" class="option-link">
              Forgot password?
            </a>
          </div>
        </div>
      </form>
    </div>
    <div class="container-box">
      <div class="options">
        <div class="option-text">
          <span>Don't have an account? </span>
          <a href="/account/signup" class="option-link">Sign up</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Cookies from 'js-cookie'

  import api from '@/utils/api'
  import endpoints from '@/utils/endpoints'
  import LabelInputText from '@/components/Account/LabelInputText.vue'

  export default {
    name: 'Login',
    components: {
      LabelInputText
    },
    data () {
      return {
        username: '',
        password: '',
        errMessage: null,
      };
    },
    methods: {
      async login () {
        if (!this.username) {
          this.errMessage = "Please write your username"
          return false
        }
        if (!this.password) {
          this.errMessage = "Please write your password"
          return false
        }
        
        api({
          ...endpoints.user.login,
          data: {
            username: this.username,
            password: this.password
          }
        }).then(res => {
          Cookies.set('auth', res.data.token)
          location.href = '/'
        }).catch(err => {
          console.log(err)
          if (err.response) this.errMessage = err.response.data.message
        })
      },
    },
  }

</script>

<style scoped>

  .container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: fit-content;
  }

  .intro-box {
    text-align: center;
    margin-bottom: 20px;
  }
  .intro-box .logo {
    width: 190px;
    margin-bottom: 10px;
  }
  .intro-box .text {
    font-size: 18px;
    font-weight: 600;
    line-height: 20px;
  }

  .container-box {
    text-align: center;
    border: 1px solid lightgray;
    background-color: white;
    width: 400px;
    margin: 10px 10px 0px 10px;
    padding: 40px;
  }
  .container-box:nth-child(2) {
    padding: 20px;
  }

  .header {
    margin-bottom: 2em;
  }
  .header .header-img {
    width: 125px;
    margin-bottom: 20px;
  }

  .options .option-text {
    padding: 5px;
  }
  .options .option-link {
    text-decoration: none;
  }
  .options .auth-btn {
    width: 100%;
    margin-top: 30px;
    margin-bottom: 30px;
    padding: 6px;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
  }

  .err-msg {
    margin-bottom: 1rem;
    padding: 5px 10px;
    color: red;
  }

</style>
