<template>
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <Author :article="article"></Author>
      </div>
    </div>

    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <div v-html="article.content" />
          <ul class="tag-list">
            <li
              class="tag-default tag-pill tag-outline ng-binding ng-scope"
              v-for="(tag, idx) in article.tagList"
              :key="idx"
            >
              {{ tag }}
            </li>
          </ul>
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <Author :article="article"></Author>
      </div>

      <Commnets :article="article" />
    </div>
  </div>
</template>

<script>
import { getArticle } from "@/api/article";
import MarkdownIt from "markdown-it";
import Author from './components/author';
import Commnets from './components/comments.vue'



export default {
  name: "articleDetail",
  components:{
    Author,
    Commnets
  
  },
  async asyncData({params}) {
    let { data } = await getArticle(params.slug);
    const article = data.article;
    const content = new MarkdownIt().render(article.body);
    return {article:Object.assign({ content }, article)};
  },
  head() {
      return {
        title: `${this.article.title} - realworld`,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: `${this.article.tagList}`
          }
        ]
      }
    }
};
</script>

<style></style>
