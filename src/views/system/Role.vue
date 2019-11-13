<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true" :model="sysRoleVO" size="mini">
                <el-form-item>
                    <el-button type="success" icon="el-icon-plus" @click="handleAddShow">添加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" icon="el-icon-delete" @click="handleDelete">删除</el-button>
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
        <el-table ref="multipleTable" :data="pageBean.data" tooltip-effect="dark" :height="fullHeight" @selection-change="selectToDelete" @filter-change="handleFilterChange">
            <el-table-column type="selection" width="42" fixed="left"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="roleName" label="角色名称"></el-table-column>
            <el-table-column prop="roleLabel" label="角色标识"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleUpdateShow(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :page-sizes="[10, 20, 50, 100]" :page-size="sysRoleVO.size" layout="->, total, prev, pager, next, jumper, sizes" :total="pageBean.total"></el-pagination>
        <el-dialog title="添加" :visible.sync="addVisible" class="add-update-dialog">
            <el-form :model="sysRole" ref="sysRoleAdd" :rules="rules" inline label-width="120px" size="mini">
                <el-form-item label="角色名称:">
                    <el-input v-model="sysRole.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色标识:">
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
                <el-form-item label="角色名称:">
                    <el-input v-model="sysRole.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色标识:">
                    <el-input v-model="sysRole.roleLabel" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddUpdate('/roleUpdate', 'sysRoleUpdate')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                addVisible: false,
                updateVisible: false,
                sysRoleVO: {
                    page: 1,
                    size: 10,
                    idList: [],
                    roleName: null,
                    roleLabel: null,
                },
                pageBean: {
                    page: 1,
                    total: 0,
                    data: [],
                },
                sysRole: {
                    gid: null,
                    roleName: null,
                    roleLabel: null,
                },
                rules: {
                    roleName: [{required: true, message: '角色名称不能为空'}],
                    roleLabel: [{required: true, message: '角色标识不能为空'}],
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
            selectToDelete(val) {
                let idList = [];
                for (let i = 0, size = val.length; i < size; i++) {
                    idList.push(val[i].id);
                }
                this.sysRoleVO.idList = idList;
            },
            handleDelete() {
                if (this.sysRoleVO.idList.length > 0) {
                    this.$confirm("确定删除选中的数据?", "提示", {type: "warning"}).then(() => {
                        this.$axios.post("/roleDelete", this.sysRoleVO).then(response => {
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