<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true" :model="sysDictionaryVO" size="mini">
                <el-form-item>
                    <el-button type="success" icon="el-icon-plus" @click="handleAddShow">添加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" icon="el-icon-delete" @click="handleDelete">删除</el-button>
                </el-form-item>
                <el-form-item label="表名:">
                    <el-input v-model="sysDictionaryVO.tableName" placeholder="表名"></el-input>
                </el-form-item>
                <el-form-item label="字段名:">
                    <el-input v-model="sysDictionaryVO.columnName" placeholder="字段名"></el-input>
                </el-form-item>
                <el-form-item label="字典键:">
                    <el-input v-model="sysDictionaryVO.dictionaryKey" placeholder="字典键"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-table ref="multipleTable" :data="pageBean.data" tooltip-effect="dark" :height="fullHeight" @selection-change="selectToDelete"  @filter-change="handleFilterChange">
            <el-table-column type="selection" width="42" fixed="left"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="tableName" label="表名"></el-table-column>
            <el-table-column prop="columnName" label="字段名"></el-table-column>
            <el-table-column prop="dictionaryKey" label="字典键"></el-table-column>
            <el-table-column prop="dictionaryValue" label="字典值"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleUpdateShow(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :page-sizes="[10, 20, 50, 100]" :page-size="sysDictionaryVO.size" layout="->, total, prev, pager, next, jumper, sizes" :total="pageBean.total"></el-pagination>
        <el-dialog title="添加" :visible.sync="addVisible" class="add-update-dialog">
            <el-form :model="sysDictionary" inline label-width="120px" size="mini">
                <el-form-item label="表名:">
                    <el-input v-model="sysDictionary.tableName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="字段名:">
                    <el-input v-model="sysDictionary.columnName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="字典键:">
                    <el-input v-model="sysDictionary.dictionaryKey" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="字典值:">
                    <el-input v-model="sysDictionary.dictionaryValue" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddUpdate('/dictionaryAdd')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="updateVisible" class="add-update-dialog">
            <el-form :model="sysDictionary" inline label-width="120px" size="mini">
                <el-form-item label="表名:">
                    <el-input v-model="sysDictionary.tableName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="字段名:">
                    <el-input v-model="sysDictionary.columnName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="字典键:">
                    <el-input v-model="sysDictionary.dictionaryKey" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="字典值:">
                    <el-input v-model="sysDictionary.dictionaryValue" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddUpdate('/dictionaryUpdate')">确定</el-button>
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
                sysDictionaryVO: {
                    page: 1,
                    size: 10,
                    idList: [],
                    tableName: null,
                    columnName: null,
                    dictionaryKey: null,
                },
                pageBean: {
                    page: 1,
                    total: 0,
                    data: [],
                },
                sysDictionary: {
                    gid: null,
                    tableName: null,
                    columnName: null,
                    dictionaryKey: null,
                    dictionaryValue: null,
                },
            }
        },
        methods: {
            handleSizeChange(val) {
                this.sysDictionaryVO.size = val;
                this.handleSearch();
            },
            handlePageChange(val) {
                this.sysDictionaryVO.page = val;
                this.handleSearch();
            },
            handleSearch() {
                this.$axios.post("/dictionaryList", this.sysDictionaryVO).then(response => {
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
                this.sysDictionary.id = row.id;
                this.$axios.post("/dictionaryDetail", this.sysDictionary).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.sysDictionary = data.data;
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
                for (let key in this.sysDictionary) {
                    if (this.sysDictionary.hasOwnProperty(key)) {
                        this.sysDictionary[key] = null;
                    }
                }
            },
            handleAddUpdate(uri) {
                this.$axios.post(uri, this.sysDictionary).then(response => {
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
                this.sysDictionaryVO.idList = idList;
            },
            handleDelete() {
                if (this.sysDictionaryVO.idList.length > 0) {
                    this.$confirm("确定删除选中的数据?", "提示", {type: "warning"}).then(() => {
                        this.$axios.post("/dictionaryDelete", this.sysDictionaryVO).then(response => {
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