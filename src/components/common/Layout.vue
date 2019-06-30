<template>
  <div :class="hamburgerClass">
    <el-container>
      <el-aside class="sidebar-container">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu class="sidebar-menu" :default-active="$route.path" :collapse="isCollapse" router>
            <el-menu-item index="/main">
              <i class="el-icon-s-home"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <Menu :menuData="this.menuData"></Menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container class="main-container">
        <el-header class="fixed-header">
          <div class="hamburger-container">
            <i :class="this.hamburgerIconClass" @click="menuCollapse()"></i>
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
                />
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
          <div>
            <el-tabs
              v-model="activeIndex"
              type="border-card"
              closable
              @tab-click="tabClick"
              @tab-remove="tabRemove"
            >
              <el-tab-pane
                :key="item.menuPath"
                v-for="(item, index) in openTab"
                :label="item.menuName"
                :name="item.menuPath"
              ></el-tab-pane>
            </el-tabs>
          </div>
          <div class="content-wrap">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="scss">
@import "../../assets/css/variables.scss";
body {
  margin: 0px;
}
.sidebar-container {
  background-color: $sideBarBackgroundColor;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  overflow: hidden;
  width: $sideBarWidth !important;
  transition: width 0.3s !important;
  -moz-transition: width 0.3s !important;
  -webkit-transition: width 0.3s !important;
  -o-transition: width 0.3s !important;
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out, 0s padding-right ease-in-out;
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
    margin-right: -18px !important;
    .sidebar-menu {
      background-color: $sideBarBackgroundColor;
    }
    .el-menu{
      border-right: none;
    }
  }

  .el-submenu__title,
  & .el-menu-item {
    color: $mainBackgroundColor !important;
    background-color: $menuBackgroundColor !important;
    &:hover {
      background-color: $hoverMenuBackgroundColor !important;
    }
    i {
      color: $mainBackgroundColor;
    }
  }

  .el-submenu.is-active,
  .el-menu-item.is-active {
    color: #409eff !important;
  }

  .el-scrollbar__bar .is-vertical {
    right: 0px;
  }

  .el-scrollbar {
    height: 100%;
  }
}

.main-container {
  min-height: 100%;
  padding-left: $sideBarWidth;
  transition: padding-left 0.3s !important;
  -moz-transition: padding-left 0.3s !important;
  -webkit-transition: padding-left 0.3s !important;
  -o-transition: padding-left 0.3s !important;
  position: relative;
  .fixed-header {
    position: fixed;
    top: 0;
    z-index: 9;
    float: left;
    height: 50px !important;
    width: calc(100% - #{$sideBarWidth});
    padding: 0 10px;
    background: $mainBackgroundColor;
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
    background-color: $mainBackgroundColor;
    .el-tabs__header{
      border-bottom: none;
    }
    .el-tabs__content {
      padding: 0px;
    }
    .content-wrap{
      background: #FFF;
      border: 1px solid #DCDFE6;
      border-top: none;
      -webkit-box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
      box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    }
  }
}
.hideSidebar {
  .sidebar-container {
    width: $hideBarWidth !important;
  }

  .main-container {
    padding-left: $hideBarWidth;
    .fixed-header {
      width: calc(100% - #{$hideBarWidth});
    }
  }

  .el-submenu {
    overflow: hidden;
    & > .el-submenu__title > .el-submenu__icon-arrow {
      display: none;
    }
  }
  .el-menu--collapse {
    .el-submenu {
      & > .el-submenu__title {
        & > span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
      }
    }
  }
}
</style>
<script>
import Menu from "@/components/common/Menu";
export default {
  components: { Menu },
  data() {
    return {
      menuData: [
        {
          menuId: "1",
          menuName: "菜单1",
          menuIcon: "el-icon-user",
          children: [
            {
              menuId: "2",
              menuName: "菜单11",
              menuIcon: "el-icon-location",
              children: [
                {
                  menuId: "3",
                  menuPath: "/tableTest",
                  menuName: "表格",
                  menuIcon: "el-icon-circle-plus"
                }
              ]
            }
          ]
        }
      ],
      isCollapse: false,
      hamburgerIconClass: "el-icon-s-fold"
    };
  },
  methods: {
    menuCollapse() {
      this.isCollapse = !this.isCollapse;
      this.isCollapse
        ? (this.hamburgerIconClass = "el-icon-s-unfold")
        : (this.hamburgerIconClass = "el-icon-s-fold");
    },
    tabClick() {
      this.$router.push({ path: this.activeIndex });
    },
    tabRemove(menuPath) {
      if (menuPath == "/" || menuPath == "/main") {
        return;
      }
      this.$store.commit("delete_tabs", menuPath);
      if (this.activeIndex === menuPath) {
        if (this.openTab && this.openTab.length >= 1) {
          this.$store.commit(
            "set_active_index",
            this.openTab[this.openTab.length - 1].route
          );
          this.$router.push({ path: this.activeIndex });
        } else {
          this.$router.push({ path: "/" });
        }
      }
    }
  },
  mounted() {
    if (this.$route.path !== "/" && this.$route.path !== "/main") {
      this.$store.commit("add_tabs", { menuPath: "/main", menuName: "首页" });
      this.$store.commit("add_tabs", {
        menuPath: this.$route.path,
        menuName: this.$route.name
      });
      this.$store.commit("set_active_index", this.$route.path);
    } else {
      this.$store.commit("add_tabs", { menuPath: "/main", menuName: "首页" });
      this.$store.commit("set_active_index", "/main");
    }
  },
  computed: {
    openTab() {
      return this.$store.state.openTab;
    },
    activeIndex: {
      get() {
        return this.$store.state.activeIndex;
      },
      set(val) {
        this.$store.commit("set_active_index", val);
      }
    },
    hamburgerClass() {
      return { hideSidebar: this.isCollapse };
    }
  },
  watch: {
    $route(to, from) {
      let flag = false;
      for (let item of this.openTab) {
        if (item.menuPath === to.menuPath) {
          this.$store.commit("set_active_index", to.path);
          flag = true;
          break;
        }
      }
      if (!flag) {
        this.$store.commit("add_tabs", {
          menuPath: to.path,
          menuName: to.name
        });
        this.$store.commit("set_active_index", to.path);
      }
    }
  }
};
</script>