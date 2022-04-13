<template>
	<view class="content bg">
		<div style="height: 1rem;"></div>
		<van-cell style="width: 100%;" is-link title="账号安全" link-type="navigateTo" url="/pages/dashboard/index" />
		<div style="height: 1rem;"></div>


		<van-cell style="width: 100%;" is-link title="隐私管理" link-type="navigateTo" url="/pages/dashboard/index" />
		<van-cell style="width: 100%;" is-link title="屏蔽管理" link-type="navigateTo" url="/pages/dashboard/index" />
		<van-cell style="width: 100%;" is-link title="授权设置" link-type="navigateTo" url="/pages/dashboard/index" />

		<div style="height: 1rem;"></div>
		<van-cell style="width: 100%;" is-link title="消息通知设置" link-type="navigateTo" url="/pages/dashboard/index" />

		<div style="height: 1rem;"></div>
		<van-cell style="width: 100%;" is-link title="帮助中心" link-type="navigateTo" url="/pages/dashboard/index" />
		<van-cell style="width: 100%;" is-link title="关于我们" link-type="navigateTo" :value="version"
			url="/pages/dashboard/index" />

		<van-button round size="large" class="logout" color="#E6E6EA" @click="logout">退出登录</van-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				version: "v1.1.1"
			}
		},
		methods: {
			logout() {
				wx.setStorageSync("userInfo", "")
				uni.showToast({
					title: '已退出登录',
					duration: 1500,
				});
				setTimeout(function() {
					uni.navigateTo({
						url: '/pages/basic/login/login'
					})
				}, 1600);


			}
		}
	}
</script>

<style>
	.bg {
		background-color: #F7F8FA;
		justify-content: flex-start;
		height: 100vh;
	}

	.logout {
		width: 80%;
		margin-top: 10rem;
		align-self: center;
	}
</style>
