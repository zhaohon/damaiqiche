<template>
  <div class="pIndex">
    <div class="box">
      <div class="tab fbox">
        <div class="fbox fbox-ac fbox-jc" :class="tab == 1?'tabActive':''" @click="tabC(1)">
          <img class="car" src="../assets/cara.png" alt v-if="tab == 1" />
          <img class="car" src="../assets/car.png" alt v-else />
          <div>车型选择</div>
        </div>
        <div class="fbox fbox-ac fbox-jc" :class="tab == 2?'tabActive':''" @click="tabC(2)">
          <img class="serch" src="../assets/sercha.png" alt v-if="tab == 2" />
          <img class="serch" src="../assets/serch.png" alt v-else />
          <div>车型搜索</div>
        </div>
        <div class="fbox fbox-ac fbox-jc" :class="tab == 3?'tabActive':''" @click="tabC(3)">
          <img class="bao" src="../assets/baoa.png" alt v-if="tab == 3" />
          <img class="bao" src="../assets/bao.png" alt v-else />
          <div>产品搜索</div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="content" v-if="tab == 1">
        <!-- 筛选导航 -->
        <div class="nav fbox fbox-ac fbox-wrap">
          <p class="fbox fbox-ac active">
            <span>1</span>品牌
          </p>
          <p class="fbox fbox-ac" v-bind:class="yixuan.length > 0?'active':''">
            <span>2</span>车系
          </p>
          <p class="fbox fbox-ac" v-bind:class="yixuan.length > 1?'active':''">
            <span>3</span>车型
          </p>
          <p class="fbox fbox-ac" v-bind:class="yixuan.length > 2?'active':''">
            <span>4</span>排量
          </p>
          <p class="fbox fbox-ac" v-bind:class="yixuan.length > 3?'active':''">
            <span>5</span>年份
          </p>
          <p class="fbox fbox-ac" v-bind:class="yixuan.length > 4?'active':''">
            <span>6</span>款型
          </p>
          <p class="xinghao fbox fbox-ac" v-bind:class="yixuan.length > 5?'active':''">
            <span>7</span>发动机型号
          </p>
          <p class="gonglv fbox fbox-ac" v-bind:class="yixuan.length > 6?'active':''">
            <span>8</span>最大功率
          </p>
        </div>

        <div class="remen fbox fbox-ac fbox-wrap mt" v-if="yixuan.length == 0">
          <p
            v-for="(item,index) in remen"
            :key="index"
            @mouseover="mouseOver(index)"
            @click="mouseOver(index)"
            v-bind:class=" hover == index ?'ractive':''"
          >{{item}}</p>
        </div>
        <!-- 已选 -->
        <div class="yixuan fbox fbox-ac fbox-wrap mt" v-if="yixuan.length != 0">
          <p class="yixuan-title">已选车型</p>
          <div v-for="(item,index) in yixuan" :key="index" class="fbox fbox-ac">
            <p>{{item}}</p>
            <img class="guan" src="../assets/off.png" @click="del(index)" />
          </div>
        </div>

        <!-- 选择品牌 -->

        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 0">
          <p v-for="(item,index) in pinpai" :key="index" @click="rit1(item)">{{item}}</p>
        </div>

        <!-- 选择车系 -->
        <div class="mt" v-if="yixuan.length == 1">
          <div v-for="(item,index) in chexi" :key="index">
            <p>{{item.letter}}</p>
            <div class="item fbox fbox-ac fbox-wrap">
              <p v-for="(t,i) in item.data" :key="i" @click="rit2(t,item.letter)">{{t}}</p>
            </div>
          </div>
        </div>

        <!-- 选择车型 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 2">
          <p v-for="(item,index) in chexing" :key="index" @click="rit3(item)">{{item}}</p>
        </div>

        <!-- 选择排量 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 3">
          <p v-for="(item,index) in pailiang" :key="index" @click="rit4(item)">{{item}}</p>
        </div>

        <!-- 选择年份 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 4">
          <p v-for="(item,index) in nianfen" :key="index" @click="rit5(item)">{{item}}</p>
        </div>

        <!-- 选择款型 -->
        <div class="items fbox fbox-ac fbox-wrap" v-if="yixuan.length == 5">
          <p v-for="(item,index) in kuanxing" :key="index" @click="rit6(item)">{{item}}</p>
        </div>

        <!-- 选择发动机型号 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 6">
          <p v-for="(item,index) in fdjxh" :key="index" @click="rit7(item)">{{item}}</p>
        </div>
        <div class="tiaoguo c9" v-if="yixuan.length == 6" @click="tiao">跳过>></div>

        <!-- 选择最大功率 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 7">
          <p v-for="(item,index) in zdgl" :key="index" @click="rit8(item)">{{item}}</p>
        </div>
      </div>

      <!-- 搜索 -->
      <div class="serch-box" v-if="tab == 2">
        <div class="form fbox fbox-ac">
          <input type="text" v-model="models" placeholder="请输入车型品牌名称或车系名称" />
          <div class="btn fbox fbox-ac fbox-jc" @click="sousuo">
            <img class="serch" src="../assets/serch.png" alt />
            <p>搜索</p>
          </div>
        </div>
        <!-- 选择车系 -->
        <div class="mt">
          <div v-for="(item,index) in serchArr" :key="index">
            <p>{{item.letter}} - {{item.cars}}</p>
            <div class="item fbox fbox-ac fbox-wrap">
              <p
                v-for="(t,i) in item.data"
                :key="i"
                @click="serchClick(t,item,i)"
              >{{t}}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 产品搜索 -->
      <div class="chanpin-box" v-if="tab == 3">
        <div class="list fbox fbox-ac fbox-w">
          <div
            class="chanpin-item fbox fbox-ac fbox-jb fbox-w"
            v-for="(item,index) in SearchArr"
            :key="index"
          >
            <div>{{item.title}}</div>
            <div class="chanpin-xian">
              <!-- 下拉框 -->
              <!-- <block v-for="(t,i) in item.list" :key="i" > -->
              <cascader
                :data="item.list"
                :load-data="loadData"
                @on-change="handleChangeOnSelect"
                :clearable="false"
              ></cascader>
              <!-- </block> -->
            </div>
          </div>
        </div>
      </div>
      <!-- 产品列表 -->
      <div class="chanpin-table" v-if="tab == 3">
        <div class="chanpin-table-title fbox fbox-ac top-title">
          <p class="list-w1">产品分类</p>
          <p class="list-w2">产品名称</p>
          <p class="list-w3">适用车型</p>
        </div>
        <div class="chanpin-table-box fbox fbox-w">
          <div class="list-left">
            <div class="list-left-item" v-for="(item,index) in allSerch" :key="index">
              <p class="pl">{{item.yi}}</p>
              <div class="fbox fbox-ac">
                <div class="name tc">{{item.yi}}</div>
                <div class="name-right fbox fbox-ac">
                  <img :src="'https://damaichaxun.com/' + item.url" alt />
                  <p class="ell_2">【正品授权】{{item[1]}}{{item[3]}}</p>
                </div>
              </div>
            </div>
            <div v-if="allSerch.length == 0" class="tc c9 mt">-- 暂无数据 --</div>
          </div>

          <div class="list-right">
            <div class="bot-title chanpin-table-title fbox fbox-ac">
              <p class="list-w3">适用车型</p>
            </div>
            <div v-if="allSerchPar.length == 0" class="tc c9">-- 暂无数据 --</div>
            <div v-else class="fbox fbox-jb pl pr" v-for="(item,index) in allSerchPar" :key="index">
              <div class="fg1">
                <p class="title">【{{item.id}}】 {{item.shop}} - {{item.models}}</p>
                <p class="con">
                  {{item.year}}
                  <span>{{item.displacement}}</span>
                  <span>发动机型号：{{item.engine}}</span>
                </p>
              </div>
              <p class="jiucuo ml fsh" @click="showModalO(item)">纠错</p>
            </div>
            <div v-if="allSerchPar.length != 0" class="tc c9" @click="more" >点击加载更多</div>
          </div>
        </div>
      </div>

      <!-- 纠错 -->

      <div class="mask" v-if="showModal" @click="showModalF"></div>
      <div class="pop" v-if="showModal">
        <div class="tc mb">纠错</div>
        <textarea v-model="content"></textarea>
        <div class="fbox fbox-ac fbox-jc mt">
          <button @click="showModalF" class="btn">取消</button>
          <button @click="showModalT" class="btns btn">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {  Throttle } from "@/utils/public";

