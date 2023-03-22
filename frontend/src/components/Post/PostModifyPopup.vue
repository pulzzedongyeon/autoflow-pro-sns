<template>
  <Popup @closed="$emit('closed')">
    <div class="form">
      <div class="form-header">
        <div class="header-title">Modify Post</div>
        <div class="header-button" @click="modifyPost">Modify</div>
      </div>
      <div class="form-content">
        <div class="user-info">
          <ProfileImage :username="userInfo.username" :size="32"/>
          <div class="username">{{ userInfo.username }}</div>
        </div>
        <textarea v-model="postContent" class="content-input" placeholder="Write a content"></textarea>
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
    name: "PostModifyPopup",
    components: {
      Popup,
      ProfileImage,
    },
    props: {
      postData: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        postContent: '',
        postTags: '',
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
          ...endpoints.post.modify(this.postData.id),
          data: {
            content: this.postContent,
            tags: this.postTags,
          }
        }).then(res => {
          this.$emit('modified', this.postContent)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    mounted () {
      this.postContent = this.postData.content
      this.postTags = this.postData.tags
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
  .form-content .content-input {
    border: 0;
    resize: none;
    width: 100%;
    height: 500px;
  }
  .form-content .content-input:focus-visible {
    outline: none;
  }

</style>