<template>
	<view class="content">
		<scroll-view scroll-y="true" :scroll-top="scrollTop" :scroll-into-view="curPos" :style="'height:'+ listHeight">
			<div v-for="(item,index) in chatList" :key="index" :id="'item'+ index" @click="hanleClickList">
				<div class="list">
					<div class="mine" v-if="item.sender == 0">
						<div class="bubble-mine" v-if="item.type == 0">{{item.myMsg}}</div>
						<div class="bubble-mine" v-if="item.type == 1">
							<van-image width="10rem" height="10rem" fit="cover" :src="item.picture"
								@click="previewImg(item.picture)" />
						</div>
						<div class="bubble-mine" v-if="item.type == 2">{{item.myMsg}}</div>
						<div class="bubble-mine" v-if="item.type == 3">{{item.myMsg}}</div>

						<van-image round width="3rem" height="3rem" fit="cover" :src="userData.avatar"
							style="margin-top: 2rem;" @click="handleViewInroduce(userData)" />
					</div>
					<div class="your" v-if="item.sender == 1">
						<van-image round width="3rem" height="3rem" fit="cover" :src="chatUser.avatar"
							style="margin-top: 2rem;" @click="handleViewInroduce(chatUser)" />
						<div class="bubble-mine" v-if="item.type == 0">{{item.myMsg}}</div>
						<div class="bubble-mine" v-if="item.type == 1">
							<van-image width="10rem" height="10rem" fit="cover" :src="item.picture"
								@click="previewImg(item.picture)" />
						</div>
						<div class="bubble-mine" v-if="item.type == 2">{{item.myMsg}}</div>
						<div class="bubble-mine" v-if="item.type == 3">{{item.myMsg}}</div>
					</div>
				</div>
			</div>
		</scroll-view>
		<!-- 输入框 -->
		<van-row gutter="20" style="width: 100%; margin-top: 0.5rem;">
			<van-col span="22" offset="1">
				<div class="input-msg">
					<van-cell-group style="width: 50%;">
						<van-field :value="inputMsg" center clearable placeholder="主动一点,让故事发生" use-button-slot
							@change="handleTextChg">
							<van-icon slot="right-icon" name="smile-o" size="2rem" style="margin-right: 1rem;"
								@click="handleShowEmoji" />
							<van-icon v-if="inputMsg.length === 0" slot="right-icon" name="add-o" size="2rem"
								@click="handleShowMore" />
							<van-icon v-else slot="right-icon" name="guide-o" size="2rem" @click="handleSendMsg" />
						</van-field>
					</van-cell-group>
					<div class="sendPanel" v-if="panelModel == 1">
						<div class="panelItem" @click="handleSendPic">
							<div class="panelItem-img">
								<van-image width="3rem" height="3rem" style="margin-top: 1rem;" fit="cover"
									src="/static/photo.png" />
							</div>
							<text>照片</text>
						</div>
						<div class="panelItem">
							<div class="panelItem-img">
								<van-image width="3rem" height="3rem" style="margin-top: 1rem;" fit="cover"
									src="/static/camera.png" />
							</div>
							<text>拍摄</text>
						</div>
						<div class="panelItem">
							<div class="panelItem-img">
								<van-image width="3rem" height="3rem" style="margin-top: 1rem;" fit="cover"
									src="/static/topic.png" />
							</div>
							<text>快捷话题</text>
						</div>
						<div class="panelItem">
							<div class="panelItem-img">
								<van-image width="3rem" height="3rem" style="margin-top: 1rem;" fit="cover"
									src="/static/report.png" />
							</div>
							<text>举报</text>
						</div>
						<div class="panelItem">
							<div class="panelItem-img">
								<van-image width="3rem" height="3rem" style="margin-top: 1rem;" fit="cover"
									src="/static/finish.png" />
							</div>
							<text>结束聊天</text>
						</div>
						<div class="panelItem">
							<div class="panelItem-img">
								<van-image width="3rem" height="3rem" style="margin-top: 1rem;" fit="cover"
									src="/static/chatSetting.png" />
							</div>
							<text>聊天设置</text>
						</div>
					</div>
					<div class="sendPanel" v-if="panelModel == 2">
						<swiper class="slider" :current="emojiData.length-1">
							<swiper-item v-for="(item, key) in emojiData" :key="key" class="slider-emoji"
								:class="[key==emojiData.length-1?'lastbox':'']">
								<text v-for="(emoji, index) in item" :key="index" @click="handleEmojiSel(emoji)"
									class="slider-emoji-icon">{{ emoji }}</text>
							</swiper-item>
						</swiper>
					</div>
				</div>

			</van-col>
		</van-row>
	</view>
