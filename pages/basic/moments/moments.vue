<template>
	<view class="content">
		<van-row gutter="20" style="width: 100%;">
			<div class="cover" :style="{background: 'url('+userInfo.cover+')'}">
				<div
					style="display: flex; flex-direction: column; justify-content: center;align-items: center; height: 100%;width: 100%;">
					<div>
						<van-image round width="5rem" height="5rem" :src="userInfo.cover" />
						<van-button round icon="certificate" type="primary" size="mini" style="margin-left: -4rem;">已认证
						</van-button>
					</div>
					<text class="info">{{userInfo.name}}</text>
					<text class="info">现居{{userInfo.city}}.{{userInfo.province}}{{userInfo.hometown}}人</text>
					<text
						class="info">{{userInfo.age}}.{{userInfo.height}}.{{userInfo.education}}.{{userInfo.profession}}.</text>
				</div>
			</div>
			<div>
				<van-tabs :active="activeTab" bind:change="onChange">
					<van-tab title="全部动态" style="background-color: #fefefe ;">
						<div
							style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
							<div
								style="display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #fefefe ; color: #000000; width: 100%; height:10rem">
								<text>你还没有发布动态哦</text>
							</div>
							<div
								style="display: flex; justify-content: center; background-color: #fefefe ; color: #000000; width: 100%; height:10rem">
								<van-button round type="info">立即发布</van-button>
							</div>
						</div>

					</van-tab>
					<van-tab title="我的视频">
						<div
							style="display: flex; flex-direction: column; justify-content: center; align-items: center;">
							<div
								style="display: flex; flex-direction: column; align-items: center; justify-content: center; background-color: #fefefe ; color: #000000; width: 100%; height:10rem">
								<text>你还没有发布视频哦</text>
							</div>
							<div
								style="display: flex; justify-content: center; background-color: #fefefe ; color: #000000; width: 100%; height:10rem">
								<van-button round type="info">发布一条视频</van-button>
							</div>
						</div>
					</van-tab>
				</van-tabs>
			</div>

		</van-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: 0,
				userInfo: {
					uid: "12345",
					name: "总想",
					grade: "1", //等级
					age: "26岁",
					Constellation: "处女座",
					gender: "男",
					height: "165cm",
					weight: "60kg",
					birthYear: "95年",
					profession: "老师",
					company: "某某公司",
					education: "本科",
					university: "长沙理工大学",
					city: "深圳",
					province: "江西",
					hometown: "宜春",
					//是否认证
					certData: {
						name: {
							isCert: true,
							method: "居民身份证",
							credibility: 80
						},
						job: {
							isCert: true,
							method: "名片/工牌/工作证",
							credibility: 80
						},
						education: {
							isCert: false,
							method: "暂未认证",
							credibility: 0
						}
					},
					cover: "/static/girl.jpg", // 封面照片
					photos: ["/static/girl.jpg", "/static/girl.jpg"], // 其他照片
					moments: {
						num: 10,
						urls: ["/static/girl.jpg", "/static/girl.jpg"] // 此处最多展示最近四条动态

					} // 动态数
				},

			}
		},
		methods: {
			handleBack() {
				uni.navigateBack({

				})
				uni.set
			},
			onChange() {}
		}
	}
</script>

<style>
	.cover {
		width: 100%;
		height: 20rem;
		background-color: #ededed;
		display: flex;
		flex-direction: column;
		background-size: cover;
		background-repeat: no-repeat;
		/* filter:blur(5px); */
	}

	.info {
		color: #fefefe;
		padding: 5rpx;
		height: 2rem;
		line-height: 2rem;
	}
</style>
