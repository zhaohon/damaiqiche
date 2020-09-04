/* eslint-disable no-unused-vars */
<template>
  <div>
    <div style="max-width:1200px;margin:auto">
      <div class="mt mb">选择您想保养的项目，大唛养车为您推荐适用的保养方案</div>
      <div class="upkeep">
        <div class="carData pb pt fbox fbox-acenter fbox-jbetween">
          <!-- <img class="dib" src="../assets/logo.png" alt="logo" /> -->
          <div>
            <div
              class="mr ml large-text font-bold"
            >{{info.brand || messge.brand}} {{info.cars || messge.cars}} {{info.displacement || messge.displacement}} 2016年产</div>
            <div class="ml small-text pmfont">
              <div>
                <span>{{info.model || messge.model}}</span>
              </div>
              <div>
                <span v-if="info.engine">发动机型号：{{info.engine || messge.engine}}</span>
                <span v-if="info.engine">最大功率：{{info.power || messge.power}}</span>
                <button
                  @click="carshow = !carshow"
                  :class="info.engine?'ml':''"
                  class="color-page small-text"
                >查看详情 ></button>
              </div>
            </div>
          </div>
          <div class="m-form">
            <p class="small-text dib v-align">当前里程数:</p>
            <div class="input-group dib v-align">
              <input
                type="number"
                class="fl"
                :value="info.mileage"
                ref="licheng"
                placeholder="请输入里程数"
              />
              <p class="dib fr">公里</p>
            </div>
            <button class="btn dib v-align" @click="onSubmit()">查看推荐</button>
          </div>
          <div class="fbox fbox-acenter mr m-keepimg">
            <router-link class="reselection mr tc mr" :to="{name:'Home',params:{tabind:1}}">
              <img src="../assets/reelect.png" alt />
            </router-link>
            <router-link class="reselection" :to="{name:'Home',params:{tabind:3}}">
              <img src="../assets/upsearch.png" alt />
            </router-link>
          </div>
        </div>
        <transition name="slide-fade">
          <div class="carDetail" v-show="carshow" ref="carDetail" >
            <div style="background: rgb(237, 238, 242);">
              <span>发动机位置:{{detail.enginelocation || '无'}}</span>
              <span>驱动方式:{{detail.drivemode || '无'}}</span>
              <span>供油技术:{{detail.feedingoil || '无'}}</span>
              <span>启停技术:{{detail.startstop || '无'}}</span>
              <span>正时技术:{{detail.tivct || '无'}}</span>
            </div>
            <div >
              <span>变速箱档位数:{{detail.gearboxnum || '无'}}</span>
              <span>变速器描述:{{detail.transmission || '无'}}</span>
              <span>变速箱型号:{{detail.gearboxtype || '无'}}</span>
            </div>
            <div style="background: rgb(237, 238, 242);">
              <span>燃油滤清器位置:{{detail.oil_filtersite || '无'}}</span>
              <span>转向助力类型:{{detail.veer_help || '无'}}</span>
              <span>工位要求:{{detail.station_ask || '无'}}</span>
            </div>
          </div>
        </transition>
        <div class="byType mt">
          <div
            v-for="(item, byindex) in bytitle"
            :key="byindex"
            class="UnSelect"
            :style="{'background':byindex%2?'#F7F8FA':'#EDEEF2'}"
          >
            <dl class="clearfix">
              <dt class="byTitle fl" @click="indtap(item.check,byindex)">
                <span>{{ item.title }}</span>
                <img src="../assets/xia.png" :class="item.check?'mimg':''" />
              </dt>
              <div class="fl dib pcwhite" v-if="item.check">
                  <div
                    v-for="(childrenItem, index) in item.sondata"
                    :key="index"
                    class="fl dib"
                    :style="{display:childrenItem.grandsondata.length > 0?'':'none'}"
                    @click="listTap({ childrenItem, index, byindex })"
                  >
                    <dd 
                      v-if="childrenItem.grandsondata.length > 0"
                      class="tc"
                      :class="childrenItem.checked ? 'checked' : ''"
                      :data-id="childrenItem.id"
                    >
                      <div class="inner">{{ childrenItem.title }}</div>
                      <img class="inner-img" src="../assets/triangle.png" alt />
                    </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
        <pUpkeep class="mt" @moneyTap="moneyTap" :moneyJ="moneyJ" :money="money" :list="upkeepList" v-if="screenWidth > 700"></pUpkeep>
        <mUpkeep :moneyJ="moneyJ" @moneyTap="moneyTap" :money="money" :list="upkeepList" v-if="screenWidth < 700"></mUpkeep>
        <!-- 移动端 -->
        <div class="m-list"></div>
      </div>
    </div>
    <Loading v-if="show" />

    <div style="height:75px"></div>
  </div>
