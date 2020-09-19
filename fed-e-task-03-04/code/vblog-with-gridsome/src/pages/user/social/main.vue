<template>
    <Layout>
        <section>
            <div>
                <div
                    class="el-card is-never-shadow"
                    style="min-height: 400px; margin-bottom: 20px; padding: 0px 0px 20px;"
                >
                    <!---->
                    <div class="el-card__body">
                        <div class="el-tabs el-tabs--card el-tabs--top">
                            <div class="el-tabs__header is-top">
                                <div class="el-tabs__nav-wrap is-top">
                                    <div class="el-tabs__nav-scroll">
                                        <div role="tablist" class="el-tabs__nav" style="transform: translateX(0px);">
                                            <div
                                                id="tab-followers"
                                                aria-controls="pane-followers"
                                                role="tab"
                                                tabindex="0"
                                                class="el-tabs__item is-top is-active"
                                                aria-selected="true"
                                            >
                                                粉丝 0
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="el-tabs__content">
                                <div
                                    role="tabpanel"
                                    id="pane-followers"
                                    aria-labelledby="tab-followers"
                                    class="el-tab-pane"
                                    style="padding: 5px;"
                                >
                                    <div class="">
                                        <div>
                                            <div class="el-row" style="min-height: 200px;">
                                                <div class="el-col el-col-8" style="padding: 10px;" v-for="(fan,index) in fans" :key="index">
                                                    <div
                                                        class="el-card is-hover-shadow"
                                                        style="font-size: 13px; color: rgb(96, 98, 102); line-height: 20px;"
                                                    >
                                                        <!---->
                                                        <div class="el-card__body">
                                                            <i class="el-icon-star-off"></i>
                                                            <a style="text-decoration: none; cursor: pointer;"
                                                                >{{fan.node.name}}</a
                                                            >
                                                            <br />
                                                            <i class="el-icon-message"></i>
                                                            <a
                                                                href="https://github.com/lililiwj"
                                                                target="_blank"
                                                                style="text-decoration: none; cursor: pointer;"
                                                                >TA的主页</a
                                                            >
                                                            <br />
                                                            <img
                                                                :src="`http://localhost:1337${fan.node.avatar.url}`"
                                                                style="width: 100%; border-radius: 5px; margin-top: 5px;"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>



                                            </div>
                                            <div style="text-align: center; margin-top: 10px;">
                                                <div class="el-pagination is-background">
                                                    <button type="button" disabled="disabled" class="btn-prev">
                                                        <i class="el-icon el-icon-arrow-left"></i>
                                                    </button>
                                                    <Pager :info="$page.fans.pageInfo" />
                                                    <button type="button" class="btn-next">
                                                        <i class="el-icon el-icon-arrow-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div
                                    role="tabpanel"
                                    id="pane-following"
                                    aria-labelledby="tab-following"
                                    class="el-tab-pane"
                                    style="padding: 5px; display: none;"
                                    aria-hidden="true"
                                >
                                    <div class="">
                                        <div>
                                            <div class="el-row" style="min-height: 200px;">
                                                <div class="el-col el-col-8" style="padding: 10px;">
                                                    <div
                                                        class="el-card is-hover-shadow"
                                                        style="font-size: 13px; color: rgb(96, 98, 102); line-height: 20px;"
                                                    >
                                                        <!---->
                                                        <div class="el-card__body">
                                                            <i class="el-icon-star-off"></i>
                                                            <a style="text-decoration: none; cursor: pointer;"
                                                                >kazupon</a
                                                            >
                                                            <br />
                                                            <i class="el-icon-message"></i>
                                                            <a
                                                                href="https://github.com/kazupon"
                                                                target="_blank"
                                                                style="text-decoration: none; cursor: pointer;"
                                                                >TA的主页</a
                                                            >
                                                            <br />
                                                            <img
                                                                src="https://avatars1.githubusercontent.com/u/72989?v=4"
                                                                style="width: 100%; border-radius: 5px; margin-top: 5px;"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="el-col el-col-8" style="padding: 10px;">
                                                    <div
                                                        class="el-card is-hover-shadow"
                                                        style="font-size: 13px; color: rgb(96, 98, 102); line-height: 20px;"
                                                    >
                                                        <!---->
                                                        <div class="el-card__body">
                                                            <i class="el-icon-star-off"></i>
                                                            <a style="text-decoration: none; cursor: pointer;"
                                                                >Jinjiang</a
                                                            >
                                                            <br />
                                                            <i class="el-icon-message"></i>
                                                            <a
                                                                href="https://github.com/Jinjiang"
                                                                target="_blank"
                                                                style="text-decoration: none; cursor: pointer;"
                                                                >TA的主页</a
                                                            >
                                                            <br />
                                                            <img
                                                                src="https://avatars1.githubusercontent.com/u/206848?v=4"
                                                                style="width: 100%; border-radius: 5px; margin-top: 5px;"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="el-col el-col-8" style="padding: 10px;">
                                                    <div
                                                        class="el-card is-hover-shadow"
                                                        style="font-size: 13px; color: rgb(96, 98, 102); line-height: 20px;"
                                                    >
                                                        <!---->
                                                        <div class="el-card__body">
                                                            <i class="el-icon-star-off"></i>
                                                            <a style="text-decoration: none; cursor: pointer;"
                                                                >Justineo</a
                                                            >
                                                            <br />
                                                            <i class="el-icon-message"></i>
                                                            <a
                                                                href="https://github.com/Justineo"
                                                                target="_blank"
                                                                style="text-decoration: none; cursor: pointer;"
                                                                >TA的主页</a
                                                            >
                                                            <br />
                                                            <img
                                                                src="https://avatars2.githubusercontent.com/u/1726061?v=4"
                                                                style="width: 100%; border-radius: 5px; margin-top: 5px;"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="el-col el-col-8" style="padding: 10px;">
                                                    <div
                                                        class="el-card is-hover-shadow"
                                                        style="font-size: 13px; color: rgb(96, 98, 102); line-height: 20px;"
                                                    >
                                                        <!---->
                                                        <div class="el-card__body">
                                                            <i class="el-icon-star-off"></i>
                                                            <a style="text-decoration: none; cursor: pointer;"
                                                                >chrisvfritz</a
                                                            >
                                                            <br />
                                                            <i class="el-icon-message"></i>
                                                            <a
                                                                href="https://github.com/chrisvfritz"
                                                                target="_blank"
                                                                style="text-decoration: none; cursor: pointer;"
                                                                >TA的主页</a
                                                            >
                                                            <br />
                                                            <img
                                                                src="https://avatars2.githubusercontent.com/u/2327556?v=4"
                                                                style="width: 100%; border-radius: 5px; margin-top: 5px;"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="el-col el-col-8" style="padding: 10px;">
                                                    <div
                                                        class="el-card is-hover-shadow"
                                                        style="font-size: 13px; color: rgb(96, 98, 102); line-height: 20px;"
                                                    >
                                                        <!---->
                                                        <div class="el-card__body">
                                                            <i class="el-icon-star-off"></i>
                                                            <a style="text-decoration: none; cursor: pointer;">defcc</a>
                                                            <br />
                                                            <i class="el-icon-message"></i>
                                                            <a
                                                                href="https://github.com/defcc"
                                                                target="_blank"
                                                                style="text-decoration: none; cursor: pointer;"
                                                                >TA的主页</a
                                                            >
                                                            <br />
                                                            <img
                                                                src="https://avatars1.githubusercontent.com/u/2603918?v=4"
                                                                style="width: 100%; border-radius: 5px; margin-top: 5px;"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="el-col el-col-8" style="padding: 10px;">
                                                    <div
                                                        class="el-card is-hover-shadow"
                                                        style="font-size: 13px; color: rgb(96, 98, 102); line-height: 20px;"
                                                    >
                                                        <!---->
                                                        <div class="el-card__body">
                                                            <i class="el-icon-star-off"></i>
                                                            <a style="text-decoration: none; cursor: pointer;"
                                                                >Akryum</a
                                                            >
                                                            <br />
                                                            <i class="el-icon-message"></i>
                                                            <a
                                                                href="https://github.com/Akryum"
                                                                target="_blank"
                                                                style="text-decoration: none; cursor: pointer;"
                                                                >TA的主页</a
                                                            >
                                                            <br />
                                                            <img
                                                                src="https://avatars0.githubusercontent.com/u/2798204?v=4"
                                                                style="width: 100%; border-radius: 5px; margin-top: 5px;"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="el-col el-col-8" style="padding: 10px;">
                                                    <div
                                                        class="el-card is-hover-shadow"
                                                        style="font-size: 13px; color: rgb(96, 98, 102); line-height: 20px;"
                                                    >
                                                        <!---->
                                                        <div class="el-card__body">
                                                            <i class="el-icon-star-off"></i>
                                                            <a style="text-decoration: none; cursor: pointer;"
                                                                >jkzing</a
                                                            >
                                                            <br />
                                                            <i class="el-icon-message"></i>
                                                            <a
                                                                href="https://github.com/jkzing"
                                                                target="_blank"
                                                                style="text-decoration: none; cursor: pointer;"
                                                                >TA的主页</a
                                                            >
                                                            <br />
                                                            <img
                                                                src="https://avatars1.githubusercontent.com/u/2851517?v=4"
                                                                style="width: 100%; border-radius: 5px; margin-top: 5px;"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="el-col el-col-8" style="padding: 10px;">
                                                    <div
                                                        class="el-card is-hover-shadow"
                                                        style="font-size: 13px; color: rgb(96, 98, 102); line-height: 20px;"
                                                    >
                                                        <!---->
                                                        <div class="el-card__body">
                                                            <i class="el-icon-star-off"></i>
                                                            <a style="text-decoration: none; cursor: pointer;"
                                                                >HerringtonDarkholme</a
                                                            >
                                                            <br />
                                                            <i class="el-icon-message"></i>
                                                            <a
                                                                href="https://github.com/HerringtonDarkholme"
                                                                target="_blank"
                                                                style="text-decoration: none; cursor: pointer;"
                                                                >TA的主页</a
                                                            >
                                                            <br />
                                                            <img
                                                                src="https://avatars2.githubusercontent.com/u/2883231?v=4"
                                                                style="width: 100%; border-radius: 5px; margin-top: 5px;"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="el-col el-col-8" style="padding: 10px;">
                                                    <div
                                                        class="el-card is-hover-shadow"
                                                        style="font-size: 13px; color: rgb(96, 98, 102); line-height: 20px;"
                                                    >
                                                        <!---->
                                                        <div class="el-card__body">
                                                            <i class="el-icon-star-off"></i>
                                                            <a style="text-decoration: none; cursor: pointer;"
                                                                >javoski</a
                                                            >
                                                            <br />
                                                            <i class="el-icon-message"></i>
                                                            <a
                                                                href="https://github.com/javoski"
                                                                target="_blank"
                                                                style="text-decoration: none; cursor: pointer;"
                                                                >TA的主页</a
                                                            >
                                                            <br />
                                                            <img
                                                                src="https://avatars0.githubusercontent.com/u/5391892?v=4"
                                                                style="width: 100%; border-radius: 5px; margin-top: 5px;"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="text-align: center; margin-top: 10px;">
                                                <div class="el-pagination is-background">
                                                    <button type="button" disabled="disabled" class="btn-prev">
                                                        <i class="el-icon el-icon-arrow-left"></i>
                                                    </button>
                                                    <ul class="el-pager">
                                                        <li class="number active">1</li>
                                                        <!----><!---->
                                                        <li class="number">2</li>
                                                    </ul>
                                                    <button type="button" class="btn-next">
                                                        <i class="el-icon el-icon-arrow-right"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="el-loading-mask" style="display: none;">
                                            <div class="el-loading-spinner">
                                                <svg viewBox="25 25 50 50" class="circular">
                                                    <circle
                                                        cx="50"
                                                        cy="50"
                                                        r="20"
                                                        fill="none"
                                                        class="path"
                                                    ></circle></svg
                                                ><!---->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
</template>
<page-query>
    query($page: Int) {
        fans: allStrapiFans(perPage: 2,page: $page) {
                pageInfo {
                    totalPages
                    currentPage
                }
                totalCount
                edges {
                    node {
                        name
                        avatar {
                        url
                        }
                    }
            }
        }
    }
</page-query>
<script>
import { Pager } from 'gridsome';
export default {
    components: {
        Pager,
    },
    computed: {
        fans() {
            return this.$page.fans.edges
        }
    }
}
</script>