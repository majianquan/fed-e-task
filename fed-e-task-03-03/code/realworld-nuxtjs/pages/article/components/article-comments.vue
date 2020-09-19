<template>
  <div class="row">
      <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form" @submit.prevent="postComment">
              <div class="card-block">
                  <textarea class="form-control" v-model="comment.body" placeholder="Write a comment..." rows="3"></textarea>
              </div>
              <div class="card-footer">
                      <nuxt-link :to="{
                          name: 'profile',
                          params: {username: article.author.username}
                        }"><img :src="article.author.image" class="comment-author-img"/>
                      </nuxt-link>
                  <button class="btn btn-sm btn-primary" type="submit">
                      Post Comment
                  </button>
              </div>
          </form>

          <div class="card" v-for="(item,index) in comments" :key="index">
              <div class="card-block">
                  <p class="card-text">
                     {{item.body}}
                  </p>
              </div>
              <div class="card-footer">
                      <nuxt-link :to="{
                          name: 'profile',
                          params: {username: item.author.username}
                        }"><img :src="item.author.image" class="comment-author-img"/>
                      </nuxt-link>
                  &nbsp;
                        <nuxt-link class="comment-author" :to="{
                          name: 'profile',
                          params: {username: item.author.username}
                        }">{{item.author.username}}
                      </nuxt-link>
                  <span class="date-posted">{{item.createdAt | data}}</span>
              </div>
          </div>

      </div>
  </div>
</template>

<script>
  import {getComments,addComment} from '@/api/articles.js'
  export default {
    name: 'ArticleComments',
    props: {
      article: {
        type: Object,
        required:true
      }
    },
    data() {
      return {
        comments: [],
        comment:  {
          body: ''
        }
      }
    },
    mounted() {
      this.initComments()
    },
    methods: {
      async initComments() {
        const {data} = await getComments(this.article.slug)
        this.comments = data.comments
      },
      async postComment() {
        await addComment(this.article.slug, {comment: this.comment})
        this.comment.body = ""
        this.initComments()
      }
    }
  }
</script>

<style scoped>

</style>