</template>


<script>
	import emoji from "../../../js_sdk/m-emoji/m-emoji_2.0.0/emoji.js";
	const HEIGHT_WITH_PANEL = "60vh"
	const HEIGHT_WITHOUT_PANEL = "85vh"
	export default {
		data() {
			return {
				chatUser: null,
				inputMsg: "",
				updateList: true, // 更新列表
				scrollTop: 0, // 滑动条初始位置
				userData: {
					avatar: "/static/boyAvatar.png"
				},
				emojiData: [], // emoji数组
				panelModel: 0, // 0 不显示, 1 显示图标, 2 显示emoji
				curPos: "item0", // 当前滚动位置
				listHeight: HEIGHT_WITHOUT_PANEL,
				// sender 0-mine 1-your
				chatList: [{
						myMsg: "你好, 你是哪里的人呀",
						yourMsg: "",
						sender: 0,
						hasRead: true,
						type: 0, // 0表示文字, 1表示图片, 2 表示视频
					},
					{
						myMsg: "",
						yourMsg: "今天天气很不错,可以一起出去走走吗, 哈哈哈哈哈哈哈hhhhhhh",
						sender: 1,
						hasRead: true,
						type: 0, // 0表示文字, 1表示图片, 2 表示视频
					},
					{
						myMsg: "今天天气很不错,可以一起出去走走吗, 哈哈哈哈哈哈哈hhhhhhh",
						yourMsg: "",
						sender: 0,
						hasRead: true,
						type: 0, // 0表示文字, 1表示图片, 2 表示视频
					},
					{
						myMsg: "你好, 你是哪里的人呀",
						yourMsg: "",
						sender: 0,
						hasRead: true,
						type: 0, // 0表示文字, 1表示图片, 2 表示视频
					},
					{
						myMsg: "",
						yourMsg: "今天天气很不错,可以一起出去走走吗, 哈哈哈哈哈哈哈hhhhhhh",
						sender: 1,
						hasRead: true,
						type: 0, // 0表示文字, 1表示图片, 2 表示视频
					},
					{
						myMsg: "今天天气很不错,可以一起出去走走吗, 哈哈哈哈哈哈哈hhhhhhh",
						yourMsg: "",
						sender: 0,
						hasRead: true,
						type: 0, // 0表示文字, 1表示图片, 2 表示视频
					},
					{
						myMsg: "你好, 你是哪里的人呀",
						yourMsg: "",
						sender: 0,
						hasRead: true,
						type: 0, // 0表示文字, 1表示图片, 2 表示视频
					},
					{
						myMsg: "",
						yourMsg: "今天天气很不错,可以一起出去走走吗, 哈哈哈哈哈哈哈hhhhhhh",
						sender: 1,
						hasRead: true,
						type: 0, // 0表示文字, 1表示图片, 2 表示视频
					},
					{
						myMsg: "今天天气很不错,可以一起出去走走吗, 哈哈哈哈哈哈哈hhhhhhh",
						yourMsg: "",
						sender: 0,
						hasRead: true,
						type: 0, // 0表示文字, 1表示图片, 2 表示视频
					}
				]
			}
		},
		mounted() {
			console.log(1111, 'mounted')
			this.curPos = 'item' + (this.chatList.length - 1).toString()
			console.log(emoji)
			var page = Math.ceil(emoji.length / 21);
			for (let i = 0; i < page; i++) {
				console.log('page:', page)
				this.emojiData[i] = [];
				for (let k = 0; k < 21; k++) {
					emoji[i * 21 + k] ? this.emojiData[i].push(emoji[i * 21 + k]) : ''
				}
			}
			console.log(1111)
			console.log(this.emojiData)
		},
		onLoad(url) {
			console.log(url)
			if (url !== null || url !== undefined) {
				this.chatUser = JSON.parse(url.data)
			}
			uni.setNavigationBarTitle({
				title: this.chatUser.name
			})

		},
		methods: {
			// 点击list 收起panel
			hanleClickList() {
				this.listHeight = HEIGHT_WITH_PANEL
			},
			handleShowEmoji() {
				this.panelModel = 2
				this.listHeight = HEIGHT_WITH_PANEL
				this.updateChatLine()
			},
			handleShowMore() {
				this.panelModel = 1
				this.listHeight = HEIGHT_WITH_PANEL
				this.updateChatLine()
			},
			handleTextChg(event) {
				this.inputMsg = event.detail
			},
			handleViewInroduce(user) {
				uni.navigateTo({
					url: "/pages/basic/introduce/introduce"
				})
			},
			handleEmojiSel(emoji){
				console.log(emoji)
			},
			handleSendPic() {
				let that = this
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						if (Array.isArray(res.tempFilePaths)) {
							console.log(12344)
							res.tempFilePaths.forEach(elem => {
								console.log(elem)
								that.chatList.push({
									myMsg: "",
									yourMsg: "",
									sender: 0,
									hasRead: false,
									type: 1,
									picture: elem
								})
							})
						}
						that.updateChatLine()

					}
				});
			},
			updateChatLine() {
				this.updateList = false
				this.$nextTick(function() {
					this.updateList = true
					this.curPos = 'item' + (this.chatList.length - 1).toString()
				})
			},
			handleSendMsg() {
				console.log(123)
				this.chatList.push({
					myMsg: this.inputMsg,
					yourMsg: "",
					sender: 0,
					hasRead: false,
					type: 0
				})
				console.log(this.chatList)
				this.updateChatLine()
				this.inputMsg = ""
			},
			previewImg(logourl) {
				let _this = this;
				let imgsArray = [];
				imgsArray[0] = logourl
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			}
		}
	}
