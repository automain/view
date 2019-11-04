<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true" :model="sysMenuVO" size="mini">
                <el-form-item>
                    <el-button type="success" icon="el-icon-plus" @click="handleAddShow">添加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" icon="el-icon-delete" @click="handleDelete">删除</el-button>
                </el-form-item>
                <el-form-item label="菜单名称:">
                    <el-input v-model="sysMenuVO.menuName" placeholder="菜单名称"></el-input>
                </el-form-item>
                <el-form-item label="父级:">
                    <el-select v-model="sysMenuVO.parentId" placeholder="父级">
                        <el-option label="全部" value=""></el-option>
                        <el-option v-for="item in allValidMenuList" :key="item" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单排序:">
                    <el-input v-model="sysMenuVO.sequenceNumber" placeholder="菜单排序"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-table ref="multipleTable" :data="pageBean.data" tooltip-effect="dark" :height="fullHeight" @selection-change="selectToDelete"  @sort-change="handleSort" @filter-change="handleFilterChange">
            <el-table-column type="selection" width="42" fixed="left"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="menuPath" label="菜单路径"></el-table-column>
            <el-table-column prop="menuName" label="菜单名称"></el-table-column>
            <el-table-column prop="menuIcon" label="菜单图标"></el-table-column>
            <el-table-column prop="parentId" label="父级ID"></el-table-column>
            <el-table-column prop="sequenceNumber" label="菜单排序" sortable="custom"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleUpdateShow(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :page-sizes="[10, 20, 50, 100]" :page-size="sysMenuVO.size" layout="->, total, prev, pager, next, jumper, sizes" :total="pageBean.total"></el-pagination>
        <el-dialog title="添加" :visible.sync="addVisible" class="add-update-dialog">
            <el-form :model="sysMenu" inline label-width="120px" ref="sysMenu" size="mini">
                <el-form-item label="菜单路径:">
                    <el-input v-model="sysMenu.menuPath" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单名称:" prop="menuName">
                    <el-input v-model="sysMenu.menuName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标:" prop="menuIcon">
                    <el-input v-model="sysMenu.menuIcon" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级:">
                    <el-select v-model="sysMenu.parentId" placeholder="父级">
                        <el-option v-for="item in allValidMenuList" :key="item" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单排序:" prop="sequenceNumber">
                    <el-input v-model.number="sysMenu.sequenceNumber" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddUpdate('/menuAdd')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="updateVisible" class="add-update-dialog">
            <el-form :model="sysMenu" inline label-width="120px" size="mini">
                <el-form-item label="菜单路径:">
                    <el-input v-model="sysMenu.menuPath" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单名称:" prop="menuName">
                    <el-input v-model="sysMenu.menuName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标:" prop="menuIcon">
                    <el-input v-model="sysMenu.menuIcon" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="父级ID:">
                    <el-select v-model="sysMenu.parentId" placeholder="父级">
                        <el-option v-for="item in allValidMenuList" :key="item" :value="item.id" :label="item.name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="菜单排序:" prop="sequenceNumber">
                    <el-input v-model.number="sysMenu.sequenceNumber" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddUpdate('/menuUpdate')">确定</el-button>
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
                sysMenuVO: {
                    page: 1,
                    size: 10,
                    sortLabel: null,
                    sortOrder: null,
                    idList: [],
                    menuName: null,
                    parentId: null,
                    sequenceNumber: null,
                },
                pageBean: {
                    page: 1,
                    total: 0,
                    data: [],
                },
                sysMenu: {
                    gid: null,
                    menuPath: null,
                    menuName: null,
                    menuIcon: null,
                    parentId: null,
                    sequenceNumber: null,
                },
                allValidMenuList: [],
                rules: {
                    menuName: [{ required: true, message: '菜单名称不能为空'}],
                    menuIcon: [{ required: true, message: '菜单图标不能为空'}],
                    sequenceNumber: [{ required: true, message: '排序不能为空'},{ type: 'number', message: '排序必须为数字值'}],
                },
            }
        },
        methods: {
            handleSizeChange(val) {
                this.sysMenuVO.size = val;
                this.handleSearch();
            },
            handlePageChange(val) {
                this.sysMenuVO.page = val;
                this.handleSearch();
            },
            handleSearch() {
                this.$axios.post("/menuList", this.sysMenuVO).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.pageBean = data.data;
                    }
                });
            },
            handleSort(data) {
                switch (data.prop) {
                    case "sequenceNumber":
                        this.sysMenuVO.sortLabel = "sequence_number";
                        break;
                }
                this.sysMenuVO.sortOrder = data.order ? data.order.replace("ending", "") : null;
                this.handleSearch();
            },
            handleFilterChange(data) {
                this.handleSearch();
            },
            handleSetProperties(row) {
                this.sysMenu.id = row.id;
                this.$axios.post("/menuDetail", this.sysMenu).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.sysMenu = data.data;
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
                this.addVisible = true;
            },
            handleClear() {
                for (let key in this.sysMenu) {
                    if (this.sysMenu.hasOwnProperty(key)) {
                        this.sysMenu[key] = null;
                    }
                }
            },
            handleAddUpdate(uri) {
                this.$axios.post(uri, this.sysMenu).then(response => {
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
            },
            selectToDelete(val) {
                let idList = [];
                for (let i = 0, size = val.length; i < size; i++) {
                    idList.push(val[i].id);
                }
                this.sysMenuVO.idList = idList;
            },
            handleDelete() {
                if (this.sysMenuVO.idList.length > 0) {
                    this.$confirm("确定删除选中的数据?", "提示", {type: "warning"}).then(() => {
                        this.$axios.post("/menuDelete", this.sysMenuVO).then(response => {
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
            this.$axios.post("/allValidMenu").then(response => {
               let data = response.data;
               if (data.status === 0) {
                   let menuList = [];
                   menuList.push({"id": 0, "name": "顶级"});
                   menuList.push(...data.data);
                   this.allValidMenuList = menuList;
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