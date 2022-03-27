<template>
	<view class="content">
		<van-row gutter="20" style="width: 100%; margin-top: 1rem;" v-for="item in albums" :key="item.uid">
			<van-col span="22" offset="1">
				<div class="van-doc-card album" style="width: 90%;background-color: #F8F8F8;"
					@click="handleEnterIntroduce">
					<van-image width="300" height="580" style="align-self: center;" fit="cover" src="/static/girl.jpg">
					</van-image>
					<div class="name">
						<text>{{item.name}}</text>
						<van-image width="30" height="30" fit="cover" src="/static/circle.png"></van-image>
						<van-image width="30" height="30" fit="cover" src="/static/circle.png"></van-image>
					</div>
					<div class="city">现居{{item.city}}.{{item.province}}</div>
					<div class="other">{{item.age}}.{{item.height}}.{{item.education}}.{{item.profession}}</div>
				</div>
			</van-col>
		</van-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				albums: [{
						uid: "12345",
						name: "总想",
						grade: "1", //等级
						age: "26岁",
						gender: "男",
						height: "165cm",
						birthYear: "95年",
						profession: "老师",
						education: "本科",
						isCert: true, //是否认证
						city: "深圳",
						province: "广东",
						hometown: "宜春",
					},
					{
						uid: "12345",
						name: "总想",
						grade: "1", //等级
						age: "26岁",
						gender: "男",
						height: "165cm",
						birthYear: "95年",
						profession: "老师",
						education: "本科",
						isCert: true, //是否认证
						city: "深圳",
						province: "广东",
						hometown: "宜春",
					}
				]
			}
		},
		onReady() {
			
		},
		methods: {
			handleEnterIntroduce() {
				uni.navigateTo({
					url:"/pages/basic/introduce/introduce"
				})
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.album {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
	}

	.name {
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		font-size: 18rpx;
	}

	.city {
		font-size: 15rpx;
	}

	.other {
		font-size: 12rpx;
	}
</style>
