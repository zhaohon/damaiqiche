<template>
  <div>
    
    <!-- 保养项 -->
    <div class="w pc-list">
      <div class="pc-upkeep-left fl">
        <div class="upkeep-title">
          <ul class="fbox fbox-acenter color-white">
            <li class="tc" style="width:130px">保养项目</li>
            <li class="tc" style="width:310px">已选购产品</li>
            <li class="tc" style="width:130px">单价</li>
            <li class="tc" style="width:160px">数量</li>
          </ul>
        </div>

        <div v-for="(item,index) in list" :key="index">
          <div class="tl upkeep-left-title">
            <h4 class="dib pore" @mouseenter="mousepop(index + '1')" @mouseleave="outStyle(index + '1')" @click="introtap">{{item.name}} <i class="myou"></i>
              <div class="popup" v-if="act == index + '1'">
                  <img class="popsj" src="../assets/sj.png" alt="">
                  <span class="dib ell_3">小 保养的时间取决于所用机油和机油滤芯的有效时间或里程。不同品牌级别的矿物质机油、半合成机油、全合成机油有效期也不尽相同，请以厂</span>
                  <p class="color-page db" >查看详情 ></p>
              </div> 
            </h4>
            <div class="pc-upkeep-right pbupkeep" v-if="item.name == title">
              <h4><i></i> 更多推荐产品</h4>
              <div>
                <div class="upkeep-right-font">
                  <div class="fl dib"><img src="../assets/logo.png" alt /></div>
                  <h4 class="fl mr ">冠军/CHAMPION 全能长效防冻冷却液 -45°C 沸点113°C 4L CC-45-NC-4L灰桶（新包装）</h4>
                  <p class="fl mr upkeep-right-price">￥199.00</p>
                  <p class="fl mr upkeep-right-num">1.6L</p>
                  <div class="clearfix"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="upkeep-list">
            <table>
              <tbody>
                <tr v-for="(items,indexs) in item.grandsonList" :key="indexs">
                  <td width="130" class="tc">{{items.ZhName}}</td>
                  <td class="hover-bor" :class="hovernum == index + String(indexs)?'hoverbg':''" @click="listtap(items,item.name,index + String(indexs))">
                    <div class="pack_biaoti">
                      <img class="fl" :src="items.Image" alt />
                      <div>{{items.DisplayName}}</div>
                    </div>
                    <div class="pck_price tc color-red">¥{{items.Price}}</div>
                    <div class="pck_num tc">{{items.Count}}</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="tr fl comemoney">
          商品总价<span class="color-light-gray">（不含工时费）</span>: <span class="color-red font-bold">￥{{money}}</span>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="videointro" v-if="videointro">
      <div class="end">
        <span class="fl">详情</span>
        <img class="fr" @click="endTap" src="../assets/end.png" alt="">
      </div>
        <video src=""></video>
        <div class="desc">

        </div>
    </div>
    <div class="shade" v-if="videointro"></div>
  </div>
</template>

<script>
export default {
  name: "pUpkeep",
  data() {
    return {
      title:'',
      hovernum:'',
      act:'',
      videointro:false,
    };
  },
  props: {
    list: Array,
    money:Number,
  },
  methods: {
    endTap(){
      this.videointro = false
    },
    listtap(item,name,indexs){
        console.log('e',item,name)
        this.title = name
        this.hovernum = indexs
    },
    mousepop(e){
      this.act = e
    },
    // eslint-disable-next-line no-unused-vars
    outStyle(e){
      this.act = ''
    },
    introtap(){
      this.videointro = !this.videointro
    }
  },
};
</script>


<style scoped>
.end{
  background-color: #fff;
  width: 100%;
  overflow: hidden;
  padding: 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}
