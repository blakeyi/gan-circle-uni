<template>
	<view class="content">
		<!-- 功能栏 -->
		<van-row gutter="20" style="width: 100%; margin-top: 1rem;">
			<van-col span="10" offset="1">
				<van-image round width="2rem" height="2rem" fit="cover" src="/static/clear.png"
					@click="handleClearMsg" />
			</van-col>
			<van-col span="6">
				<span style="vertical-align: 5px;">消息</span>
			</van-col>
		</van-row>
		<van-row style="width: 100%; margin-top: 1rem;">
			<van-col span="24">
				<van-cell is-link title="查看申请" link-type="navigateTo" :border="false"
					url="/pages/basic/request/request"></van-cell>
			</van-col>
		</van-row>
		<van-row style="width: 100%; margin-top: 1rem;">
			<van-col span="10">
				<van-dropdown-menu :board="false">
					<van-dropdown-item :value="value_chatType" :options="option_chatType" />
				</van-dropdown-menu>
			</van-col>
			<van-col span="6" offset="8">
				<van-button plain round @click="handleFriendList">好友列表</van-button>
			</van-col>

		</van-row>
		<!-- 聊天列表 -->
		<van-row style="width: 100%; margin-top: 1rem;">
			<van-row v-for="(item,index) in chatData" :key="item.msgid" style="width: 100%; margin-top: 1rem;">
				<van-col span="4">
					<van-image round width="2rem" height="2rem" fit="cover" :src="item.avatar" />
				</van-col>
				<van-col span="14">
					<van-row>
						<text>{{item.name}}</text>
					</van-row>
					<van-row>
						<text>{{item.msg}}</text>
					</van-row>
				</van-col>
				<van-col span="6">
					<text style="font-size: small;">{{item.time}}</text>
				</van-col>
			</van-row>
		</van-row>
		<van-dialog id="van-dialog" />
	</view>
</template>

<script>
	import Dialog from '../../../wxcomponents/vant/dist/dialog/dialog.js';
	export default {
		data() {
			return {
				value_chatType: 0,
				option_chatType: [{
						text: '最近聊天',
						value: 0
					},
					{
						text: '全部聊天',
						value: 1
					},
					{
						text: '回收站',
						value: 2
					},
					{
						text: '互动通知',
						value: 3
					},
				],
				chatData: [{
						msgid: "123456",
						avatar: "/static/circle.png",
						name: "总想",
						userid: "1152420971",
						msg: "hello",
						time: "22/03/19 22:23"
					},
					{
						msgid: "123456",
						avatar: "/static/circle.png",
						name: "总想",
						userid: "1152420971",
						msg: "hello",
						time: "22/03/19 22:23"
					},
					{
						msgid: "123456",
						avatar: "/static/circle.png",
						name: "总想",
						userid: "1152420971",
						msg: "hello",
						time: "22/03/19 22:23"
					},
				]
			}
		},
		methods: {
			handleClearMsg() {
				console.log(111)
				Dialog.confirm({
						title: '确认将所有消息已读?',
					})
					.then(() => {
						// on confirm
					})
					.catch(() => {
						// on cancel
					});
			},
			handleFriendList(){
				uni.navigateTo({
					url:"../../basic/friendList/friendList"
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
