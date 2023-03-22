<template>
  <div v-if="true" class="follow-button follow">Follow</div>
  <div v-else class="follow-button unfollow">Unfollow</div>
</template>

<script>

  import api from '@/utils/api'
  import endpoints from '@/utils/endpoints'

  export default {
    name: "FollowButton",
    props: {
      userId: {
        type: Number,
        required: true
      }
    },
    data () {
      return {
        followed: false,
      }
    },
    computed: {
      userInfo () {
        return this.$store.state.userInfo
      }
    },
    mounted () {
      api({
        ...endpoints.profile.following(this.userInfo.id)
      }).then(res => {
        console.log(res.data.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }

</script>

<style scoped>

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

</style>