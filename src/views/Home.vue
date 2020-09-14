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
    <pIndex :SearchArr="SearchArr" :shopid="shop_id" :tab="tabind" :serchArr='serchArr' @serchClick='serchClick' @sousuo="sousuo" @loadData="loadData" @changes="changes" @tabC="tabC" @tiao="tiao"  @del="del" @mouseOver="mouseOver" :hover="hover" :yixuan="yixuan" :remen="remen" :pinpai="pinpai" :chexi="chexi" :chexing="chexing" :pailiang="pailiang" :nianfen="nianfen" :kuanxing="kuanxing" :fdjxh="fdjxh" :zdgl="zdgl"   />
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
      shop:"",
      chexing:[],
      pailiang:[],
      nianfen:[],
      kuanxing:[],
      fdjxh:[],
      zdgl:[],
      tabind:1,
      messge:{},
      SearchArr:[],//搜索页面的数据
      serchArr:[],//搜索出来的车型
      shop_id:'',
      cs:''
    }
  },
  methods:{
    // 选择
    changes(e,s){
      //s为车系分类
      console.log(e,s,"父组件")
      
      if(this.yixuan.length == 7){
        this.messge.power = e
        localStorage.setItem("messge",this.$qs.stringify(this.messge));
       this.$router.push({ path:'/Upkeep',name:'Upkeep', query: {}})
      }
      this.show = true
      // 车系
      if(this.yixuan.length == 0){
        this.$http
          .carSeries({
            brand: e ,
          })
          .then((res) => {
            console.log("车系接口返回", res.data);
            this.chexi = res.data
            this.yixuan.push(e)
            this.show = false
          })
          .catch((err) => {
            console.log("错误", err), (this.show = false);
          });
        return
      }
      // 车型接口
      if(this.yixuan.length == 1){
        this.shop = s
        this.$http
          .carType({
            cars:e,
            shop:s,
            brand: this.yixuan[0]
          })
          .then((res) => {
            console.log("车型接口返回", res.data);
            this.chexing = res.data
            let iffont = false
            if(res.data.length == 1){
                iffont = true
            }
            console.log(iffont)
            // this.yixuan.push(e)
            if(iffont){
              this.yixuan.push(e,e)
              this.$http.carQuantity({
                cars:this.yixuan[1],
                shop:this.shop,
                brand: this.yixuan[0],
                models:e
              })
              .then((res) => {
                console.log("排量接口返回", res.data);
                this.pailiang = res.data
                 this.show = false
              })
              .catch((err) => {
                console.log("错误", err), (this.show = false);
              });
            }else{
              this.yixuan.push(e)
               this.show = false
            }
          })
          .catch((err) => {
            console.log("错误", err), (this.show = false);
          });
        return
      }
      //排量
      if(this.yixuan.length == 2){
        this.$http
          .carQuantity({
            cars:this.yixuan[1],
            shop:this.shop,
            brand: this.yixuan[0],
            models:e
          })
          .then((res) => {
            console.log("排量接口返回", res.data);
            this.pailiang = res.data
            this.yixuan.push(e)
             this.show = false
          })
          .catch((err) => {
            console.log("错误", err), (this.show = false);
          });
        return
      }
      // 年份
      if(this.yixuan.length == 3){
        this.$http
          .carYear({
            cars:this.yixuan[1],
            shop:this.shop,
            brand: this.yixuan[0],
            models:this.yixuan[2],
            displacement:e
          })
          .then((res) => {
            console.log("年份接口返回", res.data);
            this.nianfen = res.data
            this.yixuan.push(e)
             this.show = false
          })
          .catch((err) => {
            console.log("错误", err), (this.show = false);
          });
        return
      }
      // 款型
      if(this.yixuan.length == 4){
        this.$http
          .carKuan({
            cars:this.yixuan[1],
            shop:this.shop,
            brand: this.yixuan[0],
            models:this.yixuan[2],
            displacement:this.yixuan[3],
            year:e
          })
          .then((res) => {
            console.log("款型接口返回", res.data);
            this.kuanxing = res.data
            this.yixuan.push(e)
             this.show = false
          })
          .catch((err) => {
            console.log("错误", err), (this.show = false);
          });
        return
      }
      // 型号
      if(this.yixuan.length == 5){
        this.$http
          .carEngine({
            cars:this.yixuan[1],
            shop:this.shop,
            brand: this.yixuan[0],
            models:this.yixuan[2],
            displacement:this.yixuan[3],
            year:this.yixuan[4],
            model:e
          })
          .then((res) => {
            console.log("型号接口返回", res.data);
            this.fdjxh = res.data
            this.yixuan.push(e)
            this.messge = {
              brand:res.brand,
              cars:res.cars,
              displacement: res.displacement,
              model: res.model,
              models: res.models,
              shop:res.shop,
              year:res.year,
            }
             this.show = false
          })
          .catch((err) => {
            console.log("错误", err), (this.show = false);
          });
        return
      }
      // 功率
      if(this.yixuan.length == 6){
        this.$http
          .carPower({
            cars:this.yixuan[1],
            shop:this.shop,
            brand: this.yixuan[0],
            models:this.yixuan[2],
            displacement:this.yixuan[3],
            year:this.yixuan[4],
            model: this.yixuan[5],
            engine:e
          })
          .then((res) => {
            console.log("功率接口返回", res.data);
            this.zdgl = res.data
            this.yixuan.push(e)
            this.messge = {
              brand:res.brand,
              cars:res.cars,
              displacement: res.displacement,
              model: res.model,
              models: res.models,
              shop:res.shop,
              year:res.year,
              engine:res.engine
            }
             this.show = false
          })
          .catch((err) => {
            console.log("错误", err), (this.show = false);
          });
        return
      }
    },
    sousuo(e){
      this.show = true

      //搜索
      this.$http
        .searchModels({
            models : e
        })
        .then((res) => {
          console.log("models", res.data);
          if(res.data.length == 0){
            this.show = false
            this.$Message.info('暂无搜索车型');
            this.serchArr = []
            
            return
          }
          this.serchArr = res.data
          this.show = false

        })
        .catch((err) => {
          console.log("错误", err)
          this.show = false
          this.error()
        }); 

    },
    serchClick(e,item,i){
      console.log(e,item)
      this.yixuan = []
      this.yixuan[0] = item.brand
      this.yixuan[1] = item.cars
      this.yixuan[2] = item.data[i]
      this.shop = item.letter
      console.log("yixuan",this.yixuan);
      
      this.$http
      .carQuantity({
        cars:this.yixuan[1],
        shop:this.shop,
        brand: this.yixuan[0],
        models:this.yixuan[2]
      })
      .then((res) => {
        console.log("排量接口返回", res.data);
        this.pailiang = res.data
      })
      .catch((err) => {
        console.log("错误", err), (this.show = false);
      });
      this.tabind = 1


      this.$http
      .carSeries({
        brand: this.yixuan[0],
      })
      .then((res) => {
        console.log("车系接口返回", res.data);
        this.chexi = res.data
      })
      .catch((err) => {
        console.log("错误", err), (this.show = false);
      });
      this.$http
      .carType({
        cars:this.yixuan[1],
        shop:this.shop,
        brand: this.yixuan[0],
      })
      .then((res) => {
        console.log("车型接口返回", res.data);
        this.chexing = res.data
      })
      .catch((err) => {
        console.log("错误", err), (this.show = false);
      });
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
    },
    //跳过
    tiao(e){
      console.log('tiao',e)
      localStorage.setItem("messge",this.$qs.stringify(this.messge));
      this.$router.push({ path:'/Upkeep',name:'Upkeep', query: {}})
    },
    loadData(e){
      console.log(e,"111111")
    },
  
  },
  watch:{

  },
  
  mounted(){
    this.tabind = Number(this.$router.history.current.params.tabind) || 1;
    this.shop_id = localStorage.getItem('shop_id');
    //车型品牌 
    this.$http
      .carName({
        models: ""
      })
      .then((res) => {
        console.log("车型品牌接口返回", res.data);
        this.all = res.data//全部参数
        this.pinpai = res.data[0].data//默认品牌
        let remens = []
        res.data.forEach((item) => {
            remens.push(item.letter)
        });
        this.remen = remens//字母排序

      })
      .catch((err) => {
        console.log("错误", err), (this.show = false);
      });

    //车型品牌 
    this.$http.Search({})
      .then((res) => {
        let arr =[]
        for (var index in res){ 
          let aac = new Object;
          aac.title = res[index].title;
          aac.id = res[index].id;
          aac.list = new Array;
          //去除label 为空的选项
          res[index].list.forEach(i=>{ 
              if(i.label !== null){
                 aac.list.push(i)
              }
            })
          arr.push(aac)
        }
        this.SearchArr = arr
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

