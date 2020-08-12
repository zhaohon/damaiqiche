<template>
  <div class="pIndex">
    <div class="box">
      <div class="tab fbox">
        <div class="fbox fbox-ac fbox-jc" :class="tab == 1?'tabActive':''" @click="tabC(1)" >
          <img class="car" src="../assets/car.png" alt="" v-if="tab == 1">
          <img class="car" src="../assets/cara.png" alt="" v-else>
          <div>车型选择</div>
        </div>
        <div class="fbox fbox-ac fbox-jc" :class="tab == 2?'tabActive':''" @click="tabC(2)">
          <img class="serch" src="../assets/serch.png" alt=""  v-if="tab == 2">
          <img class="serch" src="../assets/sercha.png" alt="" v-else>
          <div>车型搜索</div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="content" v-if="tab == 1">
        <!-- 筛选导航 -->
        <div class="nav fbox fbox-ac fbox-wrap">
          <p class="fbox fbox-ac active"><span>1</span>厂家</p>
          <p class="fbox fbox-ac" v-bind:class="yixuan.length > 0?'active':''"><span>2</span>品牌</p>
          <p class="fbox fbox-ac" v-bind:class="yixuan.length > 1?'active':''"><span>3</span>车系</p>
          <p class="fbox fbox-ac" v-bind:class="yixuan.length > 2?'active':''"><span>4</span>车型</p>
          <p class="fbox fbox-ac" v-bind:class="yixuan.length > 3?'active':''"><span>5</span>排量</p>
          <p class="fbox fbox-ac" v-bind:class="yixuan.length > 4?'active':''"><span>6</span>年份</p>
          <p class="fbox fbox-ac" v-bind:class="yixuan.length > 5?'active':''"><span>7</span>款型</p>
          <p class="xinghao fbox fbox-ac" v-bind:class="yixuan.length > 6?'active':''" ><span>8</span>发动机型号</p>
          <p class="gonglv fbox fbox-ac" v-bind:class="yixuan.length > 7?'active':''" ><span>9</span>最大功率</p>
        </div>
         <div class="remen fbox fbox-ac fbox-wrap mt" v-if="yixuan.length == 1">
          <p v-for="(item,index) in remen" :key="index" @mouseover="mouseOver(index)" @click="mouseOver(index)" v-bind:class=" hover == index ?'ractive':''" >{{item}}</p>
        </div>
        <!-- 已选 -->
        <div class="yixuan fbox fbox-ac fbox-wrap mt" v-if="yixuan.length != 0">
          <p class="yixuan-title">已选车型</p>
          <div v-for="(item,index) in yixuan" :key="index" class="fbox fbox-ac">
            <p>{{item}}</p>
            <img class="guan" src="../assets/off.png"  @click="del(index)">
          </div>
        </div>

        <!-- 选择厂家 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 0">
          <p v-for="(item,index) in changjia" :key="index" @click="rit(item)" >{{item}}</p>
        </div>

         <!-- 选择品牌 -->
        
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 1">
          <p v-for="(item,index) in pinpai" :key="index" @click="rit(item)" >{{item}}</p>
        </div>

         <!-- 选择车系 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 2">
          <p v-for="(item,index) in chexi" :key="index" @click="rit(item)" >{{item}}</p>
        </div>

         <!-- 选择车型 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 3">
          <p v-for="(item,index) in chexing" :key="index" @click="rit(item)" >{{item}}</p>
        </div>

         <!-- 选择排量 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 4">
          <p v-for="(item,index) in pailiang" :key="index" @click="rit(item)" >{{item}}</p>
        </div>

         <!-- 选择年份 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 5">
          <p v-for="(item,index) in nianfen" :key="index" @click="rit(item)" >{{item}}</p>
        </div>

        <!-- 选择款型 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 6">
          <p v-for="(item,index) in kuanxing" :key="index" @click="rit(item)" >{{item}}</p>
        </div>

        <!-- 选择发动机型号 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 7">
          <p v-for="(item,index) in fdjxh" :key="index" @click="rit(item)" >{{item}}</p>
        </div>

        <!-- 选择最大功率 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 8">
          <p v-for="(item,index) in zdgl" :key="index" @click="rit(item)" >{{item}}</p>
        </div>
      </div>


      <!-- 搜索 -->
      <div class="serch-box fbox fbox-ac" v-if="tab == 2">
          <form action="" class="fbox fbox-ac" >
              <input type="text" placeholder="请输入车型品牌名称或车系名称" >
              <button class="fbox fbox-ac fbox-jc">
                  <img class="serch" src="../assets/serch.png" alt="">
                  <p>搜索</p>
              </button>

          </form>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "pIndex",
  data() {
    return {
      tab:2
    };
  },
  props: ["yixuan","hover","remen","changjia","pinpai","chexi","chexing","pailiang","nianfen","kuanxing","fdjxh","zdgl"],
  methods:{
    // tab切换
    tabC(e){
      this.tab = e
    },
    // 删除方法
    del(e){
      console.log(e)
      this.$emit("del",e)
    },
    // 选择
    rit(e){
      this.$emit("changes",e)
    },
    // 鼠标指向
    mouseOver(e){
      this.$emit("mouseOver",e)
    },

  }

};
</script>