export default {
  name: "pIndex",
  data() {
    return {
      cityList: [],
      model1: "",
      showModal: false,
      content: "",
      changeOnSelect: false,
      data4: [
        {
          value: "beijing",
          label: "北京",
          children: [],
          loading: false,
        },
        {
          value: "hangzhou",
          label: "杭州",
          children: [],
          loading: false,
        },
      ],
      allName: [],
      allSerch: [],
      allSerchPar: [],

      jiucuoName: "",
      jiucuoArr: [],
      models: "", //车型搜索
      p:1
    };
  },
  props: {
    yixuan: Array,
    hover: Number,
    remen: Array,
    pinpai: Array,
    chexi: Array,
    chexing: Array,
    pailiang: Array,
    nianfen: Array,
    kuanxing: Array,
    fdjxh: Array,
    zdgl: Array,
    SearchArr: Array,
    tab: Number,
    serchArr: Array,
    shopid:String
  },
  watch: {
    tab(e) {
      console.log("tabind", e);
      this.allName = [];
      this.allSerch = [];
      this.allSerchPar = [];
    },
  },
  methods: {
    loadData(item, callback) {
      console.log("item", item);
      // this.$emit("loadData",item)
      item.loading = true;
      //根据品牌获取机型
      this.$http
        .SearchModel({
          value: item.label,
          filed: item.value,
        })
        .then((res) => {
          console.log("机型", res);
          //重组参数名称
          let list = new Array();
          res.list.forEach((i) => {
            //型号的value不为空则添加
            if (i.value != null) {
              list.push({ label: i.value, value: i.value, id: i.field });
            }
          });
          item.children = list;
          console.log("list", list);
          item.loading = false;
          if (list.length == 0) {
            this.zanwu();
          }
          callback(); //成功后回调
        })
        .catch((err) => {
          console.log("错误", err);
          item.loading = false;
          callback();
        });
    },
    ceshi() {
      console.log("1111111111111");
    },
    handleChangeOnSelect(value, selectedData) {
      this.p = 1
      let arr = [];
      let url = "";
      //根据品牌获取机型
      this.$http
        .GerProimg({
          pro_name: selectedData[0].label,
        })
        .then((res) => {
          console.log("图片", res.data);
          url = res.data;
          arr["url"] = url;
        })
        .catch((err) => {
          console.log("错误", err);
        });
      console.log(value, selectedData, "这是点击拿回来的数据");
      let have = false;
      arr[0] = selectedData[0].value;
      arr[1] = selectedData[0].label;
      arr[2] = selectedData[1].id;
      arr[3] = selectedData[1].label;
      arr["yi"] = selectedData[0].name;
      let allarr = this.allSerch;
      if (allarr.length != 0) {
        console.log("第n次");
        allarr.forEach((item, index) => {
          if (item["yi"] == selectedData[0].name) {
            allarr.splice(index, 1);
            allarr.push(arr);
            console.log("替换", arr);
            have = true;
          }
        });
        if (have == false) {
          console.log("新数据");
          allarr.push(arr);
        }
      } else {
        console.log("第一次");
        allarr.push(arr);
      }
      this.allSerch = allarr;
      console.log(this.allSerch, "整理好的数组");

      let data = {};
      for (let i = 0; i < this.allSerch.length; i++) {
        data[`${this.allSerch[i][0]}`] = this.allSerch[i][1];
        data[`${this.allSerch[i][2]}`] = this.allSerch[i][3];
      }
      data['p'] = this.p
      this.datas = data
      //获取适用车型
      this.$http
        .carList(data)
        .then((res) => {
          this.allSerchPar = res.list;
        })
        .catch((err) => {
          console.log("错误", err);
        });
    },
    more(){
      let p = this.p + 1
      this.datas['p'] = p
      //获取适用车型
      this.$http
        .carList(this.datas)
        .then((res) => {
          this.allSerchPar = this.allSerchPar.concat(res.list);
          if(res.isLastPage == 2){
            this.$Message.info("暂无更多适用车型");
            return
          }
          this.p = p
        })
        .catch((err) => {
          console.log("错误", err); 
        });
    },
    serchClick(e, item, i) {
      this.$emit("serchClick", e, item, i);
    },
    // tab切换
    tabC(e) {
      this.$emit("tabC", e);
    },
    // 删除方法
    del(e) {
      this.$emit("del", e);
    },
    // 选择
    rit(e, s) {
      if (this.yixuan.length == 1) {
        this.$emit("changes", e, s);
        return;
      }
      this.$emit("changes", e);
    },
    rit1: Throttle(function(e, s) {
      this.rit(e,s)
    },1500),
    rit2: Throttle(function(e, s) {
      this.rit(e,s)
    },1500),
    rit3: Throttle(function(e, s) {
      this.rit(e,s)
    },1500),
    rit4: Throttle(function(e, s) {
      this.rit(e,s)
    },1500),
    rit5: Throttle(function(e, s) {
      this.rit(e,s)
    },1500),
    rit6: Throttle(function(e, s) {
      this.rit(e,s)
    },1500),
    rit7: Throttle(function(e, s) {
      this.rit(e,s)
    },1500),
    rit8: Throttle(function(e, s) {
      this.rit(e,s)
    },1500),
    // 鼠标指向
    mouseOver(e) {
      this.$emit("mouseOver", e);
    },
    showModalO(item) {
      this.showModal = true;
      let nameArr = [];

      this.allSerch.forEach((item, index) => {
        nameArr.push(this.allSerch[index][1] + this.allSerch[index][3]);
      });

      this.jiucuoName = nameArr.join("/");
      this.jiucuoArr = item;
    },
    showModalF() {
      this.showModal = false;
      this.warning();
    },
    showModalT() {
      console.log(this.content);
      this.showModal = false;
      if (this.content.length == 0) {
        this.$Message.error({
          content: "请输入纠错内容",
          duration: 5,
          closable: true,
        });
        return;
      }
      //纠错
      this.$http
        .correction({
          pro_name: this.jiucuoName,
          content: this.content,
          dockid: this.jiucuoArr.shop,
          score1: this.jiucuoArr.models,
          score2: this.jiucuoArr.displacement,
          score3: this.jiucuoArr.year,
          score4: this.jiucuoArr.engine,
          shop_id:this.shopid
        })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          // console.log("carList", res);
          this.success();
        })
        .catch((err) => {
          console.log("错误", err);
          this.error();
        });
    },
    success() {
      this.$Message.success("提交成功");
    },
    warning() {
      this.$Message.info("取消");
    },
    zanwu() {
      this.$Message.info("暂无数据");
    },
    error() {
      this.$Message.error("提交失败");
    },
    // 跳过方法
    tiao(e) {
      console.log(e);
      this.$emit("tiao", e);
    },
    sousuo() {
      console.log(this.models);
      this.$emit("sousuo", this.models);
    },
  },
};
</script>


