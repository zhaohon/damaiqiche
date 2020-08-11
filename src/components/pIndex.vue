<template>
  <div class="pIndex">
    <div class="box">
      <div class="tab">
        <a href>选择车型</a>
        <a href>车型搜索</a>
      </div>
      <!-- 内容 -->
      <div class="content">
        <!-- 筛选导航 -->
        <div class="nav fbox fbox-ac fbox-wrap">
          <p class="active">厂家</p>
          <p v-bind:class="yixuan.length > 0?'active':''">品牌</p>
          <p v-bind:class="yixuan.length > 1?'active':''">车系</p>
          <p v-bind:class="yixuan.length > 2?'active':''">车型</p>
          <p v-bind:class="yixuan.length > 3?'active':''">排量</p>
          <p v-bind:class="yixuan.length > 4?'active':''">年份</p>
          <p v-bind:class="yixuan.length > 5?'active':''">款型</p>
          <p v-bind:class="yixuan.length > 6?'active':''" class="xinghao">发动机型号</p>
          <p v-bind:class="yixuan.length > 7?'active':''" class="gonglv">最大功率</p>
        </div>
        <!-- 已选 -->
        <div class="yixuan fbox fbox-ac fbox-wrap" v-if="yixuan.length != 0">
          <p>已选车型</p>
          <p v-for="(item,index) in yixuan" :key="index" @click="del(index)" >{{item}}</p>
        </div>

        <!-- 选择厂家 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 0">
          <p v-for="(item,index) in changjia" :key="index" @click="rit(item)" >{{item}}</p>
        </div>

         <!-- 选择品牌 -->
         <div class="remen fbox fbox-ac fbox-wrap" v-if="yixuan.length == 1">
          <p v-for="(item,index) in remen" :key="index" @mouseover="mouseOver(index)" @click="mouseOver(index)" v-bind:class=" hover == index ?'ractive':''" >{{item}}</p>
        </div>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "pIndex",
  props: ["yixuan","hover","remen","changjia","pinpai","chexi","chexing","pailiang","nianfen","kuanxing","fdjxh","zdgl"],
  methods:{
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
.box {
  background: #f1f1f1;
  width: 1200px;
  padding: 20px 0;
  margin: 0 auto;
}
.content {
  width: 100%;
}
.nav {
  width: 100%;
}
.nav p {
  width: 7%;
  min-width: 50px;
}
.nav .xinghao {
  width: 15%;
  min-width: 110px;
}
.nav .gonglv {
  width: 12%;
  min-width: 80px;
}
.yixuan p {
  cursor: pointer;
  padding: 0 30px 0 0 ;
}
.item p {
  width: 160px;
  height: 52px;
  margin-right: 26px;
  text-align: center;
  line-height: 50px;
  background-color: #fff;
  margin-top: 14px;
  padding: 0 5px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
}
.item p:hover{
  border: 2px solid #0a47ba;
}


/* nav选中 */
.active{color: #0a47ba;}

.remen p{padding: 0 5px;    margin-right: 15px;cursor: pointer;}
.ractive{background-color: #0a47ba;color: #fff;}


@media only screen and (max-width: 1200px) {
	.box{width: 100%;}
}
</style>
