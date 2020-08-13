<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/pages">Pages</router-link>
    </div>
    <Public />
    <!-- 顶部占位 -->
    <div style="width:100%;height:116px;"></div>
    <router-view/>
    <!-- 底部占位 -->
    <div style="width:100%;height:210px;"></div>
  </div>
</template>
<script>
// @ is an alias to /src
import Public from '@/components/public.vue'

export default {
  name: 'public',
  components: {
    Public
  },
  data () {
    return {
      
    }
  },
  methods:{
    
  }
}
</script>
<style>

</style>
