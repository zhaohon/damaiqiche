<template>
  <div>
    <div style="max-width:1200px;margin:auto">
      <div class="mt mb">选择您想保养的项目，大唛养车为您推荐适用的保养方案</div>
      <div class="upkeep">
        <div class="carData pb pt fbox fbox-acenter fbox-jbetween">
          <!-- <img class="dib" src="../assets/logo.png" alt="logo" /> -->
          <div>
            <div class="mr ml large-text font-bold">大众 帕萨特 1.4L 2016年产</div>
            <div class="ml small-text pmfont">
              <div>
                <span>2016年产</span>
                <span>2.0T(380TSI) 豪华版</span>
              </div>
              <div>
                <span>发动机型号：EA888</span>
                <span>最大功率：110KW</span>
                <button @click="carshow = !carshow" class="ml color-page small-text">查看详情 ></button>
              </div>
            </div>
          </div>
          <div class="m-form">
            <p class="small-text dib v-align">当前里程数:</p>
            <div class="input-group dib v-align">
              <input type="number" class="fl" ref="licheng" placeholder="请输入里程数" />
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
          <!-- v-show="carshow" -->
          <div class="carDetail" v-show="carshow" ref="carDetail">
            <div>发动机位置</div>
            <div>驱动方式</div>
            <div>供油技术</div>
            <div>启停技术</div>
            <div>正时技术</div>
            <div>变速箱档位数</div>
            <div>变速器描述</div>
            <div>变速箱型号</div>
            <div>燃油滤清器位置</div>
            <div>转向助力类型</div>
            <div>工位要求</div>
          </div>
        </transition>
        <div class="byType mt">
          <div
            v-for="(item, byindex) in bytitle"
            :key="byindex"
            class="UnSelect"
            :style="byindex%2?'background:#F7F8FA':'background:#EDEEF2'"
          >
            <dl class="clearfix">
              <dt class="byTitle fl" @click="indtap(item.check,byindex)">
                <span>{{ item.title }}</span>
                <img src="../assets/xia.png" :class="item.check?'mimg':''" alt="">
              </dt>
              <div class="fl dib pcwhite" v-if="item.check">
                <div
                  v-for="(childrenItem, index) in item.childrenList"
                  :key="index"
                  class="fl dib"
                  @click="listTap({ childrenItem, index, byindex })"
                >
                  <dd
                    class="tc"
                    :class="childrenItem.checked ? 'checked' : ''"
                    :data-id="childrenItem.cat_id"
                  >
                    <div class="inner">{{ childrenItem.name }}</div>
                    <img class="inner-img" src="../assets/triangle.png" alt />
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
        <pUpkeep class="mt" :money="money" :list="upkeepList" v-if="screenWidth > 700"></pUpkeep>
        <mUpkeep :money="money" :list="upkeepList" v-if="screenWidth < 700"></mUpkeep>
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
      screenWidth: "",
      show: true,
      carshow: false,
      formItem: { input: "" },
      byind:0,
      bytitle: [
        {
          title: "常规保养",
          check:true,
          childrenList: [
            { 
              name: "小保养", 
              id: "1", 
              checked: true,
              grandsonList:[
                {
                  ZhName: "机油",
                  DisplayName: "【正品授权】美国胜牌/Valvoline All-Climate 曼城版 星跃高级机油 SN 10W-40 4L【881864】",
                  Image: "https://img1.tuhu.org/Images/Products/422b/04ac/2c19047ef33eb5743fb23aaa_w800_h800.png",
                  Price: 118,
                  Count: 1
                },
                {
                  ZhName: "机滤",
                  DisplayName: "机滤/Valvoline All-Climate 曼城版 星跃高级机油 SN 10W-40 4L【881864】",
                  Image: "https://img1.tuhu.org/Images/Products/422b/04ac/2c19047ef33eb5743fb23aaa_w800_h800.png",
                  Price: 1182,
                  Count: 1
                }
              ]
            },
            { 
              name: "前雨刷", 
              id: "2", 
              checked: false,
              grandsonList:[
                {
                  ZhName: "机油1",
                  DisplayName: "1【正品授权】美国胜牌/Valvoline All-Climate 曼城版 星跃高级机油 SN 10W-40 4L【881864】",
                  Image: "https://img1.tuhu.org/Images/Products/422b/04ac/2c19047ef33eb5743fb23aaa_w800_h800.png",
                  Price: 222,
                  Count: 6
                }
              ]
            },
            { 
              name: "前雨刷2", 
              id: "3", 
              checked: false,
              grandsonList:[
                {
                  ZhName: "机油2",
                  DisplayName: "2【正品授权】美国胜牌/Valvoline All-Climate 曼城版 星跃高级机油 SN 10W-40 4L【881864】",
                  Image: "https://img1.tuhu.org/Images/Products/422b/04ac/2c19047ef33eb5743fb23aaa_w800_h800.png",
                  Price: 122,
                  Count: 3
                }
              ]
            },
            { 
              name: "前雨刷3", 
              id: "4", 
              checked: false,
              grandsonList:[
                {
                  ZhName: "机油3",
                  DisplayName: "3【正品授权】美国胜牌/Valvoline All-Climate 曼城版 星跃高级机油 SN 10W-40 4L【881864】",
                  Image: "https://img1.tuhu.org/Images/Products/422b/04ac/2c19047ef33eb5743fb23aaa_w800_h800.png",
                  Price: 2232,
                  Count: 1
                }
              ]
            },
          ],
        },
        {
          title: "深度保养",
          check:true,
          childrenList: [
            { 
              name: "刹车油", 
              id: "5", 
              checked: false,
              grandsonList:[
                {
                  ZhName: "刹车油",
                  DisplayName: "刹车油【正品授权】美国胜牌/Valvoline All-Climate 曼城版 星跃高级机油 SN 10W-40 4L【881864】",
                  Image: "https://img1.tuhu.org/Images/Products/422b/04ac/2c19047ef33eb5743fb23aaa_w800_h800.png",
                  Price: 234,
                  Count: 1
                }
              ]
            },
            { 
              name: "刹车油1", 
              id: "5", 
              checked: false,
              grandsonList:[
                {
                  ZhName: "刹车油1",
                  DisplayName: "刹车油1【正品授权】美国胜牌/Valvoline All-Climate 曼城版 星跃高级机油 SN 10W-40 4L【881864】",
                  Image: "https://img1.tuhu.org/Images/Products/422b/04ac/2c19047ef33eb5743fb23aaa_w800_h800.png",
                  Price: 834,
                  Count: 1
                }
              ]
            },
          ],
        },
      ],
      upkeepList: [],
      money:0
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
    indtap(e,ind){
      if(document.body.clientWidth <= 684){
        // 移动端 
        this.bytitle[ind].check = !e
      }
    },
    //里程
    onSubmit(){
      let a = this.$refs.licheng.value;
      console.log('a',a)
    },
    listTap(obj) {
      this.bytitle[obj.byindex].childrenList[obj.index].checked = !this.bytitle[obj.byindex].childrenList[obj.index].checked;//选中状态
      let bytitle = this.bytitle[obj.byindex].childrenList[obj.index]; //当前点击的数据
      if (bytitle.checked) {
        this.upkeepList.push({ name: bytitle.name, id: bytitle.id,grandsonList:bytitle.grandsonList }); //向数组添加选中的数据
        //选中服务项目 价格相加
        bytitle.grandsonList.forEach(m=>{
          this.money += m.Price
        })
      } else if (!bytitle.checked) {
        //清除取消选中的数据
        this.upkeepList.forEach((item, key) => {
          if (item.id == bytitle.id) {
            this.upkeepList.splice(key, 1);
            //取消选中价格相减
            item.grandsonList.forEach(m=>{
               this.money -= m.Price
            })
          }
        });
      }
      console.log(this.upkeepList);
    },
  },

  mounted() {
    this.screenWidth = document.
    body.clientWidth;
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      })();
    };
    let upkeepList = new Array();
    //初始化
    this.bytitle.forEach((i) => {
      i.childrenList.forEach((k) => {
        //默认选中 显示相关服务项目 价格相加
        if (k.checked){
          upkeepList.push({ name: k.name, id: k.id,grandsonList:k.grandsonList });
          k.grandsonList.forEach(m=>{
              this.money += m.Price
          })
        } 
      });
    });
    this.upkeepList = upkeepList;
    this.show = false;
    this.$http
      .submitprice({
        paragraph: "2013年生产",
        engine_capacity: "2.0L",
        models: "卡罗拉",
        cars: "卡罗拉",
        brand: "丰田",
        vendor: "一汽丰田",
        cycle: "20000",
        model: "2011款 2.0 无级 GLX",
      })
      .then((res) => {
        // console.log("res接到值了", res);
        this.show = false;
      })
      .catch((err) => {
         this.show = false;
         console.log("错误", err)
      });
  },
};
</script>
<style scoped>
.pcwhite {
  width: 90%;
}
.byTitle {
  margin: 8px 0 0 10px;
  width: 84px;
  font-weight: bold;
}
.clearfix dd {
  border: 1px solid #DDDDDD;
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
.inner-img{
  position: absolute;
  bottom:-1px;
  right:-1px;
  display: none;
}
.checked {
  padding: 4px 30px !important;
  color: #7bb10a;
  border:2px solid #7bb10a !important;
  position: relative;
  box-sizing: border-box;
}
.checked .inner-img{display: block;}
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
  padding: 0 20px 20px;
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
.byTitle img{display: none;}
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
.pmfont span{
  margin-right: 15px;
}
@media only screen and (max-width: 1200px) {
  .head {
    width: 100%;
  }
}
@media only screen and (max-width: 940px) {
   .v-align.small-text{display:none}
}
@media only screen and (max-width: 960px) {
  .pcwhite {
    width: 85%;
  }
}
@media only screen and (max-width: 870px) {
  .m-form{
    display: block;
    text-align: center;
  }
  .color-page.small-text.ml{margin-left: 0;}
  .m-form .btn{margin-top: 10px;}
  .input-group{
    width: 71%;
  }
}
@media only screen and (max-width: 700px) {
  .pmfont{}
  .byTitle {
    float:inherit
  }
  .pcwhite {
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-wrap:wrap ;
  }
  .pcwhite .dib{
    margin: 0 0 10px 10px;
    width: 46%;
    float:inherit !important;
  }
  .clearfix dd{
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 5px 20px !important;
    justify-content: center;
  }
  .checked{
     padding: 5px 20px !important;
  }
  .carData{display: block;}
  .m-form{
    margin-left: 20px;
    margin-top: 10px;
    margin-bottom: 12px;
    text-align: left;
  }
  .input-group{
    margin-left: 0;
  }
  .m-form .btn{margin-top: 0;}
  .m-keepimg{
    margin-right: 0;
    justify-content:space-around;
    padding:0 20px;
  }
  .UnSelect{
    padding: 10px 0;
    background-color: inherit !important;
  }
  .byTitle{
    margin: 0;
    padding: 10px;
    width: 100%;
    background: #f6f7f9;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .byTitle img{
    width: 14px;
    height: 14px;
    display: block;
  }
}
/* 移动端箭头旋转 */
.mimg{
  transform: rotateX(180deg);
  transition: all 200ms ease-out 0.1s;
}

</style>
