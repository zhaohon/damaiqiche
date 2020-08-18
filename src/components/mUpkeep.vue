<template>
  <div>
    <div class="m-list">
      <div class="mtitle">保养产品</div>
      <div v-for="(item,index) in list" :key="index">
        <div class="tl m-upkeep-title">
          <h4 class="fbox fbox-acenter fbox-jbetween">
            <span @click="introtap">
              {{item.title}}
              <i class="myou"></i>
            </span>
            <img src="../assets/xia1.png" alt />
          </h4>
        </div>
        <div class="upkeep-list">
          <div v-for="(items,indexs) in item.list" :key="indexs">
            <h4 class="tl fbox fbox-acenter fbox-jbetween">
              <span>{{items.name}}</span>
              <span @click="moreTap(item.title)" class="norm-text color-light-gray">更多 ></span>
            </h4>
            <div
              class="mpad fbox fbox-acenter"
              v-if="item.check"
              @click="listtap(items,item.title,index + String(indexs))"
            >
              <div class="fbox fbox-acenter">
                <img :src="items.img" alt />
              </div>
              <div class="fbox fbox-acenter fbox-col ml">
                <div>{{items.ell}}</div>
                <div class="fbox fbox-acenter fbox-jbetween" style="width:100%">
                  <div class="pck_price tc color-red">¥{{items.money}}</div>
                  <div class="pck_num tc">{{items.num}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--  -->
        <div class="mbupkeep" v-if="item.title == title">
          <h4 class="fbox fbox-acenter fbox-jbetween">
            <i></i> 更多推荐产品
            <img src="../assets/offw.png" alt />
            <div class="moreTap" @click="moreTap('')"></div>
          </h4>
          <div style="max-height:200px;overflow: scroll;overflow-x: hidden;">
            <div class="mpad fbox fbox-acenter">
              <div class="fbox fbox-acenter">
                <img src="../assets/you.png" alt />
              </div>
              <div class="fbox fbox-acenter fbox-col ml">
                <div>阿的嘎的观点郭德纲大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥</div>
                <div class="fbox fbox-acenter fbox-jbetween" style="width:100%">
                  <div class="pck_price tc color-red">¥192</div>
                  <div class="pck_num tc">12L</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 保养项 -->
    <div class="shade" v-if="videointro"></div>
  </div>
</template>

<script>
export default {
  name: "pUpkeep",
  data() {
    return {
      videointro: false,
      hovernum: 0,
      title: "",
    };
  },
  props: {
    list: Array,
  },
  methods: {
    introtap() {
      this.videointro = !this.videointro;
    },
    moreTap(e) {
      console.log(e);
      this.title = e;
    },
  },
};
</script>


<style scoped>
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
