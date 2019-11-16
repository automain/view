<template>
    <div class="login-bg" :style="{height: this.fullHeight+'px'}">
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :xs="20" :sm="16" :md="12" :lg="8" :xl="6">
                <el-card shadow="hover" class="login-card">
                    <el-row type="flex" class="row-line" justify="center">
                        <el-col :span="2">
                            <div class="head-image">
                                <el-avatar><img src="../assets/image/login_logo.png"/></el-avatar>
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
                        <el-col :span="14">
                            <el-input placeholder="验证码" v-model="user.captcha" clearable></el-input>
                        </el-col>
                        <el-col :span="7" :offset="1">
                            <el-image :src="'data:image/png;base64,' + captchaImage" @click="refreshCaptcha" fit="fill" alt="验证码" class="captcha-img">
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-line" justify="center">
                        <el-col :span="22">
                            <el-button type="primary" class="login-btn" @click="handleLogin" round>登录</el-button>
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
    @import "../assets/css/variables";

    body {
        margin: 0px;
    }

    .login-bg {
        background-image: url("../assets/image/login_bg.jpg");

        .login-card {
            background-color: $mainBackgroundColor;
            box-shadow: rgba(245, 255, 250, 0.1);
        }

        .row-bg {
            padding-top: 10%;

            .row-line {
                padding-top: 15px;
            }

            .captcha-img {
                width: 100%;
                height: 40px;
                cursor:pointer;
            }

            .login-btn {
                width: 100%;
            }
        }
    }

</style>
<script>
    import MD5 from 'js-md5';
    export default {
        data() {
            return {
                user: {
                    userName: null,
                    password: null,
                    captcha: null,
                    captchaKey: null,
                },
                fullHeight: document.documentElement.clientHeight,
                captchaImage: null,
            }
        },
        methods: {
            refreshCaptcha() {
                this.$axios.post("/getCaptcha").then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        let result = data.data;
                        this.user.captchaKey = result.captchaKey;
                        this.captchaImage = result.captchaImage;
                    }
                });
            },
            handleLogin() {
                if (!this.user.userName) {
                    this.$message.error('用户名不能为空');
                    return;
                }
                if (!this.user.password) {
                    this.$message.error('密码不能为空');
                    return;
                }
                if (!this.user.captcha) {
                    this.$message.error('验证码不能为空');
                    return;
                }
                let pwd = MD5(MD5(this.user.password)+this.user.captcha);
                let param = {
                    userName: this.user.userName,
                    password: pwd,
                    captcha: this.user.captcha,
                    captchaKey: this.user.captchaKey,
                };
                this.$axios.post("/login", param).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.$session.set("menuData", data.data.menuData);
                        this.$session.set("privilege", data.data.privilege);
                        this.$session.set("realName", data.data.realName);
                        this.$message.success(data.message);
                        this.$router.push("/index");
                    } else {
                        this.$message.error(data.message);
                        this.refreshCaptcha();
                    }
                });
            }
        },
        mounted() {
            window.onresize = () => {
                window.fullHeight = document.documentElement.clientHeight;
                this.fullHeight = window.fullHeight;
            };
            this.refreshCaptcha();
        }
    }
</script>