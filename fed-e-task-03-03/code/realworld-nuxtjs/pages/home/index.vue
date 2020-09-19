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
                                  <nuxt-link
                                    class="nav-link"
                                     :class="{active: tab === 'your_feed'}"
                                    :to="{
                                        name: 'home',
                                        query: { tab:$route.query.tag },
                                    }"
                                    exact
                                    > Your Feed </nuxt-link
                                >
                            </li>
                            <li class="nav-item">
                                  <nuxt-link
                                    class="nav-link"
                                     :class="{active: tab === 'global_feed'}"
                                    :to="{
                                        name: 'home',
                                        query: { tab:$route.query.tag },
                                    }"
                                    exact
                                    >Global Feed </nuxt-link
                                >
                            </li>
                            <li v-if="tag" class="nav-item">
                                  <nuxt-link
                                    class="nav-link"
                                     :class="{active: tab === 'tag'}"
                                    :to="{
                                        name: 'home',
                                        query: { tag: tag,tab: 'tag'},
                                    }"
                                    >#{{tag}} </nuxt-link
                                >
                            </li>
                        </ul>
                    </div>

                    <div class="article-preview" v-for="(article, index) in articles" :key="index">
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
                        </nuxt-link>
                    </div>
                    <nav>
                        <ul class="pagination">
                            <li
                                class="page-item"
                                :class="{ active: item === page }"
                                v-for="(item, index) in totalPage"
                                :key="index"
                            >
                                <nuxt-link
                                    class="page-link"
                                    :to="{
                                        name: 'home',
                                        query: {
                                          page: item,
                                          tag: $route.query.tag,
                                          tab: tag}
                                        }"
                                    >{{ item }}</nuxt-link>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div class="col-md-3">
                    <div class="sidebar">
                        <p>Popular Tags</p>

                        <div class="tag-list">
                            <nuxt-link :to="{name: 'home',query: {tag:item,tab: 'tag'}}" v-for="(item,index) in tags" :key="index" class="tag-pill tag-default">{{item}}</nuxt-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getArticles ,getYourFeedArticles, addFavorite, deleteFavorite} from '@/api/articles';
import { getTags } from '@/api/tag';
import {mapState} from 'vuex'
export default {
    name: 'HomeIndex',
    async asyncData({ query }) {
        const page = Number.parseInt(query.page || 1);
        const limit = 5;
        const tab = query.tab || 'global_feed'
        const tag = query.tag
        const loadArticles = tab === 'global_feed' ? getArticles : getYourFeedArticles
        const [articlesRes,tagData] = await Promise.all(
          [ loadArticles({
            limit,
            offset: (page - 1) * limit,
        }), getTags()])
        const {articles,articlesCount} = articlesRes.data
        articles.forEach(item => item.favoriteDisabled = false)
        const { tags } = tagData.data
        return {
            articles,
            articlesCount,
            limit,
            page,
            tags,
            tab,
            tag
        }
    },
    watchQuery: ['page','tag','tab'],
    computed: {
       ...mapState(['user']),
        totalPage() {
            return Math.ceil(this.articlesCount / this.limit);
        },
    },
    methods: {
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