<style scoped>
/* body{background-color: #F5F6FA;width: 100%;}
.pIndex{width: 1400px;background-color: #ffffff;margin: 0 auto;} */
.box {
  width: 1200px;
  padding: 20px 0;
  margin: 0 auto;
}
.tab {
  justify-content: flex-end;
}

.tab > div {
  width: 147px;
  height: 36px;
  background: #212531;
  border-radius: 4px 4px 0px 0px;
  color: #ffffff;
  margin-left: 5px;
  font-size: 16px;
  cursor: pointer;
}
.tabActive {
  background: #edeef2 !important;
}
.tabActive div {
  color: #333333;
}
.car {
  width: 27px;
  height: 13px;
  margin-right: 6px;
}
.serch {
  width: 17px;
  height: 17px;
  margin-right: 6px;
}
.bao {
  width: 18px;
  height: 18px;
  margin-right: 6px;
}
.content {
  width: 100%;
  background: #edeef2;
  padding: 36px 22px;
  box-sizing: border-box;
}

.nav {
  width: 100%;
}
.nav p {
  /* width: 7%; */
  padding: 0 20px 0 30px;
  height: 40px;
  line-height: 40px;
  background: #ffffff;
  border-radius: 2px 2px 0px 0px;
  min-width: 50px;
  position: relative;
}
.nav p::after {
  content: "";
  position: absolute;
  top: -9px;
  right: -28px;
  width: 58px;
  height: 58px;
  -webkit-transform: rotate(45deg) scale(0.5);
  transform: rotate(45deg) scale(0.5);
  border-right: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;
  background-color: #ffffff;
  z-index: 10;
}
.nav p span {
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 18px;
  font-size: 12px;
  text-align: center;
  color: #fff;
  background: rgba(153, 153, 153, 1);
  border-radius: 9px;
  margin-right: 12px;
}
/* .nav .xinghao {
  width: 15%;
  min-width: 110px;
} */
.nav .gonglv::after {
  display: none;
}

