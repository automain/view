<template>
    <div :class="hamburgerClass">
        <el-container>
            <el-aside class="sidebar-container">
                <el-scrollbar wrap-class="scrollbar-wrapper">
                    <el-menu class="sidebar-menu" :default-active="$route.path" :collapse="isCollapse" router background-color="#1a1b22" text-color="#f5fffa" @select="handleMenuSelect">
                        <el-menu-item index="/main">
                            <i class="el-icon-s-home"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>
                        <Menu :menuData="this.menuData"></Menu>
                    </el-menu>
                </el-scrollbar>
            </el-aside>
            <el-container class="main-container">
                <el-header class="fixed-header">
                    <div class="hamburger-container">
                        <el-tooltip class="item" effect="dark" :content="hamburgerTips" placement="bottom-start">
                            <i :class="this.hamburgerIconClass" @click="menuCollapse()"></i>
                        </el-tooltip>
                    </div>
                    <div class="breadcrumb-container">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item v-for="(item, key) in breadcrumbItems" :key="key">{{item}}</el-breadcrumb-item>
                        </el-breadcrumb>
                    </div>
                    <div class="right-menu-container">
                        <el-dropdown class="info-drop-down" @command="handleCommand">
                            <div class="head-img-container">
                                <el-avatar size="medium" :src="headImg"><img src="../assets/image/login_logo.png"/></el-avatar>
                                <div class="user-name">
                                    {{this.realName}}
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </div>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="handleUpdateBaseInfoShow">基本资料</el-dropdown-item>
                                <el-dropdown-item command="handleChangePasswordShow">修改密码</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                        <div class="logout-btn">
                            <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom-end">
                                <i class="el-icon-switch-button" @click="handleLogout"></i>
                            </el-tooltip>
                        </div>
                    </div>
                </el-header>

                <el-main>
                    <div class="content-wrap">
                        <el-scrollbar :style="{height: (this.fullHeight-70)+'px'}">
                            <router-view/>
                        </el-scrollbar>
                    </div>
                </el-main>
            </el-container>
        </el-container>
        <el-dialog title="基本资料" :visible.sync="baseInfoVisible" class="add-update-dialog">
            <el-form :model="userInfo" ref="baseInfoUpdate" :rules="baseInfoRules" inline label-width="120px" size="mini">
                <el-form-item label="用户名:">
                    {{userInfo.userName}}
                </el-form-item>
                <el-form-item label="真实姓名:" prop="realName">
                    <el-input v-model="userInfo.realName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号:" prop="phone">
                    <el-input v-model="userInfo.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                    <el-input v-model="userInfo.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="头像:" prop="headImgGid">
                    <el-upload class="avatar-uploader" :action="baseUrl + '/upload'"
                               :show-file-list="false"
                               :on-success="handleAvatarSuccess"
                               :before-upload="beforeAvatarUpload">
                        <img v-if="userInfo.headImg" :src="userInfo.headImg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="baseInfoVisible = false">取消</el-button>
                <el-button type="primary" @click="handleUpdateBaseInfo">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="修改密码" :visible.sync="changePasswordVisible" class="add-update-dialog">
            <el-form :model="changePassword" ref="userChangePassword" :rules="changePasswordRules" inline label-width="120px" size="mini">
                <el-form-item label="原密码:" prop="oriPassword">
                    <el-input v-model="changePassword.oriPassword" autocomplete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="新密码:" prop="password">
                    <el-input v-model="changePassword.password" autocomplete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码:" prop="password2">
                    <el-input v-model="changePassword.password2" autocomplete="off" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="changePasswordVisible = false">取消</el-button>
                <el-button type="primary" @click="handleChangePassword">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="scss">
    @import "../assets/css/variables";

    body {
        margin: 0px;
    }

    .sidebar-container {
        background-color: $menuBackgroundColor;
        height: 100%;
        position: fixed;
        font-size: 0px;
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 9;
        overflow: hidden;
        width: $sideBarWidth !important;
        transition: width $animateSeconds !important;
        -moz-transition: width $animateSeconds !important;
        -webkit-transition: width $animateSeconds !important;
        -o-transition: width $animateSeconds !important;

        .horizontal-collapse-transition {
            transition: 0s width ease-in-out, 0s padding-left ease-in-out,
            0s padding-right ease-in-out;
        }

        .scrollbar-wrapper {
            overflow-x: hidden !important;
            margin-right: -18px !important;

            .el-menu {
                border-right: none;
            }
        }

        .el-submenu__title,
        & .el-menu-item {
            &:hover {
                background-color: $hoverMenuBackgroundColor !important;
            }

            i {
                color: $mainBackgroundColor !important;
            }
        }

        .el-submenu.is-active,
        .el-menu-item.is-active {
            color: #409eff !important;
        }

        .el-scrollbar__bar .is-vertical {
            right: 0px;
        }

        .el-scrollbar {
            height: 100%;
        }
    }

    .main-container {
        min-height: 100%;
        padding-left: $sideBarWidth;
        transition: padding-left $animateSeconds !important;
        -moz-transition: padding-left $animateSeconds !important;
        -webkit-transition: padding-left $animateSeconds !important;
        -o-transition: padding-left $animateSeconds !important;
        position: relative;

        .fixed-header {
            position: fixed;
            top: 0;
            z-index: 9;
            float: left;
            height: 50px !important;
            width: calc(100% - #{$sideBarWidth});
            padding: 0 10px;
            background: $mainBackgroundColor;

            .hamburger-container {
                padding-left: 5px;
                padding-top: 7px;
                float: left;
                cursor: pointer;
                font-size: 25px;
            }

            .breadcrumb-container {
                padding: 18px;
                display: inline-block;
            }

            .right-menu-container {
                float: right;
                height: 100%;

                .info-drop-down {
                    cursor: pointer;

                    .head-img-container {
                        height: 40px;
                        padding-top: 7px;
                    }

                    .user-name {
                        float: right;
                        padding-top: 8px;
                        padding-left: 10px;
                    }
                }

                .logout-btn {
                    float: right;
                    padding-top: 12px;
                    font-size: 20px;
                    padding-left: 15px;
                    cursor: pointer;
                }
            }
        }

        .el-main {
            padding: 50px 10px 10px 10px;
            background-color: $mainBackgroundColor;

            .content-wrap {
                background: #fff;
                border: 1px solid #dcdfe6;
                -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
                0 0 6px 0 rgba(0, 0, 0, 0.04);
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);

                .el-scrollbar .el-scrollbar__wrap {
                    overflow-x: hidden;

                    .table-expand {
                        label {
                            color: #99a9bf;
                        }

                        .el-form-item {
                            margin-right: 0;
                            margin-bottom: 0;
                        }
                    }
                }
            }
        }
    }

    .add-update-dialog .el-input--mini {
        width: 200px;
    }

    .hideSidebar {
        .sidebar-container {
            width: $hideBarWidth !important;
        }

        .main-container {
            padding-left: $hideBarWidth;

            .fixed-header {
                width: calc(100% - #{$hideBarWidth});
            }

            .el-main .el-tabs {
                left: calc(#{$hideBarWidth} + 9px);
                transition: left $animateSeconds !important;
                -moz-transition: left $animateSeconds !important;
                -webkit-transition: left $animateSeconds !important;
                -o-transition: left $animateSeconds !important;
            }
        }

        .el-submenu {
            overflow: hidden;

            & > .el-submenu__title > .el-submenu__icon-arrow {
                display: none;
            }
        }

        .el-menu--collapse {
            .el-submenu {
                & > .el-submenu__title {
                    & > span {
                        height: 0;
                        width: 0;
                        overflow: hidden;
                        visibility: hidden;
                        display: inline-block;
                    }
                }
            }
        }
    }

    .avatar-uploader {
        .avatar-uploader-icon {
            font-size: 28px;
            width: $imgUploadBlockSize;
            height: $imgUploadBlockSize;
            line-height: $imgUploadBlockSize;
            text-align: center;
        }

        .avatar {
            width: $imgUploadBlockSize;
            height: $imgUploadBlockSize;
            display: block;
        }
    }
</style>
<script>
    import Menu from "@/components/Menu";

    export default {
        components: {Menu},
        data() {
            let validatePassword = (rule, value, callback) => {
                if (this.changePassword.password2 !== '') {
                    this.$refs.userChangePassword.validateField('password2');
                }
                callback();
            };
            let validatePassword2 = (rule, value, callback) => {
                if (value !== this.changePassword.password) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                menuData: [],
                isCollapse: false,
                hamburgerTips: "隐藏菜单",
                hamburgerIconClass: "el-icon-s-fold",
                fullHeight: document.documentElement.clientHeight,
                breadcrumbItems: [],
                realName: this.$session.get("realName"),
                headImg: this.$axios.defaults.baseURL + this.$session.get("headImg"),
                baseInfoVisible: false,
                changePasswordVisible: false,
                baseUrl: this.$axios.defaults.baseURL,
                userInfo: {
                    userName: null,
                    realName: null,
                    phone: null,
                    email: null,
                    headImgGid: null,
                    headImg: null,
                },
                changePassword: {
                    oriPassword: null,
                    password: null,
                    password2: null,
                },
                baseInfoRules: {
                    realName: [{required: true, message: '真实姓名不能为空'}],
                    phone: [{required: true, message: '手机号不能为空'}],
                    email: [{required: true, message: '邮箱不能为空'}],
                },
                changePasswordRules: {
                    oriPassword: [{required: true, message: '原密码不能为空'}],
                    password: [{required: true, message: '新密码不能为空'}, {validator: validatePassword, trigger: 'blur'}],
                    password2: [{required: true, message: '确认新密码不能为空'}, {validator: validatePassword2, trigger: 'blur'}],
                },
            }
        },
        methods: {
            menuCollapse() {
                this.isCollapse = !this.isCollapse;
                this.isCollapse
                    ? ((this.hamburgerIconClass = "el-icon-s-unfold"),
                        (this.hamburgerTips = "显示菜单"))
                    : ((this.hamburgerIconClass = "el-icon-s-fold"),
                        (this.hamburgerTips = "隐藏菜单"));
            },
            handleMenuSelect(index, indexPath) {
                this.breadcrumbItems = indexPath;
                let length = this.breadcrumbItems.length;
                if (length > 0) {
                    let key = this.breadcrumbItems[length - 1];
                    if (this.menuMap.has(key)) {
                        this.breadcrumbItems[length - 1] = this.menuMap.get(key);
                    }
                }
                this.$session.set("lastRequestPath", index);
                this.$session.set("breadcrumb", this.breadcrumbItems);
            },
            getMenuMap(map, menuData) {
                for (let index in menuData) {
                    if (menuData.hasOwnProperty(index)) {
                        let menu = menuData[index];
                        if (menu.menuPath && !menu.children) {
                            map.set(menu.menuPath, menu.menuName);
                        }
                        if (menu.children) {
                            this.getMenuMap(map, menu.children);
                        }
                    }
                }
                return map;
            },
            handleLogout() {
                this.$confirm('确认退出当前账号?', '提示').then(() => {
                    this.$axios.post("/logout").then(response => {
                        let data = response.data;
                        if (data.status === 0) {
                            this.$session.clear();
                            this.$axios.defaults.headers.common['Authorization'] = "";
                            this.$router.push("/");
                        } else {
                            this.$message.error(data.message);
                        }
                    });
                }).catch(() => {
                    this.$message.info('取消退出');
                });
            },
            handleCommand(command) {
                if ("handleUpdateBaseInfoShow" === command) {
                    this.handleUpdateBaseInfoShow();
                } else {
                    this.handleChangePasswordShow();
                }
            },
            handleUpdateBaseInfoShow() {
                this.$axios.post("/userBaseInfo").then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.userInfo = data.data;
                        this.userInfo.headImg = this.baseUrl + this.userInfo.headImg;
                        this.baseInfoVisible = true;
                    } else {
                        this.$message.error("操作失败");
                    }
                });
            },
            handleChangePasswordShow() {
                this.changePassword.oriPassword = null;
                this.changePassword.password = null;
                this.changePassword.password2 = null;
                if (this.$refs['userChangePassword']) {
                    this.$refs['userChangePassword'].resetFields();
                }
                this.changePasswordVisible = true;
            },
            handleUpdateBaseInfo() {
                this.$refs['baseInfoUpdate'].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/userBaseInfoUpdate', this.userInfo).then(response => {
                            let data = response.data;
                            if (data.status === 0) {
                                this.$message.success("操作成功");
                                this.baseInfoVisible = false;
                            } else {
                                this.$message.error("操作失败");
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            handleAvatarSuccess(res, file) {
                this.userInfo.headImgGid = res.data.uploadFileGid;
                this.userInfo.headImg = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                let fileType = file.type;
                let isImg = fileType === 'image/jpeg' || fileType === 'image/gif' || fileType === 'image/png';
                let isLt2M = file.size / 1024 / 1024 < 2;
                if (!isImg) {
                    this.$message.error('仅支持jpg/png/gif图片格式文件');
                    return false;
                }
                if (!isLt2M) {
                    this.$message.error('图片大小不能超过2MB');
                    return false;
                }
                return true;
            },
            handleChangePassword() {
                this.$refs['userChangePassword'].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/userChangePassword', this.changePassword).then(response => {
                            let data = response.data;
                            if (data.status === 0) {
                                this.$message.success("操作成功");
                                this.changePasswordVisible = false;
                            } else {
                                this.$message.error(data.message);
                            }
                        });
                    } else {
                        return false;
                    }
                });
            }
        },
        mounted() {
            window.onresize = () => {
                window.fullHeight = document.documentElement.clientHeight;
                this.fullHeight = window.fullHeight;
            };
            let lastRequestPath = this.$session.get("lastRequestPath");
            let breadcrumb = this.$session.get("breadcrumb");
            if (!lastRequestPath) {
                lastRequestPath = "/main";
                breadcrumb = ["首页"];
            }
            this.$router.push(lastRequestPath);
            this.breadcrumbItems = breadcrumb;
            this.$axios.post("/dictionaryAll").then(response => {
                let data = response.data;
                if (data.status === 0) {
                    let dictionaryList = data.data;
                    let dictionaryMap = new Map();
                    for (let i = 0, size = dictionaryList.length; i < size; i++) {
                        let dictionary = dictionaryList[i];
                        let key = dictionary.tableName + "_" + dictionary.columnName;
                        let dMap = dictionaryMap.get(key);
                        if (!dMap) {
                            dMap = new Map();
                        }
                        dMap.set(dictionary.dictionaryKey, dictionary.dictionaryValue);
                        dictionaryMap.set(key, dMap);
                    }
                    this.$session.setMap("dictionaryMap", dictionaryMap);
                }
            });
            this.menuData = this.$session.get("menuData");
        },
        computed: {
            hamburgerClass() {
                return {hideSidebar: this.isCollapse};
            },
            menuMap() {
                let map = this.getMenuMap(new Map(), this.menuData);
                map.set("/main", "首页");
                return map;
            }
        },
        watch: {
            fullHeight(val) {
                if (!this.timer) {
                    this.fullHeight = val;
                    this.$store.commit("setFullHeight", val);
                    this.timer = true;
                    let that = this;
                    setTimeout(function () {
                        that.timer = false;
                    }, 400);
                }
            }
        }
    };
</script>