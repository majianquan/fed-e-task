<template>
    <Layout>
        <section>
            <div class="" style="min-height: 600px;">
                <div class="el-card is-never-shadow" style="min-height: 400px;">
                    <div class="el-card__header">
                        <div><span>{{new_message.update_time}}</span></div>
                    </div>
                    <div class="el-card__body">
                        <div style="font-size: 0.9rem; line-height: 1.5; color: rgb(96, 108, 113);">
                            {{new_message.update_time}}
                            <br />
                            {{new_message.create_time}}
                        </div>
                        <div v-html="mdToHtml(new_message.content)"></div>
                        <div class="markdown-body" style="padding-top: 20px;">
                            <p>
                                <img :src="`http://localhost:1337/${new_message.resource.url}`" alt="">
                            </p>
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
        new_message:allStrapiNew {
            edges {
                node {
                    create_time
                    update_time
                    public_time
                    content
                    resource {
                        url
                    }
                }
            }
        }
    }
</page-query>
<script>
import MarkdownIt from 'markdown-it';
const md = new MarkdownIt();
export default {
    computed: {
        new_message() {
            return this.$page.new_message.edges[0].node
        }
    },
    methods: {
        mdToHtml(mardown) {
            return md.render(mardown);
        },
    },
};
</script>