/* 已选车型 */
.yixuan .yixuan-title {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  cursor: inherit !important;
  margin-top: 10px;
}
.yixuan div {
  padding: 3px 3px 3px 10px;
  font-size: 12px;
  color: #333333;
  background-color: #fff;
  margin-left: 20px;
  border: 1px solid #77b110;
  box-sizing: border-box;
  margin-top: 10px;
}
.yixuan div .guan {
  width: 20px;
  height: 10px;
  cursor: pointer !important;
  margin-left: 10px;
  padding: 0 5px;
}

/* 框 */
.item {
  margin-top: 20px;
}
.item p {
  width: 160px;
  height: 50px;
  margin-right: 24px;
  text-align: center;
  line-height: 48px;
  background-color: #fff;
  margin-bottom: 20px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 2px;
}
.item p:hover {
  background: #77b110 !important;
  color: #ffffff !important;
}

.items {
  margin-top: 20px;
}
.items p {
  padding: 0 20px;
  height: 50px;
  margin-right: 24px;
  text-align: center;
  line-height: 48px;
  background-color: #fff;
  margin-bottom: 20px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 2px;
}
.items p:hover {
  background: #77b110 !important;
  color: #ffffff !important;
}

/* nav选中 */
.active {
  color: #ffffff;
  background: #77b110 !important;
}
.active span {
  background: #fff !important;
  color: #77b110 !important;
}
.active::after {
  border-right: 2px solid #ffffff !important;
  border-top: 2px solid #ffffff !important;
  background-color: #77b110 !important;
}

