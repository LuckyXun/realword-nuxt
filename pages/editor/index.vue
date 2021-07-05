<!--
 * @Author: XunL
 * @Date: 2021-06-23 02:30:27
 * @LastEditTime: 2021-07-05 22:11:01
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
                  v-model="article.tagList"
                />
                <div class="tag-list"></div>
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
import { publishArticle } from "@/api/article.js";
import { mapState } from "vuex";

export default {
  middleware: "authenticated",
  data() {
    return {
      article: {
        title: "",
        description: "",
        body: "",
        tagList: "",
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    async submit() {
      //TODO 判断的是发布还是修改的逻辑
      const params = Object.assign({}, this.article);
      params.tagList = params.tagList.split(",");
      const { status } = await publishArticle(params);
      if (status === 200) {
        this.$router.push(`/profile/${this.user.username}`);
      }
    },
  },
};
</script>

<style></style>
