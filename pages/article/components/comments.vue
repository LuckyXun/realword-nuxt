<!--
 * @Author: XunL
 * @Description: 文章详情-评论列表
-->
<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <form class="card comment-form" v-if="user">
        <div class="card-block">
          <textarea
            class="form-control"
            v-model="inputComment"
            placeholder="Write a comment..."
            rows="3"
          ></textarea>
        </div>
        <div class="card-footer">
          <img :src="user.image" class="comment-author-img" />
          <button class="btn btn-sm btn-primary" @click.prevent="postComment">
            Post Comment
          </button>
        </div>
      </form>
      <p v-else>
        <nuxt-link to="/login">Sign in</nuxt-link> or
        <nuxt-link to="/register">sign up</nuxt-link> to add comments on this article.
      </p>

      <div class="card" v-for="(comment, idx) in comments" :key="idx">
        <div class="card-block">
          <p class="card-text">
            {{ comment.body }}
          </p>
        </div>
        <div class="card-footer">
          <nuxt-link  :to="{name:'profile',params:{username:comment.author.username}}" class="comment-author">
            <img :src="comment.author.image" class="comment-author-img" />
          </nuxt-link>
          &nbsp;
          <nuxt-link :to="{name:'profile',params:{username:comment.author.username}}"  class="comment-author">{{ comment.author.username }}</nuxt-link>
          <span class="date-posted">{{ comment.updatedAt | date("MMM DD,YYYY") }}</span>
          <span class="mod-options">
            <i
              class="ion-trash-a"
              @click="deleteComment(comment, idx)"
              v-if="user && comment.author.username === user.username"
            ></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, deleteComment, addComment } from "@/api/comment";
import { mapState } from "vuex";

export default {
  name: "comments",
  props: {
    article: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      inputComment: "",
      comments: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  async created() {
    this.getComments();
  },
  methods: {
    async getComments() {
      const { data } = await getComments(this.article.slug);
      this.comments = data.comments;
    },
    async postComment() {
      const { status } = await addComment(this.article.slug, {
        comment: {
          body: this.inputComment,
        },
      });
      if (status === 200) {
        this.inputComment = "";
        this.getComments();
      }
    },
    async deleteComment(comment, idx) {
      var r = confirm("确定删除!");
      if (r == true) {
        const { status } = await deleteComment(this.article.slug, comment.id);
        if (status === 200) {
          this.comments.splice(idx, 1);
        }
      }
    },
  },
};
</script>

<style></style>
