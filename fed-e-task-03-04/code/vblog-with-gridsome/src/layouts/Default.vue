<template>
    <div class="layout">
        <div>
            <section
                class="page-header"
                style="
                    background-image: linear-gradient(120deg, rgb(38, 144, 249), rgb(252, 45, 45));
                    color: rgb(255, 255, 255);
                "
            >
                <div style="position: absolute; top: 20px; right: 20px; z-index: 2">
                    <button
                        type="button"
                        class="el-button el-tooltip el-button--default is-circle"
                        aria-describedby="el-tooltip-4667"
                        tabindex="0"
                    >
                        <!----><i class="el-icon-rank"></i
                        ><!---->
                    </button>
                </div>
                <div style="position: absolute; top: 168px; left: 787px; z-index: 1">
                    <font style="font-size: 33px; color: rgb(255, 255, 255)"><b>♪</b></font>
                </div>
                <div style="position: absolute; top: 256px; left: 716px; z-index: 1">
                    <font style="font-size: 27px; color: rgb(255, 255, 255)"><b>♪</b></font>
                </div>
                <div style="position: absolute; top: 43px; left: 1647px; z-index: 1">
                    <font style="font-size: 33px; color: rgb(255, 255, 255)"><b>♪</b></font>
                </div>
                <div style="position: absolute; top: 150px; left: 1512px; z-index: 1">
                    <font style="font-size: 26px; color: rgb(255, 255, 255)"><b>♪</b></font>
                </div>
                <div style="position: absolute; top: 193px; left: 641px; z-index: 1">
                    <font style="font-size: 29px; color: rgb(255, 255, 255)"><b>♪</b></font>
                </div>
                <div style="position: absolute; top: 274px; left: 1315px; z-index: 1">
                    <font style="font-size: 26px; color: rgb(255, 255, 255)"><b>♪</b></font>
                </div>
                <div style="position: absolute; top: 128px; left: 322px; z-index: 1">
                    <font style="font-size: 33px; color: rgb(255, 255, 255)"><b>♪</b></font>
                </div>
                <div style="position: absolute; top: 115px; left: 497px; z-index: 1">
                    <font style="font-size: 20px; color: rgb(255, 255, 255)"><b>♪</b></font>
                </div>
                <div style="position: absolute; top: 101px; left: 1369px; z-index: 1">
                    <font style="font-size: 21px; color: rgb(255, 255, 255)"><b>♪</b></font>
                </div>
                <div style="position: absolute; top: 139px; left: 678px; z-index: 1">
                    <font style="font-size: 26px; color: rgb(255, 255, 255)"><b>♪</b></font>
                </div>
                <div style="position: absolute; top: 215px; left: 724px; z-index: 1">
                    <font style="font-size: 32px; color: rgb(255, 255, 255)"><b>♪</b></font>
                </div>
                <div style="position: absolute; top: 150px; left: 1500px; z-index: 1">
                    <font style="font-size: 23px; color: rgb(255, 255, 255)"><b>♪</b></font>
                </div>
                <h1 class="project-name">{{name_en}}</h1>
                <h2 class="project-tagline">欢迎来到{{name_ch}}的个人博客。</h2>
                <a :href="github_url" target="_blank" class="btn">GitHub主页</a>
                <a :href="github_url" target="_blank" class="btn">博客源码</a>
            </section>
            <div style="position: relative; z-index: 2; margin: -30px auto auto; width: 64rem">
                <div class="el-card is-never-shadow">
                    <!---->
                    <div class="el-card__body" style="padding: 0px">
                        <div class="el-row">
                            <div class="el-col el-col-10">
                                <ul role="menubar" class="el-menu--horizontal el-menu">
                                    <li role="menuitem" aria-haspopup="true" class="el-submenu" tabindex="0">
                                        <div class="el-submenu__title" style="border-bottom-color: transparent">
                                            了解博主<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>
                                        </div>
                                    </li>
                                    <li role="menuitem" aria-haspopup="true" class="el-submenu" tabindex="0">
                                        <div class="el-submenu__title" style="border-bottom-color: transparent">
                                            其他网站<i class="el-submenu__icon-arrow el-icon-arrow-down"></i>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div class="el-col el-col-8" style="text-align: center; padding: 12px 0px 0px 10px">
                                <div class="el-row">
                                    <div class="el-col el-col-4">
                                        <span
                                            ><button
                                                type="button"
                                                class="el-button el-button--default is-circle el-popover__reference"
                                                id="play"
                                                aria-describedby="el-popover-7359"
                                                tabindex="0"
                                            >
                                                <!----><i class="el-icon-caret-right"></i
                                                ><!---->
                                            </button></span
                                        >
                                    </div>
                                    <div class="el-col el-col-14" style="padding-left: 20px">
                                        <div
                                            role="slider"
                                            aria-valuemin="0"
                                            aria-valuemax="0"
                                            aria-orientation="horizontal"
                                            class="el-slider"
                                            aria-valuetext="0"
                                            aria-label="slider between 0 and 0"
                                            style="width: 100%"
                                        >
                                            <!---->
                                            <div class="el-slider__runway">
                                                <div class="el-slider__bar" style="left: 0%"></div>
                                                <div tabindex="0" class="el-slider__button-wrapper">
                                                    <div
                                                        class="el-slider__button el-tooltip"
                                                        aria-describedby="el-tooltip-8873"
                                                        tabindex="0"
                                                    ></div>
                                                </div>
                                                <!---->
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        class="el-col el-col-6"
                                        style="padding: 9px 0px 0px 10px; color: rgb(144, 147, 153); font-size: 13px"
                                    >
                                        00:00/00:00
                                    </div>
                                </div>
                                <audio loop="loop">
                                    <source
                                        src="http://sc1.111ttt.cn:8282/2018/1/03m/13/396131232171.m4a?tflag=1519095601&amp;pin=6cd414115fdb9a950d827487b16b5f97#.mp3"
                                        type="audio/mpeg"
                                    />
                                </audio>
                            </div>
                            <div class="el-col el-col-4" style="text-align: right">
                                <div style="font-size: 20px; color: rgb(96, 98, 102); margin-top: 5px">
                                    <b>GitHub-Laziji</b>
                                </div>
                                <div style="color: rgb(96, 98, 102)">
                                    <i class="el-icon-location"></i>&nbsp;未填写地址 <br />
                                </div>
                            </div>
                            <div class="el-col el-col-2" style="text-align: center">
                                <img
                                    class="el-popover__reference"
                                    aria-describedby="el-popover-6829"
                                    tabindex="0"
                                    style="
                                        margin-top: 4px;
                                        margin-right: 10px;
                                        width: 52px;
                                        height: 52px;
                                        border-radius: 5px;
                                        border: 1px solid rgb(235, 238, 245);
                                    "
                                />
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section class="main-content">
                <div class="el-row">
                    <div class="el-col el-col-6" style="padding-right: 10px">
                        <div>
                            <div class="el-card is-never-shadow">
                                <!---->
                                <div class="el-card__body">
                                    <ul role="menubar" class="el-menu">
                                        <li
                                            role="menuitem"
                                            tabindex="-1"
                                            class="el-menu-item"
                                            :class="{'is-active': path === '/user/new/main'}"
                                            style="padding-left: 20px"
                                        >
                                            <i class="el-icon-star-off"></i> <g-link class="nav-link" to="/user/new/main">最新动态</g-link>
                                        </li>
                                        <li
                                            role="menuitem"
                                            tabindex="-1"
                                            :class="{'is-active': path === '/user/social/main'}"
                                            class="el-menu-item"
                                            style="padding-left: 20px"
                                        >
                                            <i class="el-icon-mobile-phone"></i> <g-link class="nav-link" to="/user/social/main">社交圈</g-link>
                                        </li>
                                        <li
                                            role="menuitem"
                                            tabindex="-1"
                                            class="el-menu-item"
                                            :class="{'is-active': path === '/user/blog/main'}"
                                            style="padding-left: 20px"
                                        >
                                            <i class="el-icon-edit-outline"></i> <g-link class="nav-link" to="/user/blog/main">博客列表</g-link>
                                        </li>
                                        <li
                                            role="menuitem"
                                            tabindex="-1"
                                            class="el-menu-item"
                                            :class="{'is-active': path === '/user/project/main'}"
                                            style="padding-left: 20px"
                                        >
                                            <i class="el-icon-service"></i><g-link class="nav-link" to="/user/project/main">开源项目</g-link>
                                        </li>
                                        <li
                                            role="menuitem"
                                            tabindex="-1"
                                            class="el-menu-item"
                                            :class="{'is-active': path === '/user/help/main'}"
                                            style="padding-left: 20px"
                                        >
                                            <i class="el-icon-printer"></i> <g-link class="nav-link" to="/user/help/main">使用帮助</g-link>
                                        </li>
                                        <li
                                            role="menuitem"
                                            tabindex="-1"
                                            class="el-menu-item"
                                            :class="{'is-active': path === '/user/readme/main'}"
                                            style="padding-left: 20px"
                                        >
                                            <i class="el-icon-document"></i> <g-link class="nav-link" to="/user/readme/main">README.md</g-link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div class="el-card is-never-shadow" style="margin-top: 20px; text-align: center">
                                <!---->
                                <div class="el-card__body">
                                    <div style="font-size: 0.9rem; line-height: 1.5; color: rgb(96, 108, 113)">
                                        <span class="el-tag el-tag--danger el-tag--small">&nbsp;<!----></span
                                        >&nbsp;&nbsp; Token未绑定&nbsp;&nbsp;
                                        <button type="button" class="el-button el-button--text">
                                            <!----><!----><span>绑定</span>
                                        </button>
                                    </div>
                                    <!---->
                                    <div style="margin-top: 10px; text-align: left">
                                        <div role="alert" class="el-alert el-alert--info">
                                            <!---->
                                            <div class="el-alert__content">
                                                <span class="el-alert__title is-bold">Token获取</span>
                                                <p class="el-alert__description">
                                                    在 github-&gt; settings-&gt; developerSettings-&gt;
                                                    personalAccessTokens 勾选gist权限,获取Token. 详情参考README.md
                                                </p>
                                                <i class="el-alert__closebtn el-icon-close" style="display: none"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div class="el-dialog__wrapper" style="display: none">
                                    <div class="el-dialog" style="width: 500px; margin-top: 15vh">
                                        <div class="el-dialog__header">
                                            <span class="el-dialog__title">绑定Token</span
                                            ><button type="button" aria-label="Close" class="el-dialog__headerbtn">
                                                <i class="el-dialog__close el-icon el-icon-close"></i>
                                            </button>
                                        </div>
                                        <!---->
                                        <div class="el-dialog__footer">
                                            <span class="dialog-footer"
                                                ><button type="button" class="el-button el-button--default">
                                                    <!----><!----><span>取 消</span>
                                                </button>
                                                <button type="button" class="el-button el-button--primary">
                                                    <!----><!----><span>确 定</span>
                                                </button></span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="el-col el-col-18" style="padding-left: 10px">
                      <slot/>
                    </div>
                </div>
            </section>
            <section class="foot">
                <div style="border-top: 1px solid rgb(225, 228, 232) !important; padding: 45px 0px">
                    <div class="el-row">
                        <div class="el-col el-col-10">
                            <div>
                                © 2018 GitHub-Laziji  
                                <a href="https://github.com/GitHub-Laziji" target="_blank">Profile</a>  
                                <a href="https://github.com/GitHub-Laziji/vblog" target="_blank">VBlog</a>
                            </div>
                        </div>
                        <div class="el-col el-col-4">
                            <div style="text-align: center; font-size: 18px">
                                <i class="el-icon-location-outline"></i>
                            </div>
                        </div>
                        <div class="el-col el-col-10">
                            <div style="float: right">
                                <a href="https://developer.github.com" target="_blank">GitHub-API</a>  
                                <a href="https://cn.vuejs.org/" target="_blank">Vue.js</a>  
                                <a href="http://element.eleme.io/" target="_blank">Element</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>
<script>
export default {
    computed: {
        path() {
            return this.$route.path
        }
    },
    data() {
        return {
            name_en: 'jianquan',
            name_ch: '夜木木',
            github_url: 'https://github.com//majianquan.github.io'
        }
    }
}
</script>
<style>
    .nav-link {
        color: #606c71;
    }
    .nav-link:hover {
        text-decoration: none;
        color: #1e6bb8;
    }
    .is-active .nav-link {
        color: #1e6bb8;
    }
</style>
