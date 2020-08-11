<template>
  <div class="home">
    <pIndex @changes="changes" @del="del" @mouseOver="mouseOver" :hover="hover" :yixuan="yixuan" :remen="remen" :changjia="changjia" :pinpai="pinpai" :chexi="chexi" :chexing="chexing" :pailiang="pailiang" :nianfen="nianfen" :kuanxing="kuanxing" :fdjxh="fdjxh" :zdgl="zdgl"   />
  </div>
</template>

<script>
// @ is an alias to /src
import pIndex from '@/components/pIndex.vue'

export default {
  name: 'Home',
  components: {
    pIndex
  },
  data () {
    return {
      yixuan:[],//已选中
      hover:0,//热门选中
      changjia:["厂家1","厂家2","厂家3","厂家4","厂家5","厂家6",],
      remen:["热门","A", "B", "C", "D", "F", "G", "H", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "W", "X", "Y", "Z",],
      pinpai:["品牌1","品牌2","品牌3","品牌4","品牌5","品牌6",],
      chexi:["车系1","车系2","车系3","车系4","车系5","车系6",],
      chexing:["车型1","车型2","车型3","车型4","车型5","车型6",],
      pailiang:["排量1","排量2","排量3","排量4","排量5","排量6",],
      nianfen:["年份1","年份2","年份3","年份4","年份5","年份6",],
      kuanxing:["款型1","款型2","款型3","款型4","款型5","款型6",],
      fdjxh:["发动机型号1","发动机型号2","发动机型号3","发动机型号4","发动机型号5","发动机型号6",],
      zdgl:["最大功率1","最大功率2","最大功率3","最大功率4","最大功率5","最大功率6",],
    }
  },
  methods:{
    // 选择
    changes(e){
      console.log(e,"父组件")
      if(this.yixuan.length == 8){
        this.$router.push({ path:'/Upkeep',name:'Upkeep', query: { Shiftid: "1111",Shiftname:"222" }})
      }
      this.yixuan.push(e)
    },
    // 删除
    del(e){
      console.log(e,"父组件")
      this.yixuan.splice(e,8)
    },
    // 鼠标悬停
     mouseOver(e){
      this.hover = e
    }
  }
}
</script>
