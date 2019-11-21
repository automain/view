<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true" :model="sysUserVO" size="mini">
                <el-form-item>
                    <el-button type="success" icon="el-icon-plus" @click="handleAddShow">添加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" icon="el-icon-delete" @click="handleDelete">删除</el-button>
                </el-form-item>
                <el-form-item label="用户名:">
                    <el-input v-model="sysUserVO.userName" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="手机号:">
                    <el-input v-model="sysUserVO.phone" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item label="角色:">
                    <el-select v-model="sysUserVO.roleLabel" filterable placeholder="请选择角色">
                        <el-option v-for="item in allRoleList" :key="item.roleLabel" :label="item.roleName" :value="item.roleLabel"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-table ref="multipleTable" :data="pageBean.data" tooltip-effect="dark" :height="fullHeight" @selection-change="selectToDelete" @filter-change="handleFilterChange">
            <el-table-column type="selection" width="42" fixed="left"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="userName" label="用户名"></el-table-column>
            <el-table-column prop="realName" label="真实姓名"></el-table-column>
            <el-table-column prop="phone" label="手机号"></el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="roleName" label="角色"></el-table-column>
            <el-table-column prop="headImg" label="头像">
                <template slot-scope="scope">
                    <el-avatar size="small" :src="scope.row.headImg"></el-avatar>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleUpdateShow(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :page-sizes="[10, 20, 50, 100]" :page-size="sysUserVO.size" layout="->, total, prev, pager, next, jumper, sizes" :total="pageBean.total"></el-pagination>
        <el-dialog title="添加" :visible.sync="addVisible" class="add-update-dialog">
            <el-form :model="sysUser" ref="sysUserAdd" :rules="rules" inline label-width="120px" size="mini">
                <el-form-item label="用户名:" prop="userName">
                    <el-input v-model="sysUser.userName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="sysUser.password" autocomplete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="password2">
                    <el-input v-model="sysUser.password2" autocomplete="off" type="password"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名:" prop="realName">
                    <el-input v-model="sysUser.realName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号:" prop="phone">
                    <el-input v-model="sysUser.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                    <el-input v-model="sysUser.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色:" prop="userRoleList">
                    <el-select v-model="sysUser.userRoleList" multiple clearable placeholder="请选择角色">
                        <el-option v-for="item in allRoleList" :key="item.roleLabel" :label="item.roleName" :value="item.roleLabel"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="头像:" prop="headImgGid">
                    <el-upload class="avatar-uploader" action="/upload"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload">
                        <img v-if="sysUser.headImg" :src="sysUser.headImg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddUpdate('/userAdd', 'sysUserAdd')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="updateVisible" class="add-update-dialog">
            <el-form :model="sysUser" ref="sysUserUpdate" :rules="rules" inline label-width="120px" size="mini">
                <el-form-item label="用户名:" prop="userName">
                    <el-input v-model="sysUser.userName" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="真实姓名:" prop="realName">
                    <el-input v-model="sysUser.realName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号:" prop="phone">
                    <el-input v-model="sysUser.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                    <el-input v-model="sysUser.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色:" prop="userRoleList">
                    <el-select v-model="sysUser.userRoleList" multiple clearable placeholder="请选择角色">
                        <el-option v-for="item in allRoleList" :key="item.roleLabel" :label="item.roleName" :value="item.roleLabel"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="头像:" prop="headImgGid">
                    <el-upload class="avatar-uploader" action="/upload"
                               :show-file-list="false"
                               :on-success="handleAvatarSuccess"
                               :before-upload="beforeAvatarUpload">
                        <img v-if="sysUser.headImg" :src="sysUser.headImg" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddUpdate('/userUpdate', 'sysUserUpdate')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            let validateUserName = (rule, value, callback) => {
                this.$axios.post("/checkUserExist?userName=" + this.sysUser.userName).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        callback();
                    } else {
                        callback(new Error('用户名已存在'));
                    }
                });
            };
            let validatePassword = (rule, value, callback) => {
                if (this.sysUser.password2 !== '') {
                    this.$refs.sysUserAdd.validateField('password2');
                }
                callback();
            };
            let validatePassword2 = (rule, value, callback) => {
                if (value !== this.sysUser.password) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                addVisible: false,
                updateVisible: false,
                allRoleList: null,
                sysUserVO: {
                    page: 1,
                    size: 10,
                    gidList: [],
                    userName: null,
                    phone: null,
                    roleLabel: null,
                },
                pageBean: {
                    page: 1,
                    total: 0,
                    data: [],
                },
                sysUser: {
                    gid: null,
                    userName: null,
                    password: null,
                    password2: null,
                    realName: null,
                    phone: null,
                    email: null,
                    headImgGid: null,
                    headImg: null,
                    userRoleList: [],
                },
                rules: {
                    userName: [{required: true, message: '用户名不能为空'},{validator:validateUserName, trigger: 'blur'}],
                    realName: [{required: true, message: '真实姓名不能为空'}],
                    phone: [{required: true, message: '手机号不能为空'}],
                    email: [{required: true, message: '邮箱不能为空'}],
                    password: [{required: true, message: '密码不能为空'},{validator: validatePassword, trigger: 'blur'}],
                    password2: [{required: true, message: '确认密码不能为空'},{validator: validatePassword2, trigger: 'blur'}],
                    userRoleList: [{required: true, message: '角色不能为空'}],
                },
            }
        },
        methods: {
            handleSizeChange(val) {
                this.sysUserVO.size = val;
                this.handleSearch();
            },
            handlePageChange(val) {
                this.sysUserVO.page = val;
                this.handleSearch();
            },
            handleSearch() {
                this.$axios.post("/userList", this.sysUserVO).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.pageBean = data.data;
                    }
                });
            },
            handleFilterChange(data) {
                this.handleSearch();
            },
            handleSetProperties(row) {
                this.sysUser.gid = row.gid;
                this.$axios.post("/userDetail", this.sysUser).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.sysUser = data.data;
                    } else {
                        this.$message.error("操作失败");
                    }
                });
            },
            handleUpdateShow(row) {
                this.handleSetProperties(row);
                this.updateVisible = true;
            },
            handleAddShow() {
                this.handleClear();
                if (this.$refs['sysUserAdd']) {
                    this.$refs['sysUserAdd'].resetFields();
                }
                this.addVisible = true;
            },
            handleClear() {
                for (let key in this.sysUser) {
                    if (this.sysUser.hasOwnProperty(key)) {
                        this.sysUser[key] = null;
                    }
                }
            },
            handleAddUpdate(uri, formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(uri, this.sysUser).then(response => {
                            let data = response.data;
                            if (data.status === 0) {
                                this.$message.success("操作成功");
                                this.handleClear();
                                this.handleSearch();
                                this.addVisible = false;
                                this.updateVisible = false;
                            } else {
                                this.$message.error("操作失败");
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            selectToDelete(val) {
                let gidList = [];
                for (let i = 0, size = val.length; i < size; i++) {
                    gidList.push(val[i].gid);
                }
                this.sysUserVO.gidList = gidList;
            },
            handleDelete() {
                if (this.sysUserVO.gidList.length > 0) {
                    this.$confirm("确定删除选中的数据?", "提示", {type: "warning"}).then(() => {
                        this.$axios.post("/userDelete", this.sysUserVO).then(response => {
                            let data = response.data;
                            if (data.status === 0) {
                                this.$message.success("操作成功");
                                this.handleSearch();
                            } else {
                                this.$message.error("操作失败");
                            }
                        });
                    }).catch(() => {
                        this.$message.info("取消删除");
                    });
                } else {
                    this.$message.warning("请选择要删除的数据");
                }
            },
            handleAvatarSuccess(res, file) {
                console.log(res);
                console.log(file);
                this.sysUser.headImg = URL.createObjectURL(file.raw);
            },
            beforeAvatarUpload(file) {
                console.log(file);
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            }
        },
        mounted() {
            this.handleSearch();
            this.$axios.post("/allRoleList").then(response => {
                let data = response.data;
                if (data.status === 0) {
                    this.allRoleList = data.data;
                }
            });
        },
        computed: {
            fullHeight() {
                return this.$store.state.fullHeight - 140;
            }
        }
    }
</script>