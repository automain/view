<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true" :model="testVO" size="mini">
                <el-form-item>
                    <el-button type="success" icon="el-icon-plus" @click="handleClear(true)">添加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" icon="el-icon-delete" @click="handleDelete">删除</el-button>
                </el-form-item>
                <el-form-item label="测试名称">
                    <el-input v-model="testVO.testName" placeholder="测试名称"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker v-model="createTimeRange" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" :onPick="selectCreateTime()" value-format="timestamp"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-table ref="multipleTable" :data="pageBean.data" tooltip-effect="dark" :height="fullHeight" @selection-change="selectToDelete">
            <el-table-column type="selection" width="42" fixed="left"></el-table-column>
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" class="table-expand">
                        <el-form-item label="创建时间">
                            <span>{{ props.row.createTime | dateTimeFilter}}</span>
                        </el-form-item>
                        <el-form-item label="更新时间">
                            <span>{{ props.row.updateTime | dateTimeFilter}}</span>
                        </el-form-item>
                        <el-form-item label="测试名称">
                            <span>{{ props.row.testName }}</span>
                        </el-form-item>
                        <el-form-item label="测试字典">
                            <span>{{ props.row.testDictionary | dictionaryFilter('test', 'test_dictionary')}}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="testName" label="测试名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="testDictionary" label="测试字典">
                <template slot-scope="scope">
                    {{scope.row.testDictionary | dictionaryFilter('test', 'test_dictionary')}}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleUpdate(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :page-sizes="[10, 20, 50, 100]" :page-size="testVO.size" layout="->, total, prev, pager, next, jumper, sizes" :total="pageBean.total"></el-pagination>
        <el-dialog title="添加/编辑" :visible.sync="addFormVisible" class="add-form-dialog">
            <el-form :model="test" inline label-width="120px" size="mini">
                <el-form-item label="金额">
                    <el-input v-model="test.money" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input type="textarea" v-model="test.remark"></el-input>
                </el-form-item>
                <el-form-item label="测试名称">
                    <el-input v-model="test.testName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker v-model="createTimePicker" type="datetime" placeholder="请选择创建时间" value-format="timestamp" @change="function(val){test.createTime = val / 1000}"></el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClear(false)">取消</el-button>
                <el-button type="primary" @click="handleAddOrUpdate">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                addFormVisible: false,
                createTimeRange: [],
                createTimePicker: null,
                testVO: {
                    page: 1,
                    size: 10,
                    gidList: [],
                    createTime: null,
                    createTimeEnd: null,
                    updateTime: null,
                    updateTimeEnd: null,
                    testName: null,
                },
                pageBean: {
                    page: 1,
                    total: 0,
                    data: [],
                },
                test: {
                    gid: null,
                    money: null,
                    remark: null,
                    testName: null,
                    createTime: null,
                    testDictionary: null,
                },
            }
        },
        methods: {
            handleSizeChange(val) {
                this.testVO.size = val;
                this.handleSearch();
            },
            handlePageChange(val) {
                this.testVO.page = val;
                this.handleSearch();
            },
            handleSearch() {
                this.$axios.post("/testList", this.testVO).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.pageBean = data.data;
                    }
                });
            },
            selectCreateTime() {
                if (this.createTimeRange) {
                    this.testVO.createTime = this.createTimeRange[0] / 1000;
                    this.testVO.createTimeEnd = this.createTimeRange[1] / 1000;
                } else {
                    this.testVO.createTime = null;
                    this.testVO.createTimeEnd = null;
                }
            },
            handleUpdate(row) {
                this.test.gid = row.gid;
                this.test.money = row.money;
                this.test.remark = row.remark;
                this.test.testName = row.testName;
                this.test.createTime = row.createTime;
                this.createTimePicker = row.createTime * 1000;
                this.addFormVisible = true;
            },
            selectToDelete(val) {
                let gidList = [];
                for (let i = 0, size = val.length; i < size; i++) {
                    gidList.push(val[i].gid);
                }
                this.testVO.gidList = gidList;
            },
            handleClear(visible) {
                for (let key in this.test) {
                    if (this.test.hasOwnProperty(key)) {
                        this.test[key] = null;
                    }
                }
                this.createTimePicker = null;
                this.addFormVisible = visible;
            },
            handleAddOrUpdate() {
                this.$axios.post("/testAddOrUpdate", this.test).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.$message.success("操作成功");
                        this.handleClear(false);
                        this.handleSearch();
                    } else {
                        this.$message.error("操作失败");
                    }
                });
            },
            handleDelete() {
                if (this.testVO.gidList.length > 0) {
                    this.$confirm("确定删除选中的数据?", "提示", {type: "warning"}).then(() => {
                        this.$axios.post("/testDelete", this.testVO).then(response => {
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