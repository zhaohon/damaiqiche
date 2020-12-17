<template>
  <div>
    <el-container>
      <el-header style="padding: 0">
        <div class="main-title fbox fbox-ac fbox-jb">
          <div class="fbox fbox-ac">
          <img alt="logo" src="./../assets/images/logo.png" />
          <h4 class="font-xl">Deity試験データ管理</h4>
          <div class="fbox fbox-ac">
            <span class="iconfont icon-laba color-red font-l"></span>
            <p class="font-m">
             {{res.data}}
            </p>
          </div>
          </div>
          <div class="fbox fbox-ac pr">
            <el-avatar
              :size="34"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
            <span style="margin-left:10px">佐藤 太郎</span>
            <i class="iconfont icon-logout color-red ml"></i>
          </div>
        </div>
      </el-header>
      <el-container style="margin-top: 5px">
        <el-aside width="250px" class="tl">
          <el-menu
            default-active="1-1"
            class="aside"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template slot="title"
                ><div class="fbox fbox-ac">
                  <div><i class="iconfont icon-xianweijing color-red"></i></div>
                  <div>試験データ管理</div>
                </div></template
              >
              <el-menu-item index="1-1" @click="goTo('/pages/ExperimentList')"
                >試験一覧</el-menu-item
              >
              <el-menu-item index="1-2">データ転送状況一覧</el-menu-item>
              <el-menu-item index="1-3">データ登録</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
              <div class="fbox fbox-ac">
                <div><i class="iconfont icon-renqun color-red"></i></div>
                <span slot="title">ユーザ管理</span>
              </div>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="padding: 0">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Pages",
  data() {
    return {};
  },
  methods: {
    handleOpen(e) {
      console.log("handleOpen:", e);
    },
    handleClose(e) {
      console.log("handleClose:", e);
    },
    goTo(path) {
      this.$router.replace(path);
    },
  },
  watch: {},

  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push({ path: "/Login", name: "Login", query: {} });
    }
  },
};
</script>

<style lang="scss" scoped>
/* style 标签必须添加 scoped 防止css被组件之间重叠*/
.main-title {
  height: 100%;
  box-shadow: 0px 3px 6px #c8102e1a;
  h4 {
    font-weight: 100;
  }
  .icon-laba {
    margin-top: 2px;
  }
  .font-xl {
    margin-left: 22px;
    margin-right: 97px;
  }
}

.aside {
  .el-menu-item.is-active {
    color: initial;
  }
  .el-menu-item:focus,
  .el-menu-item:hover {
    background: #f8e3e8 0% 0% no-repeat padding-box;
  }
  .fbox {
    height: 56px;
    i {
      width: 30px;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
    }
    .icon-renqun {
      font-size: 14px;
    }
  }
  .el-submenu .el-menu-item {
    padding-left: 60px !important;
  }
}
.el-menu {
  height: 100%;
}
</style>

<template>
  <div>
    <el-container>
      <el-header style="padding: 0">
        <div class="main-title fbox fbox-ac fbox-jb">
          <div class="fbox fbox-ac">
          <img alt="logo" src="./../assets/images/logo.png" />
          <h4 class="font-xl">Deity試験データ管理</h4>
          <div class="fbox fbox-ac">
            <span class="iconfont icon-laba color-red font-l"></span>
            <p class="font-m">
             {{res.data}}
            </p>
          </div>
          </div>
          <div class="fbox fbox-ac pr">
            <el-avatar
              :size="34"
              src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            ></el-avatar>
            <span style="margin-left:10px">佐藤 太郎</span>
            <i class="iconfont icon-logout color-red ml"></i>
          </div>
        </div>
      </el-header>
      <el-container style="margin-top: 5px">
        <el-aside width="250px" class="tl">
          <el-menu
            default-active="1-1"
            class="aside"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template slot="title"
                ><div class="fbox fbox-ac">
                  <div><i class="iconfont icon-xianweijing color-red"></i></div>
                  <div>試験データ管理</div>
                </div></template
              >
              <el-menu-item index="1-1" @click="goTo('/pages/ExperimentList')"
                >試験一覧</el-menu-item
              >
              <el-menu-item index="1-2">データ転送状況一覧</el-menu-item>
              <el-menu-item index="1-3">データ登録</el-menu-item>
            </el-submenu>
            <el-menu-item index="2">
              <div class="fbox fbox-ac">
                <div><i class="iconfont icon-renqun color-red"></i></div>
                <span slot="title">ユーザ管理</span>
              </div>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main style="padding: 0">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Pages",
  data() {
    return {};
  },
  methods: {
    handleOpen(e) {
      console.log("handleOpen:", e);
    },
    handleClose(e) {
      console.log("handleClose:", e);
    },
    goTo(path) {
      this.$router.replace(path);
    },
  },
  watch: {},

  mounted() {
    if (!localStorage.getItem("token")) {
      this.$router.push({ path: "/Login", name: "Login", query: {} });
    }
  },
};
</script>

<style lang="scss" scoped>
/* style 标签必须添加 scoped 防止css被组件之间重叠*/
.main-title {
  height: 100%;
  box-shadow: 0px 3px 6px #c8102e1a;
  h4 {
    font-weight: 100;
  }
  .icon-laba {
    margin-top: 2px;
  }
  .font-xl {
    margin-left: 22px;
    margin-right: 97px;
  }
}

.aside {
  .el-menu-item.is-active {
    color: initial;
  }
  .el-menu-item:focus,
  .el-menu-item:hover {
    background: #f8e3e8 0% 0% no-repeat padding-box;
  }
  .fbox {
    height: 56px;
    i {
      width: 30px;
      display: flex;
      align-items: center;
      text-align: center;
      justify-content: center;
    }
    .icon-renqun {
      font-size: 14px;
    }
  }
  .el-submenu .el-menu-item {
    padding-left: 60px !important;
  }
}
.el-menu {
  height: 100%;
}
</style>

