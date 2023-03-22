<template>
  <Popup @closed="$emit('closed')">
    <div class="post-write-popup">
      <div class="post-header">
        <div class="header-title">Create new post</div>
        <div class="header-button" @click="modifyPost">Modify</div>
      </div>
      <div class="post-content">
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
          ...endpoints.profile.modify(this.userInfo.id),
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
  }

</script>

<style scoped>

  .post-write-popup {
    width: 700px;
  }

  .post-header {
    padding: 15px 20px;
    border-bottom: 1px solid lightgray;
  }
  .post-header .header-title {
    text-align: center;
    font-size: 18px;
    font-weight: 700;
    line-height: 18px;
  }
  .post-header .header-button {
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

  .post-content > * {
    padding: 15px 20px;
  }
  .post-content .user-info {
    display: flex;
    align-items: center;
    gap: 7px;
    border-bottom: 1px solid rgb(240, 240, 240);
  }
  .post-content .user-info .username {
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
  }
  .post-content .content-input {
    border: 0;
    resize: none;
    width: 100%;
    height: 500px;
  }
  .post-content .content-input:focus-visible {
    outline: none;
  }

</style>