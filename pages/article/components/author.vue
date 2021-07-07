<!--
 * @Author: XunL
 * @Date: 2021-07-04 14:00:18
 * @LastEditTime: 2021-07-07 14:25:20
 * @Description: 文章作者信息
-->

<template>
  <div class="article-meta">
    <nuxt-link :to="{name:'profile',params:{username:author.username}}"><img :src="author.image" /></nuxt-link>
    <div class="info">
    <nuxt-link :to="{name:'profile',params:{username:author.username}}" class="author">{{author.username}}</nuxt-link>
      <span class="date">{{ article.createdAt | date("MMM D,YYYY") }}</span>
    </div>
    <template v-if="author.username!==user.username">
    <button class="btn btn-sm btn-outline-secondary" :class="{'active':author.following}" @click="follow(author)">
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{author.username}}
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary" :class="{'active':article.favorited}" @click="favorite(article)">
      <i class="ion-heart"></i>
      &nbsp; Favorite Post <span class="counter" >{{article.favoritesCount}}</span>
    </button>
    </template>
    <template v-else>
    <a class="btn btn-outline-secondary btn-sm" @click="edit">
      <i class="ion-edit"></i> Edit Article
    </a>

    <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
      <i class="ion-trash-a"></i> Delete Article
    </button>
    </template>
  
  </div>
</template>
<script>
import { addFavorite,
  deleteFavorite,deleteArticle } from "@/api/article";
import {followUser,unFollowUser} from '@/api/user'
import { mapState } from "vuex";
export default {
  name: "author",
  props:{
    article:{
      type:Object,
      require:true
    }
  },
  computed:{
    author(){
      return this.article.author
    },
    ...mapState(['user'])
  },
  methods:{
    edit(){
      this.$router.push('/editor/'+this.article.slug)
    },
    async deleteArticle(){
      let res = await deleteArticle(this.article.slug).catch(() => {
        return false;
      });
      if(res){
        this.$router.back();
      }
    },
    async favorite(article) {
      if (article.favoritePending) {
        return;
      }
      article.favoritePending = true;
      const fun = article.favorited ? deleteFavorite : addFavorite;
      let res = await fun(article.slug).catch(() => {
        return false;
      });
      if (res) {
        article.favorited = !article.favorited;
        if (article.favorited) {
          article.favoritesCount++;
        } else {
          article.favoritesCount--;
        }
      }
      article.favoritePending = false;
    },
    async follow(author){
      if (author.pending) {
        return;
      }
      author.pending = true;
      const fun = author.following ? unFollowUser : followUser;
      let res = await fun(author.username).catch(() => {
        return false;
      });
      if (res) {
        author.following = !author.following;
        
      }
      author.pending = false;
    }
  }
};
</script>

<style></style>
