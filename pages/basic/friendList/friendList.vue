<template>
	<view class="content">
		<!-- 搜索 -->
		<van-row gutter="20" style="width: 100%; margin-top: 0.5rem;">
			<van-col span="22" offset="1">
				<van-search :value="inputStr" placeholder="搜索" @search="handleSearch" @change="handleInputChg">
				</van-search>
			</van-col>
		</van-row>

		<!-- 列表-->
		<van-row gutter="20" style="width: 100%; margin-top: 0.5rem;">
			<van-col span="22" offset="1">
				<div v-for="(item,index) in friendList" :key="index">
					<div class="list" @click="handleEnterChat(item)">
						<van-image round width="3rem" height="3rem" fit="cover" :src="item.avatar" style="margin-top: 2rem;"/>
						<text style="margin-left: 1rem;">{{item.name}}</text>
					</div>
				</div>

			</van-col>
		</van-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputStr: "",
				userData: {
					name: "总想",
					intesting: 0,
					focus: 0,
					fans: 0,
					recent: 0,
					moneyNum: 100,
					articleNum: 0,
					uid: "12345",
					friendList: [{
							uid: 12345,
							name: "总想",
							avatar: "/static/girlAvatar.png"
						},
						{
							uid: 12345,
							name: "blakeyi",
							avatar: "/static/boyAvatar.png"
						},
						{
							uid: 12345,
							name: "总想",
							avatar: "/static/girlAvatar.png"
						}
					]
				},
				friendList:[]
			}
		},
		onLoad() {
			console.log(this.userData)
			this.friendList = this.userData.friendList
		},
		methods: {
			handleEnterChat(user){
				console.log(user)
				uni.navigateTo({
					url: "/pages/basic/chat/chat?data=" + JSON.stringify(user)
				})
			},
			handleSearch() {
				console.log(this.inputStr)
				let pattern = this.inputStr.toLowerCase()
				this.friendList = this.userData.friendList.filter(elem => {
					let name = elem.name.toLowerCase()
					if (name.indexOf(pattern) !== -1) {
						return true
					}
					return false
				})
			},
			handleInputChg(event) {
				this.inputStr = event.detail
				if (this.inputStr === '') {
					this.friendList = this.userData.friendList
					return
				}
			}
		}
	}
</script>

<style>
	.list {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		height: 5rem;
		line-height: 5rem;
		text-align: center;
		border-top: #F7F7F7;
		border-top-width: 1rpx;
		border-top-style: solid;
	}
</style>
