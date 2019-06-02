<template>
  <div>
    <el-container>
      <el-aside class="sidebar-container" width="210px">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            class="sidebar-menu"
            background-color="#20222A"
            text-color="#f5fffa"
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
        <el-header height="50px" class="fixed-header">
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
          <div class="right-menu-container">
            <el-dropdown class="info-drop-down">
              <div class="head-img-container">
                <img
                  class="head-img"
                  src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
                  alt="头像"
                >
                <div class="user-name">
                  王小虎
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>基本资料</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item divided>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>

        <el-main>
          <el-tabs v-model="editableTabsValue" type="border-card" closable @tab-remove="removeTab">
            <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title">
              <el-table :data="tableData">
                <el-table-column prop="date" label="日期" width="140"></el-table-column>
                <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="scss">
body {
  margin: 0px;
}
.sidebar-container {
  background-color: #20222a;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  overflow: hidden;
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
  .submenu-title-noDropdown,
  .el-submenu__title {
    i {
      color: #f5fffa;
    }
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
    margin-right: -18px !important;
  }

  .el-scrollbar__bar.is-vertical {
    right: 0px;
  }

  .el-scrollbar {
    height: 100%;
  }
  & .next-menu .el-submenu > .el-submenu__title,
  & .el-submenu .el-menu-item {
    background-color: #1a1b22 !important;
    &:hover {
      background-color: #000000 !important;
    }
  }
}

.main-container {
  min-height: 100%;
  transition: margin-left 0.28s;
  padding-left: 210px;
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
    background: #f5fffa;
    .hamburger-container {
      padding-left: 5px;
      padding-top: 7px;
      float: left;
      cursor: pointer;
      font-size: 25px;
    }
    .breadcrumb-container {
      padding: 18px;
      display: inline-block;
    }
    .right-menu-container {
      float: right;
      height: 100%;
      .info-drop-down {
        cursor: pointer;
        .head-img-container {
          height: 40px;
          padding-top: 6px;
        }
        .head-img {
          border-radius: 10px;
          width: 40px;
          height: 40px;
        }
        .user-name {
          float: right;
          padding-top: 12px;
          padding-left: 10px;
        }
      }
    }
  }
  .el-main {
    padding: 50px 10px 10px 10px;
    background-color: #f5fffa;
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
      tableData: Array(20).fill(item),
      editableTabsValue: "2",
      editableTabs: [
        {
          title: "Tab 1",
          name: "1",
          content: "Tab 1 content"
        },
        {
          title: "Tab 2",
          name: "2",
          content: "Tab 2 content"
        }
      ],
      tabIndex: 2
    };
  },
  methods: {
    addTab(targetName) {
      let newTabName = ++this.tabIndex + "";
      this.editableTabs.push({
        title: "New Tab",
        name: newTabName,
        content: "New Tab content"
      });
      this.editableTabsValue = newTabName;
    },
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }

      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    }
  }
};
</script>