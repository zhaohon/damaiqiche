<template>
  <div class="home">
    <div class="head fbox fbox-ac fbox-jb">
        <div class="head-l">
          <!-- <h2>为我的爱车约保养</h2> -->
          <p>输入您的爱车信息，大唛养车为您推荐适用的保养方案。</p>
        </div>
        <!-- <div class="head-r">
          <img src="../assets/fen.png" alt="">
          <p>产品搜索</p>
        </div> -->
    </div>
    <pIndex :tab="tabind" @changes="changes" @tabC="tabC"  @del="del" @mouseOver="mouseOver" :hover="hover" :yixuan="yixuan" :remen="remen" :pinpai="pinpai" :chexi="chexi" :chexing="chexing" :pailiang="pailiang" :nianfen="nianfen" :kuanxing="kuanxing" :fdjxh="fdjxh" :zdgl="zdgl"   />
    <Loading v-if="show" />
    

  </div>
</template>

<script>
// @ is an alias to /src
import pIndex from '@/components/pIndex.vue'
import Loading from "@/components/Loading.vue";


export default {
  name: 'Home',
  components: {
    pIndex,
    Loading
  },
  data () {
    return {
      show: true,
      yixuan:[],//已选中
      hover:0,//热门选中
      all:[],//全部品牌
      remen:[],//热门字母
      pinpai:[],//品牌
      chexi:[],
      chexing:["车型1","车型2","车型3","车型4","车型5","车型6",],
      pailiang:["排量1","排量2","排量3","排量4","排量5","排量6",],
      nianfen:["年份1","年份2","年份3","年份4","年份5","年份6",],
      kuanxing:["款型1","款型2","款型3","款型4","款型5","款型6",],
      fdjxh:["发动机型号1","发动机型号2","发动机型号3","发动机型号4","发动机型号5","发动机型号6",],
      zdgl:["最大功率1","最大功率2","最大功率3","最大功率4","最大功率5","最大功率6",],
      tabind:1
    }
  },
  methods:{
    // 选择
    changes(e){
      console.log(e,"父组件")
      if(this.yixuan.length == 7){
        this.$router.push({ path:'/Upkeep',name:'Upkeep', query: { Shiftid: "1111",Shiftname:"222" }})
      }
      // 车系
      if(this.yixuan.length == 0){
        this.$http
          .carSeries({
            brand: e || '奥迪',
            region: ""
          })
          .then((res) => {
            console.log("res接到值了", res.data);
            this.chexi = res.data
            this.yixuan.push(e)

          })
          .catch((err) => {
            console.log("错误", err), (this.show = false);
          });
        return
      }
      // 车型接口
      if(this.yixuan.length == 1){
        this.$http
          .carType({
            brand: this.yixuan[0] || '奥迪',
            region: ""
          })
          .then((res) => {
            console.log("res接到值了", res.data);
            this.chexi = res.data
            this.yixuan.push(e)

          })
          .catch((err) => {
            console.log("错误", err), (this.show = false);
          });
        return

      }
    },
    // 删除
    del(e){
      console.log(e,"父组件")
      this.yixuan.splice(e,8)
    },
    // 鼠标悬停
     mouseOver(e){
      this.hover = e
      this.pinpai = this.all[e].data
    },
    tabC(e){
      console.log('e',e)
      this.tabind = e
    }
  },
  watch:{

  },
  mounted(){
    this.tabind = Number(this.$router.history.current.params.tabind) || 1;
    this.$http
      .carName({
        longitude: "114.53122%2C38.0061",
        city: ""
      })
      .then((res) => {
        console.log("res接到值了", res.data.car);
        this.all = res.data.car//全部参数
        this.pinpai = res.data.car[0].data//默认品牌
        let remens = []
        res.data.car.forEach((item,index) => {
            remens.push(item.letter)
        });
        this.remen = remens//字母排序
        this.show = false;//隐藏动画
      })
      .catch((err) => {
        console.log("错误", err), (this.show = false);
      });
  }
}
</script>
<style scoped>
.head{width: 1200px;margin: 0 auto;color: #333333;margin-bottom: 10px;}
.head h2{font-size: 36px;}
.head .head-l p{font-size: 16px;margin-top: 10px;}
.head .head-r{text-align: center;}
.head .head-r image{width:50px;height:50px;}
@media only screen and (max-width: 1200px) {
  .head{width: 100%;}
}
</style>

