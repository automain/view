<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true" :model="sysPrivilegeVO" size="mini">
                <el-form-item>
                    <el-button type="success" icon="el-icon-plus" @click="handleAddShow">添加</el-button>
                </el-form-item>
                <el-form-item label="权限标识:">
                    <el-input v-model="sysPrivilegeVO.privilegeLabel" placeholder="权限标识"></el-input>
                </el-form-item>
                <el-form-item label="权限名称:">
                    <el-input v-model="sysPrivilegeVO.privilegeName" placeholder="权限名称"></el-input>
                </el-form-item>
                <el-form-item label="父级:">
                    <el-select v-model="sysPrivilegeVO.parentId" filterable placeholder="父级">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="(item,key) in allPrivilegeList" :key="key" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-table ref="multipleTable" :data="pageBean.data" tooltip-effect="dark" :height="fullHeight" @filter-change="handleFilterChange">
            <el-table-column prop="createTime" label="创建时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="privilegeLabel" label="权限标识"></el-table-column>
            <el-table-column prop="privilegeName" label="权限名称"></el-table-column>
            <el-table-column prop="parentId" label="父级" :formatter="formatParentPrivilege"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleUpdateShow(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :page-sizes="[10, 20, 50, 100]" :page-size="sysPrivilegeVO.size" layout="->, total, prev, pager, next, jumper, sizes" :total="pageBean.total"></el-pagination>
        <el-dialog title="添加" :visible.sync="addVisible" class="add-update-dialog">
            <el-form :model="sysPrivilege" ref="sysPrivilegeAdd" :rules="rules" inline label-width="120px" size="mini">
                <el-form-item label="权限标识:" prop="privilegeLabel">
                    <el-input v-model="sysPrivilege.privilegeLabel" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="权限名称:" prop="privilegeName">
                    <el-input v-model="sysPrivilege.privilegeName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级:" prop="parentId">
                    <el-select v-model="sysPrivilege.parentId" filterable placeholder="父级">
                        <el-option v-for="(item,key) in allPrivilegeList" :key="key" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddUpdate('/privilegeAdd', 'sysPrivilegeAdd')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="updateVisible" class="add-update-dialog">
            <el-form :model="sysPrivilege" ref="sysPrivilegeUpdate" :rules="rules" inline label-width="120px" size="mini">
                <el-form-item label="权限标识:" prop="privilegeLabel">
                    <el-input v-model="sysPrivilege.privilegeLabel" autocomplete="off" readonly></el-input>
                </el-form-item>
                <el-form-item label="权限名称:" prop="privilegeName">
                    <el-input v-model="sysPrivilege.privilegeName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级:" prop="parentId">
                    <el-select v-model="sysPrivilege.parentId" filterable placeholder="父级">
                        <el-option v-for="(item,key) in allPrivilegeList" :key="key" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddUpdate('/privilegeUpdate', 'sysPrivilegeUpdate')">确定</el-button>
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
                sysPrivilegeVO: {
                    page: 1,
                    size: 10,
                    privilegeLabel: null,
                    privilegeName: null,
                    parentId: null,
                },
                pageBean: {
                    page: 1,
                    total: 0,
                    data: [],
                },
                sysPrivilege: {
                    id: null,
                    privilegeLabel: null,
                    privilegeName: null,
                    parentId: null,
                },
                allPrivilegeList: [],
                rules: {
                    privilegeLabel: [{required: true, message: '权限标识不能为空'}],
                    privilegeName: [{required: true, message: '权限名称不能为空'}],
                    parentId: [{required: true, message: '父级ID不能为空'}],
                },
            }
        },
        methods: {
            handleSizeChange(val) {
                this.sysPrivilegeVO.size = val;
                this.handleSearch();
            },
            handlePageChange(val) {
                this.sysPrivilegeVO.page = val;
                this.handleSearch();
            },
            handleSearch() {
                this.$axios.post("/privilegeList", this.sysPrivilegeVO).then(response => {
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
                this.sysPrivilege.id = row.id;
                this.$axios.post("/privilegeDetail", this.sysPrivilege).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.sysPrivilege = data.data;
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
                if (this.$refs['sysPrivilegeAdd']) {
                    this.$refs['sysPrivilegeAdd'].resetFields();
                }
                this.addVisible = true;
            },
            handleClear() {
                for (let key in this.sysPrivilege) {
                    if (this.sysPrivilege.hasOwnProperty(key)) {
                        this.sysPrivilege[key] = null;
                    }
                }
            },
            handleAddUpdate(uri, formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(uri, this.sysPrivilege).then(response => {
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
            formatParentPrivilege(row, column) {
                let parentId = row.parentId;
                for (let i = 0, size = this.allPrivilegeList.length; i < size; i ++) {
                    if (this.allPrivilegeList[i].id === parentId) {
                        return this.allPrivilegeList[i].name;
                    }
                }
                return "";
            }
        },
        mounted() {
            this.handleSearch();
            this.$axios.post("/allPrivilege").then(response => {
                let data = response.data;
                if (data.status === 0) {
                    let menuList = [];
                    menuList.push({"id": 0, "name": "顶级"});
                    menuList.push(...data.data);
                    this.allPrivilegeList = menuList;
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