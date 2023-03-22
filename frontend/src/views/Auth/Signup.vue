<template>
  <div class="container auth-container">
    <div class="container-box">
      <div class="header">
        <h2 class="header-title">Sign up</h2>
        <div class="header-text">
          Sign up to see posts from your friends.
        </div>
      </div>
      <form>
        <div v-show="this.errMessage" class="alert alert-danger err-msg">
          {{ this.errMessage }}
        </div>
        <LabelInputText v-model="username" label="Username"/>
        <LabelInputText v-model="password" label="Password" type="password"/>
        <LabelInputText v-model="passwordConfirm" label="Confirm password" type="password"/>
        <LabelInputText v-model="name" label="Full name"/>
        <LabelInputText v-model="email" label="Email"/>
        <div class="options">
          <button
            type="submit"
            class="btn btn-primary btn-block signup-btn"
            @click.prevent="signup"
            >
            Sign up
          </button>
        </div>
        <div class="options">
          <div class="option-text">
            By signing up, you agree to our Terms, Data Policy and Cookies Policy
          </div>
        </div>
      </form>
    </div>
    <div class="container-box">
      <div class="options">
        <div class="option-text">
          <span>Have an account? </span>
          <a href="/account/login" class="option-link">Log In</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import api from '@/utils/api'
  import endpoints from '@/utils/endpoints'
  import LabelInputText from '@/components/Account/LabelInputText.vue'

  export default {
    name: 'Signup',
    components: {
      LabelInputText
    },
    data () {
      return {
        username: '',
        password: '',
        passwordConfirm: '',
        name: '',
        email: '',
        errMessage: null,
      };
    },
    methods: {
      async signup () {
        if (!this.username.trim()) {
          this.errMessage = "Please write your username"
          return false
        }
        if (!this.password.trim()) {
          this.errMessage = "Please write your password"
          return false
        }
        if (this.password.trim().length < 8) {
          this.errMessage = "Password must be at least 8 characters"
          return false
        }
        if (!this.passwordConfirm.trim() || this.password !== this.passwordConfirm) {
          this.errMessage = "Confirm password must match password"
          return false
        }
        if (!this.name.trim()) {
          this.errMessage = "Please write your full name"
          return false
        }
        if (!this.email.trim()) {
          this.errMessage = "Please write your email"
          return false
        }
        if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(this.email)) {
          this.errMessage = "Please wirte the correct email format"
          return false
        }
        
        api({
          ...endpoints.user.register,
          data: {
            username: this.username,
            password: this.password,
            name: this.name,
            email: this.email,
          }
        }).then(res => {
          location.href = '/login'
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
    margin-bottom: 3em;
  }
  .header .header-img {
    width: 125px;
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

  .options .option-text {
    padding: 5px;
  }
  .options .option-link {
    text-decoration: none;
  }
  .options .signup-btn {
    width: 100%;
    margin-top: 30px;
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

</style>
