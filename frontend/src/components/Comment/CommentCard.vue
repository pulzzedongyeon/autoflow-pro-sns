<template>
  <div class="comment-card">
    <div class="user-profile-img" @click="userInfoClicked">
      <ProfileImage :username="commentData.username" :size="32"/>
    </div>
    <div class="text-wrapper">
      <div class="content-wrapper">
        <span class="username" @click="userInfoClicked">{{ commentData.username }}</span>
        <template v-if="commentData.content.length > 100 && !expanded">
          <span class="content">{{ commentData.content.slice(0, 100) }}...</span>
          <span class="view-more" @click="expanded = true">more</span>
        </template>
        <span v-else class="content">{{ commentData.content }}</span>
      </div>
      <div class="state-wrapper">
        <span class="create-time">
          {{ timeFormat(commentData.create_time) }}
        </span>
        <span class="likes">
          {{ new Intl.NumberFormat('en-US').format(commentData.like_count) }} like<span v-if="commentData.like_count > 1">s</span>  
        </span>
        <span v-if="userInfo.id === commentData.user_id" class="modify-icon" @click="showOption = true">
          <SvgIcon type="mdi" :path="modifyIcon" :size="17"/>
        </span>
      </div>
    </div>
    <div class="like-icon" @click="toggleCommentLike">
      <SvgIcon type="mdi" :path="heartIconStatus" :size="18"/>
    </div>
  </div>
  
  <OptionPopup
    v-if="showOption"
    :options="options"
    @deleteClicked="deleteClicked"
    @closed="showOption = false"
    />
</template>

<script>

  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiHeart, mdiHeartOutline, mdiDotsHorizontal } from '@mdi/js'

  import api from '@/utils/api'
  import endpoints from '@/utils/endpoints'
  import { timeFormat } from '@/utils/textFormat';
  import ProfileImage from '@/components/Profile/ProfileImage.vue'
  import OptionPopup from '@/components/Popup/OptionPopup.vue'

  export default {
    name: "CommentCard",
    emits: ["deleted"],
    components: {
      SvgIcon,
      ProfileImage,
      OptionPopup,
    },
    props: {
      commentData: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        heartIcon: {
          active: mdiHeart,
          inactive: mdiHeartOutline
        },
        modifyIcon: mdiDotsHorizontal,
        showOption: false,
        expanded: false,
        options: [
          {
            title: 'Delete',
            action: 'deleteClicked',
            color: 'red',
          }
        ],
      }
    },
    computed: {
      heartIconStatus () {
        if (this.commentData.liked > 0) return this.heartIcon.active
        else return this.heartIcon.inactive
      },
      userInfo () {
        return this.$store.state.userInfo
      },
    },
    methods: {
      timeFormat (date) {
        return timeFormat(date)
      },
      toggleCommentLike () {
        const options = this.commentData.liked > 0 ? endpoints.comment.deleteLike(this.commentData.id) : endpoints.comment.addLike(this.commentData.id)
        api({
          ...options,
        }).then(res => {
          this.commentData.like_count += this.commentData.liked > 0 ? -1 : 1
          this.commentData.liked = !this.commentData.liked
        }).catch(err => {
          console.log(err)
        })
      },
      deleteClicked () {
        this.showOption = false
        api({
          ...endpoints.comment.delete(this.commentData.id)
        }).then(res => {
          this.$emit('deleted')
        }).catch(err => {
          console.log(err)
        })
      },
      userInfoClicked () {
        location.href = `/profile/${this.commentData.user_id}`
      },
    }
  }

</script>

<style scoped>

  .comment-card {
    display: flex;
    align-items: top;
    gap: 10px;
    margin-bottom: 10px;
  }

  .user-profile-img,
  .like-icon {
    flex-shrink: 0;
  }

  .user-profile-img {
    cursor: pointer;
  }

  .text-wrapper {
    flex-grow: 1;
    font-size: 14px;
  }
  .text-wrapper .content-wrapper .username {
    cursor: pointer;
    font-weight: 700;
    margin-right: 5px;
  }
  .text-wrapper .content-wrapper .content {
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
  }
  .text-wrapper .content-wrapper .view-more {
    cursor: pointer;
    color: darkgray;
    margin-left: 5px;
  }
  .text-wrapper .state-wrapper .create-time {
    font-size: 12px;
    font-weight: 400;
    margin-right: 10px;
    color: gray;
  }
  .text-wrapper .state-wrapper .likes {
    font-size: 12px;
    font-weight: 500;
    margin-right: 10px;
  }
  .text-wrapper .state-wrapper .modify-icon {
    cursor: pointer;
    display: none;
  }
  .comment-card:hover .text-wrapper .state-wrapper .modify-icon {
    display: inline;
  }

  .like-icon {
    cursor: pointer;
  }

</style>