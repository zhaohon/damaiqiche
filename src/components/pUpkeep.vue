<template>
  <div>
     <!-- 保养项 -->
      <div  class="w pc-list">
        <div class="pc-upkeep-left fl">
          <div class="upkeep-title">
            <ul class="fbox fbox-acenter color-white">
              <li class="tc" style="width:130px">保养项目</li>
              <li class="tc" style="width:280px">已选购产品</li>
              <li class="tc" style="width:160px">单价</li>
              <li class="tc" style="width:160px">数量</li>
            </ul>
          </div>
          <div class="tl upkeep-left-title">
            <h4 class="dib">小保养服务</h4>
          </div>
          <div class="upkeep-list">
            <table>
              <tbody>
                <tr>
                  <td width="130" class="tc">更换防冻冷却液</td>
                  <td class="hover-bor">
                    <div
                      class="pack_biaoti"
                    >冠军/CHAMPION 全能长效防冻冷却液 -45°C 沸点113°C 4L CC-45-NC-4L灰桶（新包装）</div>
                    <div class="pck_price tc color-red">¥99.00</div>
                    <div class="pck_num tc">1.6L</div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="pc-upkeep-right fl">
          <h4 class>更多产品</h4>
          <div class="upkeep-right-font">
            <div class="fl dib">
              <img src="../assets/logo.png" alt />
            </div>
            <h4 class="fl mr">冠军/CHAMPION 全能长效防冻冷却液 -45°C 沸点113°C 4L CC-45-NC-4L灰桶（新包装）</h4>
            <p class="fl mr upkeep-right-price">￥199.00</p>
            <p class="fl mr upkeep-right-num">1.6L</p>
            <div class="clearfix"></div>
          </div>
        </div>
        <div class="clearfix"></div>
      </div>
  </div>
</template>

<script>
export default {
  name: "pUpkeep",
  data() {
    return {
      
    };
  },
  props: {},
  methods:{

  }

};
</script>


<style scoped>
.upkeep-left-title {
  background-color: #f1f2f3;
}
.upkeep-left-title h4 {
  cursor: pointer;
  padding: 10px;
}
.pc-upkeep-left {
  width: 750px;
}
.upkeep-title ul {
  width: 100%;
  background: #999;
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
.upkeep-list table tr td:first-child {
  border-right: none;
}
.upkeep-list td {
  overflow: hidden;
  box-sizing: border-box;
  border: 1px solid #000;
}
.hover-bor {
  cursor: pointer;
}
.hover-bor:hover {
  border: 1px solid yellowgreen;
}
.upkeep-list td div {
  float: left;
  padding: 10px;
}
.pack_biaoti {
  width: 280px;
}
.pck_num,
.pck_price {
  width: 160px;
}

.pc-upkeep-right {
  width: 420px;
  box-sizing: border-box;
  padding: 10px;
  background-color: #e8e8e8;
}
.pc-upkeep-right > h4 {
  border-bottom: 1px solid #000;
  padding-bottom: 10px;
}
.upkeep-right-font {
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid #000;
  padding: 10px 0;
}
.upkeep-right-font .dib {
  position: absolute;
  top: 50%;
  margin-top: -35px;
  background-color: white;
}
.upkeep-right-font div {
  width: 70px;
  height: 70px;
  object-fit: fill;
  text-align: center;
}
.upkeep-right-font div img {
  width: 50px;
  height: 50px;
  margin-top: 10px;
}
.upkeep-right-font h4 {
  font-size: 14px;
  width: 160px;
  margin-left: 80px;
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
}
.upkeep-right-num {
  right: 10px;
}
</style>
