<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/pages">Pages</router-link>
    </div> -->
    <Head />
    <!-- 顶部占位 -->
    <div id="v-content" v-bind:style="{minHeight: Height+'px'}">
      <router-view />
    </div>
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
      Height:''
    }
  },
  mounted(){
    //header+footer 325px
    this.Height = document.documentElement.clientHeight - 334
　　//监听浏览器窗口变化　
    window.onresize = ()=> {this.Height = document.documentElement.clientHeight - 334}
  },
  methods:{
      
  }
}
</script>
<style>
</style>