.end img{
  margin-top: 2px;
  width: 20px;
}
.videointro{
  position: fixed;
  width: 680px;
  top: 50%;
  margin-top: -265px;
  z-index: 8889;
  right: 50%;
  margin-right:-340px ;
}
.videointro video{
  width: 680px;
  height: 260px;
  background-color: red;
  display: block;
}
.desc{
    height: 320px;
    padding: 0 20px 20px;
    overflow-y: auto;
    background-color: #fff;
}
.shade{
  opacity: .5;
  background-color: #000;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 8888;
}
.popup{
  position: absolute;
  color: #333;
  font-size: 12px;
  top: 45px;
  width: 252px;
  padding: 10px;
  z-index: 999;
  background-color:#fff ;
  font-weight: 100;
  border:2px solid #DDDDDD;
  cursor: inherit !important;
}
.popup p{cursor: pointer;}
.popsj{
  position: absolute;
  top:-11px;
  left: 20px;
}
.hoverbg{
  border-right: none !important;
  background-color: #edeef2;
}
.comemoney{
  height: 50px;
  line-height: 50px;
  width: 750px;
  padding: 0 30px;
  font-size: 18px;
  background-color: #F5F7F9;
}
.upkeep-left-title {
  background-color: #f6f7f9;
  color: #7bb10a;
  font-size: 18px;
  position: relative;
  box-sizing: border-box;
}
.upkeep-left-title > h4 {
  cursor: pointer;
  padding: 10px;
}
.pc-upkeep-left {
  width: 750px;
}
.upkeep-title {
  background-color: #212531;
}
.upkeep-title ul {
  width: 100%;
  background-color: #212531;
}
.upkeep-title li {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 0;
}
.upkeep-list {
  font-size: 14px;
}
.upkeep-list table {
  border-spacing: 0;
  width: 100%;
}
.upkeep-list table tr td {
  box-sizing: border-box;
}
.upkeep-list table tr td:first-child {
  border-right: none;
}
/* .bor-top{border-top: 1px solid  #dcdcdc !important;} */
/* .bor-top:hover{border-color: #7bb10a !important;} */
.upkeep-list td {
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid #dcdcdc;
  border-bottom-color: transparent;
}
.hover-bor {
  cursor: pointer;
}
.hover-bor:hover {
  border: 1px solid #7bb10a;
}
.upkeep-list td div {
  float: left;
  padding: 10px;
}
.pack_biaoti {
  width: 310px;
  position: relative;
}
.pack_biaoti div {
  width: 220px;
  float: right !important;
  padding: 0 !important;
}
.pack_biaoti img {
  position: absolute;
  top: 50%;
  margin-top: -25px;
  left: 15px;
  width: 50px;
  height: 50px;
  border: 1px solid #d8d8d8;
  background-color: #fff;
  object-fit: unset;
}
.pck_num {
  width: 160px;
}
.pck_price {
  width: 130px;
}
.pbupkeep {
  position: absolute;
  right: -420px;
  top: -44px;
}
.pc-upkeep-right {
  width: 420px;
  /* padding: 10px; */
  max-height: 400px;
  box-sizing: border-box;
  border: 1px solid #dcdde1;
  background-color: #edeef2;
  border-left: none;
  border-bottom: none;
}
.pc-upkeep-right > h4 {
  border-bottom: 1px solid #dcdde1;
  position: relative;
  font-size: 18px;
  padding: 10px 20px;
}
.pc-upkeep-right > h4 > i {
  position: absolute;
  left: 10px;
  width: 3px;
  height: 22px;
  background-color: #7bb10a;
  top: 50%;
  margin-top: -13px;
}

.upkeep-right-font {
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid #dcdde1;
  padding: 15px 10px;
}
.upkeep-right-font .dib {
  position: absolute;
  top: 50%;
  margin-top: -35px;
  background-color: white;
}
.upkeep-right-font div {
  width: 50px;
  height: 50px;
  object-fit: fill;
  text-align: center;
}
.upkeep-right-font div img {
  width: 50px;
  height: 50px;
}
.upkeep-right-font h4 {
  font-size: 14px;
  width: 160px;
  margin-left: 80px;
  font-weight: 100;
  color: #333;
}
.upkeep-right-font p {
  height: 22px;
  font-size: 14px;
  position: absolute;
  top: 50%;
  margin-top: -11px;
}
.upkeep-right-price {
  right: 70px;
  color: #cd6066;
}
.upkeep-right-num {
  right: 10px;
  color: #333;
}
table {
  border-bottom: 1px solid #dcdcdc;
}
.myou {
  background: url("../assets/you.png");
  width: 14px;
  height: 14px;
  display: inline-block;
  background-size: 100%;
  background-position-y: 14px;
}
</style>
