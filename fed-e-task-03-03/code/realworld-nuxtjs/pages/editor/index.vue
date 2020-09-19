<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <form @submit.prevent="publishArticle">
                        <fieldset>
                            <fieldset class="form-group">
                                <input type="text" v-model="article.title" class="form-control form-control-lg" placeholder="Article Title" />
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" v-model="article.description" class="form-control" placeholder="What's this article about?" />
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea
                                    v-model="article.body"
                                    class="form-control"
                                    rows="8"
                                    placeholder="Write your article (in markdown)"
                                ></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" class="form-control" placeholder="Enter tags" />
                                <div class="tag-list"></div>
                            </fieldset>
                            <button class="btn btn-lg pull-xs-right btn-primary" type="submit">
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
import { createArticle } from '@/api/articles.js'
export default {
    // middleware: 'authenenticated',
    name: 'EditArticle',
    data() {
      return {
          article: {
            title: "",
            description: "",
            body: "",
            tagList: ""
          }
      }
    },
    methods: {
      async publishArticle() {
        const article = JSON.parse(JSON.stringify(this.article))
        if(article.tagList.trim()) {
          article.tagList = article.tagList.split(",")
        }
        await createArticle({article: this.article})
        this.$router.push('/')
      }
    }
};
</script>

<style scoped></style>
