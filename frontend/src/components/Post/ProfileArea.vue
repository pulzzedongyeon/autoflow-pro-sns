<template>
  <div class="profile-area">
    <div class="my-profile profile">
      <ProfileImage :username="userInfo.username" :size="60"/>
      <div class="user-info">
        <div class="username">{{ userInfo.username }}</div>
        <div class="fullname">{{ userInfo.name }}</div>
      </div>
    </div>
    <div class="other-profile-wrapper">
      <div class="title">Suggestions for you</div>
      <div class="other-profile profile">
        <ProfileImage :username="userInfo.username" :size="40"/>
        <div class="user-info">
          <div class="username">{{ userInfo.username }}</div>
          <div class="fullname">{{ userInfo.name }}</div>
        </div>
        <div class="follow-button follow">Follow</div>
      </div>
      <div class="other-profile profile">
        <ProfileImage :username="userInfo.username" :size="40"/>
        <div class="user-info">
          <div class="username">{{ userInfo.username }}</div>
          <div class="fullname">{{ userInfo.name }}</div>
        </div>
        <FollowButton :userId="userInfo.id"/>
      </div>
    </div>
  </div>
</template>

<script>
  
  import ProfileImage from '@/components/Profile/ProfileImage.vue'
  import FollowButton from '@/components/Profile/FollowButton.vue'

  export default {
    name: "ProfileArea",
    components: {
      ProfileImage,
      FollowButton,
    },
    computed: {
      userInfo () {
        return this.$store.state.userInfo
      }
    },
  }

</script>

<style scoped>

  .profile-area {
    min-width: 300px;
    margin-top: 20px;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .user-info {
    flex-grow: 1;
  }
  .user-info .username {
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
  }
  .user-info .fullname {
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
    color: gray;
  }

  .follow-button{
    cursor: pointer;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    color:slateblue;
  }
  .follow-button.follow{
    color:slateblue;
  }
  .follow-button.follow:hover {
    color: darkblue;
  }
  .follow-button.unfollow {
    color: red;
  }
  .follow-button.unfollow:hover {
    color: darkred;
  }

  .my-profile {
    margin-bottom: 20px;
  }
  .other-profile {
    margin-left: 5px;
    margin-bottom: 10px;
  }

  .other-profile-wrapper .title {
    font-size: 15px;
    font-weight: 600;
    line-height: 18px;
    color: gray;
    margin-bottom: 15px;
  }

</style>