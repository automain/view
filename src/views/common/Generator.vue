<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true" :model="generatorVO" size="mini">
                <el-form-item label="数据库:">
                    <el-select v-model="generatorVO.databaseName" placeholder="请选择数据库" @change="getTables">
                        <el-option v-for="item in databaseList" :key="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="表:">
                    <el-select v-model="generatorVO.tableName" placeholder="请选择表" @change="getColumns">
                        <el-option v-for="item in tableList" :key="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务前缀:">
                    <el-input v-model="generatorVO.prefix" placeholder="请输入业务前缀"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-document-copy" @click="copy('#service-container')" id="service-container" :data-clipboard-text="serviceContainer">复制serviceContainer</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-document-copy" @click="copy('#bean')" id="bean" :data-clipboard-text="bean">复制bean</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" icon="el-icon-download" @click="generate">生成</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-table :data="columnList" style="width: 100%">
            <el-table-column prop="columnName" label="列名" width="200"></el-table-column>
            <el-table-column prop="dataType" label="类型" width="100"></el-table-column>
            <el-table-column width="100">
                <template slot="header" slot-scope="scope">
                    <el-checkbox v-model="addAllCheck" @change="addAll" :indeterminate="addIndeterminate">添加列</el-checkbox>
                </template>
                <template slot-scope="scope">
                    <el-checkbox v-model="generatorVO.addCheck" :label="scope.row.columnName" @change="checkAddAll" :checked="true">添加</el-checkbox>
                </template>
            </el-table-column>
            <el-table-column width="100">
                <template slot="header" slot-scope="scope">
                    <el-checkbox v-model="updateAllCheck" @change="updateAll" :indeterminate="updateIndeterminate">编辑列</el-checkbox>
                </template>
                <template slot-scope="scope">
                    <el-checkbox v-model="generatorVO.updateCheck" :label="scope.row.columnName" @change="checkUpdateAll" :checked="true">编辑</el-checkbox>
                </template>
            </el-table-column>
            <el-table-column width="100">
                <template slot="header" slot-scope="scope">
                    <el-checkbox v-model="detailAllCheck" @change="detailAll" :indeterminate="detailIndeterminate">详情列</el-checkbox>
                </template>
                <template slot-scope="scope">
                    <el-checkbox v-model="generatorVO.detailCheck" :label="scope.row.columnName" @change="checkDetailAll" :checked="true">详情</el-checkbox>
                </template>
            </el-table-column>
            <el-table-column width="100">
                <template slot="header" slot-scope="scope">
                    <el-checkbox v-model="listAllCheck" @change="listAll" :indeterminate="listIndeterminate">列表列</el-checkbox>
                </template>
                <template slot-scope="scope">
                    <el-checkbox v-model="generatorVO.listCheck" :label="scope.row.columnName" @change="checkListAll" :checked="true">列表</el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="搜索列" width="100">
                <template slot-scope="scope">
                    <el-checkbox v-model="generatorVO.searchCheck" :label="scope.row.columnName">搜索</el-checkbox>
                </template>
            </el-table-column>
            <el-table-column prop="columnComment" label="备注"></el-table-column>
        </el-table>
    </div>
</template>
<script>
    import Clipboard from "clipboard";

    export default {
        data() {
            return {
                addAllCheck: true,
                addIndeterminate: false,
                updateAllCheck: true,
                updateIndeterminate: false,
                detailAllCheck: true,
                detailIndeterminate: false,
                listAllCheck: true,
                listIndeterminate: false,
                databaseList: [],
                tableList: [],
                columnList: [],
                columnNameList: [],
                serviceContainer: "",
                bean: "",
                generatorVO: {
                    databaseName: "",
                    tableName: "",
                    prefix: "",
                    addCheck: [],
                    updateCheck: [],
                    detailCheck: [],
                    listCheck: [],
                    searchCheck: []
                }
            };
        },
        methods: {
            generate() {
                if (this.generatorVO.prefix === "") {
                    this.$message.error("请输入业务前缀");
                } else {
                    this.$axios.post("/dev/generate", this.generatorVO, {responseType: 'blob'}).then(response => {
                        this.download(response);
                    });
                }
            },
            addAll(checked) {
                this.generatorVO.addCheck = checked ? this.columnNameList : [];
                this.addIndeterminate = false;
            },
            checkAddAll(checked) {
                this.addAllCheck = this.generatorVO.addCheck.length === this.columnNameList.length;
                this.addIndeterminate = !this.addAllCheck && this.generatorVO.addCheck.length > 0;
            },
            updateAll(checked) {
                this.generatorVO.updateCheck = checked ? this.columnNameList : [];
                this.updateIndeterminate = false;
            },
            checkUpdateAll(checked) {
                this.updateAllCheck = this.generatorVO.updateCheck.length === this.columnNameList.length;
                this.updateIndeterminate = !this.updateAllCheck && this.generatorVO.updateCheck.length > 0;
            },
            detailAll(checked) {
                this.generatorVO.detailCheck = checked ? this.columnNameList : [];
                this.detailIndeterminate = false;
            },
            checkDetailAll(checked) {
                this.detailAllCheck = this.generatorVO.detailCheck.length === this.columnNameList.length;
                this.detailIndeterminate = !this.detailAllCheck && this.generatorVO.detailCheck.length > 0;
            },
            listAll(checked) {
                this.generatorVO.listCheck = checked ? this.columnNameList : [];
                this.listIndeterminate = false;
            },
            checkListAll(checked) {
                this.listAllCheck = this.generatorVO.listCheck.length === this.columnNameList.length;
                this.listIndeterminate = !this.listAllCheck && this.generatorVO.listCheck.length > 0;
            },
            copy(id) {
                if (this.generatorVO.databaseName === "" || this.generatorVO.tableName === "") {
                    this.$message.error("请选择数据库和表");
                } else {
                    let clipboard = new Clipboard(id);
                    clipboard.on("success", e => {
                        this.$message.success("复制成功");
                        clipboard.destroy();
                    });
                    clipboard.on("error", e => {
                        this.$message.error("该浏览器不支持自动复制");
                        clipboard.destroy();
                    });
                }
            },
            getTables() {
                this.$axios.post("/dev/tableList", this.generatorVO).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.tableList = data.data;
                    }
                });
            },
            getColumns() {
                this.$axios.post("/dev/columnList", this.generatorVO).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.serviceContainer = data.data.serviceContainer;
                        this.bean = data.data.bean;
                        let columns = [];
                        let columnNames = [];
                        let columnList = data.data.columnList;
                        for (let i = 0, size = columnList.length; i < size; i++) {
                            let columnName = columnList[i].columnName;
                            if (columnName !== "id" && columnName !== "gid") {
                                columns.push(columnList[i]);
                                columnNames.push(columnName);
                            }
                        }
                        this.columnList = columns;
                        this.columnNameList = columnNames;
                        this.addAll(true);
                        this.updateAll(true);
                        this.detailAll(true);
                        this.listAll(true);
                    }
                });
            }
        },
        mounted() {
            this.$axios.post("/dev/databaseList").then(response => {
                let data = response.data;
                if (data.status === 0) {
                    this.databaseList = data.data;
                }
            });
        }
    };
</script>