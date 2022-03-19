<template>
	<view>
		<div class='circle'>
			<div class='circle1'></div>
			<div class='circle2'></div>
			<div class='circle3'></div>
			<div class='center'></div>
		</div>
	</view>
</template>

<script>
	export default {
		name: "circle",
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style>
	.circle {
		/*创建一个盒子*/
		width: 100px;
		height: 100px;
		position: absolute;
		top: 60%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.circle1,
	.circle2,
	.circle3 {
		position: absolute;
		left: 50%;
		top: 60%;
		margin: -50px 0 0 -50px;
		/* transform: translate(-50%,-50%); */
		/*因为后面动画也会用到transfrom,因此此处的trasnfrom会被覆盖，因此不能transfrom*/
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background-color: #666666;
	}

	.center {
		position: absolute;
		left: 50%;
		top: 60%;
		/* margin: -50px 0 0 -50px; */
		transform: translate(-50%, -50%);
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: #f8f8ee;
	}

	.circle1 {
		animation: circle 3s linear infinite;
	}

	.circle2 {
		animation: circle 3s linear 0.8s infinite;
	}

	.circle3 {
		animation: circle 3s linear 1.6s infinite;
	}

	@keyframes circle {

		/* Safari and Chrome */
		from {
			opacity: 1;
			transform: scale(0);
		}

		to {
			opacity: 0;
			transform: scale(3);
		}
	}
</style>
