<template>
  <div class="post-card">
    <div class="post-header">
      <div class="user-info" @click="userInfoClicked">
        <ProfileImage :username="postData.username" :size="32"/>
        <div class="username">{{ postData.username }}</div>
      </div>
      <div v-if="userInfo.id === postData.user_id" class="modify-icon" @click="showOption = true">
        <SvgIcon type="mdi" :path="modifyIcon" :size="22"/>
      </div>
    </div>
    <div class="post-content">
      <div class="content-text">
        <span class="username" @click="userInfoClicked">{{ postData.username }}</span>
        <template v-if="postData.content.length > 150 && !expanded">
          <span class="text">{{ postData.content.slice(0, 150) }}...</span>
          <span class="view-more" @click="expanded = true">more</span>
        </template>
        <span v-else class="text">{{ postData.content }}</span>
      </div>
      <div class="content-likes">
        {{ new Intl.NumberFormat('en-US').format(postData.like_count) }} like<span v-if="postData.like_count > 1">s</span>
      </div>
      <div class="content-create-time">
        {{ timeFormat(postData.create_time) }}
      </div>
    </div>
    <div class="post-footer">
      <div class="footer-icon" @click="togglePostLike">
        <SvgIcon type="mdi" :path="heartIconStatus" :size="26"/>
      </div>
      <div class="footer-icon">
        <SvgIcon type="mdi" :path="commentIcon" :size="26"/>
      </div>
    </div>
    <div class="post-comments" v-if="postData.comments.length > 0">
      <CommentCard
        v-for="(commentData, index) in postData.comments"
        v-bind:key="commentData.id"
        :commentData="commentData"
        @deleted="postData.comments.splice(index, 1)"
        />
    </div>
    <div class="post-comment-write">
      <input v-model="comment" type="text" class="comment-input" placeholder="Add a comment..."/>
      <div class="comment-post" @click="postComment">Post</div>
    </div>
  </div>

  <OptionPopup
    v-if="showOption"
    :options="options"
    @modifyClicked="modifyClicked"
    @deleteClicked="deleteClicked"
    @closed="showOption = false"
    />

  <PostModifyPopup
    v-if="showModify"
    :postData="postData"
    @modified="modified"
    @closed="showModify = false"
    />
</template>

<script>

  import SvgIcon from '@jamescoyle/vue-icon'
  import { mdiHeart, mdiHeartOutline, mdiMessageReplyOutline, mdiDotsHorizontal } from '@mdi/js'

  import api from '@/utils/api'
  import endpoints from '@/utils/endpoints'
  import { timeFormat } from '@/utils/textFormat';
  import ProfileImage from '@/components/Profile/ProfileImage.vue'
  import CommentCard from '@/components/Comment/CommentCard.vue'
  import OptionPopup from '@/components/Popup/OptionPopup.vue'
  import PostModifyPopup from '@/components/Post/PostModifyPopup.vue'

  export default {
    name: "PostCard",
    emits: ["deleted"],
    components: {
      SvgIcon,
      ProfileImage,
      CommentCard,
      OptionPopup,
      PostModifyPopup,
    },
    props: {
      postData: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        commentIcon: mdiMessageReplyOutline,
        heartIcon: {
          active: mdiHeart,
          inactive: mdiHeartOutline
        },
        modifyIcon: mdiDotsHorizontal,
        showOption: false,
        showModify: false,
        expanded: false,
        comment: '',
        options: [
          {
            title: 'Modify',
            action: 'modifyClicked',
          },
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
        if (this.postData.liked > 0) return this.heartIcon.active
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
      togglePostLike () {
        const options = this.postData.liked > 0 ? endpoints.post.deleteLike(this.postData.id) : endpoints.post.addLike(this.postData.id)
        api({
          ...options,
        }).then(res => {
          this.postData.like_count += this.postData.liked > 0 ? -1 : 1
          this.postData.liked = !this.postData.liked
        }).catch(err => {
          console.log(err)
        })
      },
      postComment () {
        api({
          ...endpoints.comment.add,
          data: {
            post_id: this.postData.id,
            content: this.comment
          }
        }).then(res => {
          this.postData.comments = res.data.comment_list
          this.comment = ''
        }).catch(err => {
          console.log(err)
        })
      },
      modifyClicked () {
        this.showOption = false
        this.showModify = true
      },
      modified (content) {
        this.showModify = false
        this.postData.content = content
      },
      deleteClicked () {
        this.showOption = false
        api({
          ...endpoints.post.delete(this.postData.id)
        }).then(res => {
          this.$emit('deleted')
        }).catch(err => {
          console.log(err)
        })
      },
      userInfoClicked () {
        location.href = `/profile/${this.postData.user_id}`
      },
    },
  }

</script>

<style scoped>

  .post-card {
    width: 450px;
    background-color: white;
    border-radius: 8px;
    border: 1px solid lightgray;
    margin-bottom: 15px;
  }
  .post-card > * {
    padding: 10px;
  }

  .post-header {
    display: flex;
    align-items: center;
    gap: 7px;
    border-bottom: 1px solid rgb(240, 240, 240);
  }
  .post-header .user-info {
    flex-grow: 1;
    display: flex;
    align-items: center;
    gap: 7px;
    cursor: pointer;
  }
  .post-header .user-info .username {
    font-size: 16px;
    font-weight: 600;
    line-height: 18px;
  }
  .post-header .modify-icon {
    cursor: pointer;
  }

  .post-content .content-text {
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    margin-top: 10px;
    margin-bottom: 30px;
    white-space: break-spaces;
  }
  .post-content .content-text .username {
    cursor: pointer;
    font-weight: 700;
    margin-right: 5px;
  }
  .post-content .content-text .view-more {
    cursor: pointer;
    color: darkgray;
    margin-left: 5px;
  }
  .post-content .content-text .view-more:hover {
    color: gray;
  }
  .post-content .content-likes {
    font-size: 14px;
    font-weight: 600;
    line-height: 16px;
    margin-bottom: 7px;
  }
  .post-content .content-create-time {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
  }

  .post-footer {
    display: flex;
    align-items: center;
    gap: 5px;
    border-bottom: 1px solid rgb(240, 240, 240);
  }
  .post-footer .footer-icon {
    cursor: pointer;
  }

  .post-comments {
    border-bottom: 1px solid rgb(240, 240, 240);
  }

  .post-comment-write {
    display: flex;
  }
  .post-comment-write .comment-input {
    border: 0;
    font-size: 14px;
    width: 100%;
  }
  .post-comment-write .comment-input:focus-visible {
    outline: none;
  }
  .post-comment-write .comment-input:placeholder-shown ~ .comment-post {
    cursor: default;
    color: lightblue;
  }
  .post-comment-write .comment-post {
    cursor: pointer;
    color: blue;
    font-size: 14px;
    font-weight: 600;
  }
  .post-comment-write .comment-post:hover {
    color: darkblue;
  }

</style>