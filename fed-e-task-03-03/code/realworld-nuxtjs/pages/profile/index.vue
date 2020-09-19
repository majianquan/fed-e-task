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
                        <button class="btn btn-sm btn-outline-secondary action-btn" @click="onFllowUser" :class="{active: profile.following}" v-if="profile.username !== user.username">
                            <i class="ion-plus-round"></i>
                            &nbsp; Follow {{profile.username}}
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
                                    class="nav-link"
                                     :class="{active: tab === 'my'}"
                                    :to="{
                                        name: 'profile',
                                        query: { tab: 'my' },
                                    }"
                                    exact
                                    >My Articles</nuxt-link
                                >
                            </li>
                            <li class="nav-item">
                                <nuxt-link
                                    class="nav-link"
                                     :class="{active: tab === 'favorited'}"
                                    :to="{
                                        name: 'profile',
                                        query: { tab: 'favorited' },
                                    }"
                                    exact
                                    >Favorited Articles</nuxt-link
                                >
                            </li>
                        </ul>
                    </div>

                    <div class="article-preview" v-for="(article,index) in articles" :key="index">
                        <div class="article-meta">
                            <nuxt-link
                                :to="{
                                    name: 'profile',
                                    params: {
                                        username: article.author.username,
                                    },
                                }"
                                ><img :src="article.author.image"
                            /></nuxt-link>
                            <div class="info">
                                <nuxt-link
                                    :to="{
                                        name: 'profile',
                                        params: {
                                            username: article.author.username,
                                        },
                                    }"
                                    class="author"
                                    >{{ article.author.username }}</nuxt-link
                                >
                                <span class="date">{{ article.createdAt | date }}</span>
                            </div>
                            <button
                                v-if="profile.username !== user.username"
                                class="btn btn-outline-primary btn-sm pull-xs-right"
                                :class="{ active: article.favorited }"
                                :disabled="article.favoriteDisabled"
                                @click="onFavorite(article)"
                            >
                                <i class="ion-heart"></i> {{ article.favoritesCount }}
                            </button>
                        </div>
                        <nuxt-link :to="{ name: 'article', params: { slug: article.slug } }" class="preview-link">
                            <h1>{{ article.title }}</h1>
                            <p>{{ article.description }}</p>
                            <span>Read more...</span>
                              <ul class="tag-list">
                                <li v-for="(tag,idx) in article.tagList" :key="`${index}_${idx}`" class="tag-default tag-pill tag-outline">{{tag}}</li>
                            </ul>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {getProfile, followUser, unFollowUser} from '@/api/profile.js'
import { getArticles, addFavorite, deleteFavorite} from '@/api/articles';
import {mapState} from 'vuex'
export default {
    // middleware: 'authenenticated',
    name: 'Profile',
    async asyncData({params,query}) {
      const {data} = await getProfile(params.username)
      const tab = query.tab || 'my'
      let articles = []
      if(tab === 'my') {
        const {data: myArticles} = await getArticles({author: params.username})
        articles = myArticles.articles
      } else {
        const {data: favoritedArticles} = await getArticles({favorited: params.username})
        articles = favoritedArticles.articles
      }
      return {
        profile :data.profile,
        tab,
        articles
      }
    },
    watchQuery: ['tab'],
    computed: {
      ...mapState(['user'])
    },
    methods: {
      async onFllowUser() {
        if(this.profile.following) {
          await unFollowUser(this.profile.username)
          this.profile.following = false
        } else {
          await followUser(this.profile.username)
          this.profile.following = true
        }
      },
      async onFavorite(article) {
        article.favoriteDisabled = true
        if(article.favorited) {
          await deleteFavorite(article.slug)
          article.favorited = false
          article.favoritesCount -= 1
        } else {
          await addFavorite(article.slug)
          article.favorited = true
          article.favoritesCount += 1
        }
        article.favoriteDisabled = false
      }
    }

};
</script>

<style scoped></style>
