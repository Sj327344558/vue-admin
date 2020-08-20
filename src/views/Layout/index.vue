<template>
  <div>
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
}
</script>

<style>
</style>