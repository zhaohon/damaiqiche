<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/pages">Pages</router-link>
    </div>
    <Head />
    <!-- 顶部占位 -->
    <div style="width:100%;height:116px;"></div>
    <router-view/>
    <!-- 底部占位 -->
    <Foot />
  </div>
</template>
<script>
// @ is an alias to /src
import Head from '@/components/head.vue'
import Foot from '@/components/foot.vue'


export default {
  name: 'App',
  components: {
    Head,
    Foot
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
