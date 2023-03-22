<template>
  <Popup @closed="$emit('closed')">
    <div class="form">
      <div class="form-header">
        <div class="header-title">Modify Profile</div>
        <div class="header-button" @click="modifyPost">Modify</div>
      </div>
      <div class="form-content">
        <div class="user-info">
          <ProfileImage :username="profileInfo.username" :size="32"/>
          <div class="username">{{ profileInfo.username }}</div>
        </div>
        <div class="content-info">
          <div class="content-input-wrapper">
            <label for="username">Username</label>
            <input
              :value="profileInfo.username"
              type="text"
              id="username"
              class="content-input"
              placeholder="Username"
              disabled
              />
          </div>
          <div class="content-input-wrapper">
            <label for="name">Name</label>
            <input
              v-model="info.name"
              type="text"
              id="name"
              class="content-input"
              placeholder="Name"
              />
          </div>
          <div class="content-input-wrapper">
            <label for="email">Email</label>
            <input
              v-model="info.email"
              type="text"
              id="email"
              class="content-input"
              placeholder="Email"
              />
          </div>
          <div class="content-input-wrapper">
            <label for="phone">Phone</label>
            <input
              v-model="info.phone"
              type="text"
              id="phone"
              class="content-input"
              placeholder="Phone"
              />
          </div>
          <div class="content-input-wrapper">
            <label for="description">Description</label>
            <textarea
              v-model="info.description"
              type="text"
              id="description"
              class="content-input"
              placeholder="Description"
              ></textarea>
          </div>
        </div>
      </div>
    </div>
  </Popup>
</template>

<script>
  
  import api from '@/utils/api'
  import endpoints from '@/utils/endpoints'
  import Popup from '@/components/Popup.vue'
  import ProfileImage from '@/components/Profile/ProfileImage.vue'

  export default {
    name: "ProfileModifyPopup",
    emits: ["modified"],
    components: {
      Popup,
      ProfileImage,
    },
    props: {
      profileInfo: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        info: {
          name: '',
          email: '',
          phone: '',
          description: '',
        },
        password: '',
        passwordConfirm: '',
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.userInfo
      }
    },
    methods: {
      modifyPost () {
        api({
          ...endpoints.user.modify,
          data: {
            ...this.info
          }
        }).then(res => {
          this.$emit('modified', this.info)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted () {
      this.info.name = this.profileInfo.name
      this.info.email = this.profileInfo.email
      this.info.phone = this.profileInfo.phone
      this.info.description = this.profileInfo.description
    }
  }

</script>

<style scoped>

  .form {
    width: 700px;
  }

  .form-header {
    padding: 15px 20px;
    border-bottom: 1px solid lightgray;
  }
  .form-header .header-title {
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
  }
  .form-header .header-button {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    margin: 15px;
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
    color: blue;
  }

  .form-content > * {
    padding: 15px 20px;
  }
  .form-content .user-info {
    display: flex;
    align-items: center;
    gap: 7px;
    border-bottom: 1px solid rgb(240, 240, 240);
  }
  .form-content .user-info .username {
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
  }
  .form-content .content-input-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 0;
  }
  .form-content .content-input-wrapper label {
    width: 120px;
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
  }
  .form-content .content-input-wrapper .content-input {
    flex-grow: 1;
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    border: 1px solid lightgray;
    border-radius: 5px;
    padding: 7px 15px;
  }
  .form-content .content-input-wrapper textarea.content-input {
    resize: none;
    height: 200px;
  }
  .form-content .content-input-wrapper .content-input:focus-visible {
    outline: none;
  }

</style>