</template>
<script>
import Loading from "@/components/Loading.vue";
import pUpkeep from "@/components/pUpkeep.vue";
import mUpkeep from "@/components/mUpkeep.vue";
export default {
  name: "Upkeep",
  components: {
    Loading,
    pUpkeep,
    mUpkeep,
  },
  data() {
    return {
      messge: {},
      screenWidth: "",
      show: true,
      carshow: false,
      formItem: { input: "" },
      byind: 0,
      bytitle: [],
      upkeepList: [],
      money: 0,
      info: {},
      detail:{},
      numType: 0, //0 不执行判断 ；1 +9了 ； 2 价格-9了
      numType1: 0, //0 不执行判断 ；1 +38了 ； 2 价格-38了
      moneyJ:2,//1产品需定价 2默认
    };
  },
  watch: {
    screenWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      if (!this.timer) {
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          that.timer = false;
        }, 400);
      }
    },
  },
  methods: {
    moneyTap(e){
      console.log(e,'moneyTapmoneyTap')
      this.moneyJ = e.moneyJ;
      this.money = Number(e.money.toFixed(2));
    },
    indtap(e, ind) {
      console.log('this.bytitle[ind]',this.bytitle[ind].check)
      console.log('this.bytitle[ind]',this.bytitle)
      if (document.body.clientWidth <= 684) {
        // 移动端
        this.bytitle[ind].check = !e
      }
    },
    //里程
    onSubmit() {
      this.show = true;
      let messge = this.messge;
      let a = this.$refs.licheng.value;
      messge.mileage = a;
      localStorage.setItem("messge", this.$qs.stringify(messge));
      this.ajax(messge);
    },
    listTap(obj) {
      let tapId = obj.childrenItem.id;
      this.bytitle[obj.byindex].sondata[obj.index].checked = !this.bytitle[obj.byindex].sondata[obj.index].checked; //选中状态
      let bytitle = this.bytitle[obj.byindex].sondata[obj.index]; //当前点击的数据
      //润滑系统不可单独选择
      if(tapId == 16){
        this.bytitle[0].sondata.forEach(u=>{
          if(u.id == 1 && u.checked == false){
            this.bytitle[obj.byindex].sondata[obj.index].checked = false
            this.$Message.error('需选择小保养');
            return
          }
        })
      }
      if (bytitle.checked) {
        let upkeepList = this.upkeepList;
        upkeepList.push({
          name: bytitle.title,
          id: bytitle.id,
          summary:bytitle.summary,
          video:bytitle.video,
          grandsondata: bytitle.grandsondata,
        });
        
        console.log('this.upkeepList',this.upkeepList)
        //向数组添加选中的数据
        //选中服务项目 价格相加
        bytitle.grandsondata.forEach((m) => {
          if (JSON.stringify(m) !== "{}") {
            console.log('m.total_price',m.total_price)
            this.money += Number(m.total_price);
            if(m.total_price == 0){
              this.moneyJ = 1
            }
          }
        });
        if(bytitle.grandsondata[0].cat == 1){
          if(JSON.stringify(bytitle.grandsondata[1]) !== "{}"){
            this.money += 0
          }
        }
        let arrid = new Array;
        upkeepList.forEach((o) => {
          arrid.push(o.id);
        });
        //小保养 节气门 润滑系统（发动机内部清洗） 同时存在 则减9元
        if (arrid.includes(1) && arrid.includes(15) && arrid.includes(16)) {
          if (this.numType == 0 || this.numType == 1) {
            this.money -= 9;
            this.numType = 2;
          }
        }
        //判断是否有选择小保养，若选择并且"进气道、喷油嘴、燃油系统清洗"同时选择则计算套餐价格 299 原价减38
        if (
          arrid.includes(1) &&
          arrid.includes(17) &&
          arrid.includes(18) &&
          arrid.includes(19)
        ) {
          if (this.numType1 == 0 || this.numType1 == 1) {
            this.money -= 38;
            this.numType1 = 2;
          }
        }
        upkeepList.sort((x,y)=>{
          console.log('xy',x.id,y.id)
            return x.id-y.id
        })
      } else if (!bytitle.checked) {
        //清除取消选中的数据
        
        //取消选中小保养 润滑系统也取消选中
        if(bytitle.id == 1 ){
          let sondata = this.bytitle[3].sondata;
          sondata.forEach(l=>{if(l.id == 16){l.checked = false}})
          this.upkeepList.forEach((item, key) => {
            if(item.id == 16) {
              this.upkeepList.splice(key, 1);
              item.grandsondata.forEach((m) => {
                // eslint-disable-next-line no-debugger
                if (JSON.stringify(m) !== "{}") {
                  this.money -= Number(m.total_price);
                }
              });
            }
          });
        }
        this.upkeepList.forEach((item, key) => {
            if(item.id == bytitle.id) {
            this.upkeepList.splice(key, 1);
            //取消选中价格相减
            item.grandsondata.forEach((m) => {
              // eslint-disable-next-line no-debugger
              if (JSON.stringify(m) !== "{}") {
                this.money -= Number(m.total_price);
              }
            });
          }
        });
        let idarr = new Array;
        let arrid = new Array();
        this.upkeepList.forEach((o) => {
          arrid.push(o.id);
          o.grandsondata.forEach(a=>{
            idarr.push(Number(a.total_price))
          })
        });
        console.log('idarr',idarr)
        if(idarr.includes(0)){
          //不走
        }else{
          this.moneyJ = 2
        }
        //小保养 节气门 润滑系统（发动机内部清洗） 同时存在 则减9元
        if (arrid.includes(1) && arrid.includes(15) && arrid.includes(16)) {
          //不走
        } else {
          if (this.numType == 2) {
            this.money += 9;
            this.numType = 1;
          }
        }

        //判断是否有选择小保养，若没有同时选择"进气道、喷油嘴、燃油系统清洗"同时选择则计算套餐价格 299 原价加38
        if (
          arrid.includes(1) &&
          arrid.includes(17) &&
          arrid.includes(18) &&
          arrid.includes(19)
        ) {
          //不走
        } else {
          if (this.numType1 == 2) {
            this.money += 38;
            this.numType1 = 1;
          }
        }
      }
      
      this.money = Number(this.money.toFixed(2));
    },

    async ajax(messge) {
      this.money = 0;
      this.numType = 0;
      this.numType1 = 0;
      this.$http
        .getProject(messge)
        .then((res) => {
          if(res == ''){
            this.$Message.info({
              content: "暂无数据，请重选车型",
              duration: 15,
              closable: true,
            });
          }
          this.info = res;
          this.detail = res.detail || {
            enginelocation:'无',
            drivemode:'无',
            feedingoil:'无',
            startstop:'无',
            tivct:'无',
            gearboxnum:'无',
            transmission:'无',
            gearboxtype:'无',
            oil_filtersite:'无',
            veer_help:'无',
            station_ask:'无',
          };
          this.bytitle = res.data;
          //初始化
          let upkeepList = new Array();
          if(JSON.stringify(this.bytitle[0].sondata[0].grandsondata[0]) == "{}"){
            if(JSON.stringify(this.bytitle[0].sondata[0].grandsondata[1]) == "{}"){
                this.bytitle[0].sondata[0].grandsondata.splice(0, 2);
            }
          }
          if(JSON.stringify(this.bytitle[0].sondata[0].grandsondata[0]) == "{}"){
                this.bytitle[0].sondata[0].grandsondata.splice(0, 1);
          }
          if(JSON.stringify(this.bytitle[0].sondata[0].grandsondata[1]) == "{}"){
                this.bytitle[0].sondata[0].grandsondata.splice(1, 1);
          }
          this.bytitle.forEach((i) => {
            i.num = 0;
            i.sondata.forEach((k) => {
              if(k.grandsondata.length == 0){
                i.num++
              }
              if(i.num == i.sondata.length){
                i.check = false
              }
              //默认选中 显示相关服务项目 价格相加
              if (k.grandsondata.length > 0) {
                // eslint-disable-next-line no-debugger
                k.grandsondata.forEach((m, ind) => {
                  if (JSON.stringify(m) !== "{}") {
                    if (k.checked) {
                      this.money += Number(m.total_price);
                      if(m.total_price == 0){
                        this.moneyJ = 1 //1产品需定价
                      }
                    }
                  } else {
                    k.grandsondata.splice(ind, 1);
                  }
                });
                if (k.checked) {
                  upkeepList.push({name: k.title,id: k.id,grandsondata: k.grandsondata,summary:k.summary,video:k.video,});
                  if(k.grandsondata[0].cat == 1){
                    if(JSON.stringify(k.grandsondata[1]) !== "{}"){
                      if(k.grandsondata[1].total_price != 0){
                        this.money += 0
                      }
                    }
                  }
                }
              }
            });
          });
          this.money = Number(this.money.toFixed(2));
          let arrid = new Array();
          upkeepList.forEach((o) => {
            arrid.push(o.id);
          });
          //小保养 节气门 润滑系统（发动机内部清洗） 同时存在 则减9元
          if (arrid.includes(1) && arrid.includes(15) && arrid.includes(16)) {
            if (this.numType == 1 || this.numType == 0) {
              this.money -= 9;
              this.numType = 2;
            }
          }
          //判断是否有选择小保养，若选择并且"进气道、喷油嘴、燃油系统清洗"同时选择则计算套餐价格 299 原价减38
          if (arrid.includes(1) && arrid.includes(17) && arrid.includes(18) && arrid.includes(19)) {
            if (this.numType1 == 0 || this.numType1 == 1) {
              this.money -= 38;
              this.numType1 = 2;
            }
          }
          upkeepList.sort((x,y)=>{
            x.id - y.id
          })
          console.log('upkeepList',upkeepList)

          this.upkeepList = upkeepList;

          this.show = false;
        })
        .catch((err) => {
          this.show = false;
          console.log("错误", err);
        });
    },
  },

  mounted() {
    this.screenWidth = document.body.clientWidth;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
    this.messge = this.$qs.parse(localStorage.getItem("messge"));
    this.ajax(this.messge);
  },
};
</script>
<style scoped>
.pcwhite {
  width: 90%;
}
.byTitle {
  margin: 8px 0 20px 10px;
  width: 84px;
  font-weight: bold;
}
.clearfix dd {
  border: 1px solid #dddddd;
  cursor: pointer;
  padding: 5px 30px;
  min-width: 138px;
  background: #fff;
  box-sizing: border-box;
  font-size: 14px;
}
.pcwhite .dib {
  margin: 0 0 15px 16px;
  box-sizing: border-box;
}
.inner-img {
  position: absolute;
  bottom: -1px;
  right: -1px;
  display: none;
}
.checked {
  padding: 4px 30px !important;
  color: #7bb10a;
  border: 2px solid #7bb10a !important;
  position: relative;
  box-sizing: border-box;
}
.checked .inner-img {
  display: block;
}
.carData {
  border-top: 2px solid #7bb10a;
  background-color: #f6f7fb;
}
.carData img {
  width: 50px;
  height: 50px;
}
.carData .btn {
  color: #fff;
  outline: none;
  background-color: #7bb10a;
  margin-left: 10px;
  height: 33px;
  line-height: 33px;
  padding: 0 10px;
  font-size: 14px;
}
.carDetail {
  background-color: #f6f7fb;
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
}
.carDetail span{
  margin-right: 30px;
  width: 194px;
  line-height:2;
  font-size: 14px;
  display: inline-block;
}
.carDetail div{
  width: 100%;
    padding:5px 20px;
}

