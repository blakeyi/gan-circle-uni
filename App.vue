<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			let useData = wx.getStorageSync("userInfo")
			console.log('useData', typeof useData)
			if (useData === undefined || useData === '') {
				this.wechatLogin()
				uni.navigateTo({
					url:"pages/basic/login/login"
				})
			}
			
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			wechatLogin() {
				var that = this
				// 获取用户名  获取性别 获取头像 获取js_code去换取后台返回的openID
				uni.login({
					provider: 'weixin',
					success: function(loginRes) {
						let js_code = loginRes.code; //js_code可以给后台获取unionID或openID作为用户标识
						console.log(js_code)
						// 获取用户信息
						//判断是否授权
						uni.getSetting({
							success(res) {
								if (!res.authSetting['scope.userInfo']) {
									//这里调用授权
									console.log("当前未授权");
									uni.showModal({
										title: '提示',
										content: '当前未授权',
										success: function(res) {
											if (res.confirm) {
												console.log('用户点击确定');
											} else if (res.cancel) {
												console.log('用户点击取消');
											}
										}
									});
								} else {
									//用户已经授权过了
									console.log("当前已授权");
									uni.request({
										url: 'https://blakeyi.cn/wx-api/getOpenid',
										data: {
											code: js_code
										},
										method: "POST",
										success: (res) => {
											let data = wx.getStorageSync("userInfo")
											if (data === undefined || data === '') {
												data = {
													info: null,
													'session_key': res.data
														.session_key,
													openid: res.data.openid
												}
											} else {
												data.session_key = res.data.session_key
												data.openid = res.data.openid
											}
											wx.setStorageSync("userInfo", data)
										}
									});
								}
							}
						})
					},
					fail: function(res) {}
				})
			},

		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "/wxcomponents/vant/dist/common/index.wxss";

	.van-doc-card {
		background-color: #fefefe;
		border-radius: 10px;
		box-shadow: 0 5px 8px #ebedf0;
		margin-bottom: 10px;
		padding: 10px;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
</style>
