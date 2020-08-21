<template>
  <div id="menu-trap">
    <h1 class="logo"><img src="@/assets/logo.png" alt=""></h1>
    <el-menu router default-active="1-4-1" class="el-menu-vertical-demo" background-color="rgba(0,0,0,0)" text-color="#fff" active-text-color="#fff">
      <template v-for="(item,index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"></svg-icon>
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>

    </el-menu>
    <!-- <svg-icon iconClass="console" className="console"></svg-icon> -->

  </div>
</template>

<script>
export default {
  name: 'navMenu',
  data() {
    return {
      routers: {},
    }
  },
  mounted() {
    console.log(this.$router)
    this.routers = this.$router.options.routes
  },
}
</script>

<style lang="scss" scoped>
@import '../../../style/config.scss';
#menu-trap {
  position: fixed;
  left: 0;
  top: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
}
.logo {
  img {
    margin: auto;
    height: 150px;
  }
}
</style>