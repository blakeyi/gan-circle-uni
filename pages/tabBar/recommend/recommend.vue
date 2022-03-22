<template>
	<view class="content">
			<!-- 功能栏 -->
			<van-row gutter="20" style="width: 100%; margin-top: 1rem;">
				<van-col span="4">
				<van-button icon="replay" plain round type="default" size="mini" @click="handleReplay">回看
				</van-button>
			</van-col>
			<van-col span="6">
				<van-button icon="setting-o" plain round type="default" size="mini" @click="handlePerfence">偏好设置
				</van-button>
			</van-col>
			<van-col span="4">
				<van-button icon="flag-o" plain round type="default" size="mini" @click="handleClockIn">签到</van-button>
			</van-col>
		</van-row>
		<!-- 单身广场 -->
		<van-row gutter="20" style="width: 100%; margin-top: 1rem;">
			<van-col span="22" offset="1">
				<div class="van-doc-card" style="width: 90%;background-color: #2e2dac;">
					<!-- 占位置 -->
					<div style="height: 200rpx;width: 90%"></div>
					<!-- 上两张 -->
					<van-row gutter="20" style="width: 100%; height: 200rpx;">
						<van-col span="4" offset="8">
							<van-image round width="3rem" height="3rem" fit="cover" src="/static/circle.png" />
						</van-col>
						<van-col span="4" offset="2">
							<van-image round width="3rem" height="3rem" fit="cover" src="/static/circle.png" />
						</van-col>
					</van-row>

					<!-- 中三张 -->
					<van-row gutter="20" style="width: 100%;">
						<van-col span="3" offset="6">
							<van-image round width="3rem" height="3rem" fit="cover" src="/static/circle.png" />
						</van-col>
						<van-col span="3" offset="2">
							<van-image round width="3rem" height="3rem" fit="cover" src="/static/circle.png" />
						</van-col>
						<van-col span="3" offset="2">
							<van-image round width="3rem" height="3rem" fit="cover" src="/static/circle.png" />
						</van-col>
					</van-row>

					<!-- 下两张 -->
					<van-row gutter="20" style="width: 100%;">
						<van-col span="4" offset="8">
							<van-image round width="3rem" height="3rem" fit="cover" src="/static/circle.png" />
						</van-col>
						<van-col span="4" offset="2">
							<van-image round width="3rem" height="3rem" fit="cover" src="/static/circle.png" />
						</van-col>
					</van-row>

					<!-- 动态图标 -->
					<van-row gutter="20" style="width: 100%;" >
						<van-col span="6" offset="10">
							<circle @click.native="handleEnterSquare"></circle>
						</van-col>
					</van-row>
					<!-- 占位置 -->
					<div style="height: 400rpx;width: 90%"></div>
					<!-- 文字 -->
					<van-row gutter="20" style="width: 100%;">
						<van-col span="10" offset="8">
							<text style="color:white">进入单身广场</text>
						</van-col>
					</van-row>
					<!-- 占位置 -->
					<div style="height: 150rpx;width: 90%"></div>
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
		methods: {
			handleReplay() {
				uni.navigateTo({
					url:"/pages/basic/replay/replay"
				})
			},
			handlePerfence() {
				uni.navigateTo({
					url:"/pages/basic/matching/matching"
				})
			},
			handleClockIn() {
				uni.navigateTo({
					url:"/pages/basic/clockIn/clockIn"
				})
			},
			handleEnterSquare(){
				console.log(1111)
				uni.navigateTo({
					url:"/pages/basic/square/square"
				})
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
</style>
