<template>
	<view class="content background">
		<div style="display: flex; flex-direction: column; justify-content: flex-end; height: 60%; width: 100%; align-items: center;">
			<div class="title">专注于省内交友</div>
			<van-button round size="large" class="wxLogin" color="#6E6FFF" @click="getUserProfile" :disabled="!checked">微信快捷登录</van-button>
			<div class="phoneLogin" :disabled="!checked" @click="phoneLogin">手机号登录</div>
		</div>
		
		<van-checkbox :value="checked" @change="onChange" style="margin-bottom: 1rem;">
			同意  
			<span style="color: #6d71ee;"> (用户服务协议) </span>
			和
			<span style="color: #6d71ee;"> (隐私保护协议) </span>
		</van-checkbox>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked:false,
				
			}
		},
		methods: {
			phoneLogin(){
				if(!this.checked) {
					uni.showToast({
						title:"请勾选底部协议"
					})
					return
				}
				uni.navigateTo({
					url:"/pages/basic/phoneLogin/phoneLogin"
				})
			},
			onChange(){
				this.checked = !this.checked
			},
			getUserProfile() {
				console.log('getUserProfile')
				wx.getUserProfile({
					desc: '用于完善会员资料', 
					success: (res) => {
						let data = wx.getStorageSync("userInfo")
						if (data === undefined || data === '') {
							data = {
								info:res.userInfo,
								session_key:"",
								openid:""
							}
						} else {
							data.info = res.userInfo
						}
						wx.setStorageSync("userInfo", data)
						console.log(data)
						uni.switchTab({
							url:"/pages/tabBar/recommend/recommend",
							fail:(res)=>{
								console.log(res)
							}
						})
						console.log(data)
					},
					fail: () => {
						uni.showModal({
							confirmText:"登录失败请检查"
						})
					}
				})
			}
		}
	}
</script>

<style>
	.background {
		height: 100vh;
		background-image: linear-gradient(#6d71ee, #D1D1FF);
		justify-content: space-between;
	}

	.title {
		height: 5rem;
		line-height: 2rem;
		font-size: 1.5rem;
		padding: 1rem;
	}

	.wxLogin {
		width: 80%;
	}

	.phoneLogin {
		/* color: #AFAFB8; */
		padding: 1rem;
	}
</style>
