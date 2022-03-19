<template>
	<view class="content">
		<!-- 功能栏 -->
		<van-row gutter="20" style="width: 100%; margin-top: 1rem;">
			<van-col span="10" offset="1">
				<van-image round width="2rem" height="2rem" fit="cover" src="/static/circle.png"
					@click="handleEnterMyCircle" />
			</van-col>
			<van-col span="6">
				<span style="vertical-align: 5px;">圈儿</span>
			</van-col>
		</van-row>
		<!-- 活动卡片栏 -->
		<van-row gutter="20" style="width: 100%; margin-top: 1rem;">
			<van-col span="22" offset="1">
				<view class="uni-padding-wrap">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay"
								:interval="interval" :duration="duration">
								<swiper-item>
									<van-image width="100%" height="150rpx" fit="container"
										src="/static/activityCard.jpg"></van-image>
								</swiper-item>
								<swiper-item>
									<van-image width="100%" height="150rpx" fit="container"
										src="/static/activityCard1.jpg"></van-image>
								</swiper-item>
								<swiper-item>
									<van-image width="100%" height="150rpx" fit="container"
										src="/static/activityCard2.jpg"></van-image>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</van-col>
		</van-row>
		<!-- 功能栏 -->
		<van-row style="width: 100%">
			<van-col span="24">
				<div class="van-doc-card">
					<van-grid column-num="3" :border="false">
						<van-grid-item icon="guide-o" text="纸飞机" icon-color="#9b1ebb" link-type="navigateTo"
							url="/pages/basic/paperAirplane/paperAirplane" />
						<van-grid-item icon="location-o" text="线下活动" icon-color="#f3ca7e" link-type="navigateTo"
							url="/pages/basic/offlineActivity/offlineActivity" />
						<van-grid-item icon="like-o" text="撒狗粮" icon-color="#1296db" link-type="navigateTo"
							url="/pages/basic/marry/marry" />
					</van-grid>
				</div>
			</van-col>
		</van-row>
		<!-- 日常-->
		<van-row style="width: 100%">
			<van-col span="24">
				<van-tabs animated>
				  <van-tab title="关注">关注</van-tab>
				  <van-tab title="推荐">推荐</van-tab>
				  <van-tab title="最新">最新</van-tab>
				  <van-tab title="匿名">匿名</van-tab>
				</van-tabs>
			</van-col>
		</van-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500
			}
		},
		methods: {
			handleEnterMyCircle() {
				uni.navigateTo({
					url: "../../basic/lifeStatus/lifeStatus"
				})
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.detail.value
			},
			durationChange(e) {
				this.duration = e.detail.value
			}
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

	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
		;
	}

	.swiper {
		height: 200rpx;
	}

	.swiper-item {
		display: block;
		height: 200rpx;
		line-height: 200rpx;
		text-align: center;
	}

	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}

	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}

	.info {
		position: absolute;
		right: 20rpx;
	}

	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}
</style>
