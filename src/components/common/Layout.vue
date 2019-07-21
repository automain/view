<template>
  <div :class="hamburgerClass">
    <el-container>
      <el-aside class="sidebar-container">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            class="sidebar-menu"
            :default-active="$route.path"
            :collapse="isCollapse"
            router
            background-color="#1a1b22"
            text-color="#f5fffa"
            @select="handleMenuSelect"
          >
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
            <el-tooltip
              class="item"
              effect="dark"
              :content="hamburgerTips"
              placement="bottom-start"
            >
              <i :class="this.hamburgerIconClass" @click="menuCollapse()"></i>
            </el-tooltip>
          </div>
          <div class="breadcrumb-container">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="(item, key) in breadcrumbItems" :key="key">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="right-menu-container">
            <el-dropdown class="info-drop-down">
              <div class="head-img-container">
                <el-avatar
                  size="medium"
                  src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80"
                ></el-avatar>
                <div class="user-name">
                  王小虎
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>基本资料</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div class="logout-btn">
              <el-tooltip class="item" effect="dark" content="退出登录" placement="bottom-end">
                <i class="el-icon-switch-button"></i>
              </el-tooltip>
            </div>
          </div>
        </el-header>

        <el-main>
          <div class="content-wrap">
            <el-scrollbar :style="{height: (this.fullHeight-70)+'px'}">
              <router-view />
            </el-scrollbar>
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
  background-color: $menuBackgroundColor;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 9;
  overflow: hidden;
  width: $sideBarWidth !important;
  transition: width $animateSeconds !important;
  -moz-transition: width $animateSeconds !important;
  -webkit-transition: width $animateSeconds !important;
  -o-transition: width $animateSeconds !important;
  .horizontal-collapse-transition {
    transition: 0s width ease-in-out, 0s padding-left ease-in-out,
      0s padding-right ease-in-out;
  }
  .scrollbar-wrapper {
    overflow-x: hidden !important;
    margin-right: -18px !important;
    .el-menu {
      border-right: none;
    }
  }

  .el-submenu__title,
  & .el-menu-item {
    &:hover {
      background-color: $hoverMenuBackgroundColor !important;
    }
    i {
      color: $mainBackgroundColor !important;
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
  transition: padding-left $animateSeconds !important;
  -moz-transition: padding-left $animateSeconds !important;
  -webkit-transition: padding-left $animateSeconds !important;
  -o-transition: padding-left $animateSeconds !important;
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
          padding-top: 7px;
        }
        .user-name {
          float: right;
          padding-top: 8px;
          padding-left: 10px;
        }
      }
      .logout-btn {
        float: right;
        padding-top: 12px;
        font-size: 20px;
        padding-left: 15px;
        cursor: pointer;
      }
    }
  }
  .el-main {
    padding: 50px 10px 10px 10px;
    background-color: $mainBackgroundColor;

    .content-wrap {
      background: #fff;
      border: 1px solid #dcdfe6;
      -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12),
        0 0 6px 0 rgba(0, 0, 0, 0.04);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
      .el-scrollbar .el-scrollbar__wrap {
        overflow-x: hidden;
        .table-expand {
          label {
            color: #99a9bf;
          }
          .el-form-item {
            margin-right: 0;
            margin-bottom: 0;
          }
        }
        .add-form-dialog .el-input{
          width: 200px;
        }
      }
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
    .el-main .el-tabs {
      left: calc(#{$hideBarWidth} + 9px);
      transition: left $animateSeconds !important;
      -moz-transition: left $animateSeconds !important;
      -webkit-transition: left $animateSeconds !important;
      -o-transition: left $animateSeconds !important;
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
import local from "@/local";
export default {
  components: { Menu },
  data() {
    return {
      menuData: [
        {
          menuName: "菜单1",
          menuIcon: "el-icon-user",
          children: [
            {
              menuName: "菜单11",
              menuIcon: "el-icon-location",
              children: [
                {
                  menuPath: "/tableTest",
                  menuName: "表格",
                  menuIcon: "el-icon-circle-plus"
                }
              ]
            }
          ]
        },
        {
          menuName: "菜单2",
          menuIcon: "el-icon-user",
          children: [
            {
              menuName: "菜单22",
              menuIcon: "el-icon-location",
              children: [
                {
                  menuPath: "/crud",
                  menuName: "增删改查",
                  menuIcon: "el-icon-circle-plus"
                }
              ]
            }
          ]
        }
      ],
      isCollapse: false,
      hamburgerTips: "隐藏菜单",
      hamburgerIconClass: "el-icon-s-fold",
      fullHeight: document.documentElement.clientHeight,
      breadcrumbItems: []
    };
  },
  methods: {
    menuCollapse() {
      this.isCollapse = !this.isCollapse;
      this.isCollapse
        ? ((this.hamburgerIconClass = "el-icon-s-unfold"),
          (this.hamburgerTips = "显示菜单"))
        : ((this.hamburgerIconClass = "el-icon-s-fold"),
          (this.hamburgerTips = "隐藏菜单"));
    },
    handleMenuSelect(index, indexPath) {
      this.breadcrumbItems = indexPath;
      let length = this.breadcrumbItems.length;
      if (length > 0) {
        let key = this.breadcrumbItems[length - 1];
        if (this.menuMap.has(key)) {
          this.breadcrumbItems[length - 1] = this.menuMap.get(key);
        }
      }
      local.set("lastRequestPath", index);
      local.set("breadcrumb", this.breadcrumbItems);
    },
    getMenuMap(map, menuData) {
      for (let index in menuData) {
        let menu = menuData[index];
        if (menu.menuPath && !menu.children) {
          map.set(menu.menuPath, menu.menuName);
        }
        if (menu.children) {
          this.getMenuMap(map, menu.children);
        }
      }
      return map;
    }
  },
  mounted() {
    const that = this;
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        that.fullHeight = window.fullHeight;
      })();
    };
    let lastRequestPath = local.get("lastRequestPath");
    let breadcrumb = local.get("breadcrumb");
    if (!lastRequestPath) {
      lastRequestPath = "/main";
      breadcrumb = ["首页"];
    }
    this.$router.push(lastRequestPath);
    this.breadcrumbItems = breadcrumb;
  },
  computed: {
    hamburgerClass() {
      return { hideSidebar: this.isCollapse };
    },
    menuMap() {
      let map = this.getMenuMap(new Map(), this.menuData);
      map.set("/main", "首页");
      return map;
    }
  },
  watch: {
    fullHeight(val) {
      if (!this.timer) {
        this.fullHeight = val;
        this.$store.commit("setFullHeight", val);
        this.timer = true;
        let that = this;
        setTimeout(function() {
          that.timer = false;
        }, 400);
      }
    }
  }
};
</script>