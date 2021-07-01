<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <nuxt-link
                  exact
                  :class="{ active: tab === 'yourFeed' }"
                  class="nav-link"
                  :to="{ name: 'home', query: { page: 1, tag: '', tab: 'yourFeed' } }"
                  >Your Feed</nuxt-link
                >
              </li>
              <li class="nav-item">
                <nuxt-link
                  exact
                  :class="{ active: tab === 'globalFeed' }"
                  class="nav-link"
                  :to="{ name: 'home', query: { page: 1, tag: '', tab: 'globalFeed' } }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="activeTag">
                <span class="nav-link" :class="{ active: tab === activeTag }" href=""
                  ># {{ activeTag }}</span
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
                <span class="date">{{ article.updatedAt|date('MMM DD,YYYY') }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{'active':article.favorited,'disabled':article.favoritePending}" @click="favorite(article)">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <a href="" class="preview-link">
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
            </a>
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

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link
                :to="{ name: 'home', query: { page: 1, tag: tag, tab: tag } }"
                class="tag-pill tag-default"
                v-for="(tag, idx) in tags"
                :key="idx"
                >{{ tag }}</nuxt-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import { getArticles, getTags, getFeedList,addFavorite,deleteFavorite } from "@/api/article";

export default {
  name: "Home",
  computed: {
    ...mapState(["user"]),
    totalPage() {
      return Math.ceil(this.articlesCount / this.size);
    },
  },
  data() {
    return {};
  },
  watchQuery: ["page", "tag", "tab"],
  async asyncData({ query }) {
    const size = 10;
    const page = +(query.page || 1);
    const tab = query.tab || "globalFeed";
    const activeTag = query.tag || "";
    const listParams = {
      limit: size,
      offset: size * (page - 1),
      tag: activeTag,
    };
    const queryFn = tab === "yourFeed" ? getFeedList : getArticles;

    const res = await Promise.all([queryFn({ params: listParams }), getTags()]);
    const data = res[0].data;
    const tagsRes = res[1].data;
    data.articles.forEach(n=>{
       n.favoritePending = false
    })
    return Object.assign({ size, page, activeTag, tab }, data, tagsRes);
  },
  methods:{
    /**
     * @description: 收藏 or 取消收藏
     */    
    async favorite(article){
       if(article.favoritePending){
          return
       }
       article.favoritePending = true
       const fun = article.favorited?deleteFavorite:addFavorite;
       let res = await fun(article.slug).catch(()=>{
         return false
       });
       console.log(res)
       if(res){
         article.favorited = !article.favorited;
         if(article.favorited){
           article.favoritesCount ++ 
         }else{
            article.favoritesCount --
         }
       }
      article.favoritePending = false

    }
  }


};
</script>

<style></style>
