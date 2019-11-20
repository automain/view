<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true" :model="sysFileVO" size="mini">
                <el-form-item label="文件MD5值:">
                    <el-input v-model="sysFileVO.fileMd5" placeholder="文件MD5值"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="handleSearch()">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-table ref="multipleTable" :data="pageBean.data" tooltip-effect="dark" :height="fullHeight"  @filter-change="handleFilterChange">
            <el-table-column prop="createTime" label="创建时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="160" :formatter="dateTimeFormatter"></el-table-column>
            <el-table-column prop="fileExtension" label="文件扩展名"></el-table-column>
            <el-table-column prop="filePath" label="文件相对路径"></el-table-column>
            <el-table-column prop="fileSize" label="文件大小(字节)"></el-table-column>
            <el-table-column prop="fileMd5" label="文件MD5值"></el-table-column>
            <el-table-column prop="imageWidth" label="图片宽度"></el-table-column>
            <el-table-column prop="imageHeight" label="图片高度"></el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handlePageChange" :page-sizes="[10, 20, 50, 100]" :page-size="sysFileVO.size" layout="->, total, prev, pager, next, jumper, sizes" :total="pageBean.total"></el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sysFileVO: {
                    page: 1,
                    size: 10,
                    fileMd5: null,
                },
                pageBean: {
                    page: 1,
                    total: 0,
                    data: [],
                },
            }
        },
        methods: {
            handleSizeChange(val) {
                this.sysFileVO.size = val;
                this.handleSearch();
            },
            handlePageChange(val) {
                this.sysFileVO.page = val;
                this.handleSearch();
            },
            handleSearch() {
                this.$axios.post("/fileList", this.sysFileVO).then(response => {
                    let data = response.data;
                    if (data.status === 0) {
                        this.pageBean = data.data;
                    }
                });
            },
            handleFilterChange(data) {
                this.handleSearch();
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