<style scoped>
/* body{background-color: #F5F6FA;width: 100%;}
.pIndex{width: 1400px;background-color: #ffffff;margin: 0 auto;} */
.box {
  width: 1200px;
  padding: 20px 0;
  margin: 0 auto;
}

.tab>div{width:147px;height:36px;background: #EDEEF2;border-radius:4px 4px 0px 0px;margin-right: 5px;color: #333333;font-size: 16px;cursor: pointer;}
.tabActive{background: #212531 !important;}
.tabActive div{color: #fff;}
.car{width:27px;height:13px;margin-right: 6px;}
.serch{width:17px;height:17px;margin-right: 6px;}
.content {  width: 100%;background: #EDEEF2;padding: 36px 22px;box-sizing: border-box;}

.nav {  width: 100%;}
.nav p {/* width: 7%; */padding: 0 20px 0 30px;height:40px;line-height: 40px;background: #ffffff;;border-radius:2px 2px 0px 0px;min-width: 50px;position: relative;}
.nav p::after{content: "";position: absolute;top: -9px;right: -28px;width: 58px;height: 58px;-webkit-transform: rotate(45deg) scale(.5);transform: rotate(45deg) scale(.5);border-right: 1px solid #d9d9d9;border-top: 1px solid #d9d9d9;background-color: #ffffff;z-index: 10;}
.nav p span{display: inline-block;width:18px;height:18px;line-height: 18px;font-size: 12px;text-align: center;color: #fff;background:rgba(153,153,153,1);border-radius:9px;margin-right: 12px;}
/* .nav .xinghao {
  width: 15%;
  min-width: 110px;
} */
.nav .gonglv::after {
  display: none;
}



/* 已选车型 */
.yixuan .yixuan-title{font-size: 16px;font-weight: bold;color: #333333;cursor: inherit !important;}
.yixuan div {padding: 3px 3px 3px 10px ;font-size: 12px;color: #333333;background-color: #fff;margin-left: 20px;border: 1px solid #77B110;box-sizing: border-box; }
.yixuan div .guan{width: 20px;height: 10px;cursor: pointer !important;margin-left: 10px;padding: 0 5px;}


/* 框 */
.item{margin-top: 20px;}
.item p {width: 160px;height: 50px;margin-right: 24px;text-align: center;line-height: 48px;background-color: #fff;margin-bottom: 20px;overflow: hidden;cursor: pointer;border-radius: 2px;}
.item p:hover{background: #77B110 !important;color: #ffffff !important}


/* nav选中 */
.active{color: #ffffff;background: #77B110 !important;}
.active span{background: #fff !important;color: #77B110 !important;}
.active::after{border-right: 2px solid #ffffff !important;border-top: 2px solid  #ffffff !important;background-color: #77B110 !important;}


/* 热门标签 */
.remen p{width:24px;height:26px; line-height: 26px;  margin-right: 15px;cursor: pointer;font-size: 14px;text-align: center;border-radius: 2px;}
.ractive{background-color: #77B110;color: #fff!important;}



/* 搜搜 */
.serch-box {width: 100%;background: #EDEEF2;padding: 36px 22px;box-sizing: border-box;}
.serch-box form{width: 80%;}
.serch-box input{width: 80%;height: 46px;background-color: #fff;padding-left: 4%;box-sizing: border-box;font-size: 14px;border-radius: 2px 0 0 2px;}
.serch-box button{width: 89px;height: 46px;background-color: #77b110;color: #fff;font-size: 16px;border-radius: 0 2px 2px 0;}
.serch-box button p{margin-left: 2px;margin-top: 2px;}




@media only screen and (max-width: 1200px) {
  .box{width: 100%;}
 
}
</style>
