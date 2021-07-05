<!--
 * @Author: XunL
 * @Date: 2021-07-04 14:00:18
 * @LastEditTime: 2021-07-05 16:20:31
 * @Description: 文章作者信息
-->

<template>
  <div class="article-meta">
    <a href=""><img :src="author.image" /></a>
    <div class="info">
      <a href="" class="author">{{author.username}}</a>
      <span class="date">{{ article.createdAt | date("MMM D,YYYY") }}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary" :class="{'active':author.following}" @click="follow(author)">
      <i class="ion-plus-round"></i>
      &nbsp; Follow {{author.username}}
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary" :class="{'active':article.favorited}" @click="favorite(article)">
      <i class="ion-heart"></i>
      &nbsp; Favorite Post <span class="counter" >{{article.favoritesCount}}</span>
    </button>
    
  </div>
</template>

<script>
import { addFavorite,
  deleteFavorite, } from "@/api/article";
import {followUser,unFollowUser} from '@/api/user'

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
    }
  },
  methods:{
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
