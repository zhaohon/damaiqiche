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
          <form action class="m-form">
            <p class="small-text dib v-align">当前里程数:</p>
            <div class="input-group dib v-align">
              <input type="number" class="fl" placeholder="请输入里程数" />
              <p class="dib fr">公里</p>
            </div>
            <button class="btn dib v-align" @click="onSubmit()">查看推荐</button>
          </form>
          <div class="fbox fbox-acenter mr m-keepimg">
            <div class="reselection mr tc mr">
              <img src="../assets/reelect.png" alt />
            </div>
            <router-link class="reselection" to="/">
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
        <pUpkeep class="mt" :list="upkeepList" v-if="screenWidth > 700"></pUpkeep>
        <mUpkeep :list="upkeepList" v-if="screenWidth < 700"></mUpkeep>
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
      arr: [],
      formItem: { input: "" },
      byind:0,
      bytitle: [
        {
          title: "常规保养",
          check:true,
          childrenList: [
            { name: "小保养", id: "1", checked: true },
            { name: "前雨刷", id: "2", checked: false },
            { name: "前雨刷1", id: "3", checked: false },
            { name: "前雨刷1", id: "3", checked: false },
            { name: "前雨刷1", id: "3", checked: false },
            { name: "前雨刷2", id: "4", checked: false },
            { name: "前雨刷2", id: "4", checked: false },
          ],
        },
        {
          title: "深度保养",
          check:true,
          childrenList: [
            { name: "刹车油", id: "5", checked: false },
            { name: "变速箱油", id: "6", checked: false },
            { name: "变速箱油", id: "6", checked: false },
          ],
        },
      ],
      upkeepList: [
        {
          title: "小保养",
          check:true,
          list: [
            {
              name: "更换防冻冷却液",
              img: "https://img-blog.csdnimg.cn/20190405120402534.png?x-oss-process=image/resize,m_fixed,h_64,w_64",
              ell:
                "冠军/CHAMPION 全能长效防冻冷却液 -45°C 沸点113°C 4L CC-45-NC-4L灰桶（新包装）",
              money: "99.00",
              num: "1.6L",
            },
            {
              name: "更卡里克放开了",
              img: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM4Od6icjhInmnGjhVZGIX0U2S6fMJ18AAAicxBAvU1UdadA/0",
              ell:
                "是否会或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或撒飒飒飒飒）",
              money: "99.00",
              num: "1.6L",
            },
          ],
        },
        {
          title: "前雨刷",
          check:true,
          list: [
            {
              name: "更换防2冻冷却液",
              img: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM4Od6icjhInmnGjhVZGIX0U2S6fMJ18AAAicxBAvU1UdadA/0",
              ell:
                "冠军/CHAMP3ION 全能长效防冻冷却液 -45°C 沸点113°C 4L CC-45-NC-4L灰桶（新包装）",
              money: "99.00",
              num: "1.6L",
            },
            {
              name: "更卡里克放开了1",
              img: "https://wx.qlogo.cn/mmhead/Q3auHgzwzM4Od6icjhInmnGjhVZGIX0U2S6fMJ18AAAicxBAvU1UdadA/0",
              ell:
                "是否会或或或2或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或或撒飒飒飒飒）",
              money: "99.00",
              num: "1.6L",
            },
          ],
        },
      ],
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
          console.log(that.screenWidth);
          that.timer = false;
        }, 400);
      }
    },
  },
  methods: {
    indtap(e,ind){
      // 移动端
      this.bytitle[ind].check = !e
    },
    listTap(obj) {
      this.bytitle[obj.byindex].childrenList[obj.index].checked = !this.bytitle[
        obj.byindex
      ].childrenList[obj.index].checked;
      let bytitle = this.bytitle[obj.byindex].childrenList[obj.index]; //当前点击的数据
      if (bytitle.checked) {
        this.arr.push({ name: bytitle.name, id: bytitle.id }); //向数组添加选中的数据
      } else if (!bytitle.checked) {
        //清除取消选中的数据
        this.arr.forEach((item, key) => {
          if (item.id == bytitle.id) {
            this.arr.splice(key, 1);
          }
        });
      }
      console.log(this.arr);
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
    let arr = new Array();
    this.bytitle.forEach((i) => {
      i.childrenList.forEach((k) => {
        if (k.checked) arr.push({ name: k.name, id: k.cat_id });
      });
    });
    this.arr = arr;
    console.log(this.$http);
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
        console.log("res接到值了", res);
        this.show = false;
      })
      .catch((err) => {
        console.log("错误", err), (this.show = false);
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