.ivu-btn-primary {
  background-color: #7bb10a;
  border-color: #7bb10a;
}
.UnSelect {
  padding-top: 20px;
}

/* 查看车辆信息动画 */
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.4s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}
.input-group {
  border: 1px solid #7bb10a;
  margin-left: 10px;
  padding: 5px;
  font-size: 14px;
}
.input-group:hover {
  border-color: #7bb10a;
  box-shadow: 0 0 0 2px rgba(123, 177, 10, 0.1);
}
.byTitle img {
  display: none;
}
.input-group input {
  width: 80%;
}
.input-group input:focus {
  border: none;
}
.input-group .input-group input::-webkit-outer-spin-button,
.input-group input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
a {
  color: #333;
}
.reselection img {
  width: 70px;
  height: 70px;
}
.pmfont span {
  margin-right: 15px;
}
@media only screen and (max-width: 1200px) {
  .head {
    width: 100%;
  }
}
@media only screen and (max-width: 940px) {
  .v-align.small-text {
    display: none;
  }
}
@media only screen and (max-width: 960px) {
  .pcwhite {
    width: 85%;
  }
}
@media only screen and (max-width: 870px) {
  .m-form {
    display: block;
    text-align: center;
  }
  .color-page.small-text.ml {
    margin-left: 0;
  }
  .m-form .btn {
    margin-top: 10px;
  }
  .input-group {
    width: 71%;
  }
}
@media only screen and (max-width: 700px) {
  .pmfont {
  }
  .byTitle {
    float: inherit;
  }
  .pcwhite {
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
  }
  .pcwhite .dib {
    margin: 0 0 10px 10px;
    width: 46%;
    float: inherit !important;
  }
  .clearfix dd {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px 20px !important;
    justify-content: center;
  }
  .checked {
    padding: 5px 20px !important;
  }
  .carData {
    display: block;
  }
  .m-form {
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 12px;
    text-align: left;
  }
  .input-group {
    margin-left: 0;
  }
  .m-form .btn {
    margin-top: 0;
  }
  .m-keepimg {
    margin-right: 0;
    justify-content: space-around;
    padding: 0 20px;
  }
  .UnSelect {
    padding: 10px 0;
    background-color: inherit !important;
  }
  .byTitle {
    margin: 0;
    padding: 10px;
    width: 100%;
    background: #f6f7f9;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .byTitle img {
    width: 14px;
    height: 14px;
    display: block;
  }
}
/* 移动端箭头旋转 */
.mimg {
  transform: rotateX(180deg);
  transition: all 200ms ease-out 0.1s;
}
</style>
