<template>
  <div >
      <!-- 内容 -->
      <div class="content" >
        <!-- 筛选导航 -->
        <div class="nav fbox fbox-ac fbox-wrap">
          <p class="fbox fbox-ac active">
            <span>1</span>品牌
          </p>
          <p class="fbox fbox-ac" v-bind:class="obj.yixuan.length > 0?'active':''">
            <span>2</span>车系
          </p>
          <p class="fbox fbox-ac" v-bind:class="obj.yixuan.length > 1?'active':''">
            <span>3</span>车型
          </p>
          <p class="fbox fbox-ac" v-bind:class="obj.yixuan.length > 2?'active':''">
            <span>4</span>排量
          </p>
          <p class="fbox fbox-ac" v-bind:class="obj.yixuan.length > 3?'active':''">
            <span>5</span>年份
          </p>
          <p class="fbox fbox-ac" v-bind:class="obj.yixuan.length > 4?'active':''">
            <span>6</span>款型
          </p>
          <p class="xinghao fbox fbox-ac" v-bind:class="obj.yixuan.length > 5?'active':''">
            <span>7</span>发动机型号
          </p>
          <p class="gonglv fbox fbox-ac" v-bind:class="obj.yixuan.length > 6?'active':''">
            <span>8</span>最大功率
          </p>
        </div>

        <div class="remen fbox fbox-ac fbox-wrap mt" v-if="obj.yixuan.length == 0">
          <p
            v-for="(item,index) in remen"
            :key="index"
            @click="mouseOver(index)"
            v-bind:class="hover == index ?'ractive':''"
          >{{item}}</p>
        </div>
        <!-- 已选 -->
        <div class="yixuan fbox fbox-ac fbox-wrap mt" v-if="obj.yixuan.length != 0">
          <p class="yixuan-title">已选车型</p>
          <div v-for="(item,index) in obj.yixuan" :key="index" class="fbox fbox-ac">
            <p>{{item}}</p>
            <img class="guan" src="../assets/off.png" @click="dels(index,item)" />
          </div>
        </div>
        <!-- 选择品牌 -->

        <div class="item fbox fbox-ac fbox-wrap" v-if="obj.yixuan.length == 0">
          <p v-for="(item,index) in obj.pinpai" :key="index" :class="ind == index?'ractive':''" @click="rit1(item,null,index)">{{item}}</p>
        </div>

        <!-- 选择车系 -->
        <div class="mt" v-if="obj.yixuan.length == 1">
          <div v-for="(item,index) in obj.chexi" :key="index">
            <p>{{item.letter}}</p>
            <div class="item fbox fbox-ac fbox-wrap">
              <p v-for="(t,i) in item.data" :key="i" :class="ind == index && i == ins?'ractive':''" @click="rit2(t,item.letter,index,i)">{{t}}</p>
            </div>
          </div>
        </div>

        <!-- 选择车型 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="obj.yixuan.length == 2">
          <p v-for="(item,index) in obj.chexing" :key="index" :class="ind == index?'ractive':''" @click="rit3(item,null,index)">{{item}}</p>
        </div>

        <!-- 选择排量 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="obj.yixuan.length == 3">
          <p v-for="(item,index) in obj.pailiang" :key="index" :class="ind == index?'ractive':''" @click="rit4(item,null,index)">{{item}}</p>
        </div>

        <!-- 选择年份 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="obj.yixuan.length == 4">
          <p v-for="(item,index) in obj.nianfen" :key="index" :class="ind == index?'ractive':''" @click="rit5(item,null,index)">{{item}}</p>
        </div>

        <!-- 选择款型 -->
        <div class="items fbox fbox-ac fbox-wrap" v-if="obj.yixuan.length == 5">
          <p v-for="(item,index) in obj.kuanxing" :key="index" :class="ind == index?'ractive':''" @click="rit6(item,null,index)">{{item}}</p>
        </div>

        <!-- 选择发动机型号 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="obj.yixuan.length == 6">
          <p v-for="(item,index) in obj.fdjxh" :key="index" :class="ind == index?'ractive':''" @click="rit7(item,null,index)">{{item}}</p>
        </div>
        <!-- <div class="tiaoguo c9" v-if="obj.yixuan.length == 6" @click="tiao">跳过>></div> -->

        <!-- 选择最大功率 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="obj.yixuan.length == 7">
          <p v-for="(item,index) in obj.zdgl" :key="index" @click="rit8(item,null,index)">{{item}}</p>
        </div>
        <button @click="changesTwo(obj)" class="btns btn" style="width:90px;float:right" v-if="this.obj.yixuan.length != 7">下一步</button>
        <button @click="twoserachTap(obj)" v-if="ind != 9999" class="btns btn" style="width:90px;float:right">确认搜索</button>
        <button @click="resetTap(obj)" class="btns btn" style="width:90px;float:right">重置</button>
      </div>
  </div>
