<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="menu" className="menu"></svg-icon>
    </div>
    <div class="pull-right">
      <div class="pull-left user-info">
        <img src="../../../assets/images/face.jpg" alt="">
        管理员
      </div>
      <div class="pull-left header-icon">
        <svg-icon iconClass="logout" className="logout"></svg-icon>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    navMenuState() {
      this.$store.commit('SET_isCollapse', !this.$store.state.login.isCollapse)
      // this.$store.dispatch('setMenustatus', { name: 'songjie' })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../style/config.scss';
#header-wrap {
  position: fixed;
  left: $navMenu;
  top: 0;
  right: 0;
  height: 75px;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  @include webkit(transition, all 0.3s ease 0s);
}

.header-icon {
  padding: 32px 32px;
  svg {
    margin-bottom: -8px;
    font-size: 25px;
    cursor: pointer;
  }
}

.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
.user-info {
  height: 100%;
  padding: 25px 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 28px 28px;
  }
  img {
    display: inline-block;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 50px;
  }
}
</style>