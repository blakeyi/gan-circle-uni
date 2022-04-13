<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			this.wechatLogin()
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
								uni.getUserInfo({
											provider: 'weixin',
											success: function(infoRes) {
												//infoRes里面有用户信息需要的话可以取一下
												console.log(infoRes)
												let username = infoRes.userInfo.nickName; //用户名
												let gender = infoRes.userInfo.gender; //用户性别
												let avatarUrl = infoRes.userInfo.avatarUrl; //头像
												//判断是否授权
												uni.getSetting({
													success(res) {
														console.log("授权：", res);
														if (!res.authSetting['scope.userInfo']) {
															//这里调用授权
															console.log("当前未授权");
															uni.showModal({
																title: '提示',
																content: '当前未授权',
																success: function (res) {
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
															uni.showModal({
																title: '提示',
																content: '当前已授权',
																success: function (res) {
																	if (res.confirm) {
																		console.log('用户点击确定');
																	} else if (res.cancel) {
																		console.log('用户点击取消');
																	}
																}
															});
													}
												}
											})
									},
									fail: function(res) {}
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
