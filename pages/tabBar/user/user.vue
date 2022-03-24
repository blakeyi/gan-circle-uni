<template>
	<view class="content">
		<!-- 个人介绍 -->
		<van-row gutter="20" style="width: 100%; margin-top: 0.5rem;">
			<van-col span="22" offset="1">
				<div class="van-doc-card" style="display:flex; flex-direction: row; height:4rem; justify-content: space-around;">
					<!-- 头像 -->
					<van-image round width="3rem" height="3rem" fit="cover" src="/static/circle.png" style="display: flex; align-self: flex-start;"/>
					<!-- 名称和状态 -->
					<div style="display:flex; flex-direction: column; justify-content: flex-start;">
						<text>{{userData.name}}</text>
						<van-cell is-link title="积极营业" link-type="navigateTo" :border="false"
							url="/pages/basic/lifeStatus/lifeStatus">
						</van-cell>
					</div>
					<!-- 主页跳转 -->
					<van-cell is-link title="主页" link-type="navigateTo" :border="false"
						url="/pages/basic/introduce/introduce"></van-cell>
				</div>
			</van-col>
		</van-row>
		<!-- 数据记录 -->
		<van-row style="width: 100%;">
			<van-col span="22" offset="1">
				<div class="van-doc-card" >
					<van-grid column-num="4" :border="false">
						<van-grid-item use-slot v-for="item in dataRecords" :key="item.label">
							<van-row>{{item.value}}</van-row>
							<van-row style="font-size: 14px;">{{item.label}}</van-row>
						</van-grid-item>
					</van-grid>
				</div>
			</van-col>
		</van-row>
		<!-- 脱单服务 -->
		<van-row style="width: 100%; margin-top: 1rem;">
			<van-col span="22" offset="1">
				<div style="display:flex; flex-direction: row; justify-content: space-between;">
					<div class="van-doc-card" style="width: 40%;">
						<van-cell is-link title="我的狗粮" :label="userData.moneyNum" link-type="navigateTo" :border="false"
							url="/pages/basic/shop/shop"></van-cell>
					</div>
					<div class="van-doc-card" style="width: 40%;">
						<van-cell is-link title="我的动态" :label="userData.articleNum" link-type="navigateTo"
							:border="false" url="/pages/basic/lifeStatus/lifeStatus"></van-cell>
					</div>
				</div>
			</van-col>
		</van-row>
		<!-- 个人中心 -->
		<van-row style="width: 100%">
			<van-col span="22" offset="1">
				<div class="van-doc-card">
					<text>个人中心</text>
					<van-grid column-num="3" :border="false">
						<van-grid-item icon="certificate" text="我的认证" icon-color="#9b1ebb" link-type="navigateTo"
							url="/pages/basic/certificate/certificate" />
						<van-grid-item icon="like-o" text="三观问答" icon-color="#f3ca7e" link-type="navigateTo"
							url="/pages/basic/question/question" />
						<van-grid-item icon="setting-o" text="匹配设置" icon-color="#1296db" link-type="navigateTo"
							url="/pages/basic/matching/matching" />
					</van-grid>
				</div>
			</van-col>
		</van-row>
		<!-- 加速脱单 -->
		<van-row style="width: 100%">
			<van-col span="22" offset="1">
				<div class="van-doc-card">
					<text>加速脱单</text>
					<van-grid column-num="3" :border="false">
						<van-grid-item icon="friends-o" text="拯救单身" icon-color="#1296db" @click="showShare=true">
						</van-grid-item>
						<van-grid-item icon="manager-o" text="团长招募" icon-color="#9b1ebb" link-type="navigateTo"
							url="/pages/basic/activity/activity" />
						<van-grid-item icon="bullhorn-o" text="人工牵线" icon-color="#f3ca7e" link-type="navigateTo"
							url="/pages/basic/matchMaker/matchMaker" />
					</van-grid>
				</div>
			</van-col>
		</van-row>
		<!-- 其他 -->
		<van-row style="width: 100%">
			<van-col span="22" offset="1">
				<div class="van-doc-card">
					<text>其他</text>
					<van-grid column-num="3" :border="false">
						<van-grid-item icon="notes-o" text="隐私说明" icon-color="#f3ca7e" link-type="navigateTo"
							url="/pages/basic/privacy/privacy" />
						<van-grid-item icon="service-o" text="客服" icon-color="#1296db" link-type="navigateTo"
							url="/pages/basic/customer/customer" />
						<van-grid-item icon="setting-o" text="设置" icon-color="#9b1ebb" link-type="navigateTo"
							url="/pages/basic/setting/setting" />
					</van-grid>
				</div>
			</van-col>
		</van-row>
		<!-- UID显示 -->
		<van-row style="width: 100%">
			<van-col span="8" offset="8">
				<text style="text-align:center">UID:{{userData.uid}}</text>
			</van-col>
		</van-row>

		<!-- 分享界面 -->
		<van-share-sheet :show="showShare" title="立即分享给好友" :options="options" @select="onShareSelect"
			@close="showShare=false" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userData: {
					name:"总想",
					intesting: 0,
					focus: 0,
					fans: 0,
					recent: 0,
					moneyNum: 100,
					articleNum: 0,
					uid: "12345"
				},
				active: 0,
				showShare: false,
				options: [
					[{
							name: '微信',
							icon: 'wechat'
						},
						{
							name: '微博',
							icon: 'weibo'
						},
						{
							name: 'QQ',
							icon: 'qq'
						},
					],
					[{
							name: '复制链接',
							icon: 'link'
						},
						{
							name: '分享海报',
							icon: 'poster'
						},
						{
							name: '二维码',
							icon: 'qrcode'
						},
					],
				],
			}
		},
		computed: {
			// 通过监听数据改变
			dataRecords: function() {
				return [{
						value: this.userData.intesting,
						label: "我想认识"
					},
					{
						value: this.userData.focus,
						label: "关注"
					},
					{
						value: this.userData.fans,
						label: "粉丝"
					},
					{
						value: this.userData.recent,
						label: "最近来访"
					},
				]
			}
		},
		onLoad() {

		},
		methods: {
			onChange(value) {
				console.log(value)
			},
			handleShare() {
				console.log(111)
				this.showShare = true
			},
			onShareSelect(value) {
				console.log(value)
			}
		}
	}
</script>

<style>
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