/* 热门标签 */
.remen p {
  width: 24px;
  height: 26px;
  line-height: 26px;
  margin-right: 15px;
  cursor: pointer;
  font-size: 14px;
  text-align: center;
  border-radius: 2px;
}
.ractive {
  background-color: #77b110;
  color: #fff !important;
}

/* 搜搜 */
.serch-box {
  width: 100%;
  background: #edeef2;
  padding: 36px 22px;
  box-sizing: border-box;
}
.serch-box .form {
  width: 80%;
}
.serch-box input {
  width: 80%;
  height: 46px;
  background-color: #fff;
  padding-left: 4%;
  box-sizing: border-box;
  font-size: 14px;
  border-radius: 2px 0 0 2px;
}
.serch-box .btn {
  width: 89px;
  height: 46px;
  background-color: #77b110;
  color: #fff;
  font-size: 16px;
  border-radius: 0 2px 2px 0;
}
.serch-box .btn p {
  margin-left: 2px;
  margin-top: 2px;
}

/* 产品 */
.chanpin-box {
  width: 100%;
  background: #edeef2;
  box-sizing: border-box;
}
.chanpin-item {
  width: 240px;
  height: 36px;
  background: #ffffff;
  border: 2px solid #dddddd;
  border-radius: 2px;
  box-sizing: border-box;
  padding-left: 12px;
  margin-right: 25px;
  margin-bottom: 10px;
}
.chanpin-box .list {
  padding: 16px 0 6px 20px;
}
.chanpin-box .list:nth-child(2n) {
  background: #f7f8fa;
}
.chanpin-xian {
  position: relative;
  width: 30%;
}
.chanpin-xian::after {
  position: absolute;
  content: "";
  width: 0;
  height: 20px;
  border-left: 1px solid #dddddd;
  left: -10px;
  top: 6px;
}
.chanpin-xian .ivu-select-selection {
  border: none !important;
}
.ivu-select-visible .ivu-select-selection {
  border-color: white !important;
}

.chanpin-table {
  margin: 30px 0 70px;
}
.chanpin-table-title {
  width: 100%;
  height: 40px;
  background-color: #212531;
  color: #ffffff;
  font-size: 14px;
  padding: 0 20px;
  box-sizing: border-box;
}
.list-w1 {
  width: 200px;
}
.list-w2 {
  width: 600px;
}
.list-w3 {
  width: 403px;
}
.chanpin-table-box {
  width: 100%;
}
.list-left {
  width: 60%;
  min-width: 590px;
}
.list-left-item {
  width: 100%;
}

