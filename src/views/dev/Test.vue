<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true" :model="testVO" size="mini">
                <el-form-item>
                    <el-button type="success" icon="el-icon-plus" @click="handleAddShow">添加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" icon="el-icon-delete" @click="handleDelete">删除</el-button>
                </el-form-item>
                <el-form-item label="创建时间:">
                    <el-date-picker v-model="createTimeRange" type="datetimerange" start-placeholder="开始时间" end-placeholder="结束时间" :onPick="handleCreateTimeRange()" value-format="timestamp"></el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-table ref="multipleTable" :data="pageBean.data" tooltip-effect="dark" :height="fullHeight" @selection-change="selectToDelete" @sort-change="handleSort" @filter-change="handleFilterChange">
            <el-table-column type="selection" width="42" fixed="left"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="160" :formatter="dateTimeFormatter" sortable="custom"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="money" label="金额"></el-table-column>
            <el-table-column prop="remark" label="备注" show-overflow-tooltip></el-table-column>
            <el-table-column prop="testName" label="测试名称"></el-table-column>
            <el-table-column prop="testDictionary" label="测试字典(0:字典0,1:字典1,2:字典2)" column-key="testDictionary" :filters="testDictionaryMap">
                <template slot-scope="scope">
                    {{scope.row.testDictionary | dictionaryFilter(testDictionaryKey)}}
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                    <el-button @click="handleUpdateShow(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="handleDetail(scope.row)" type="text" size="small">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :page-sizes="[10, 20, 50, 100]" :page-size="testVO.size" layout="->, total, prev, pager, next, jumper, sizes" :total="pageBean.total"></el-pagination>
        <el-dialog title="添加" :visible.sync="addVisible" class="add-update-dialog">
            <el-form :model="test" ref="testAdd" :rules="rules" inline label-width="120px" size="mini">
                <el-form-item label="创建时间:" prop="createTime">
                    <el-date-picker v-model="createTimePicker" type="datetime" placeholder="请选择创建时间" value-format="timestamp" @change="function(val){test.createTime = val / 1000}"></el-date-picker>
                </el-form-item>
                <el-form-item label="金额:" prop="money">
                    <el-input v-model="test.money" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注:" prop="remark">
                    <el-input v-model="test.remark" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="测试名称:" prop="testName">
                    <el-input v-model="test.testName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="测试字典(0:字典0,1:字典1,2:字典2):" prop="testDictionary">
                    <el-select v-model="test.testDictionary" placeholder="请选择测试字典(0:字典0,1:字典1,2:字典2)">
                        <el-option v-for="item in testDictionaryMap" :key="item.value" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddUpdate('/testAdd', 'testAdd')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="updateVisible" class="add-update-dialog">
            <el-form :model="test" ref="testUpdate" :rules="rules" inline label-width="120px" size="mini">
                <el-form-item label="创建时间:" prop="createTime">
                    <el-date-picker v-model="createTimePicker" type="datetime" placeholder="请选择创建时间" value-format="timestamp" @change="function(val){test.createTime = val / 1000}"></el-date-picker>
                </el-form-item>
                <el-form-item label="金额:" prop="money">
                    <el-input v-model="test.money" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注:" prop="remark">
                    <el-input v-model="test.remark" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="测试名称:" prop="testName">
                    <el-input v-model="test.testName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="测试字典(0:字典0,1:字典1,2:字典2):" prop="testDictionary">
                    <el-select v-model="test.testDictionary" placeholder="请选择测试字典(0:字典0,1:字典1,2:字典2)">
                        <el-option v-for="item in testDictionaryMap" :key="item.value" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddUpdate('/testUpdate', 'testUpdate')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="详情" :visible.sync="detailVisible">
            <el-form inline label-width="120px" size="mini">
                <el-form-item label="创建时间:">
                    {{test.createTime | dateTimeFilter}}
                </el-form-item>
                <el-form-item label="更新时间:">
                    {{test.updateTime | dateTimeFilter}}
                </el-form-item>
                <el-form-item label="金额:">
                    {{test.money}}
                </el-form-item>
                <el-form-item label="备注:">
                    {{test.remark}}
                </el-form-item>
                <el-form-item label="测试名称:">
                    {{test.testName}}
                </el-form-item>
                <el-form-item label="测试字典(0:字典0,1:字典1,2:字典2):">
                    {{test.testDictionary | dictionaryFilter(testDictionaryKey)}}
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                addVisible: false,
                updateVisible: false,
                detailVisible: false,
                createTimeRange: [],
                createTimePicker: null,
                testVO: {
                    page: 1,
                    size: 10,
                    sortLabel: null,
                    sortOrder: null,
                    gidList: [],
                    createTime: null,
                    createTimeEnd: null,
                    testDictionaryList: [],
                },
                pageBean: {
                    page: 1,
                    total: 0,
                    data: [],
                },
                test: {
                    gid: null,
                    createTime: null,
                    updateTime: null,
                    money: null,
                    remark: null,
                    testName: null,
                    testDictionary: null,
                },
                testDictionaryKey: "test_test_dictionary",
                testDictionaryMap: this.getDictionaryMap("test_test_dictionary"),
                rules: {
                    createTime: [{required: true, message: '创建时间不能为空'}],
                    testName: [{required: true, message: '测试名称不能为空'}],
                    testDictionary: [{required: true, message: '测试字典(0:字典0,1:字典1,2:字典2)不能为空'}],
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
            handleCreateTimeRange() {
                if (this.createTimeRange) {
                    this.testVO.createTime = this.createTimeRange[0] / 1000;
                    this.testVO.createTimeEnd = this.createTimeRange[1] / 1000;
                } else {
                    this.testVO.createTime = null;
                    this.testVO.createTimeEnd = null;
                }
            },
            handleSort(data) {
                switch (data.prop) {
                    case "createTime":
                        this.testVO.sortLabel = "create_time";
                        break;
                }
                this.testVO.sortOrder = data.order ? data.order.replace("ending", "") : null;
                this.handleSearch();
            },
            handleFilterChange(data) {
                this.testVO.testDictionaryList = data.testDictionary;
                this.handleSearch();
            },
            handleSetProperties(row) {
                this.test.gid = row.gid;
                this.$axios.post("/testDetail", this.test).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.test = data.data;
                    } else {
                        this.$message.error("操作失败");
                    }
                });
            },
            handleUpdateShow(row) {
                this.handleSetProperties(row);
                this.createTimePicker = row.createTime * 1000;
                this.updateVisible = true;
            },
            handleDetail(row) {
                this.handleSetProperties(row);
                this.detailVisible = true;
            },
            handleAddShow() {
                this.handleClear();
                if (this.$refs['testAdd']) {
                    this.$refs['testAdd'].resetFields();
                }
                this.createTimePicker = null;
                this.addVisible = true;
            },
            handleClear() {
                for (let key in this.test) {
                    if (this.test.hasOwnProperty(key)) {
                        this.test[key] = null;
                    }
                }
            },
            handleAddUpdate(uri, formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(uri, this.test).then(response => {
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
                this.testVO.gidList = gidList;
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