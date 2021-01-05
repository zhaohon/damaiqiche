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
          <div class="tl upkeep-left-title" v-if="item.grandsondata.length > 0" >
            <h4 class="dib pore" @mouseenter="mousepop(index + '1')" @mouseleave="outStyle(index + '1')" @click="introtap(item.summary,item.video)">{{item.name}} <i class="myou"></i>
              <div class="popup" v-if="act == index + '1'">
                  <img class="popsj" src="../assets/sj.png" alt="">
                  <div v-if="item.summary && item.video">
                    <span class="dib ell_3">{{item.summary}}</span>
                    <p class="color-page db" >查看详情 ></p>
                  </div>
                  <div v-else>暂无简介</div>
              </div> 
            </h4>
            <div class="pc-upkeep-right pbupkeep" v-if="item.name == title">
              <h4><i></i> 更多推荐产品</h4>
              <div class="scrollpc" v-if="gd.data.length > 0">
                <div v-for="(z,zindex) in gd.data" :key="zindex" @click="huantap(gd,z,zindex,index)">
                  <div class="upkeep-right-font">
                    <div class="fl dib"><img :src="z.image?imgurl + z.image:require('./../assets/logo.png')" alt /></div>
                    <h4 class="fl mr ">{{z.name + ' ' + (z.model?z.model:'')}}</h4>
                    <p class="fl mr upkeep-right-price">{{z.price == 0?'产品需定价':z.price}}</p>
                    <p class="fl mr upkeep-right-num">{{z.number}}</p>
                    <div class="clearfix"></div>
                  </div>
                </div>
              </div>
              <div v-else class="tc pt pb" style="color:#000;font-size:14px">-- 没有更多 --</div>
            </div>
          </div>

          <div class="upkeep-list">
            <table :style="[{borderBottom:(item.grandsondata.length > 0?'':'none')}]">
              <tbody v-if="item.grandsondata.length > 0" >
                <tr v-for="(items,indexs) in item.grandsondata" :key="indexs">
                    <td width="130" class="tc">{{items.title}} </td>
                    <td class="hover-bor" :class="hovernum == index + String(indexs)?'hoverbg':''" @click="listtap(items,item.name,index + String(indexs))">
                      <div class="pack_biaoti">
                        <img class="fl" :src="items.image?imgurl + items.image:require('./../assets/logo.png')" alt />
                        <div>
                          <p>{{items.name}} {{items.model}} </p>
                          <p v-if="items.wiper_api">雨刷接口：{{items.wiper_api}}</p>
                          <p v-if="items.battery_location ">蓄电池位置：{{items.battery_location}}</p>
                          <p v-if="item.mileage || item.limit" style="font-size:12px;color:#999;margin-top:5px">保养周期:{{item.mileage || ''}} {{item.limit && item.mileage?'或':''}} {{item.limit || ''}}</p>
                        </div>
                      </div>
                      <div class="pck_price tc color-red">{{items.price == 0?'产品需定价':items.price}}</div>
                      <div class="pck_num tc">{{items.number}}</div>
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="videointro" v-if="videointro">
            <div class="end">
              <span class="fl">详情</span>
              <img class="fr" @click="endTap" src="../assets/end.png" alt="">
            </div>
              <video :src="imgurl + item.video" controls='controls'>您的浏览器不支持 video 标签。</video>
              <div class="desc">
                  {{item.summary}}
              </div>
          </div>
        </div>
      </div>
      <div class="tr fl comemoney">
          商品总价<span class="color-light-gray">（免工时费）</span>: <span class="color-red font-bold">￥{{moneyJ == 1?'产品需定价':money}}</span>
      </div>
      <div class="clearfix"></div>
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
      gd:'',
      imgurl:'https://damaichaxun.com/'
    };
  },
  props: {
    list: Array,
    moneyJ:Number,
    money:Number,
    zicat:Number,
    idarr:Array
  },

  methods: {
    huantap(a,b,ind,lind){
      //  console.log(a,b,'sssssssssssssssssssssssssssssssss',this.list)
      let z = a,//外
          x = b,//里
          c = a.data;
          let zicat = ''
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
      console.log(b.total_price)
      if(b.total_price == 0){
        moneyJ = 1
      }else{
        moneyJ = 2
      }
      if(list[lind].id == 1){
        let newcat = list[lind].grandsondata[0].cat;
      let leng = list[lind].grandsondata[0].data.length;
      // console.log(zicat,'zicat',list[lind].grandsondata[1].total_price)
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
      
      let idarrs = new Array;
      this.list.forEach((o) => {
          o.grandsondata.forEach(a=>{
            if(a.cats != 1){
              idarrs.push(Number(a.total_price))
            }
          })
        });
      if(idarrs.includes(0)){
        moneyJ = 1
      }
      this.$emit('moneyTap',{money,moneyJ})
    },
    endTap(){
      this.videointro = false
    },
    listtap(item,name,indexs){
      console.log('name',name,this.title,item)
      if(!item.data){
        item.data = []
      }
      if(name == this.title) {
        this.title = '';
        this.hovernum = '-1';
      }else{
        this.title = name;
        this.gd = item;
        this.hovernum = indexs;
      }
    },
    mousepop(e){
       this.act = e
    },
    // eslint-disable-next-line no-unused-vars
    outStyle(e){
      this.act = ''
    },
    introtap(a,b){
      if(a && b){
        this.videointro = !this.videointro
      }
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
  background-color: #999;
  display: block;
}
.desc{
    height: 320px;
    padding: 10px 20px;
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
  /* position: absolute; */
  /* top: 50%; */
  /* margin-top: -25px; */
  /* left: 15px; */
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
  box-sizing: border-box;
  border: 1px solid #dcdde1;
  background-color: #edeef2;
  border-left: none;
  border-bottom: none;
}
.scrollpc{
  max-height: 400px;
  overflow-y: auto;
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
  z-index: 9;
  cursor: pointer;
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
  width: 280px;
  margin-left: 80px;
  font-weight: 100;
  color: #333;
}
.upkeep-right-font p {
  /* height: 22px; */
  font-size: 14px;
  margin-left: 80px;
  /* position: absolute; */
  /* top: 50%; */
  /* margin-top: -11px; */
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
