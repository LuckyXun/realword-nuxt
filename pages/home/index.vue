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
              <li class="nav-item">
                <a class="nav-link disabled" href="" v-if="user">Your Feed</a>
              </li>
              <li class="nav-item">
                <nuxt-link
                  class="nav-link"
                  :to="{ name: 'home', query: { page: idx, tag: '' } }"
                  >Global Feed</nuxt-link
                >
              </li>
              <li class="nav-item" v-if="activeTag">
                <span class="nav-link active" href=""># {{ activeTag }}</span>
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
                <span class="date">{{ article.updatedAt }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right">
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
          <nav>
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
                  :to="{ name: 'home', query: { page: idx, tag: activeTag } }"
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
                :to="{ name: 'home', query: { page: 1, tag: tag } }"
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
import { getArticles, getTags } from "@/api/home";

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
  watchQuery: ["page", "tag"],
  async asyncData({ query }) {
    const size = 10;
    const page = +(query.page || 1);
    const activeTag = query.tag || "";
    let listParams = {
      limit: size,
      offset: size * (page - 1),
      tag: activeTag,
    };
    let { data } = await getArticles({ params: listParams });
    let { data: tagsRes } = await getTags();
    return Object.assign({ size, page, activeTag }, data, tagsRes);
  },
};
</script>

<style></style>
