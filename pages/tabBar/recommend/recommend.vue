<template>
	<view class="content" style="height: 100vh;">
		<!-- 功能栏 -->
		<van-row gutter="20" style="width: 100%;">
			<van-col span="22" offset="1">
				<van-button style="padding: 0.5rem;" icon="replay" plain round type="default" size="mini"
					@click="handleReplay">回看
				</van-button>
				<van-button style="padding: 0.5rem;" icon="setting-o" plain round type="default" size="mini"
					@click="handlePerfence">偏好设置
				</van-button>
				<van-button style="padding: 0.5rem;" icon="flag-o" plain round type="default" size="mini"
					@click="handleClockIn">签到
				</van-button>
			</van-col>
		</van-row>
		<!-- 单身广场 -->
		<van-row gutter="20" style="width: 100%; margin-top: 1rem;">
			<van-col span="22" offset="1">
				<div class="van-doc-card recommand">
					<!-- 图片 -->
					<div style=" display: flex; flex-direction: column; align-items: center;">
						<div style="display: flex; flex-direction: row; justify-content: center;">
							<van-image style="padding: 1rem;" round width="3rem" height="3rem" fit="cover"
								src="/static/circle.png" />
							<van-image style="padding: 1rem;" round width="3rem" height="3rem" fit="cover"
								src="/static/circle.png" />
						</div>
						<div style="display: flex; flex-direction: row; justify-content: center; ">
							<van-image style="padding: 1rem;" round width="3rem" height="3rem" fit="cover"
								src="/static/circle.png" />
							<van-image style="padding: 1rem;" round width="3rem" height="3rem" fit="cover"
								src="/static/circle.png" />
							<van-image style="padding: 1rem;" round width="3rem" height="3rem" fit="cover"
								src="/static/circle.png" />
						</div>
						<div style="display: flex; flex-direction: row; justify-content: center;">
							<van-image style="padding: 1rem;" round width="3rem" height="3rem" fit="cover"
								src="/static/circle.png" />
							<van-image style="padding: 1rem;" round width="3rem" height="3rem" fit="cover"
								src="/static/circle.png" />
						</div>
					</div>

					<!-- 动态图标 -->
					<div>
						<circle @click.native="handleEnterSquare"></circle>
						<div
							style="color:white; line-height: 5rem; height: 5rem; text-align:center; width:100%; margin-top: -10rem;">
							进入单身广场</div>
					</div>
				</div>
			</van-col>
		</van-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			console.log("onLoad")
		},
		methods: {
			handleReplay() {
				uni.navigateTo({
					url: "/pages/basic/replay/replay"
				})
			},
			handlePerfence() {
				uni.navigateTo({
					url: "/pages/basic/matching/matching"
				})
			},
			handleClockIn() {
				uni.navigateTo({
					url: "/pages/basic/clockIn/clockIn"
				})
			},
			handleEnterSquare() {
				console.log(1111)
				uni.navigateTo({
					url: "/pages/basic/square/square"
				})
			}
		}
	}
</script>

<style>
	.recommand {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background-color: #2e2dac;
		height: calc(100vh - 8rem);
	}
</style>
