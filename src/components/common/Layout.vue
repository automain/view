<template>
  <div>
    <el-container>
      <el-aside class="sidebar-container" width="210px">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            class="sidebar-menu"
            background-color="#304156"
            text-color="#bfcbd9"
            :default-openeds="defaultOpeneds"
          >
            <el-submenu class="next-menu" index="1">
              <template slot="title">
                <i class="el-icon-message"></i>导航一
              </template>
              <el-submenu index="1-1">
                <template slot="title">导航1-1</template>
                <el-submenu index="1-1-1">
                  <template slot="title">导航1-1-1</template>
                  <el-menu-item index="1-1-1">选项1-1-1-1</el-menu-item>
                </el-submenu>
              </el-submenu>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-menu"></i>导航二
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="2-4">
                <template slot="title">选项4</template>
                <el-menu-item index="2-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-setting"></i>导航三
              </template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="3-1">选项1</el-menu-item>
                <el-menu-item index="3-2">选项2</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="分组2">
                <el-menu-item index="3-3">选项3</el-menu-item>
              </el-menu-item-group>
              <el-submenu index="3-4">
                <template slot="title">选项4</template>
                <el-menu-item index="3-4-1">选项4-1</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container class="main-container">
        <el-header class="fixed-header">
          <div class="hamburger-container">
            <i class="el-icon-s-fold"></i>
          </div>
          <div class="breadcrumb-container">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>
                <a href="/">活动管理</a>
              </el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="right-menu">
            <el-dropdown>
              <i class="el-icon-setting"></i>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>查看</el-dropdown-item>
                <el-dropdown-item>新增</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <span>王小虎</span>
          </div>
        </el-header>

        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="日期" width="140"></el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="address" label="地址"></el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="scss">
.sidebar-container {
  background-color: #304156;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  overflow: hidden;
  // reset element-ui css
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
  // menu hover
  .submenu-title-noDropdown,
  .el-submenu__title {
    i {
      color: #bfcbd9;
    }
    &:hover {
      background-color: #263445 !important;
    }
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .el-scrollbar {
    height: 100%;
  }
  & .next-menu .el-submenu > .el-submenu__title,
  & .el-submenu .el-menu-item {
    background-color: #1f2d3d !important;

    &:hover {
      background-color: #001528 !important;
    }
  }
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  margin-left: 210px;
  position: relative;
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - 210px);
    -webkit-transition: width 0.28s;
    transition: width 0.28s;
    padding: 0 10px;
    background: #ffffff;
  }
  .hamburger-container {
    padding: 10px;
    line-height: 20px;
    height: 100%;
    float: left;
    cursor: pointer;
    font-size: 20px;
  }
  .breadcrumb-container {
    padding: 15px;
    display: inline-block;
  }
  .right-menu {
    float: right;
    height: 100%;
  }
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      defaultOpeneds: ["1", "2", "3"],
      tableData: Array(20).fill(item)
    };
  }
};
</script>