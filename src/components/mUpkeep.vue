<template>
  <div>
    <div class="m-list">
      <div class="mtitle">保养产品</div>
      <div v-for="(item,index) in list" :key="index">
        <div class="tl m-upkeep-title" v-if="item.grandsondata.length > 0">
          <h4 class="fbox fbox-acenter fbox-jbetween">
            <span @click="introtap(item.summary,item.video)">
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
              <span @click="moreTap(item.name,items)" class="norm-text color-light-gray">更多 ></span>
            </h4>
            <div
              class="mpad fbox fbox-acenter"
            >
              <div class="fbox fbox-acenter">
                <img :src="items.image?imgurl + items.image:require('./../assets/logo.png')" alt />
              </div>
              <div class="fbox fbox-jcenter fbox-col ml">
                <div>{{items.name}} {{items.model}}</div>
                <div class="fbox fbox-acenter fbox-jbetween" style="width:100%">
                  <div v-if="item.mileage" class="pck_num mr" style="color:#999">保养周期:{{item.mileage || ''}} {{item.limit && item.mileage?'或':''}} {{item.limit || ''}}</div>
                  <div class="pck_price tc color-red mr tl">{{items.price == 0?'产品需定价':'￥' + items.price}}</div>
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
          <div v-if="gd.data" style="max-height:200px;overflow: scroll;overflow-x: hidden;">
            <div v-for="(z,zindex) in gd.data" :key="zindex" class="mpad fbox fbox-acenter"  @click="huantap(gd,z,zindex,index)">
              <div class="fbox fbox-acenter">
                <img width="60" :src="z.image?imgurl + z.image:require('./../assets/logo.png')" />
              </div>
              <div class="fbox fbox-acenter fbox-col ml minwidth">
                <div class="tl" style="width:100%">{{z.name + ' ' + (z.model?z.model:'')}}</div>
                <div class="fbox fbox-acenter fbox-jbetween" style="width:100%">
                  <div class="pck_price tc color-red tl">{{z.price == 0?'产品需定价':z.price}}</div>
                  <div class="pck_num tc">{{z.number}}</div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="tc pt pb" style="color:#000;font-size:14px">-- 没有更多 --</div>
        </div>
        <div class="rishtext" v-if="videointro">
          <h4 class="fbox fbox-acenter fbox-jbetween">
            <span >详情</span>
            <img @click="introtap" src="../assets/end.png" alt="">
          </h4>
          <video :src="imgurl + item.video" controls='controls'></video>
          <div >
              {{item.summary}}
          </div>
        </div>
      </div>
    </div>
   <div class="tr mmoney">
          商品总价<span class="color-light-gray">（免工时费）</span>: <span class="color-red font-bold">￥{{moneyJ == 1?'产品需定价':money}}</span>
    </div>
    <!-- 保养项 -->
    
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
      imgurl:'https://damaichaxun.com/',
      title:"",
      gd:''
    };
  },
  props: {
    list: Array,
    money:Number,
    moneyJ:Number,
    zicat:Number,
    idarr:Array
  },
  methods: {
    huantap(a,b,ind,lind){
      let z = a,//外
          x = b,//里
          c = a.data;
           let zicat = '';
          console.log(a,'sa.cats')
          if(a.title == '机滤'){
            zicat = a.cat 
            this.list.forEach(item=>{
              if(item.id == 1){
               zicat = item.grandsondata[0].cat 
              }
            })
          }else{
            zicat = a.cat 
          }
      delete z.data;//外.data 
      c[ind] = z;//里.data
      x.data = c;//外.data
      // console.log('z:里',z)
      // console.log('x:外',x)
      this.gd = x;
      let list = this.list;
      let money = Number(this.money);
      // console.log(list)
      if(list[lind].id == 1){
        if(a.title == '机油'){
          //机油
          // this.list[lind].grandsondata[0] = x
          list[lind].grandsondata[0] = x
          console.log(x.name,'机油',list[lind].grandsondata[0],list[lind].grandsondata[0].name)
        }else if(a.title == '机滤'){
          //机滤
          // this.list[lind].grandsondata[1] = x
          list[lind].grandsondata[1] = x
          console.log(x.name,'机滤',list[lind].grandsondata[1])
        }
      }else{
        //其他大类
        // this.list[lind].grandsondata[0] = x
        list[lind].grandsondata[0] = x
      }
      let moneyJ = this.moneyJ
      if(b.total_price == 0){
        moneyJ = 1
      }else{
        moneyJ = 2
      }
      if(list[lind].id == 1){
        let newcat = list[lind].grandsondata[0].cat;
      let leng = list[lind].grandsondata[0].data.length;
      console.log(zicat,'zicat',list[lind].grandsondata[1].total_price)
      //eslint-disable-next-line no-debugger
      // debugger
      if(zicat == 2 && newcat == 1){
        //进行减法
        console.log('进行减法')
        money -= Number(list[lind].grandsondata[1].total_price)
      }
      if(zicat == 1 && newcat == 2){
        //进行加法
        console.log('进行加法')
        money += Number(list[lind].grandsondata[1].total_price)
      }
      if(zicat == 1 && newcat == 1){
        // money -= Number(list[lind].grandsondata[1].total_price)
      }
      if(a.title != '机滤'){
        money -= Number(a.total_price),
        money += Number(b.total_price);
      }else{
        if(zicat == 1 && newcat == 1){
            //
        }else{
          money -= Number(a.total_price),
          money += Number(b.total_price);
        }
      }
      
      console.log('newcat',newcat,list[lind].grandsondata[0].data,leng)
      this.$emit('zicat',newcat)
      }else{
        money -= Number(a.total_price),
        money += Number(b.total_price);
      }
      this.list = list
      money.toFixed(2)
       if(this.idarr.includes(0)){
        moneyJ = 1
      }
      this.$emit('moneyTap',{money,moneyJ})
    },
    introtap(a,b) {
      if(a || b){
        this.videointro = !this.videointro;
      }else{
        this.$Message.info({
              content: "暂无简介",
              duration: 3,
              closable: true,
        });
      }
      
    },
    moreTap(e,item) {
      this.title = e;
      this.gd = item;
    },
  },
};
</script>


<style scoped>
.pck_num,
.pck_price{font-size: 12px;max-width: 156px;margin-top: 5px;}
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