</script>

<style lang="scss">
	.list {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: center;
		line-height: 5rem;
		text-align: center;
		width: 100%;
	}

	.mine {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		width: 100%;
		align-items: center;
	}

	.bubble-mine {
		line-height: 2rem;
		max-width: 70%;
		padding: 0.5rem;
		border: #F7F7F7;
		border-width: 1rpx;
		border-style: solid;
		background-color: #6E6FFF;
		color: #fefefe;
		border-top-left-radius: 15rpx;
		border-bottom-right-radius: 15rpx;
		border-bottom-left-radius: 15rpx;
		margin-right: 1rem;
		overflow: hidden;
		word-wrap: break-word;
		word-break: break-all;
		text-align: start;
	}

	.your {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		width: 100%;
		align-items: center;
	}

	.bubble-your {
		max-width: 70%;
		line-height: 2rem;
		padding: 0.5rem;
		border: #F7F7F7;
		border-width: 1rpx;
		border-style: solid;
		background-color: #F3F3F5;
		color: #292939;
		border-bottom-right-radius: 15rpx;
		border-top-right-radius: 15rpx;
		border-bottom-left-radius: 15rpx;
		margin-left: 1rem;
		overflow: hidden;
		word-wrap: break-word;
		word-break: break-all;
		text-align: start;
	}

	.input-msg {
		width: 100%;
		height: 3rem;
		line-height: 2rem;
		/* 		border-radius: 15rpx;
		border-width: 1rpx;
		border-style: solid;
		background-color: #F3F3F5; */
	}

	.sendPanel {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		height: 15rem;
	}

	.panelItem {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 5rem;
		width: 5rem;
		margin-top: 1rem;
		margin-left: 1rem;
	}

	.panelItem-img {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		height: 3rem;
		width: 3rem;
		padding: 1rem;
		background-color: #ededed;
		border-radius: 10rpx;
		margin-top: 1rem;
	}

	.slider {
		width: 100%;
		height: 15rem;

		&-emoji {
			width: 375;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;

			&-icon {
				width: 53%;
				text-align: center;
				padding: 10.5 0;
			}
		}
	}

	.lastbox {
		justify-content: flex-start;
	}
</style>
