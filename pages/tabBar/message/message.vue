<template>
	<view class="content" style="background-color: #fefefe;">
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
			<div style="display: flex; flex-direction: row; justify-content: space-between;">
				<div style="width: 60%; margin-left: -1rem;">
					<van-dropdown-menu :board="false">
						<van-dropdown-item :value="value_chatType" :options="option_chatType" />
					</van-dropdown-menu>
				</div>
				<div style="display: flex; flex-direction: row; justify-content: flex-end; align-items: center; width: 40%">
					<van-button  plain round size="mini"style="margin-right: 1rem;" @click="handleFriendList">好友列表
					</van-button>
				</div>
				
			</div>
		</van-row>
		<!-- 聊天列表 -->
		<van-row style="width: 100%; margin-top: 1rem;">
			<div v-for="item in chatData" :key="item.msgid">
				<div class="list-item">
					<div class="list-item-left">
						<van-image round width="2rem" height="2rem" fit="cover" :src="item.avatar" />
					</div>
					<div class="list-item-middle">
						<div class="list-item-name">{{item.name}}</div>
						<div class="list-item-msg">{{item.msg}}</div>
					</div>
					<div class="list-item-right">{{item.time}}</div>
				</div>
			</div>
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
			handleFriendList() {
				uni.navigateTo({
					url: "../../basic/friendList/friendList"
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

	.van-dropdown-menu {
		box-shadow: 0 0rpx 0rpx 0 rgba(0, 0, 0, 0.21) !important;
	}

	.van-dropdown-menu__item {
		flex: 0.5 !important;
	}

	/* flex布局 */
	.list-item {
		background-color: white;
		margin: 0 0 10px;
		max-width: 1024px;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		height: 80px;
	}

	.list-item-left {
		width: 20%;
		margin: 5px;
		display: flex;
		vertical-align: middle;
		justify-content: center;
		text-align: center;
		color: white;
	}

	.list-item-middle {
		width: 50%;
		display: flex;
		flex-direction: column;
		text-align: left;
		color: black;
	}

	.list-item-name {
		font-size: 18px;
		margin: 5px;
	}

	.list-item-msg {
		font-size: 13px;
		margin: 5px;
	}

	.list-item-right {
		display: flex;
		width: 30%;
		margin: 5px;
		vertical-align: middle;
		justify-content: center;
		text-align: right;
		line-height: 50px;
		color: black;
		font-size: 10px;
	}
</style>
