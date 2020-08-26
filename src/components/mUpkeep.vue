<template>
  <div>
    <div class="m-list">
      <div class="mtitle">保养产品</div>
      <div v-for="(item,index) in list" :key="index">
        <div class="tl m-upkeep-title" v-if="item.grandsondata.length > 0">
          <h4 class="fbox fbox-acenter fbox-jbetween">
            <span @click="introtap">
              {{item.name}}
              <i class="myou"></i>
            </span>
            <!-- <img src="../assets/xia1.png" alt /> -->
          </h4>
        </div>
        <div class="upkeep-list" v-if="item.grandsondata.length > 0">
          <div v-for="(items,indexs) in item.grandsondata" :key="indexs">
            <h4 class="tl fbox fbox-acenter fbox-jbetween">
              <span>{{items.title}}</span>
              <span @click="moreTap(item.name,items.data)" class="norm-text color-light-gray">更多 ></span>
            </h4>
            <div
              class="mpad fbox fbox-acenter"
              @click="listtap(items,item.name,index + String(indexs))"
            >
              <div class="fbox fbox-acenter">
                <img :src="items.Image?items.Image:require('./../assets/logo.png')" alt />
              </div>
              <div class="fbox fbox-jcenter fbox-col ml">
                <div>{{items.name}} {{items.model}}</div>
                <div class="fbox fbox-acenter fbox-jbetween" style="width:100%">
                  <div class="pck_price tc color-red mr">{{items.price}}</div>
                  <div class="pck_num tc color-hui">X {{items.number}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="mbupkeep" v-if="item.name == title">
          <h4 class="fbox fbox-acenter fbox-jbetween">
            <i></i> 更多推荐产品
            <img src="../assets/offw.png" alt />
            <div class="moreTap" @click="moreTap('')"></div>
          </h4>
          <div v-if="gd" style="max-height:200px;overflow: scroll;overflow-x: hidden;">
            <div v-for="(z,zindex) in gd" :key="zindex" class="mpad fbox fbox-acenter">
              <div class="fbox fbox-acenter">
                <img :src="z.img?z.img:require('./../assets/logo.png')" alt />
              </div>
              <div class="fbox fbox-acenter fbox-col ml minwidth">
                <div class="tl" style="width:100%">{{z.name}}</div>
                <div class="fbox fbox-acenter fbox-jbetween" style="width:100%">
                  <div class="pck_price tc color-red">{{z.price}}</div>
                  <div class="pck_num tc">{{z.number}}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="tc pt pb" style="color:#000;font-size:14px">-- 没有更多 --</div>
        </div>
      </div>
    </div>
   <div class="tr mmoney">
          商品总价<span class="color-light-gray">（不含工时费）</span>: <span class="color-red font-bold">￥{{money}}</span>
    </div>
    <!-- 保养项 -->
    <div class="rishtext" v-if="videointro">
      <h4 class="fbox fbox-acenter fbox-jbetween">
        <span >详情</span>
        <img @click="introtap" src="../assets/end.png" alt="">
      </h4>
    
      <video src=""></video>
      <div >
          飒飒飒飒少时诵诗书所所所少时诵诗书所所所是是是所所所
      </div>
    </div>
    <div class="shade" v-if="videointro"></div>
     <!-- v-if="videointro" -->
  </div>
</template>

<script>
export default {
  name: "pUpkeep",
  data() {
    return {
      videointro: false,
      hovernum: 0,
      title:"",
    };
  },
  props: {
    list: Array,
    money:Number
  },
  methods: {
    introtap() {
      this.videointro = !this.videointro;
    },
    moreTap(e,item) {
      console.log(e);
      this.title = e;
      this.gd = item;
    },
  },
};
</script>


<style scoped>
.mmoney{
  padding: 10px;
  background-color: #F5F7F9;
}
.rishtext video{
  background-color: red;
  width: 100%;
  height: 45vw;
  display: inherit;
}
.rishtext{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width:80vw;
  background: #fff;
  z-index: 8889;
      border-top-right-radius: 8px;
    border-top-left-radius: 8px;
}
.rishtext div{
  padding: 10px;
     max-height: 67vw;
    overflow-y: scroll;
}
.rishtext h4{
  padding: 8px 10px;
  box-sizing: border-box;
  font-size:14px ;
}
.rishtext h4>img{
  width: 15px;
  height: 15px;
}
.minwidth{
  min-width: 77%;
}
.m-list {
  position: relative;
}
.shade {
  opacity: 0.5;
  background-color: #000;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 8888;
}
.mtitle {
  padding: 10px;
  font-size: 16px;
  background-color: #333;
  color: #fff;
}
.m-upkeep-title {
  background-color: #f6f7f9;
  color: #7bb10a;
  font-size: 14px;
  position: relative;
  box-sizing: border-box;
  z-index: 1;
}
.m-upkeep-title > h4 img {
  width: 18px;
}
.m-upkeep-title > h4 {
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  width: 100%;
}
.mpad {
  padding: 10px;
  border-top: 1px solid #f5f4f4;
  border-bottom: 1px solid #f5f4f4;
}
.upkeep-list h4.tl {
  padding: 10px;
  font-size: 14px;
  color: #666;
  background-color: #fbfbfb;
}
.upkeep-list img {
  width: 60px;
  height: 60px;
}
.myou {
  background: url("../assets/you.png");
  width: 14px;
  height: 14px;
  display: inline-block;
  background-size: 100%;
  background-position-y: 16px;
}
.mbupkeep {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  z-index: 9;
}
.mbupkeep > h4 {
  position: relative;
  padding: 10px 20px;
  background-color: #333;
  color: #fff;
}
.mbupkeep > h4 > i {
  position: absolute;
  left: 10px;
  width: 3px;
  height: 12px;
  background-color: #7bb10a;
  top: 50%;
  margin-top: -6px;
}
.mbupkeep>h4>img{
  width: 15px;
}
.moreTap {
  position: absolute;
  right: 0;
  height: 40px;
  width: 40px;
}
</style>
