<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{profile.username}}</h4>
            <p>
               {{profile.bio}}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn" v-if="profile.username!==user.username">
              <i class="ion-plus-round"></i>
              &nbsp; Follow {{username}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                 <nuxt-link
                  exact
                  :class="{ active: type === 'owner' }"
                  class="nav-link"
                  :to="{ name: 'profile', query: { page: 1, type:'owner' } }"
                  >My Articles</nuxt-link
                >   

              </li>
              <li class="nav-item">
                  <nuxt-link
                  exact
                  :class="{ active: type === 'favorited' }"
                  class="nav-link"
                  :to="{ name: 'profile', query: { page: 1, type:'favorited' } }"
                  >Favorited Articles</nuxt-link
                >   
              </li>
            </ul>
          </div>

       

              <div
            class="article-preview"
            v-for="article in articles"
            :key="article.updatedAt"
          >
            <div class="article-meta">
              <a href="profile.html"><img :src="article.author.image" /></a>
              <div class="info">
                <a href="" class="author">{{ article.author.username }}</a>
                <span class="date">{{ article.updatedAt | date("MMM DD,YYYY") }}</span>
              </div>
              <button
                class="btn btn-outline-primary btn-sm pull-xs-right"
                :class="{ active: article.favorited, disabled: article.favoritePending }"
                @click="favorite(article)"
              >
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link
              :to="{ name: 'article', params: { slug: article.slug } }"
              class="preview-link"
            >
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
              <ul class="tag-list">
                <!-- ngRepeat: tag in $ctrl.article.tagList -->
                <li
                  class="tag-default tag-pill tag-outline"
                  v-for="tag in article.tagList"
                  :key="tag"
                >
                  {{ tag }}
                </li>
                <!-- end ngRepeat: tag in $ctrl.article.tagList -->
              </ul>
            </nuxt-link>
          </div>
          <nav v-if="totalPage > 1">
            <ul class="pagination">
              <!-- ngRepeat: pageNumber in $ctrl.pageRange($ctrl.totalPages) -->
              <li
                class="page-item"
                v-for="idx in totalPage"
                :key="idx"
                :class="{ active: idx === page }"
              >
                <nuxt-link
                  class="page-link ng-binding"
                  href=""
                  :to="{ name: 'home', query: { page: idx, tag: activeTag, tab: tab } }"
                  >{{ idx }}</nuxt-link
                >
              </li>
            </ul>
          </nav>
        </div>
      </div>
 
    </div>
  </div>
</template>

<script>
import { getProfile } from "@/api/profiles.js";
import {
  getArticles,
  addFavorite,
  deleteFavorite,
} from "@/api/article";
import { mapState } from "vuex";
export default {
  middleware: "authenticated",
  name: "UserProfile",
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.size);
    },
  },
  watchQuery:['type'],
  async asyncData({params,query}){
    const {username} = params;
    const {data} = await getProfile(username);
    const size = 10;
    const page = +(query.page || 1);
    const type = query.type || 'owner';
     const listParams = {
      limit: size,
      offset: size * (page - 1)
    };
   if(type=='owner'){
     listParams.author = username
   } else{
     listParams.favorited = username
   }
    const {data:list} = await getArticles({ params: listParams })
    list.articles.forEach((n) => {
      n.favoritePending = false;
    });

    return Object.assign({ username,size, page,type},data,list)
  },
   methods: {
    /**
     * @description: 收藏 or 取消收藏
     */
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
  },

};
</script>

<style></style>
