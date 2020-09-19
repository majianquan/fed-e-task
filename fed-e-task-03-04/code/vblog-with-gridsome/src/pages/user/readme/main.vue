<template>
    <Layout>
        <section>
            <div style="min-height: 600px;" class="">
                <div class="el-card is-never-shadow">
                    <!---->
                    <div class="el-card__body">
                        <div style="" class="markdown-body" v-html="mdToHtml(readme.content)">
                        </div>
                    </div>
                </div>
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
        readme:allStrapiReadme {
            edges {
            node {
                content
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
        readme() {
            return this.$page.readme.edges[0].node
        }
    },
    methods: {
        mdToHtml(mardown) {
            return md.render(mardown);
        },
    },
};
</script>