.list-left-item > p {
  color: #77b110;
  font-size: 18px;
  font-weight: bold;
  line-height: 50px;
  background: #f6f7f9;
}
.list-left-item > div {
  height: 88px;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  width: 100%;
}
.list-left-item > div .name {
  color: #333333;
  font-size: 16px;
  font-weight: bold;
  width: 15%;
}
.list-left-item > div .name-right {
  padding: 20px 30px;
  box-sizing: border-box;
  border-left: 1px solid #dddddd;
  width: 85%;
  box-sizing: border-box;
}
.list-left-item > div .name-right img {
  width: 49px;
  height: 49px;
  border: 1px solid #dddddd;
  box-sizing: border-box;
  object-fit: contain;
}

.list-left-item > div .name-right p {
  width: 100%;
}

.list-right {
  width: 40%;
  min-width: 395px;
  color: #333333;
  padding: 20px 0;
  box-sizing: border-box;
  border: 1px solid #dddddd;
}
.list-right > div {
  box-sizing: border-box;
  line-height: 1.8;
  border-top: 1px solid #dddddd;
  padding: 10px 20px;
}
.list-right > div:nth-child(1) {
  border-top: none;
}

.list-right .title {
  font-size: 16px;
  color: #333333;
  font-weight: bold;
}
.list-right .con {
  font-size: 14px;
}
.list-right .con span {
  margin-left: 25px;
}

.list-right .jiucuo {
  font-size: 14px;
  color: #777777;
  cursor: pointer;
}

.bot-title {
  display: none;
}
.tiaoguo {
  font-size: 16px;
  cursor: pointer;
}

@media only screen and (max-width: 1200px) {
  .box {
    width: 100%;
  }
}
@media only screen and (max-width: 1004px) {
  .list-left {
    width: 100%;
    min-width: 0;
  }
  .list-right {
    width: 100%;
    min-width: 0;
  }
  .top-title .list-w3 {
    display: none;
  }
  .bot-title {
    display: block;
  }
}
@media only screen and (max-width: 830px) {
  .chanpin-box .list {
    justify-content: center;
  }
  .bot-title .list-w3 {
    font-size: 14px;
  }
}
@media only screen and (max-width: 570px) {
  .chanpin-box .list {
    padding: 16px 0 20px;
  }
  .chanpin-item {
    width: 47%;
    margin: 0 1% 10px;
  }
  .serch-box form {
    width: 100%;
  }
  .list-left-item > div {
    height: 60px;
  }
  .list-left-item > div .name {
    line-height: 60px;
    color: #333333;
    font-size: 12px;
    font-weight: bold;
    width: 20%;
  }
  .list-left-item > div .name-right {
    padding: 10px 10px;
    box-sizing: border-box;
    border-left: 1px solid #dddddd;
    box-sizing: border-box;
    width: 80%;
  }
  .list-left-item > div .name-right img {
    width: 40px;
    height: 40px;
    border: 1px solid #dddddd;
    box-sizing: border-box;
  }
  .list-left-item > div .name-right p {
    margin-left: 6px;
    width: 80%;
    font-size: 12px;
  }
  .list-right > div {
    font-size: 12px;
  }
  .list-right .title {
    font-size: 14px;
  }
  .list-right .con {
    font-size: 12px;
  }
  .list-w1 {
    width: 30%;
  }
  .list-w2 {
    width: 30%;
  }
  .list-w3 {
    width: 40%;
  }
  .bot-title .list-w3 {
    font-size: 14px;
  }
  .item p {
    margin-right: 5px;
    margin-bottom: 5px;
  }
  .serch-box .btn {
    font-size: 12px;
    cursor: pointer;
  }
  .serch-box .form {
    width: 100%;
  }
}
.mask {
  background-color: #000;
  opacity: 0.3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.pop {
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  min-width: 220px;
  z-index: 2;
  border-radius: 5px;
  padding: 20px;
  box-sizing: border-box;
}
.btn {
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #77b110;
  padding: 4px 12px;
}
.btns {
  background-color: #77b110;
  color: #ffffff;
  margin-left: 20px;
}
textarea {
  width: 100%;
  min-height: 100px;
  background-color: #f5f6fa;
  border-radius: 5px;
}
/* 级联 */
.ivu-cascader .ivu-input {
  padding-right: 0 !important;
}
</style>
