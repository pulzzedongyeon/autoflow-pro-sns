<script setup>

</script>

<template>
  <div class="home">
    <div class="post-card-wrapper">
      <PostCard
        v-for="(postData, index) in postList"
        v-bind:key="postData.id"
        :postData="postData"
        @deleted="postList.splice(index, 1)"
        />
    </div>
  </div>
</template>

<script>

  import api from '@/utils/api'
  import endpoints from '@/utils/endpoints'
  import PostCard from '@/components/Post/PostCard.vue'
  import ProfileArea from '@/components/Post/ProfileArea.vue'

  export default {
    name: "Home",
    components: {
      PostCard,
      ProfileArea,
    },
    data () {
      return {
        postList: [],
      }
    },
    mounted () {
      api({
        ...endpoints.post.list
      }).then(res => {
        this.postList = res.data.data
      }).catch(err => {
        console.log(err)
      })
    }
  }

</script>

<style scoped>

  .home {
    display: flex;
    gap: 30px;
    padding: 40px 0;
  }

</style>