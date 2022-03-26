<template>
	<view class="content">
		<div class="main">
			<div class="title">
				<div class="dot"></div>
				<text>{{item.title}}</text>
			</div>
		</div>
		<!-- 文字区域 -->
		<van-cell-group style="width: 100%;">
			<van-field :value="item.desc" placeholder="请输入用户名" show-word-limit maxlength="800" type="textarea"
				:autosize="lineSetting" :border="false" size="large" @change="onChange"/>
		</van-cell-group>
		<div style="width: 100%; background-color: #fefefe; display: flex;flex-direction: row;justify-content: center;">
			<div style="width: 50%; margin-top: 50rpx;" >
				<van-button type="primary" size="large" block round color="#6d71ee" @click="handleSave">保存</van-button>
			</div>
			
		</div>
		

	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: null,
				inputDesc:"",
				lineSetting: {
					maxHeight: 1000,
					minHeight: 250
				}
			}
		},
		onBackPress(event) {
		    console.log('onBackPress', event)
		    return false;
		},
		onLoad(url) {
			console.log(url)
			if (url !== null || url !== undefined) {
				this.item = JSON.parse(url.data)
				this.inputDesc = this.item.desc
			}

		},
		methods: {
			onChange(event) {
				this.inputDesc = event.detail
			},
			handleSave(){
				console.log(this.inputDesc)
			}
		}
	}
</script>

<style>
	.dot {
		/* < !--设置圆点的宽、高、背景颜色，再设置圆点半径所占百分比--> */
		width: 10px;
		height: 10px;
		background-color: #6d71ee;
		border-radius: 50%;
		/* 		< !--设置圆点与其后面的内容水平显示--> */
		display: inline-block;
		margin-right: 5px;
	}


	.title {
		color: #6d71ee;
		border-style: solid;
		border-radius: 35rpx;
		border-color: #ededed;
		background-color: #ededed;
		padding: 5rpx;
		margin-left: 10rpx;
	}

	.main {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		background-color: #fefefe;
		padding: 10rpx;
	}
</style>
