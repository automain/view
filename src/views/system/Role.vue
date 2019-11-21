<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true" :model="sysRoleVO" size="mini">
                <el-form-item>
                    <el-button type="success" icon="el-icon-plus" @click="handleAddShow">添加</el-button>
                </el-form-item>
                <el-form-item label="角色名称:">
                    <el-input v-model="sysRoleVO.roleName" placeholder="角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色标识:">
                    <el-input v-model="sysRoleVO.roleLabel" placeholder="角色标识"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-table ref="multipleTable" :data="pageBean.data" tooltip-effect="dark" :height="fullHeight" @filter-change="handleFilterChange">
            <el-table-column prop="createTime" label="创建时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column prop="roleLabel" label="角色标识"></el-table-column>
            <el-table-column fixed="right" label="操作" width="300">
                <template slot-scope="scope">
                    <el-button @click="handlePrivilegeShow(scope.row)" type="text" size="small">分配权限</el-button>
                    <el-button @click="handleMenuShow(scope.row)" type="text" size="small">分配菜单</el-button>
                    <el-button @click="handleUpdateShow(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :page-sizes="[10, 20, 50, 100]" :page-size="sysRoleVO.size" layout="->, total, prev, pager, next, jumper, sizes" :total="pageBean.total"></el-pagination>
        <el-dialog title="添加" :visible.sync="addVisible" class="add-update-dialog">
            <el-form :model="sysRole" ref="sysRoleAdd" :rules="rules" inline label-width="120px" size="mini">
                <el-form-item label="角色名称:" prop="roleName">
                    <el-input v-model="sysRole.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色标识:" prop="roleLabel">
                    <el-input v-model="sysRole.roleLabel" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddUpdate('/roleAdd', 'sysRoleAdd')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="updateVisible" class="add-update-dialog">
            <el-form :model="sysRole" ref="sysRoleUpdate" :rules="rules" inline label-width="120px" size="mini">
                <el-form-item label="角色名称:" prop="roleName">
                    <el-input v-model="sysRole.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色标识:" prop="roleLabel">
                    <el-input v-model="sysRole.roleLabel" autocomplete="off" readonly></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddUpdate('/roleUpdate', 'sysRoleUpdate')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="分配权限" :visible.sync="privilegeVisible" class="add-update-dialog">
            <el-tree :data="privilegeTreeList" show-checkbox default-expand-all node-key="id" ref="privilegeTree" highlight-current></el-tree>
            <div slot="footer" class="dialog-footer">
                <el-button @click="privilegeVisible = false">取消</el-button>
                <el-button type="primary" @click="handleSetPrivilege">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            let validateRoleLabel = (rule, value, callback) => {
                this.$axios.post("/checkRoleExist?roleLabel=" + this.sysRole.roleLabel).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        callback();
                    } else {
                        callback(new Error('角色标识已存在'));
                    }
                });
            };
            return {
                addVisible: false,
                updateVisible: false,
                privilegeVisible: false,
                menuVisible: false,
                sysRoleVO: {
                    page: 1,
                    size: 10,
                    roleName: null,
                    roleLabel: null,
                },
                pageBean: {
                    page: 1,
                    total: 0,
                    data: [],
                },
                sysRole: {
                    id: null,
                    roleName: null,
                    roleLabel: null,
                },
                privilegeTreeList: [],
                menuTreeList: [],
                rules: {
                    roleName: [{required: true, message: '角色名称不能为空'}],
                    roleLabel: [{required: true, message: '角色标识不能为空'},{validator:validateRoleLabel, trigger: 'blur'}],
                },
            }
        },
        methods: {
            handleSizeChange(val) {
                this.sysRoleVO.size = val;
                this.handleSearch();
            },
            handlePageChange(val) {
                this.sysRoleVO.page = val;
                this.handleSearch();
            },
            handleSearch() {
                this.$axios.post("/roleList", this.sysRoleVO).then(response => {
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
                this.sysRole.id = row.id;
                this.$axios.post("/roleDetail", this.sysRole).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.sysRole = data.data;
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
                if (this.$refs['sysRoleAdd']) {
                    this.$refs['sysRoleAdd'].resetFields();
                }
                this.addVisible = true;
            },
            handleClear() {
                for (let key in this.sysRole) {
                    if (this.sysRole.hasOwnProperty(key)) {
                        this.sysRole[key] = null;
                    }
                }
            },
            handleAddUpdate(uri, formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(uri, this.sysRole).then(response => {
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
            handlePrivilegeShow(row) {
                this.$axios.post('/getPrivilegeTree').then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.privilegeTreeList = data.data;
                    }
                });
                this.privilegeVisible = true;
            },
            handleMenuShow(row) {
                this.$axios.post('/getMenuTree').then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.menuTreeList = data.data;
                    }
                });
                this.menuVisible = true;
            },
            handleSetPrivilege() {

            }
        },
        mounted() {
            this.handleSearch();
        },
        computed: {
            fullHeight() {
                return this.$store.state.fullHeight - 140;
            }
        }
    }
</script>