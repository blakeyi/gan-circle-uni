<template>
	<view class="content other">
		<van-field style="width: 80%; margin-top: 3rem;" :value="phone" label="手机号" placeholder="请输入手机号"
			:error-message="errMsg" @focus="errMsg=''" @change="phoneChange" />
		<van-cell-group style="width: 80%; margin-top: 3rem;">
			<van-field :value="sms" center round clearable label="短信验证码" placeholder="请输入短信验证码" 
			 use-button-slot>
				<van-button slot="button" size="small" type="primary" @click="sendSms" :disabled="sendDisable">
					{{sendBtnStr}}
				</van-button>
			</van-field>
		</van-cell-group>
		<van-button round size="large" style="width: 80%; margin-top: 3rem;" color="#6E6FFF" @click="phoneLogin">注册/登录
		</van-button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: "",
				errMsg: "",
				sms: null,
				sendBtnStr: "发送验证码",
				sendDisable: false,
			}
		},
		methods: {
			phoneLogin() {
				uni.switchTab({
					url: "/pages/tabBar/recommend/recommend"
				})
			},
			sendSms() {
				// 先检查手机号是否合法
				if (!this.isPoneAvailable(this.phone)) {
					this.errMsg = "请检查手机号"
					return
				}
				this.sendDisable = true
				let count = 59
				let interId = setInterval(() => {
					this.sendBtnStr = `已发送(${count--})`
				}, 1000)
				setTimeout(() => {
					this.sendBtnStr = "发送验证码"
					this.sendDisable = false
					clearInterval(interId)
				}, 60000)


			},
			isPoneAvailable(phone) {
				console.log('phone', phone)
				var myreg = /^[1][3,5,7,8][0-9]{9}$/;
				if (!myreg.test(phone)) {
					return false;
				} else {
					return true;
				}
			},
			phoneChange(e) {
				this.phone = e.detail
			}
		}
	}
</script>

<style>
	.other {
		height: 100vh;
		justify-content: center;
	}
</style>
