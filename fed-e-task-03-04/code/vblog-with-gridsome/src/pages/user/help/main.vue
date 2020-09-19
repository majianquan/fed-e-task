<template>
    <Layout>
        <section>
            <div>
                <div class="el-card is-never-shadow" style="min-height: 600px; margin-bottom: 20px;">
                    <!---->
                    <div class="el-card__body">
                        <div role="tablist" aria-multiselectable="true" class="el-collapse">
                            <div class="el-collapse-item is-active">
                                <div
                                    role="tab"
                                    aria-expanded="true"
                                    aria-controls="el-collapse-content-4786"
                                    aria-describedby="el-collapse-content-4786"
                                >
                                    <div
                                        role="button"
                                        id="el-collapse-head-4786"
                                        tabindex="0"
                                        class="el-collapse-item__header is-active"
                                    >
                                        <i class="el-collapse-item__arrow el-icon-arrow-right is-active"></i>如何部署
                                    </div>
                                </div>
                                <div
                                    role="tabpanel"
                                    aria-labelledby="el-collapse-head-4786"
                                    id="el-collapse-content-4786"
                                    class="el-collapse-item__wrap"
                                >
                                    <div class="el-collapse-item__content">
                                        <div class="el-carousel">
                                            <div class="el-carousel__container" style="height: 352px;">
                                                <button
                                                    type="button"
                                                    class="el-carousel__arrow el-carousel__arrow--left"
                                                    style="display: none;"
                                                >
                                                    <i class="el-icon-arrow-left"></i></button
                                                ><button
                                                    type="button"
                                                    class="el-carousel__arrow el-carousel__arrow--right"
                                                    style="display: none;"
                                                >
                                                    <i class="el-icon-arrow-right"></i>
                                                </button>
                                                <div
                                                    class="el-carousel__item is-active is-animating"
                                                    style="transform: translateX(0px) scale(1);"
                                                >
                                                    <!---->
                                                    <div
                                                        style="border-radius: 5px; border: 1px solid rgb(235, 238, 245); height: 350px;"
                                                    >
                                                        <img
                                                            src="/static/img/deploy0.aaa30ac.png"
                                                            style="width: 100%; height: 350px;"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    class="el-carousel__item"
                                                    style="transform: translateX(716px) scale(1);"
                                                >
                                                    <!---->
                                                    <div
                                                        style="border-radius: 5px; border: 1px solid rgb(235, 238, 245); height: 350px;"
                                                    >
                                                        <img
                                                            src="/static/img/deploy1.75fd811.png"
                                                            style="width: 100%; height: 350px;"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    class="el-carousel__item"
                                                    style="transform: translateX(-716px) scale(1);"
                                                >
                                                    <!---->
                                                    <div
                                                        style="border-radius: 5px; border: 1px solid rgb(235, 238, 245); height: 350px;"
                                                    >
                                                        <img
                                                            src="/static/img/deploy2.6d80b32.png"
                                                            style="width: 100%; height: 350px;"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <ul class="el-carousel__indicators">
                                                <li class="el-carousel__indicator is-active">
                                                    <button class="el-carousel__button"><!----></button>
                                                </li>
                                                <li class="el-carousel__indicator">
                                                    <button class="el-carousel__button"><!----></button>
                                                </li>
                                                <li class="el-carousel__indicator">
                                                    <button class="el-carousel__button"><!----></button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="el-steps el-steps--horizontal" style="margin-top: 20px;">
                                            <div
                                                class="el-step is-horizontal is-center"
                                                style="flex-basis: 33.3333%; margin-right: 0px;"
                                            >
                                                <div class="el-step__head is-process">
                                                    <div class="el-step__line" style="margin-right: 0px;">
                                                        <i
                                                            class="el-step__line-inner"
                                                            style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                                                        ></i>
                                                    </div>
                                                    <div class="el-step__icon is-text">
                                                        <!---->
                                                        <div class="el-step__icon-inner">1</div>
                                                    </div>
                                                </div>
                                                <div class="el-step__main">
                                                    <div class="el-step__title is-process">克隆项目</div>
                                                    <div class="el-step__description is-process">
                                                        https://github.com/GitHub-Laziji/GitHub-Laziji.github.io
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="el-step is-horizontal is-center"
                                                style="flex-basis: 33.3333%; margin-right: 0px;"
                                            >
                                                <div class="el-step__head is-wait">
                                                    <div class="el-step__line" style="margin-right: 0px;">
                                                        <i
                                                            class="el-step__line-inner"
                                                            style="transition-delay: -150ms; border-width: 0px; width: 0%;"
                                                        ></i>
                                                    </div>
                                                    <div class="el-step__icon is-text">
                                                        <!---->
                                                        <div class="el-step__icon-inner">2</div>
                                                    </div>
                                                </div>
                                                <div class="el-step__main">
                                                    <div class="el-step__title is-wait">修改配置</div>
                                                    <div class="el-step__description is-wait">
                                                        将 /static/configuration.json 中的 githubUsername 改为自己的
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="el-step is-horizontal is-center"
                                                style="flex-basis: 33.3333%; max-width: 33.3333%;"
                                            >
                                                <div class="el-step__head is-wait">
                                                    <div class="el-step__line"><i class="el-step__line-inner"></i></div>
                                                    <div class="el-step__icon is-text">
                                                        <!---->
                                                        <div class="el-step__icon-inner">3</div>
                                                    </div>
                                                </div>
                                                <div class="el-step__main">
                                                    <div class="el-step__title is-wait">查看效果</div>
                                                    <div class="el-step__description is-wait">
                                                        https://用户名.github.io 就是你的博客了
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="el-collapse-item">
                                <div
                                    role="tab"
                                    aria-controls="el-collapse-content-3803"
                                    aria-describedby="el-collapse-content-3803"
                                >
                                    <div
                                        role="button"
                                        id="el-collapse-head-3803"
                                        tabindex="0"
                                        class="el-collapse-item__header"
                                    >
                                        <i class="el-collapse-item__arrow el-icon-arrow-right"></i>如何使用
                                    </div>
                                </div>
                                <div
                                    role="tabpanel"
                                    aria-hidden="true"
                                    aria-labelledby="el-collapse-head-3803"
                                    id="el-collapse-content-3803"
                                    class="el-collapse-item__wrap"
                                    style="display: none;"
                                >
                                    <div class="el-collapse-item__content">
                                        <div class="el-carousel">
                                            <div class="el-carousel__container" style="height: 352px;">
                                                <button
                                                    type="button"
                                                    class="el-carousel__arrow el-carousel__arrow--left"
                                                    style="display: none;"
                                                >
                                                    <i class="el-icon-arrow-left"></i></button
                                                ><button
                                                    type="button"
                                                    class="el-carousel__arrow el-carousel__arrow--right"
                                                    style="display: none;"
                                                >
                                                    <i class="el-icon-arrow-right"></i>
                                                </button>
                                                <div
                                                    class="el-carousel__item is-active is-animating"
                                                    style="transform: translateX(0px) scale(1);"
                                                >
                                                    <!---->
                                                    <div
                                                        style="border-radius: 5px; border: 1px solid rgb(235, 238, 245); height: 350px;"
                                                    >
                                                        <img
                                                            src="/static/img/use0.61c0f0e.png"
                                                            style="width: 100%; height: 350px;"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    class="el-carousel__item"
                                                    style="transform: translateX(0px) scale(1);"
                                                >
                                                    <!---->
                                                    <div
                                                        style="border-radius: 5px; border: 1px solid rgb(235, 238, 245); height: 350px;"
                                                    >
                                                        <img
                                                            src="/static/img/use1.18f36b8.png"
                                                            style="width: 100%; height: 350px;"
                                                        />
                                                    </div>
                                                </div>
                                                <div
                                                    class="el-carousel__item"
                                                    style="transform: translateX(0px) scale(1);"
                                                >
                                                    <!---->
                                                    <div
                                                        style="border-radius: 5px; border: 1px solid rgb(235, 238, 245); height: 350px;"
                                                    >
                                                        <img
                                                            src="/static/img/use2.449ac15.png"
                                                            style="width: 100%; height: 350px;"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <ul class="el-carousel__indicators">
                                                <li class="el-carousel__indicator is-active">
                                                    <button class="el-carousel__button"><!----></button>
                                                </li>
                                                <li class="el-carousel__indicator">
                                                    <button class="el-carousel__button"><!----></button>
                                                </li>
                                                <li class="el-carousel__indicator">
                                                    <button class="el-carousel__button"><!----></button>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="el-steps el-steps--horizontal" style="margin-top: 20px;">
                                            <div
                                                class="el-step is-horizontal is-center"
                                                style="flex-basis: 33.3333%; margin-right: 0px;"
                                            >
                                                <div class="el-step__head is-process">
                                                    <div class="el-step__line" style="margin-right: 0px;">
                                                        <i
                                                            class="el-step__line-inner"
                                                            style="transition-delay: 0ms; border-width: 0px; width: 0%;"
                                                        ></i>
                                                    </div>
                                                    <div class="el-step__icon is-text">
                                                        <!---->
                                                        <div class="el-step__icon-inner">1</div>
                                                    </div>
                                                </div>
                                                <div class="el-step__main">
                                                    <div class="el-step__title is-process">获取Token</div>
                                                    <div class="el-step__description is-process">
                                                        在GitHub上获取调用API所需的Token
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                class="el-step is-horizontal is-center"
                                                style="flex-basis: 33.3333%; margin-right: 0px;"
                                            >
                                                <div class="el-step__head is-wait">
                                                    <div class="el-step__line" style="margin-right: 0px;">
                                                        <i
                                                            class="el-step__line-inner"
                                                            style="transition-delay: -150ms; border-width: 0px; width: 0%;"
                                                        ></i>
                                                    </div>
                                                    <div class="el-step__icon is-text">
                                                        <!---->
                                                        <div class="el-step__icon-inner">2</div>
                                                    </div>
                                                </div>
                                                <div class="el-step__main">
                                                    <div class="el-step__title is-wait">登录</div>
                                                    <div class="el-step__description is-wait">将获取的Token绑定上</div>
                                                </div>
                                            </div>
                                            <div
                                                class="el-step is-horizontal is-center"
                                                style="flex-basis: 33.3333%; max-width: 33.3333%;"
                                            >
                                                <div class="el-step__head is-wait">
                                                    <div class="el-step__line"><i class="el-step__line-inner"></i></div>
                                                    <div class="el-step__icon is-text">
                                                        <!---->
                                                        <div class="el-step__icon-inner">3</div>
                                                    </div>
                                                </div>
                                                <div class="el-step__main">
                                                    <div class="el-step__title is-wait">发个博客</div>
                                                    <div class="el-step__description is-wait">
                                                        点击博客列表右上角的发布博文按钮
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="el-collapse-item">
                                <div
                                    role="tab"
                                    aria-controls="el-collapse-content-5946"
                                    aria-describedby="el-collapse-content-5946"
                                >
                                    <div
                                        role="button"
                                        id="el-collapse-head-5946"
                                        tabindex="0"
                                        class="el-collapse-item__header"
                                    >
                                        <i class="el-collapse-item__arrow el-icon-arrow-right"></i>开发注意事项
                                    </div>
                                </div>
                                <div
                                    role="tabpanel"
                                    aria-hidden="true"
                                    aria-labelledby="el-collapse-head-5946"
                                    id="el-collapse-content-5946"
                                    class="el-collapse-item__wrap"
                                    style="display: none;"
                                >
                                    <div class="el-collapse-item__content">
                                        <div
                                            style="padding: 10px; line-height: 30px; color: rgb(48, 49, 51); font-size: 16px;"
                                        >
                                            配置文件读取的总是与
                                            <tt>index.html</tt> 同级的 <tt>./static/configuration.json</tt> ,
                                            而修改配置的时候是通过 <tt>github-api</tt> 修改
                                            <tt>你的用户名.github.io</tt> 下的 <tt>/static/configuration.json</tt>,
                                            所以本地 <tt>npm run dev</tt> 的时候会出现修改配置无效的情况,
                                            如果需要修改的话修改本地的配置文件就行, 发布到 <tt>github</tt> 之后不影响
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
