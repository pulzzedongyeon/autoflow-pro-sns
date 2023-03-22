export default {
  user: {
    info: { url: `/auth/user`, method: 'GET' },
    register: { url: `/auth/user`, method: 'POST' },
    modify: { url: `/auth/user`, method: 'PATCH' },
    delete: { url: `/auth/user`, method: 'DELETE' },
    login: { url: `/auth/user/login`, method: 'POST' },
    findPassword: { url: `/auth/user/find-pw`, method: 'POST' },
  },
  post: {
    list: { url: `/post`, method: 'GET' },
    add: { url: `/post`, method: 'POST' },
    modify: (post_id) => {
      return { url: `/post/${post_id}`, method: 'PATCH' }
    },
    delete: (post_id) => {
      return { url: `/post/${post_id}`, method: 'DELETE' }
    },
    addLike: (post_id) => {
      return { url: `/post/${post_id}/like`, method: 'POST' }
    },
    deleteLike: (post_id) => {
      return { url: `/post/${post_id}/like`, method: 'DELETE' }
    },
  },
  comment: {
    add: { url: `/comment`, method: 'POST' },
    delete: (comment_id) => {
      return { url: `/comment/${comment_id}`, method: 'DELETE' }
    },
    addLike: (comment_id) => {
      return { url: `/comment/${comment_id}/like`, method: 'POST' }
    },
    deleteLike: (comment_id) => {
      return { url: `/comment/${comment_id}/like`, method: 'DELETE' }
    },
  },
  profile: {
    info: (user_id) => {
      return { url: `/profile/${user_id}`, method: 'GET' }
    },
    posts: (user_id) => {
      return { url: `/profile/${user_id}/post`, method: 'GET' }
    },
    followers: (user_id) => {
      return { url: `/profile/${user_id}/followers`, method: 'GET' }
    },
    following: (user_id) => {
      return { url: `/profile/${user_id}/following`, method: 'GET' }
    },
    addFollow: (user_id) => {
      return { url: `/profile/${user_id}/follow`, method: 'POST' }
    },
    deleteFollow: (user_id) => {
      return { url: `/profile/${user_id}/follow`, method: 'DELETE' }
    },
  },
}