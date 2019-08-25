<template>
  <div>
    <el-card class="box-card">
      <el-form :inline="true" :model="formInline" size="mini">
        <el-form-item>
          <el-button type="success" icon="el-icon-plus" @click="addFormVisible = true">添加</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" icon="el-icon-delete">删除</el-button>
        </el-form-item>
        <el-form-item label="审批人">
          <el-input v-model="formInline.user" placeholder="审批人"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="formInline.region" placeholder="活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="value1" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" :onPick="selectDate()" value-format="timestamp"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" :height="fullHeight" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="42" fixed="left"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" class="table-expand">
            <el-form-item label="日期">
              <span>{{ props.row.date | dateTimeFilter}}</span>
            </el-form-item>
            <el-form-item label="姓名">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="日期" width="160" :formatter="formatDateTime"></el-table-column>
      <el-table-column prop="name" label="姓名" width="160"></el-table-column>
      <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100]" :page-size="10" layout="->, total, prev, pager, next, jumper, sizes" :total="400"></el-pagination>
    <el-dialog title="收货地址" :visible.sync="addFormVisible" class="add-form-dialog">
      <el-form :model="form" inline label-width="120px" size="mini">
        <el-form-item label="活动名称">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="value2" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    let tables = [];
    for (let i = 0; i < 3; i++) {
      let item = {
        id: i,
        date: 1563552000000,
        name: "王小虎",
        address:
          "上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄上海市普陀区金沙江路 1518 弄"
      };
      tables.push(item);
    }
    return {
      formInline: {
        user: "",
        region: ""
      },
      value1: [],
      value2: "",
      tableData: tables,
      multipleSelection: [],
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      addFormVisible: false
    };
  },
  methods: {
    onSubmit() {},
    selectDate() {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleClick(row) {},
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  computed: {
    fullHeight() {
      return this.$store.state.fullHeight - 140;
    }
  }
};
</script>