<template>
    <Layout>
        <section>
            <div style="min-height: 600px;" class="">
                <div>
                    <div class="el-card is-hover-shadow" style="margin-bottom: 20px;" v-for="(blog) in blogs" :key="blog.node.id">
                        <div class="el-card__header">
                            <div>
                                <div class="el-row">
                                    <div class="el-col el-col-16">
                                        <span
                                            ><a style="text-decoration: none; cursor: pointer;"
                                                ><i class="el-icon-edit-outline"></i>&nbsp;&nbsp; {{blog.node.update_time}}
                                            </a></span
                                        >
                                    </div>
                                    <div class="el-col el-col-8">
                                        <div style="text-align: right;">
                                            <button
                                                type="button"
                                                class="el-button el-button--text"
                                                style="padding: 3px 0px;"
                                            >
                                                <i class="el-icon-share"></i>
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="el-card__body">
                            <div style="font-size: 0.9rem; line-height: 1.5; color: rgb(96, 108, 113);">
                                {{blog.node.full_update_time}}
                            </div>
                            <div
                                style="font-size: 1.1rem; line-height: 1.5; color: rgb(48, 49, 51); padding: 10px 0px 0px;"
                            >
                                {{blog.node.title}}
                            </div>
                        </div>
                    </div>

                    <div style="text-align: center;">
                        <div class="el-pagination is-background">
                            <button type="button" disabled="disabled" class="btn-prev">
                                <i class="el-icon el-icon-arrow-left"></i>
                            </button>
                            <Pager :info="$page.blogs.pageInfo" />
                            <button type="button" class="btn-next"><i class="el-icon el-icon-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
                <!---->
                <div class="el-loading-mask" style="display: none;">
                    <div class="el-loading-spinner">
                        <svg viewBox="25 25 50 50" class="circular">
                            <circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg
                        ><!---->
                    </div>
                </div>
            </div>
        </section>
    </Layout>
</template>
<page-query>
query($page: Int) {
  blogs:allStrapiBlog(perPage: 2,page: $page) {
    pageInfo {
        totalPages
        currentPage
    }
    edges {
      node {
      	id
        title
        update_time
        full_update_time
      }
    }
  }
}
</page-query>
<script>
import { Pager } from 'gridsome';
export default {
    components: {
        Pager
    },
    computed: {
        blogs() {
            return this.$page.blogs.edges
        }
    }
}
</script>