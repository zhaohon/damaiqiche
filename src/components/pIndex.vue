<template>
  <div class="pIndex">
    <div class="box">
      <div class="tab fbox">
        <div class="fbox fbox-ac fbox-jc" :class="tab == 1?'tabActive':''" @click="tabC(1)" >
          <img class="car" src="../assets/cara.png" alt="" v-if="tab == 1">
          <img class="car" src="../assets/car.png" alt="" v-else>
          <div>车型选择</div>
        </div>
        <div class="fbox fbox-ac fbox-jc" :class="tab == 2?'tabActive':''" @click="tabC(2)">
          <img class="serch" src="../assets/sercha.png" alt=""  v-if="tab == 2">
          <img class="serch" src="../assets/serch.png" alt="" v-else>
          <div>车型搜索</div>
        </div>
        <div class="fbox fbox-ac fbox-jc" :class="tab == 3?'tabActive':''" @click="tabC(3)">
          <img class="bao" src="../assets/baoa.png" alt=""  v-if="tab == 3">
          <img class="bao" src="../assets/bao.png" alt="" v-else>
          <div>产品搜索</div>
        </div>
      </div>
      <!-- 内容 -->
      <div class="content" v-if="tab == 1">
        <!-- 筛选导航 -->
        <div class="nav fbox fbox-ac fbox-wrap">
          <p class="fbox fbox-ac active"><span>1</span>品牌</p>
          <p class="fbox fbox-ac" v-bind:class="yixuan.length > 0?'active':''"><span>2</span>车系</p>
          <p class="fbox fbox-ac" v-bind:class="yixuan.length > 1?'active':''"><span>3</span>车型</p>
          <p class="fbox fbox-ac" v-bind:class="yixuan.length > 2?'active':''"><span>4</span>排量</p>
          <p class="fbox fbox-ac" v-bind:class="yixuan.length > 3?'active':''"><span>5</span>年份</p>
          <p class="fbox fbox-ac" v-bind:class="yixuan.length > 4?'active':''"><span>6</span>款型</p>
          <p class="xinghao fbox fbox-ac" v-bind:class="yixuan.length > 5?'active':''" ><span>7</span>发动机型号</p>
          <p class="gonglv fbox fbox-ac" v-bind:class="yixuan.length > 6?'active':''" ><span>8</span>最大功率</p>
        </div>

         <div class="remen fbox fbox-ac fbox-wrap mt" v-if="yixuan.length == 0">
          <p v-for="(item,index) in remen" :key="index" @mouseover="mouseOver(index)" @click="mouseOver(index)" v-bind:class=" hover == index ?'ractive':''" >{{item}}</p>
        </div>
        <!-- 已选 -->
        <div class="yixuan fbox fbox-ac fbox-wrap mt" v-if="yixuan.length != 0">
          <p class="yixuan-title">已选车型</p>
          <div v-for="(item,index) in yixuan" :key="index" class="fbox fbox-ac">
            <p>{{item}}</p>
            <img class="guan" src="../assets/off.png"  @click="del(index)">
          </div>
        </div>

         <!-- 选择品牌 -->
        
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 0">
          <p v-for="(item,index) in pinpai" :key="index" @click="rit(item)" >{{item}}</p>
        </div>

         <!-- 选择车系 -->
         <div class="mt" v-if="yixuan.length == 1">
            <div v-for="(item,index) in chexi" :key="index">
                <p>{{item.letter}}</p>
                <div class="item fbox fbox-ac fbox-wrap">
                  <p v-for="(t,i) in item.data" :key="i" @click="rit(t,item.letter)">{{t}}</p>
                </div>
            </div>
         </div>
        

         <!-- 选择车型 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 2">
          <p v-for="(item,index) in chexing" :key="index" @click="rit(item)" >{{item}}</p>
        </div>

         <!-- 选择排量 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 3">
          <p v-for="(item,index) in pailiang" :key="index" @click="rit(item)" >{{item}}</p>
        </div>

         <!-- 选择年份 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 4">
          <p v-for="(item,index) in nianfen" :key="index" @click="rit(item)" >{{item}}</p>
        </div>

        <!-- 选择款型 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 5">
          <p v-for="(item,index) in kuanxing" :key="index" @click="rit(item)" >{{item}}</p>
        </div>

        <!-- 选择发动机型号 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 6">
          <p v-for="(item,index) in fdjxh" :key="index" @click="rit(item)" >{{item}}</p>
        </div>

        <!-- 选择最大功率 -->
        <div class="item fbox fbox-ac fbox-wrap" v-if="yixuan.length == 7">
          <p v-for="(item,index) in zdgl" :key="index" @click="rit(item)" >{{item}}</p>
        </div>
      </div>


      <!-- 搜索 -->
      <div class="serch-box fbox fbox-ac" v-if="tab == 2">
          <form action="" class="fbox fbox-ac" >
              <input type="text" placeholder="请输入车型品牌名称或车系名称" >
              <button class="fbox fbox-ac fbox-jc">
                  <img class="serch" src="../assets/serch.png" alt="">
                  <p>搜索</p>
              </button>
          </form>
      </div>

      <!-- 产品搜索 -->
      <div class="chanpin-box pl" v-if="tab == 3">
          <div class="list fbox fbox-ac fbox-w">
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                <div>机滤</div>
                <div class="chanpin-xian">
                  <!-- 下拉框 -->
                  <Select v-model="model1" placeholder="全部" >
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
            </div>
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                  <div>机滤</div>
                  <div class="chanpin-xian">
                    <!-- 下拉框 -->
                    <Select v-model="model1" placeholder="全部" >
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
            </div>
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                  <div>机滤</div>
                  <div class="chanpin-xian">
                    <!-- 下拉框 -->
                    <Select v-model="model1" placeholder="全部" >
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
            </div>
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                  <div>机滤</div>
                  <div class="chanpin-xian">
                    <!-- 下拉框 -->
                    <Select v-model="model1" placeholder="全部" >
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
            </div>
          </div>
          <div class="list fbox fbox-ac fbox-w">
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                <div>机滤</div>
                <div class="chanpin-xian">
                  <!-- 下拉框 -->
                  <Select v-model="model1" placeholder="全部" >
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
            </div>
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                  <div>机滤</div>
                  <div class="chanpin-xian">
                    <!-- 下拉框 -->
                    <Select v-model="model1" placeholder="全部" >
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
            </div>
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                  <div>机滤</div>
                  <div class="chanpin-xian">
                    <!-- 下拉框 -->
                    <Select v-model="model1" placeholder="全部" >
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
            </div>
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                  <div>机滤</div>
                  <div class="chanpin-xian">
                    <!-- 下拉框 -->
                    <Select v-model="model1" placeholder="全部" >
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
            </div>
          </div>
          <div class="list fbox fbox-ac fbox-w">
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                <div>机滤</div>
                <div class="chanpin-xian">
                  <!-- 下拉框 -->
                  <Select v-model="model1" placeholder="全部" >
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
            </div>
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                  <div>机滤</div>
                  <div class="chanpin-xian">
                    <!-- 下拉框 -->
                    <Select v-model="model1" placeholder="全部" >
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
            </div>
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                  <div>机滤</div>
                  <div class="chanpin-xian">
                    <!-- 下拉框 -->
                    <Select v-model="model1" placeholder="全部" >
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
            </div>
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                  <div>机滤</div>
                  <div class="chanpin-xian">
                    <!-- 下拉框 -->
                    <Select v-model="model1" placeholder="全部" >
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
            </div>
          </div>
          <div class="list fbox fbox-ac fbox-w">
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                <div>机滤</div>
                <div class="chanpin-xian">
                  <!-- 下拉框 -->
                  <Select v-model="model1" placeholder="全部" >
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
            </div>
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                  <div>机滤</div>
                  <div class="chanpin-xian">
                    <!-- 下拉框 -->
                    <Select v-model="model1" placeholder="全部" >
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
            </div>
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                  <div>机滤</div>
                  <div class="chanpin-xian">
                    <!-- 下拉框 -->
                    <Select v-model="model1" placeholder="全部" >
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
            </div>
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                  <div>机滤</div>
                  <div class="chanpin-xian">
                    <!-- 下拉框 -->
                    <Select v-model="model1" placeholder="全部" >
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
            </div>
          </div>
          <div class="list fbox fbox-ac fbox-w">
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                <div>机滤</div>
                <div class="chanpin-xian">
                  <!-- 下拉框 -->
                  <Select v-model="model1" placeholder="全部" >
                      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
            </div>
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                  <div>机滤</div>
                  <div class="chanpin-xian">
                    <!-- 下拉框 -->
                    <Select v-model="model1" placeholder="全部" >
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
            </div>
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                  <div>机滤</div>
                  <div class="chanpin-xian">
                    <!-- 下拉框 -->
                    <Select v-model="model1" placeholder="全部" >
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </div>
            </div>
            <div class="chanpin-item fbox fbox-ac fbox-jb fbox-w" >
                  <div>机滤</div>
                  <div class="chanpin-xian">
                    <!-- 下拉框 -->
                    <Select v-model="model1" placeholder="全部" >
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
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
                <p class="pl">燃油滤</p>
                <div class="fbox fbox-ac">
                  <div class="name tc">燃油滤清器</div>
                  <div class="name-right fbox fbox-ac">
                    <img src="../assets/logo.png" alt="">
                    <p class="ell_2">【正品授权】壳牌/Shell 金装极净超凡喜力全合成机油ULTRA SN 0W-20 </p>
                  </div>
                </div>
            </div>
            <div class="list-right">
              <div class="bot-title chanpin-table-title fbox fbox-ac">
                <p class="list-w3">适用车型</p>
              </div>
              <div class="fbox fbox-jb pl pr">
                <div class="fg1">
                  <p class="title">【007】大众汽车 - 途观</p>
                  <p class="con">2016年产    2.0T（380TSI）     发动机型号：EA888</p>
                </div>
                <p class="jiucuo ml fsh">纠错</p>
              </div>
              <div class="fbox fbox-jb pl pr">
                <div class="fg1">
                  <p class="title">【007】大众汽车 - 途观</p>
                  <p class="con">2016年产    2.0T（380TSI）     发动机型号：EA888</p>
                </div>
                <p class="jiucuo ml fsh">纠错</p>
              </div>
              <div class="fbox fbox-jb pl pr">
                <div class="fg1">
                  <p class="title">【007】大众汽车 - 途观</p>
                  <p class="con">2016年产    2.0T（380TSI）     发动机型号：EA888</p>
                </div>
                <p class="jiucuo ml fsh" @click="showModalO">纠错</p>
              </div>
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
export default {
  name: "pIndex",
  data() {
    return {
      cityList: [
          {
              value: 'New York',
              label: 'New York'
          },
          {
              value: 'London',
              label: 'London'
          },
          {
              value: 'Sydney',
              label: 'Sydney'
          },
          {
              value: 'Ottawa',
              label: 'Ottawa'
          },
          {
              value: 'Paris',
              label: 'Paris'
          },
          {
              value: 'Canberra',
              label: 'Canberra'
          }
      ],
      showModal: false,
      content:''
    };
  },
  props:{
      yixuan:Array,hover:Number,remen:Array,pinpai:Array,chexi:Array,chexing:Array,pailiang:Array,nianfen:Array,kuanxing:Array,fdjxh:Array,zdgl:Array,
      tab:Number,
    },
  watch:{
    tab(e){
      console.log('tabind',e)
    }
  },
  methods:{
    // tab切换
    tabC(e){
      this.$emit("tabC",e)
    },
    // 删除方法
    del(e){
      console.log(e)
      this.$emit("del",e)
    },
    // 选择
    rit(e,s){
      console.log(e,s)
      if(this.yixuan.length == 1){
        this.$emit("changes",e,s)
        return
      }
      this.$emit("changes",e)
    },
    // 鼠标指向
    mouseOver(e){
      this.$emit("mouseOver",e)
    },
    showModalO () {
      this.showModal = true
    },
    showModalF () {
      this.showModal = false
      this.warning()
    },
    showModalT(){
      console.log(this.content)
      this.success()
      this.showModal = false
    },
    success () {
        this.$Message.success('提交成功');
    },
    warning () {
      this.$Message.info('取消');
    },
    error () {
        this.$Message.error('提交失败');
    }

  }

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
.tab{justify-content: flex-end;}

.tab>div{width:147px;height:36px;background: #212531;border-radius:4px 4px 0px 0px;color: #ffffff;margin-left: 5px;font-size: 16px;cursor: pointer;}
.tabActive{background: #EDEEF2 !important;}
.tabActive div{color: #333333;}
.car{width:27px;height:13px;margin-right: 6px;}
.serch{width:17px;height:17px;margin-right: 6px;}
.bao{width:18px;height:18px;margin-right: 6px;}
.content {  width: 100%;background: #EDEEF2;padding: 36px 22px;box-sizing: border-box;}

.nav {  width: 100%;}
.nav p {/* width: 7%; */padding: 0 20px 0 30px;height:40px;line-height: 40px;background: #ffffff;;border-radius:2px 2px 0px 0px;min-width: 50px;position: relative;}
.nav p::after{content: "";position: absolute;top: -9px;right: -28px;width: 58px;height: 58px;-webkit-transform: rotate(45deg) scale(.5);transform: rotate(45deg) scale(.5);border-right: 1px solid #d9d9d9;border-top: 1px solid #d9d9d9;background-color: #ffffff;z-index: 10;}
.nav p span{display: inline-block;width:18px;height:18px;line-height: 18px;font-size: 12px;text-align: center;color: #fff;background:rgba(153,153,153,1);border-radius:9px;margin-right: 12px;}
/* .nav .xinghao {
  width: 15%;
  min-width: 110px;
} */
.nav .gonglv::after {
  display: none;
}



/* 已选车型 */
.yixuan .yixuan-title{font-size: 16px;font-weight: bold;color: #333333;cursor: inherit !important;}
.yixuan div {padding: 3px 3px 3px 10px ;font-size: 12px;color: #333333;background-color: #fff;margin-left: 20px;border: 1px solid #77B110;box-sizing: border-box; }
.yixuan div .guan{width: 20px;height: 10px;cursor: pointer !important;margin-left: 10px;padding: 0 5px;}


/* 框 */
.item{margin-top: 20px;}
.item p {width: 160px;height: 50px;margin-right: 24px;text-align: center;line-height: 48px;background-color: #fff;margin-bottom: 20px;overflow: hidden;cursor: pointer;border-radius: 2px;}
.item p:hover{background: #77B110 !important;color: #ffffff !important}


/* nav选中 */
.active{color: #ffffff;background: #77B110 !important;}
.active span{background: #fff !important;color: #77B110 !important;}
.active::after{border-right: 2px solid #ffffff !important;border-top: 2px solid  #ffffff !important;background-color: #77B110 !important;}


/* 热门标签 */
.remen p{width:24px;height:26px; line-height: 26px;  margin-right: 15px;cursor: pointer;font-size: 14px;text-align: center;border-radius: 2px;}
.ractive{background-color: #77B110;color: #fff!important;}



/* 搜搜 */
.serch-box {width: 100%;background: #EDEEF2;padding: 36px 22px;box-sizing: border-box;}
.serch-box form{width: 80%;}
.serch-box input{width: 80%;height: 46px;background-color: #fff;padding-left: 4%;box-sizing: border-box;font-size: 14px;border-radius: 2px 0 0 2px;}
.serch-box button{width: 89px;height: 46px;background-color: #77b110;color: #fff;font-size: 16px;border-radius: 0 2px 2px 0;}
.serch-box button p{margin-left: 2px;margin-top: 2px;}


/* 产品 */
.chanpin-box{width: 100%;background: #EDEEF2;box-sizing: border-box;}
.chanpin-item{width:240px;height:36px;background:#FFFFFF;border:2px solid #DDDDDD;border-radius:2px;box-sizing: border-box;padding-left: 12px;margin-right: 25px;margin-bottom: 10px;}
.chanpin-box .list{padding: 16px 0 6px;}
.chanpin-box .list:nth-child(2n){background: #F7F8FA;}
.chanpin-xian{position: relative;}
.chanpin-xian::after{position: absolute;content: "";width: 0;height: 20px;border-left: 1px solid #DDDDDD;left: -10px;top: 6px;}
.chanpin-xian .ivu-select-selection{border: none !important;}
.ivu-select-visible .ivu-select-selection{border-color: white !important;}

.chanpin-table{margin: 30px 0 70px;}
.chanpin-table-title{width: 100%;height: 40px;background-color: #212531;color: #FFFFFF;font-size: 14px;padding: 0 20px;box-sizing: border-box;}
.list-w1{width: 200px;}
.list-w2{width: 600px;}
.list-w3{width: 403px;}
.chanpin-table-box{width: 100%;}
.list-left{width: 60%;min-width: 590px;}
.list-left>p{color: #77B110;font-size: 18px;font-weight: bold;line-height: 50px;background: #F6F7F9;}
.list-left>div{height: 88px;border: 1px solid #DDDDDD;box-sizing: border-box;width: 100%;}
.list-left>div .name{line-height: 88px;color: #333333;font-size: 16px;font-weight: bold;width: 15%;}
.list-left>div .name-right{padding: 20px 30px;box-sizing: border-box;border-left: 1px solid #DDDDDD;width: 85%;box-sizing: border-box;}
.list-left>div .name-right img{width:49px;height:49px;border: 1px solid #DDDDDD;box-sizing: border-box;}

.list-left>div .name-right p{width: 100%;}



.list-right{width: 40%;min-width: 395px;color: #333333;padding: 20px 0;box-sizing: border-box;border: 1px solid #DDDDDD;}
.list-right>div{box-sizing: border-box;line-height: 1.8;border-top: 1px solid #DDDDDD;padding: 10px 20px;}
.list-right>div:nth-child(1){border-top: none;}



.list-right .title{font-size: 16px;color: #333333;font-weight: bold;}
.list-right .con{font-size: 14px;}
.list-right .jiucuo{font-size: 14px;color: #777777;cursor: pointer;}


.bot-title{display: none;}


@media only screen and (max-width: 1200px) {
  .box{width: 100%;}
 
}
@media only screen and (max-width: 1004px) {
  .list-left{width: 100%;min-width: 0;}
  .list-right{width: 100%;min-width: 0;}
  .top-title .list-w3{display: none;}
  .bot-title{display: block;}
}
@media only screen and (max-width: 830px) {
  .chanpin-box .list{justify-content: center;}
  .bot-title .list-w3{font-size: 14px;}

 
}
@media only screen and (max-width: 570px) {
  .chanpin-item{width: 45%;margin: 0 2% 10px;}
  .serch-box form{width: 100%;}
  .list-left>div{height: 60px;}
  .list-left>div .name{line-height: 60px;color: #333333;font-size: 12px;font-weight: bold;width: 20%;}
.list-left>div .name-right{padding: 10px 10px;box-sizing: border-box;border-left: 1px solid #DDDDDD;box-sizing: border-box;width: 80%;}
.list-left>div .name-right img{width:40px;height:40px;border: 1px solid #DDDDDD;box-sizing: border-box;}
.list-left>div .name-right p{margin-left: 6px;width: 80%;font-size: 12px;}
.list-right>div{font-size: 12px;}
.list-right .title{font-size: 14px;}
.list-right .con{font-size: 12px;}
.list-w1{width: 30%;}
.list-w2{width: 30%;}
.list-w3{width: 40%;}
  .bot-title .list-w3{font-size: 14px;}

.item p {margin-right: 5px;margin-bottom: 5px;}

}
.mask {
  background-color: #000;
  opacity: 0.3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1
}
.pop {
  background-color: #fff;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
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
  border: 1px solid #77B110;
  padding: 4px 12px;
}
.btns{
  background-color: #77B110;
  color: #FFFFFF;
  margin-left: 20px;
}
textarea{
  width: 100%;
  min-height: 100px;
  background-color: #F5F6FA;
  border-radius: 5px;
}
</style>
