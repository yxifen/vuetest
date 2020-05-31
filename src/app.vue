<template>
	<div class="demo">
		<h2>测试vue组件</h2>
		<p@click="change">{{color}}</p>
		<div>
			<img src="./img/iu.jpg" alt="">
		</div>
	</div>
</template>

<script>
	export default {
		data() {
		return {
				color:'改变背景色'
			};
		},
		methods:{
			change:function(){
				document.querySelector('.demo').style = "background-color:#ff55ff";
			}
		}
	}
</script>

<style lang="scss" scoped>
	.demo {
		background-color: #55ffff;
		div {
			img {
				vertical-align: bottom;
			}
		}
	}
	
</style>
