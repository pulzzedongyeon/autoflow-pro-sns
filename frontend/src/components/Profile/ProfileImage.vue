<template>
  <img :src="profileAvatar"/>
</template>

<script>
  
  export default {
    name: "ProfileImage",
    props: {
      username: {
        type: String,
        required: true
      },
      size: {
        type: Number,
        default: 32
      }
    },
    computed: {
      profileAvatar () {
        return `https://avatars.dicebear.com/api/identicon/${this.username}.svg?size=${this.size}&scale=100`
      }
    }
  }

</script>

<style scoped>

  img {
    border: 1px solid lightgray;
    border-radius: 100%;
  }

</style>