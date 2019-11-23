<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true" :model="sysScheduleVO" size="mini">
                <el-form-item>
                    <el-button type="success" icon="el-icon-plus" @click="handleAddShow">添加</el-button>
                </el-form-item>
                <el-form-item label="任务名称:">
                    <el-input v-model="sysScheduleVO.scheduleName" placeholder="任务名称"></el-input>
                </el-form-item>
                <el-form-item label="任务地址:">
                    <el-input v-model="sysScheduleVO.scheduleUrl" placeholder="任务地址"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-table ref="multipleTable" :data="pageBean.data" tooltip-effect="dark" :height="fullHeight" @filter-change="handleFilterChange">
            <el-table-column prop="createTime" label="创建时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="scheduleName" label="任务名称"></el-table-column>
            <el-table-column prop="scheduleUrl" label="任务地址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="startExecuteTime" label="开始执行时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="period" label="间隔时间(秒)"></el-table-column>
            <el-table-column prop="lastExecuteTime" label="上次执行时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="isValid" label="是否启用" width="160" :formatter="isValidFormatter"></el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.isValid === 1" @click="handleInValid(scope.row)" type="text" size="small">禁用</el-button>
                    <el-button v-if="scope.row.isValid === 0" @click="handleValid(scope.row)" type="text" size="small">启用</el-button>
                    <el-button @click="handleUpdateShow(scope.row)" type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :page-sizes="[10, 20, 50, 100]" :page-size="sysScheduleVO.size" layout="->, total, prev, pager, next, jumper, sizes" :total="pageBean.total"></el-pagination>
        <el-dialog title="添加" :visible.sync="addVisible" class="add-update-dialog">
            <el-form :model="sysSchedule" ref="sysScheduleAdd" :rules="rules" inline label-width="120px" size="mini">
                <el-form-item label="任务名称:" prop="scheduleName">
                    <el-input v-model="sysSchedule.scheduleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务地址:" prop="scheduleUrl">
                    <el-input v-model="sysSchedule.scheduleUrl" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="开始执行时间:" prop="startExecuteTime">
                    <el-date-picker v-model="startExecuteTimePicker" type="datetime" placeholder="请选择开始执行时间" value-format="timestamp" @change="function(val){sysSchedule.startExecuteTime = val / 1000}"></el-date-picker>
                </el-form-item>
                <el-form-item label="间隔时间(秒):" prop="period">
                    <el-input v-model.number="sysSchedule.period" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddUpdate('/scheduleAdd', 'sysScheduleAdd')">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="编辑" :visible.sync="updateVisible" class="add-update-dialog">
            <el-form :model="sysSchedule" ref="sysScheduleUpdate" :rules="rules" inline label-width="120px" size="mini">
                <el-form-item label="任务名称:" prop="scheduleName">
                    <el-input v-model="sysSchedule.scheduleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务地址:" prop="scheduleUrl">
                    <el-input v-model="sysSchedule.scheduleUrl" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="开始执行时间:" prop="startExecuteTime">
                    <el-date-picker v-model="startExecuteTimePicker" type="datetime" placeholder="请选择开始执行时间" value-format="timestamp" @change="function(val){sysSchedule.startExecuteTime = val / 1000}"></el-date-picker>
                </el-form-item>
                <el-form-item label="间隔时间(秒):" prop="period">
                    <el-input v-model.number="sysSchedule.period" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="updateVisible = false">取消</el-button>
                <el-button type="primary" @click="handleAddUpdate('/scheduleUpdate', 'sysScheduleUpdate')">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            let validateScheduleUrl = (rule, value, callback) => {
                this.$axios.post("/checkScheduleExist?scheduleUrl=" + this.sysSchedule.scheduleUrl + "&id=" + this.sysSchedule.id).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        callback();
                    } else {
                        callback(new Error('任务地址已存在'));
                    }
                });
            };
            return {
                addVisible: false,
                updateVisible: false,
                startExecuteTimePicker: null,
                sysScheduleVO: {
                    page: 1,
                    size: 10,
                    scheduleName: null,
                    scheduleUrl: null,
                },
                pageBean: {
                    page: 1,
                    total: 0,
                    data: [],
                },
                sysSchedule: {
                    id: null,
                    scheduleName: null,
                    scheduleUrl: null,
                    startExecuteTime: null,
                    period: null,
                },
                rules: {
                    scheduleName: [{required: true, message: '任务名称不能为空'}],
                    scheduleUrl: [{required: true, message: '任务地址不能为空'}, {validator: validateScheduleUrl, trigger: 'blur'}],
                    startExecuteTime: [{required: true, message: '开始执行时间不能为空'}],
                    period: [{required: true, message: '间隔时间(秒)不能为空'}],
                },
            }
        },
        methods: {
            handleSizeChange(val) {
                this.sysScheduleVO.size = val;
                this.handleSearch();
            },
            handlePageChange(val) {
                this.sysScheduleVO.page = val;
                this.handleSearch();
            },
            handleSearch() {
                this.$axios.post("/scheduleList", this.sysScheduleVO).then(response => {
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
                this.sysSchedule.id = row.id;
                this.$axios.post("/scheduleDetail", this.sysSchedule).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.sysSchedule = data.data;
                    } else {
                        this.$message.error("操作失败");
                    }
                });
            },
            handleUpdateShow(row) {
                this.handleSetProperties(row);
                this.startExecuteTimePicker = row.startExecuteTime * 1000;
                this.updateVisible = true;
            },
            handleAddShow() {
                this.handleClear();
                if (this.$refs['sysScheduleAdd']) {
                    this.$refs['sysScheduleAdd'].resetFields();
                }
                this.startExecuteTimePicker = null;
                this.addVisible = true;
            },
            handleClear() {
                for (let key in this.sysSchedule) {
                    if (this.sysSchedule.hasOwnProperty(key)) {
                        this.sysSchedule[key] = null;
                    }
                }
            },
            handleAddUpdate(uri, formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post(uri, this.sysSchedule).then(response => {
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
            handleInValid(row) {
                this.$confirm("确定禁用?", "提示", {type: "warning"}).then(() => {
                    this.$axios.post("/scheduleInValid?id=" + row.id).then(response => {
                        let data = response.data;
                        if (data.status === 0) {
                            this.$message.success("操作成功");
                            this.handleSearch();
                        } else {
                            this.$message.error("操作失败");
                        }
                    });
                }).catch(() => {
                    this.$message.info("取消禁用");
                });
            },
            handleValid(row) {
                this.$confirm("确定启用?", "提示", {type: "warning"}).then(() => {
                    this.$axios.post("/scheduleValid?id=" + row.id).then(response => {
                        let data = response.data;
                        if (data.status === 0) {
                            this.$message.success("操作成功");
                            this.handleSearch();
                        } else {
                            this.$message.error("操作失败");
                        }
                    });
                }).catch(() => {
                    this.$message.info("取消启用");
                });
            },
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