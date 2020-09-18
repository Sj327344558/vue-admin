<template>
  <div id="menu-trap">
    <h1 class="logo"><img src="@/assets/logo.png" alt=""></h1>
    <el-menu router default-active="1-4-1" class="el-menu-vertical-demo" background-color="rgba(0,0,0,0)" text-color="#fff" active-text-color="#fff"
      :collapse="isCollapse">
      <template v-for="(item,index) in routers">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''" :class="value.hasOwnProperty('aaa')? 'testa':'testb'">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"></svg-icon>
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.path">{{subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>

    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'navMenu',
  data() {
    return {
      routers: {},
      value: {
        name: 'haha',
      },
    }
  },
  mounted() {
    this.routers = this.$router.options.routes
  },
  computed: {
    isCollapse() {
      return this.$store.state.app.isCollapse
    },
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
  @include webkit(transition, all 0.3s ease 0s); //动画效果
  svg {
    font-size: 20px;
    margin-right: 10px;
  }
  .el-menu {
    border-right-width: 0;
  }
}
.open {
  #menu-trap {
    width: $navMenu;
  }
}
.close {
  #menu-trap {
    width: $navMenuMin;
  }
  .logo img {
    width: 60%;
    height: 60%;
    // display: none;
  }
}
.logo {
  img {
    margin: auto;
    height: 150px;
    @include webkit(transition, all 0.3s ease 0s); //动画效果
  }
}
.el-icon-arrow-down:before {
  content: none;
}
</style>

<style lang="scss">
.testa {
  .el-submenu__icon-arrow {
    display: none;
  }
}
.el-submenu__title {
  i {
    display: none;
  }
}
</style>