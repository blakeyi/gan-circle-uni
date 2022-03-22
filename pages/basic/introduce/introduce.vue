<template>
	<view class="content">
		<!-- 照片 -->
		<van-row gutter="20" style="width: 100%;">
			<div class="van-doc-card img" style="width: 90%;background-color: #FFFFFF;">
				<van-col span="22" offset="1">
					<van-image width="300" height="200" style="align-self: center;" fit="cover" src="/static/girl.jpg">
					</van-image>
				</van-col>
			</div>
		</van-row>
		<!-- 个人资料 -->
		<van-row gutter="20" style="width: 100%;">
			<div class="van-doc-card" style="width: 90%;background-color: #FFFFFF;">
				<van-row gutter="20" style="width: 100%;">
					<van-col span="10" offset="1">
						<div class="name">
							<text>{{userInfo.name}}</text>
							<van-image width="30" height="30" fit="cover" src="/static/circle.png"></van-image>
							<van-image width="30" height="30" fit="cover" src="/static/circle.png"></van-image>
						</div>
					</van-col>
					<van-col span="8" offset="5">
						<text>举报/屏蔽</text>
					</van-col>
				</van-row>
				<van-row gutter="20" style="width: 100%;">
					<van-col span="22" offset="1">
						<div class="tableTitle"></div>
					</van-col>
				</van-row>
				<van-row gutter="20" style="width: 100%;">
					<van-col span="11" offset="1">
						<text>{{userInfo.age}}.{{userInfo.Constellation}}</text>
					</van-col>
					<van-col span="11" offset="1">
						<text>{{userInfo.height}}.{{userInfo.weight}}</text>
					</van-col>
				</van-row>
				<van-row gutter="20" style="width: 100%;">
					<van-col span="11" offset="1">
						<text>现居{{userInfo.city}}.{{userInfo.hometown}}</text>
					</van-col>
					<van-col span="11" offset="1">
						<text>{{userInfo.education}}.{{userInfo.university}}</text>
					</van-col>
				</van-row>
				<van-row gutter="20" style="width: 100%;">
					<van-col span="11" offset="1">
						<text>{{userInfo.profession}}</text>
					</van-col>
					<van-col span="11" offset="1">
						<text>{{userInfo.company}}</text>
					</van-col>
				</van-row>
			</div>
		</van-row>
		<!-- 身份认证 -->
		<van-row gutter="20" style="width: 100%;">
			<div class="van-doc-card" style="width: 90%;background-color: #FFFFFF;">
				<van-row gutter="20" style="width: 100%;">
					<van-col span="11" offset="1">
						<text>身份认证</text>
					</van-col>
					<van-col span="11" offset="1">
						<text>证件综合可信度</text>
					</van-col>
				</van-row>
				<van-row gutter="20" style="width: 100%;">
					<van-col span="22" offset="1">
						<van-grid column-num="3" :border="false">
							<van-grid-item icon="certificate" text="我的认证" icon-color="#9b1ebb" link-type="navigateTo"
								url="/pages/basic/certificate/certificate" />
							<van-grid-item icon="like-o" text="三观问答" icon-color="#f3ca7e" link-type="navigateTo"
								url="/pages/basic/question/question" />
							<van-grid-item icon="setting-o" text="匹配设置" icon-color="#1296db" link-type="navigateTo"
								url="/pages/basic/matching/matching" />
						</van-grid>
					</van-col>
				</van-row>
				<van-row gutter="20" style="width: 100%;">
					<van-col span="4" offset="11">
						<van-icon name="down" />
					</van-col>

				</van-row>
			</div>
		</van-row>
		<!-- 关于我 -->
		<van-row gutter="20" style="width: 100%;">
		</van-row>
		<!-- 个人标签 -->
		<van-row gutter="20" style="width: 100%;">
		</van-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
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
					isCert: true, //是否认证
					city: "深圳",
					province: "广东",
					hometown: "宜春",
				}
			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: '用户主页'
			})
		},
		methods: {

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

	.img {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tableTitle {
		position: relative;
		margin: 0 auto;
		width: 80%;
		height: 1px;
		margin-top: 20rpx;
		background-color: #d4d4d4;
		text-align: center;
		font-size: 16px;
		color: rgba(101, 101, 101, 1);
	}
</style>
