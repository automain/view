<template>
    <div>
        <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="6">
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
                        <el-col :span="22">
                            <el-button type="primary" round>登录</el-button>
                        </el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="scss">
    .row-bg {
        padding-top: 10%;
        .row-line {
            padding-top: 15px;
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
                }
            }
        }
    }
</script>