</template>

<script>
import {  Throttle } from "@/utils/public";
export default {
  name: "towsearch",
  data() {
    return {
      cityList: [],
      ind:9999,
      ins:9999,
      e:'',
      s:'',
      selectArr:{}
    };
  },
  props: {
    hover: Number,
    remen:Array,
    obj:Object,
    shopid:String,
    empty:Number,
    inn:Number
  },
  watch: {
    empty(e){
      if(e == 1){
        console.log('清空',e)
        this.$emit("emptyReset",2);
        this.ind = 9999;
        this.inds = 9999;
        this.e = '';
        this.s = '';
      }
    },
    inn(e){
      if(e == 1){
        this.$emit("innTap",2);
        this.ind = 9999;
        this.inds = 9999;
      }
    },
    remen(e){
        console.log('子组件',e)
    },
    obj(e){
      console.log(e,'sssssssssssssssss')
    }
  },
  methods: {
    twoserachTap(obj){
      this.$emit("twoserachTap",obj);
    },
    resetTap(obj){
        this.ind = 9999;
        this.ins = 9999;
        this.e = '';
        this.selectArr = {}
        this.$emit("resetTap",obj);
    },
    // 删除方法
    dels(e,item) {
        this.ind = 9999;
        this.ins = 9999;
      this.$emit("dels", e,item);
    },
    changesTwo(){
      if(this.e == '' || this.ind == 9999){
        this.$Message.error("请选择");
        return;
      }
      console.log(this.ind,'ind')
      
    if (this.obj.yixuan.length == 1) {
        this.$emit("changesTwo", this.e, this.s);
          this.ind = 9999;
          this.ins = 9999;
          this.e = '';
        return;
      }
      this.$emit("changesTwo", this.e);
      this.ind = 9999;
      this.ins = 9999;
      this.e = '';
     
    },
    // 选择
    rit(e, s,index,i) {
      console.log(e,s,index,i,'ssssssssssssssssssssssssssaaaaaaaaaaaaaaaaaaaaaaaaa')
      this.ind = index;
      this.ins = i;
      this.e = e;
      this.s = s;
      this.$emit('selectArrGet',this.selectArr)
    },
    rit1: Throttle(function(e, s,index) {
      this.selectArr.brand = e;
      this.rit(e,s,index)
    },100),
    rit2: Throttle(function(e, s,index,i) {
      this.selectArr.shop = s;
      this.selectArr.cars = e;
      this.rit(e,s,index,i)
    },100),
    rit3: Throttle(function(e, s,index) {
      this.selectArr.models = e;
      this.rit(e,s,index)
    },100),
    rit4: Throttle(function(e, s,index) {
      this.selectArr.displacement = e;
      this.rit(e,s,index)
    },100),
    rit5: Throttle(function(e, s,index) {
      this.selectArr.year  = e;
      this.rit(e,s,index)
    },100),
    rit6: Throttle(function(e, s,index) {
      this.selectArr.year  = e;
      this.rit(e,s,index)
    },100),
    rit7: Throttle(function(e, s,index) {
      this.selectArr.engine  = e;
      this.rit(e,s,index)
    },100),
    rit8: Throttle(function(e, s,index) {
      this.selectArr.power  = e;
      this.rit(e,s,index)
    },100),
    // 鼠标指向
    mouseOver(e) {
      this.$emit("mouseOver", e);
      this.ind = 9999;
      this.ins = 9999;
      this.e = ''
    },
    // 跳过方法
    tiao(e) {
      console.log(e);
      this.$emit("tiao", e);
    },

  },
  mounted(){
    console.log(this.obj,'obj')
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
.tab {
  justify-content: flex-end;
}
.vttn{
  margin-bottom: 20px;
  width: 100px;
  margin-left: 32px;
}
.vttn:focus{
  box-shadow: 0 0 0 2px rgba(119, 177, 16,.1)
}
.tab > div {
  width: 147px;
  height: 36px;
  background: #212531;
  border-radius: 4px 4px 0px 0px;
  color: #ffffff;
  margin-left: 5px;
  font-size: 16px;
  cursor: pointer;
}
.tabActive {
  background: #edeef2 !important;
}
.tabActive div {
  color: #333333;
}
.car {
  width: 27px;
  height: 13px;
  margin-right: 6px;
}
.serch {
  width: 17px;
  height: 17px;
  margin-right: 6px;
}
.bao {
  width: 18px;
  height: 18px;
  margin-right: 6px;
}
.content {
  width: 100%;
  background: #edeef2;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
}

.nav {
  width: 100%;
}
.nav p {
  /* width: 7%; */
  padding: 0 20px 0 30px;
  height: 40px;
  line-height: 40px;
  background: #ffffff;
  border-radius: 2px 2px 0px 0px;
  min-width: 50px;
  position: relative;
}
.nav p::after {
  content: "";
  position: absolute;
  top: -9px;
  right: -28px;
  width: 58px;
  height: 58px;
  -webkit-transform: rotate(45deg) scale(0.5);
  transform: rotate(45deg) scale(0.5);
  border-right: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;
  background-color: #ffffff;
  z-index: 10;
}
.nav p span {
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  background: rgba(153, 153, 153, 1);
  border-radius: 9px;
  margin-right: 12px;
}
/* .nav .xinghao {
  width: 15%;
  min-width: 110px;
} */
.nav .gonglv::after {
  display: none;
}

/* 已选车型 */
.yixuan .yixuan-title {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  cursor: inherit !important;
  margin-top: 10px;
}
.yixuan div {
  padding: 3px 3px 3px 10px;
  font-size: 12px;
  color: #333333;
  background-color: #fff;
  margin-left: 20px;
  border: 1px solid #77b110;
  box-sizing: border-box;
  margin-top: 10px;
}
.yixuan div .guan {
  width: 20px;
  height: 10px;
  cursor: pointer !important;
  margin-left: 10px;
  padding: 0 5px;
}

/* 框 */
.item {
  margin-top: 20px;
}
.item p {
  width: 124px;
  height: 44px;
  margin-right: 10px;
  text-align: center;
  line-height: 44px;
  background-color: #fff;
  margin-bottom: 10px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 2px;
}
.item p:hover {
  background: #77b110 !important;
  color: #ffffff !important;
}

.items {
  margin-top: 20px;
}
.items p {
  padding: 0 20px;
  height: 50px;
  margin-right: 24px;
  text-align: center;
  line-height: 48px;
  background-color: #fff;
  margin-bottom: 20px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 2px;
}
.items p:hover {
  background: #77b110 !important;
  color: #ffffff !important;
}

/* nav选中 */
.active {
  color: #ffffff;
  background: #77b110 !important;
}
.active span {
  background: #fff !important;
  color: #77b110 !important;
}
.active::after {
  border-right: 2px solid #ffffff !important;
  border-top: 2px solid #ffffff !important;
  background-color: #77b110 !important;
}

/* 热门标签 */
.remen p {
  width: 24px;
  height: 26px;
  line-height: 26px;
  margin-right: 15px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  border-radius: 2px;
}
.ractive {
  background-color: #77b110 !important;
  color: #fff !important;
}

/* 搜搜 */
.serch-box {
  width: 100%;
  background: #edeef2;
  padding: 36px 22px;
  box-sizing: border-box;
}
.serch-box .form {
  width: 80%;
}
.serch-box input {
  width: 80%;
  height: 46px;
  background-color: #fff;
  padding-left: 4%;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 2px 0 0 2px;
}
.serch-box .btn {
  width: 89px;
  height: 46px;
  background-color: #77b110;
  color: #fff;
  font-size: 16px;
  border-radius: 0 2px 2px 0;
}
.serch-box .btn p {
  margin-left: 2px;
  margin-top: 2px;
}

/* 产品 */
.chanpin-box {
  width: 100%;
  background: #edeef2;
  box-sizing: border-box;
}
.chanpin-item {
  width: 240px;
  height: 36px;
  /* background: #ffffff; */
  /* border: 2px solid #dddddd; */
  border-radius: 2px;
  box-sizing: border-box;
  padding-left: 12px;
  margin-right: 25px;
  margin-bottom: 10px;
}
.chanpin-box .list {
  padding: 16px 0 6px 20px;
}
/* .chanpin-box .list:nth-child(2n) {
  background: #f7f8fa;
} */
.chanpin-xian {
  position: relative;
  /* width: 30%; */
  width: 240px;
}
/* .chanpin-xian::after {
  position: absolute;
  content: "";
  width: 0;
  height: 20px;
  border-left: 1px solid #dddddd;
  left: -10px;
  top: 6px;
} */
.chanpin-xian .ivu-select-selection {
  border: none !important;
}
.ivu-select-visible .ivu-select-selection {
  border-color: white !important;
}

.chanpin-table {
  margin: 30px 0 70px;
}
.chanpin-table-title {
  width: 100%;
  height: 40px;
  background-color: #212531;
  color: #ffffff;
  font-size: 14px;
  padding: 0 20px;
  box-sizing: border-box;
}
.list-w1 {
  width:62%;
}
.list-w2 {
  width:20%;
}
.list-w3 {
  width: 18%;
}
.chanpin-table-box {
  width: 100%;
}
.list-left {
  width: 40%;
  /* min-width: 590px; */
}
.list-left-item {
  width: 100%;
}

.list-left-item > p {
  color: #77b110;
  font-size: 18px;
  font-weight: bold;
  line-height: 50px;
  background: #f6f7f9;
}
.list-left-item > div {
  height: 88px;
  border: 1px solid #dddddd;
  border-left: 0;
  box-sizing: border-box;
  width: 100%;
}
.list-left-item > div .name {
  color: #333333;
  font-size: 16px;
  font-weight: bold;
  width: 15%;
}
.list-left-item > div .name-right {
  padding: 20px 30px;
  box-sizing: border-box;
  border-left: 1px solid #dddddd;
  width: 85%;
  box-sizing: border-box;
}
.list-left-item > div .name-right img {
  width: 49px;
  height: 49px;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  object-fit: contain;
}

.list-left-item > div .name-right p {
  width: 100%;
}

.list-right {
  width: 60%;
  min-width: 395px;
  color: #333333;
  /* padding: 20px 0; */
  padding-bottom: 20px;
  box-sizing: border-box;
  border: 1px solid #dddddd;
}
.list-right .ord {
  box-sizing: border-box;
  line-height: 1.8;
  border-top: 1px solid #dddddd;
  padding: 10px 20px;
}
.list-right .ord:nth-child(1) {
  border-top: none;
}
.list-right .ord:hover{
  background-color: #f6f6f6;
}
.list-right .ord.tc.c9{
  cursor: pointer;
}
.list-right .ord.tc.c9:hover{
   background-color:transparent
}
.list-right .title {
  font-size: 16px;
  color: #333333;
  font-weight: bold;
}
.list-right .con {
  font-size: 14px;
}
.list-right .con span {
  margin-left: 25px;
}

.list-right .jiucuo {
  font-size: 14px;
  color: #777777;
  cursor: pointer;
}

.bot-title {
  display: none;
}
.tiaoguo {
  font-size: 16px;
  cursor: pointer;
}

@media only screen and (max-width: 1200px) {
  .box {
    width: 100%;
  }
}
@media only screen and (max-width: 1004px) {
  .list-left {
    width: 100%;
    min-width: 0;
  }
  .list-right {
    width: 100%;
    min-width: 0;
  }
  .top-title .list-w3 {
    display: none;
  }
  .bot-title {
    display: block;
  }
}
@media only screen and (max-width: 830px) {
  .chanpin-box .list {
    justify-content: center;
  }
  .bot-title .list-w3 {
    font-size: 14px;
  }
}
@media only screen and (max-width: 570px) {
  .chanpin-box .list {
    padding: 16px 0 20px;
  }
  .chanpin-item {
    width: 47%;
    margin: 0 1% 10px;
  }
  .serch-box form {
    width: 100%;
  }
  .list-left-item > div {
    height: 60px;
  }
  .list-left-item > div .name {
    line-height: 60px;
    color: #333333;
    font-size: 12px;
    font-weight: bold;
    width: 20%;
  }
  .list-left-item > div .name-right {
    padding: 10px 10px;
    box-sizing: border-box;
    border-left: 1px solid #dddddd;
    box-sizing: border-box;
    width: 80%;
  }
  .list-left-item > div .name-right img {
    width: 40px;
    height: 40px;
    border: 1px solid #dddddd;
    box-sizing: border-box;
  }
  .list-left-item > div .name-right p {
    margin-left: 6px;
    width: 80%;
    font-size: 12px;
  }
  .list-right > div {
    font-size: 12px;
  }
  .list-right .title {
    font-size: 14px;
  }
  .list-right .con {
    font-size: 12px;
  }
  .list-w1 {
    width: 30%;
  }
  .list-w2 {
    width: 30%;
  }
  .list-w3 {
    width: 40%;
  }
  .bot-title .list-w3 {
    font-size: 14px;
  }
  .item p {
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .serch-box .btn {
    font-size: 12px;
    cursor: pointer;
  }
  .serch-box .form {
    width: 100%;
  }
}
.mask {
  background-color: #000;
  opacity: 0.3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.pop {
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  min-width: 220px;
  z-index: 2;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
}
.btn {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #77b110;
  padding: 4px 12px;
}
.btns {
  background-color: #77b110;
  color: #ffffff;
  margin-left: 20px;
}
textarea {
  width: 100%;
  min-height: 100px;
  background-color: #f5f6fa;
  border-radius: 5px;
}
/* 级联 */
.ivu-cascader .ivu-input {
  padding-right: 0 !important;
}
.erjiserch{
  padding:0 !important;
}
.erjiserch .content{
  padding: 20px !important;
}
.erjiserch .content .item p{
  margin-bottom: 10px;
  margin-right: 10px;
  width: 125px;
}
</style>
