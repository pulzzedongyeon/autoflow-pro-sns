<template>
  <div class="profile">
    <div class="profile-info">
      <ProfileImage :username="profileInfo.username" :size="128"/>
      <div class="info-text">
        <div class="username-wrapper">
          <div class="username">{{ profileInfo.username }}</div>
          <div
            v-if="profileInfo.id === userInfo.id"
            class="modify-button"
            @click="showModify = true"
            >
            Edit profile
          </div>
        </div>
        <div class="state-wrapper">
          <div><span class="count">{{ profileInfo.post_count }}</span> posts</div>
          <div class="follow"><span class="count">{{ profileInfo.follower_count }}</span> followers</div>
          <div class="follow"><span class="count">{{ profileInfo.following_count }}</span> following</div>
        </div>
        <div class="description-wrapper">
          <div class="name">{{ profileInfo.name }}</div>
          <div class="description">{{ profileInfo.description }}</div>
        </div>
      </div>
    </div>
    <div class="post-title">POSTS</div>
    <div class="profile-posts">
      <div class="post-card-wrapper">
        <PostCard
          v-for="(postData, index) in postList"
          v-bind:key="postData.id"
          :postData="postData"
          @deleted="postList.splice(index, 1)"
          />
      </div>
    </div>
  </div>

  <ProfileModifyPopup
    v-if="showModify"
    :profileInfo="profileInfo"
    @modified="modified"
    @closed="showModify = false"
    />
</template>

<script>

  import api from '@/utils/api'
  import endpoints from '@/utils/endpoints'
  import ProfileImage from '@/components/Profile/ProfileImage.vue'
  import ProfileModifyPopup from '@/components/Profile/ProfileModifyPopup.vue'
  import UserListPopup from '@/components/Profile/UserListPopup.vue'
  import PostCard from '@/components/Post/PostCard.vue'

  export default {
    name: "Profile",
    components: {
      ProfileImage,
      ProfileModifyPopup,
      UserListPopup,
      PostCard,
    },
    data () {
      return {
        profileInfo: {},
        postList: [],
        showModify: false,
        showUserList: false,
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.userInfo
      },
      userId () {
        return this.$route.params.user_id ?? this.userInfo.id
      },
    },
    methods: {
      modified (info) {
        this.showModify = false
        location.reload()
      },
      getProfileInfo (userId) {
        api({
          ...endpoints.profile.info(userId)
        }).then(res => {
          this.profileInfo = res.data.data
        }).catch(err => {
          history.go(-1)
        })
        api({
          ...endpoints.profile.posts(userId)
        }).then(res => {
          this.postList = res.data.data
        }).catch(err => {
          history.go(-1)
        })
      }
    },
    watch: {
      userId (userId) {
        this.getProfileInfo(userId)
      },
    },
    mounted () {
      if (this.userId) this.getProfileInfo(this.userId)
    }
  }

</script>

<style scoped>

  .profile {
    width: 60%;
  }

  .post-title {
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
    text-align: center;
    margin-top: 5px;
  }
  .profile-posts {
    display: flex;
    justify-content: center;
  }
  .profile-posts .post-card-wrapper {
    margin-top: 40px;
  }

  .profile-info {
    display: flex;
    align-items: center;
    gap: 100px;
    width: 100%;
    padding: 40px 100px;
    border-bottom: 1px solid lightgray;;
  }
  .profile-info .info-text > * {
    margin-bottom: 20px;
  }
  
  .username-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .username-wrapper .username {
    font-size: 18px;
    font-weight: 600;
    line-height: 18px;
  }
  .username-wrapper .modify-button {
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
    background-color: rgb(233, 233, 233);
    padding: 7px 15px;
    border-radius: 8px;
  }
  .username-wrapper .modify-button:hover {
    background-color: lightgray;
  }

  .state-wrapper {
    display: flex;
    align-items: center;
    gap: 30px;
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
  }
  .state-wrapper .count {
    font-weight: 700;
  }
  .state-wrapper .follow {
    cursor: pointer;
  }

  .description-wrapper {
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
  }
  .description-wrapper .name {
    font-weight: 600;
    margin-bottom: 3px;
  }
  .description-wrapper .description {
    white-space: break-spaces;
  }

</style>