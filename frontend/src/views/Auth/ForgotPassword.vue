<template>
  <div class="container auth-container">
    <div class="container-box">
      <div class="header">
        <SvgIcon type="mdi" :path="lockIcon" :size="125" class="header-img"/>
        <h2 class="header-title">Find Password</h2>
      </div>
      <div v-if="newPassword">
        <div class="password-description">This is the temporary password. Please change your password after logging in</div>
        <div class="password-text">{{ newPassword }}</div>
      </div>
      <form v-else>
        <div class="description">
          Enter your username, email and you will receive a temporary password to log back into your account.
        </div>
        <div v-show="this.errMessage" class="alert alert-danger err-msg">
          {{ this.errMessage }}
        </div>
        <LabelInputText v-model="username" label="Username"/>
        <LabelInputText v-model="email" label="Email"/>
        <div class="options">
          <button
            type="submit"
            class="btn btn-primary btn-block find-btn"
            @click.prevent="login"
            >
            Find Password
          </button>
        </div>
        <div class="options">
          <div class="option-text">
            <span>Don't have an account? </span>
            <a href="/account/signup" class="option-link">Sign up</a>
          </div>
        </div>
      </form>
    </div>
    <div class="container-box">
      <div class="options">
        <div class="option-text">
          <a href="/account/login" class="option-link">Back to login</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiLockReset } from '@mdi/js'

  import api from '@/utils/api'
  import endpoints from '@/utils/endpoints'
  import LabelInputText from '@/components/Account/LabelInputText.vue'

  export default {
    name: 'ForgotPassword',
    components: {
      SvgIcon,
      LabelInputText
    },
    data () {
      return {
        lockIcon: mdiLockReset,
        username: '',
        email: '',
        errMessage: null,
        newPassword: null,
      };
    },
    methods: {
      async login () {
        if (!this.username) {
          this.errMessage = "Please write your username"
          return false
        }
        if (!this.email) {
          this.errMessage = "Please write your email"
          return false
        }
        
        api({
          ...endpoints.user.findPassword,
          data: {
            username: this.username,
            email: this.email
          }
        }).then(res => {
          this.newPassword = res.data.password
        }).catch(err => {
          this.errMessage = err.response.data.message
        })
      },
    },
  }

</script>

<style scoped>

  .container {
    width: fit-content;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .header {
    margin-bottom: 2em;
  }
  .header .header-img {
    margin-bottom: 20px;
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

  .description {
    margin-bottom: 15px;
  }

  .options .option-text {
    padding: 5px;
  }
  .options .option-link {
    text-decoration: none;
  }
  .options .find-btn {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 30px;
    padding: 6px;
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
  }

  .form-control {
    background: rgb(250, 250, 250);
    padding: 8px 0 8px 10px;
    color: rgb(38, 38, 38);
    font-size: 15px;
    font-weight: 400;
    line-height: 18px;
    min-height: 40px;
    margin-bottom: 1rem;
  }

  .err-msg {
    margin-bottom: 1rem;
    padding: 5px 10px;
    color: red;
  }

  .password-text {
    color: rgb(38, 38, 38);
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
    margin-top: 20px;
  }
</style>
