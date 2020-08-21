<template>
  <div id="layout" :class="[menuStatus?'close':'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutMenu />
  </div>

</template>

<script>
import LayoutHeader from './Components/header'
import LayoutMain from './Components/main'
import LayoutMenu from './Components/menu'
export default {
  name: 'layout',
  components: { LayoutHeader, LayoutMain, LayoutMenu },
  computed: {
    menuStatus() {
      return this.$store.state.login.isCollapse
    },
  },
}
</script>

<style>
</style>