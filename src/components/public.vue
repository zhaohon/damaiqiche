<template>
  <div class="public">
	  
	  <!-- 顶部 -->
	  <div class="heander-box">
		  <div class="heander fbox fbox-ac fbox-jb">
				<a href="" title="大唛养车-汽车保养回归工业化" >
					<img src="../assets/top-logo.png" alt="大唛养车">
				</a>
				<h2>为我的爱车约保养</h2>
			</div>
	  </div>


	  <!-- 底部 -->
		<div class="footer">
			<div class="foot-top fbox fbox-ac fbox-jc">
				<img src="../assets/foot.png" alt="大唛养车">
				<p>养好车不修车&nbsp;&nbsp;工业化养车连锁</p>
			</div>
			<div class="foot-bot fbox fbox-ac fbox-jc fbox-w">
				<p>版权所有：河北大麦汽车维修服务有限公司</p>
				<p class="bei">ICP备案编号：<a href="" target="_blank" rel="noopener noreferrer">冀ICP备18030522号-1</a></p>
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
	.heander-box{width: 100%;position: fixed;top: 0;left: 0;background-color: #FFFFFF;height: 116px;border-bottom: 1px solid #F5F6FA;box-sizing: border-box;}
	.heander{width: 1200px;margin: 0 auto;height: 100%;}
	.heander h2{font-size: 36px;color: #333333;}

	.footer{
		width:100%;
		height:210px;
		background:#000000;
		position: fixed;
		bottom: 0;
		z-index: 9999;
	}
	.foot-top{
		padding: 53px 0;
		box-sizing: border-box;
	}
	.foot-top p{
		font-size: 32px;
		color: #FFFFFF;
		position: relative;
		margin-left: 100px;
	}
	.foot-top p::before{
		content: "";
		width: 0;
		height: 50px;
		border-left: 1px solid #ffffff;
		position: absolute;
		left: -50px;
		top: 0;
	}

	.foot-bot{
		width: 100%;
		padding: 20px 0;
		color: #FFFFFF;
		background-color: #111111;
	}
	.foot-bot .bei{
		font-size: 16px;
		margin-left: 20px;
	}
	.foot-bot .bei a{color: #FFFFFF;font-size: 16px;font-weight: 300 !important;}

@media only screen and (max-width: 1200px) {
  .heander{width: 100%;}
}
@media only screen and (max-width: 800px) {
	.heander{justify-content: center !important;}
  .heander h2{display: none;}
  .foot-top p{display: none;}
}
@media only screen and (max-width: 600px) {
	.foot-bot {font-size: 12px;}
	.foot-bot .bei{
		font-size: 12px;
	}
	.foot-bot .bei a{font-size: 12px;}
}
@media only screen and (max-width: 500px) {
	.heander a{width: 90%;margin: 0 auto;}
	.heander img{width: 100%;}
}

</style>
