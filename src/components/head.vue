<template>
  <div class="public">
    <!-- 顶部 -->
    <div class="heander-box">
      <div class="heander fbox fbox-ac fbox-jb">
        <router-link to="/" >
          <img src="../assets/top-logo.png" alt="大唛养车" />
        </router-link>
        <h2>为我的爱车约保养</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "public",
  props: [],
  methods: {},
};
</script>


<style scoped>
.heander-box {
  width: 100%;
  background-color: #ffffff;
  height: 116px;
  border-bottom: 1px solid #f5f6fa;
  box-sizing: border-box;
}
.heander {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
}
.heander h2 {
  font-size: 36px;
  color: #333333;
}
@media only screen and (max-width: 1200px) {
  .heander {
    width: 100%;
  }
}
@media only screen and (max-width: 800px) {
  .heander {
    justify-content: center !important;
  }
  .heander h2 {
    display: none;
  }
}
@media only screen and (max-width: 500px) {
  .heander a {
    width: 90%;
    margin: 0 auto;
  }
  .heander img {
    width: 100%;
  }
}
</style>
