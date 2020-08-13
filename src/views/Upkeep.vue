<template>
  <div style="max-width:1200px;margin:auto">
    <div class="upkeep">
      <div class="carData tc pb pt fbox fbox-acenter fbox-jcenter">
        <div class="fbox fbox-acenter fbox-jcenter">
          <img class="dib" src="../assets/logo.png" alt="logo" />
          <div class="dib mr ml">大众 帕萨特 1.4L 2016年产</div>
        </div>
        <i-form :model="formItem" :label-width="80" class="fbox fbox-acenter">
          <i-input :value.sync="formItem.input" placeholder="请输入"></i-input>
          <i-button type="primary">提交</i-button>
        </i-form>

        <button @click="carshow = !carshow" class="ml btn">查看详情</button>
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
      <div class="byType UnSelect">
        <div v-for="(item, byindex) in bytitle" :key="byindex">
          <dl class="clearfix">
            <dt class="byTitle">
              <span>{{ item.title }}</span>
            </dt>
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
          </dl>
        </div>
      </div>
      <pUpkeep v-if="screenWidth > 700"></pUpkeep>
      <!-- 移动端 -->
      <div class="m-list"></div>
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
            { name: "前雨刷2", id: "4", checked: false },
          ],
        },
        {
          title: "深度保养",
          childrenList: [
            { name: "刹车油", id: "5", checked: false },
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
        // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
        this.screenWidth = val;
        this.timer = true;
        let that = this;
        setTimeout(function () {
          // 打印screenWidth变化的值
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
      return () => {
        window.screenWidth = document.body.clientWidth;
        this.screenWidth = window.screenWidth;
      };
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
.byTitle {
  background-color: #f8f8f8;
  padding: 10px;
  width: 84px;
}
.clearfix dd {
  border: 2px solid #999;
  cursor: pointer;
  padding: 10px;
  width: 164px;
}
.clearfix .dib {
  margin: 10px;
}
.checked {
  color: #f89776;
  border-color: #f89776 !important;
}
.carData {
  background-color: #fdffe6;
}
.carData img {
  width: 50px;
  height: 50px;
}
.carData .btn {
  background-color: #000000;
  color: #fff;
  display: inline-block;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  border-style: none;
  outline: none;
}
.carDetail {
  background-color: #fdffe6;
}

.ivu-btn-primary {
  background-color: yellowgreen;
  border-color: yellowgreen;
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
</style>
