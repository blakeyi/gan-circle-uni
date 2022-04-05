<template>
	<view class="content">
		<!-- 列表-->
		<van-row gutter="20" style="width: 100%; margin-top: 0.5rem;">
			<van-col span="22" offset="1">
				<div v-for="(item,index) in interactList" :key="index">
					<div class="list" @click="handleViewInroduce(item)">
						<van-image round width="3rem" height="3rem" fit="cover" :src="item.avatar" style="margin-top: 2rem;"/>
						<div style="display: flex; flex-direction: column; justify-content: space-between; margin-left: 1rem;">
							<div style="height: 1.5rem; line-height: 1.5rem;">
							{{item.name}}
							<van-image v-if="item.gender=='男'" round width="1rem" height="1rem" fit="cover" 
							src="/static/gender-boy.png" />
							<van-image v-else round width="1rem" height="1rem" fit="cover" 
							src="/static/gender-girl.png" />
							</div>
							<div style="height: 1.5rem; line-height: 1.5rem;">{{item.birthYear}}.{{item.profession}}</div>
						</div>
						
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
				momentId:null,
				interactList:[]
			}
		},
		onLoad(url) {
			if (url !== null || url !== undefined) {
				let temp = JSON.parse(url.data)
				this.interactList = temp.interactive
				this.momentId = temp.momentId
			}
			console.log(this.interactList)
		},
		methods: {
			// 进入用户主页,需要区分是自己还是他人
			handleViewInroduce(user) {
				let temp = {
					isMine:false,
					userInfo:user
				}
				uni.navigateTo({
					url: "/pages/basic/introduce/introduce?data=" + JSON.stringify(temp)
				})
			},
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
