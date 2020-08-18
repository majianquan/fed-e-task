<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
                    <p class="text-xs-center">
                        <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
                        <nuxt-link v-else to="/login">Have an account?</nuxt-link>
                    </p>

                    <ul class="error-messages">
                        <template v-for="(messages, field) in errors">
                            <li v-for="(message, index) in messages" :key="`${field}_${index}`">{{ field }} {{ message }}</li>
                        </template>
                    </ul>

                    <form @submit.prevent="onSubmit">
                        <fieldset v-if="!isLogin" class="form-group">
                            <input
                                v-model="user.username"
                                required
                                class="form-control form-control-lg"
                                type="text"
                                placeholder="Your Name"
                            />
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                required
                                class="form-control form-control-lg"
                                type="email"
                                v-model="user.email"
                                placeholder="Email"
                            />
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                required
                                class="form-control form-control-lg"
                                v-model="user.password"
                                type="password"
                                placeholder="Password"
                                minlength="8"
                            />
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                            {{ isLogin ? 'Sign in' : 'Sign up' }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { login, register } from '@/api/user';
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    middleware: 'noAuthenticated',
    name: 'Login',
    data() {
        return {
            user: {
                username: '',
                email: '',
                password: '',
            },
            errors: null,
        };
    },
    computed: {
        isLogin() {
            return this.$route.name === 'login';
        },
    },
    methods: {
        async onSubmit() {
            try {
                const { data } = this.isLogin ? await login({ user: this.user }) : await register({ user: this.user });
                console.log(data)
                this.$store.commit('setUser',data.user)
                Cookie.set('user', data.user)
                this.$router.push('/');
            } catch (error) {
                this.errors = error.response.data.errors;
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
