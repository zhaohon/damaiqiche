<template>
  <div>
    <div style="max-width:1200px;margin:auto">
      <div class="mt mb">选择您想保养的项目，大唛养车为您推荐适用的保养方案</div>
      <div class="upkeep">
        <div class="carData pb pt fbox fbox-acenter fbox-jbetween">
          <!-- <img class="dib" src="../assets/logo.png" alt="logo" /> -->
          <div>
            <div class="mr ml">大众 帕萨特 1.4L 2016年产</div>
            <div class="ml">
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
          <form action class="">
            <p class="small-text dib v-align">当前里程数:</p>
            <div class="input-group dib v-align">
              <input type="number" class="fl" placeholder="请输入里程数" />
              <p class="dib fr">公里</p>
            </div>
            <button class="btn dib v-align" @click="onSubmit()">查看推荐</button>
          </form>
          <div class="fbox fbox-acenter mr">
            <div class="reselection mr tc mr">
              <img src="../assets/reelect.jpg" alt="">
              <p>重选车型</p>
            </div>
            <router-link class="" to="">
              <img src="../assets/upsearch.jpg" alt="">
              <p>产品搜索</p>
              </router-link>
          </div>
        </div>
        <transition name="slide-fade">
          <div class="carDetail" v-show="carshow" ref="carDetail">
            <div>产看</div>
            <div>产看</div>
            <div>产看</div>
            <div>产看</div>
            <div>产看</div>
            <div>产看</div>
            <div>产看</div>
            <div>产看</div>
            <div>产看</div>
            <div>产看</div>
            <div>产看</div>
            <div>产看</div>
          </div>
        </transition>
        <div class="byType  mt">
          <div v-for="(item, byindex) in bytitle" :key="byindex" class="UnSelect" :style="byindex%2?'background:#F7F8FA':'background:#EDEEF2'">
            <dl class="clearfix">
              <dt class="byTitle fl">
                <span>{{ item.title }}</span>
              </dt>
              <div class="fl dib pcwhite">
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
                  </dd>
                </div>
              </div>
            </dl>
          </div>
        </div>
        <pUpkeep class="mt" v-if="screenWidth > 700"></pUpkeep>
        <!-- 移动端 -->
        <div class="m-list"></div>
      </div>
    </div>
    <Loading v-if="show" />
  </div>
</template>
<script>
import Loading from "@/components/Loading.vue";
import pUpkeep from "@/components/pUpkeep.vue";
export default {
  name: "Upkeep",
  components: {
    Loading,
    pUpkeep,
  },
  data() {
    return {
      screenWidth: "",
      show: true,
      carshow: false,
      arr: [],
      formItem: { input: "" },
      bytitle: [
        {
          title: "常规保养",
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
          childrenList: [
            { name: "刹车油", id: "5", checked: false },
            { name: "变速箱油", id: "6", checked: false },
            { name: "变速箱油", id: "6", checked: false },
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
  margin:8px 0 0 10px;
  width: 84px;
  font-weight: bold;
}
.clearfix dd {
  border: 2px solid #999;
  cursor: pointer;
padding: 5px 10px;
    width: 138px;
}
.pcwhite .dib {
  margin: 0 0 15px 16px;
}
.checked {
  color: #f89776;
  border-color: #f89776 !important;
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
  color:#fff;
  outline: none;
  background-color:  #7bb10a;
  margin-left: 10px;
  height: 33px;
  line-height: 33px;
  padding: 0 10px;
  font-size: 14px;
}
.carDetail {
  background-color: #fdffe6;
}

.ivu-btn-primary {
  background-color: #7bb10a;
  border-color: #7bb10a;
}
.UnSelect{
  padding-top: 20px;
}
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
  padding: 5px; font-size: 14px;
}
.input-group:hover {
  border-color: #7bb10a;
  box-shadow: 0 0 0 2px rgba(123, 177, 10, 0.1);
}

.input-group input{
  width: 80%;
}
.input-group input:focus {
  border: none;
}
.input-group 
.input-group input::-webkit-outer-spin-button,
.input-group input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0;
}
a{color: #333;}
@media only screen and (max-width: 1200px) {
  .head{width: 100%;}
}
@media only screen and (max-width: 860px) {
 .pcwhite {width: 85%;}
}
@media only screen and (max-width: 700px) {
 .pcwhite {display: none;}
}

</style>
