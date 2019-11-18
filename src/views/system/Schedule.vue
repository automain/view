<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true" :model="sysScheduleVO" size="mini">
                <el-form-item>
                    <el-button type="success" icon="el-icon-plus" @click="handleAddShow">添加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="warning" icon="el-icon-delete" @click="handleDelete">删除</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-table ref="multipleTable" :data="pageBean.data" tooltip-effect="dark" :height="fullHeight" @selection-change="selectToDelete" @filter-change="handleFilterChange">
            <el-table-column type="selection" width="42" fixed="left"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="scheduleName" label="任务名称"></el-table-column>
            <el-table-column prop="scheduleUrl" label="任务地址" show-overflow-tooltip></el-table-column>
            <el-table-column prop="startExecuteTime" label="开始执行时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="delayTime" label="间隔时间(秒)" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="lastExecuteTime" label="上次执行时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
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
                <el-form-item label="间隔时间(秒):" prop="delayTime">
                    <el-date-picker v-model="delayTimePicker" type="datetime" placeholder="请选择间隔时间(秒)" value-format="timestamp" @change="function(val){sysSchedule.delayTime = val / 1000}"></el-date-picker>
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
                <el-form-item label="间隔时间(秒):" prop="delayTime">
                    <el-date-picker v-model="delayTimePicker" type="datetime" placeholder="请选择间隔时间(秒)" value-format="timestamp" @change="function(val){sysSchedule.delayTime = val / 1000}"></el-date-picker>
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
            return {
                addVisible: false,
                updateVisible: false,
                startExecuteTimePicker: null,
                delayTimePicker: null,
                sysScheduleVO: {
                    page: 1,
                    size: 10,
                    idList: [],
                },
                pageBean: {
                    page: 1,
                    total: 0,
                    data: [],
                },
                sysSchedule: {
                    gid: null,
                    scheduleName: null,
                    scheduleUrl: null,
                    startExecuteTime: null,
                    delayTime: null,
                },
                rules: {
                    scheduleName: [{required: true, message: '任务名称不能为空'}],
                    scheduleUrl: [{required: true, message: '任务地址不能为空'}],
                    startExecuteTime: [{required: true, message: '开始执行时间不能为空'}],
                    delayTime: [{required: true, message: '间隔时间(秒)不能为空'}],
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
                this.delayTimePicker = row.delayTime * 1000;
                this.updateVisible = true;
            },
            handleAddShow() {
                this.handleClear();
                if (this.$refs['sysScheduleAdd']) {
                    this.$refs['sysScheduleAdd'].resetFields();
                }
                this.startExecuteTimePicker = null;
                this.delayTimePicker = null;
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
            selectToDelete(val) {
                let idList = [];
                for (let i = 0, size = val.length; i < size; i++) {
                    idList.push(val[i].id);
                }
                this.sysScheduleVO.idList = idList;
            },
            handleDelete() {
                if (this.sysScheduleVO.idList.length > 0) {
                    this.$confirm("确定删除选中的数据?", "提示", {type: "warning"}).then(() => {
                        this.$axios.post("/scheduleDelete", this.sysScheduleVO).then(response => {
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