<template>
    <Layout>
        <section>
            <div style="min-height: 600px;" class="">
                <div>
                    <div class="el-card is-hover-shadow" style="margin-bottom: 20px;" v-for="project in projects" :key="project.id">
                        <div class="el-card__header">
                            <div>
                                <div class="el-row">
                                    <div class="el-col el-col-16">
                                        <span
                                            ><a style="text-decoration: none; cursor: pointer;"
                                                ><i class="el-icon-service"></i>&nbsp;&nbsp; {{project.node.project_name}}
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
                                                <!----><i class="el-icon-back"></i><span>前往GitHub</span>
                                            </button>
                                            <button
                                                type="button"
                                                class="el-button el-button--text"
                                                style="padding: 3px 0px;"
                                            >
                                                <!----><i class="el-icon-share"></i
                                                ><!---->
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="el-card__body">
                            <div style="font-size: 0.9rem; line-height: 1.5; color: rgb(96, 108, 113);">
                                {{project.node.full_update_time}}
                            </div>
                            <div
                                style="font-size: 1.1rem; line-height: 1.5; color: rgb(48, 49, 51); padding: 10px 0px 0px;"
                            >
                                {{project.node.project_detail}}
                            </div>
                            <div style="font-size: 1.1rem; color: rgb(48, 49, 51); padding: 10px 0px 0px;">
                                <div class="el-row">
                                    <div class="el-col el-col-16" style="padding-top: 5px;">
                                        <i
                                            class="el-icon-star-off el-tooltip"
                                            aria-describedby="el-tooltip-3255"
                                            tabindex="0"
                                            style="margin: 0px 5px 0px 0px;"
                                        ></i>
                                        {{project.node.fav_num}}
                                        <i
                                            class="el-icon-view el-tooltip"
                                            aria-describedby="el-tooltip-7253"
                                            tabindex="0"
                                            style="margin: 0px 5px 0px 15px;"
                                        ></i>
                                        {{project.node.focus_num}}
                                        <i
                                            class="el-icon-bell el-tooltip"
                                            aria-describedby="el-tooltip-8355"
                                            tabindex="0"
                                            style="margin: 0px 5px 0px 15px;"
                                        ></i>
                                        {{project.node.sub_num}}
                                    </div>
                                    <div class="el-col el-col-8" style="text-align: right;">
                                        <span class="el-tag el-tag--danger el-tag--small">MIT<!----></span>
                                        <span class="el-tag el-tag--success el-tag--small">JavaScript<!----></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style="text-align: center;">
                        <div class="el-pagination is-background">
                            <button type="button" disabled="disabled" class="btn-prev">
                                <i class="el-icon el-icon-arrow-left"></i>
                            </button>
                            <Pager :info="$page.projects.pageInfo" />
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
query {
  projects:allStrapiProject {
    pageInfo {
        totalPages
        currentPage
    }
    edges {
      node {
        id
        project_name
        full_update_time
        project_detail
        fav_num
        focus_num
        sub_num
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
        projects() {
            return this.$page.projects.edges
        }
    }
}
</script>