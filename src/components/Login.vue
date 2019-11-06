<template>
    <div class="login-bg" :style="{height: this.fullHeight+'px'}">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6">
                <el-card shadow="hover">
                    <el-row type="flex" class="row-line" justify="center">
                        <el-col :span="2">
                            <div class="head-image">
                                <el-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"></el-avatar>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-line" justify="center">
                        <el-col :span="22">
                            <el-input placeholder="用户名" v-model="user.userName" prefix-icon="el-icon-user" clearable></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-line" justify="center">
                        <el-col :span="22">
                            <el-input placeholder="密码" v-model="user.password" prefix-icon="el-icon-key" show-password></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-line" justify="center">
                        <el-col :span="15">
                            <el-input placeholder="验证码" v-model="user.captcha" clearable></el-input>
                        </el-col>
                        <el-col :span="6" :offset="1">
                            <el-image src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="fill" class="captcha-img"></el-image>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-line" justify="center">
                        <el-col :span="22">
                            <el-button type="primary" class="login-btn" round>登录</el-button>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-line" justify="center">
                        <el-col :span="4" :offset="18">
                            <el-link :underline="false">忘记密码</el-link>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss">
    body {
        margin: 0px;
    }
    .login-bg {
        background-color: #2d3a4b;

        .row-bg {
            padding-top: 10%;

            .row-line {
                padding-top: 15px;
            }

            .captcha-img {
                width: 100%;
                height: 40px;
            }

            .login-btn {
                width: 100%;
            }
        }
    }

</style>
<script>
    export default {
        data() {
            return {
                user: {
                    userName: null,
                    password: null,
                    captcha: null,
                },
                fullHeight: document.documentElement.clientHeight,
            }
        },
        mounted() {
            window.onresize = () => {
                window.fullHeight = document.documentElement.clientHeight;
                this.fullHeight = window.fullHeight;
            };
        }
    }
</script>