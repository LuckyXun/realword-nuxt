<!--
 * @Author: XunL
 * @Date: 2021-06-23 02:30:27
 * @LastEditTime: 2021-07-07 17:25:05
 * @Description: file content
-->
<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article Title"
                  v-model="article.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="What's this article about?"
                  v-model="article.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control"
                  rows="8"
                  placeholder="Write your article (in markdown)"
                  v-model="article.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter tags"
                  v-model="inputTag"
                  @keypress.enter="addTag"
                />
              <div class="tag-list">
                <template v-for="(tag,idx) in article.tagList">
                  <span  class="tag-default tag-pill ng-binding ng-scope" :key="idx">
                  <i class="ion-close-round" @click="removeTag(idx)"></i>
                  {{tag}}
                </span>
                </template>
              </div>
              </fieldset>
              <button
                class="btn btn-lg pull-xs-right btn-primary"
                type="button"
                @click.prevent="submit"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { publishArticle,getArticle,updateArticle } from "@/api/article.js";
import { mapState } from "vuex";

export default {
  middleware: "authenticated",
  data() {
    return {
      inputTag:""
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  async asyncData({params}){
     const slug = params.slug;
     const data = {
       
      article: {
        title: "",
        description: "",
        body: "",
        tagList: [],
      },
    }
    if(slug){
      const res = await getArticle(slug);
      Object.assign(data.article,res.data.article)
    }     
    data.slug = slug
    return data
  },


  methods: {
    addTag(){
      this.article.tagList.push(this.inputTag);
      this.inputTag = ""
    },
    removeTag(idx){
      this.article.tagList.splice(idx,1)
    },
    async submit() {
      //TODO 判断的是发布还是修改的逻辑
      const params = Object.assign({}, this.article);
      

      const { status } = this.slug?await updateArticle(this.slug,{article:params}): await publishArticle({article:params});
      if (status === 200) {
        this.$router.push(`/profile/${this.user.username}`);
      }
    },
  },
};
</script>

<style></style>
