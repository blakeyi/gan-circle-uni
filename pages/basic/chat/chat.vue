<template>
	<view class="content">
		<div v-if="showCamera">
			<camera device-position="back" flash="off" binderror="error" style="width: 100%; height: 300px;"></camera>
			<button type="primary" bindtap="takePhoto">拍照</button>
			<view>预览</view>
			<image mode="widthFix" :src="cameraPic"></image>
		</div>
		<scroll-view scroll-y="true" :scroll-top="scrollTop" :scroll-into-view="curPos" :style="'height:'+ listHeight"
			@click="handleClosePanel">
			<div v-for="(item,index) in chatList" :key="index" :id="'item'+ index" @click="hanleClickList">
				<div class="list">
					<div class="mine" v-if="item.sender == 0">
						<div class="bubble-mine" v-if="item.type == 0" v-html="item.myMsg"></div>
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
						<div class="bubble-mine" v-if="item.type == 0" v-html="item.yourMsg"></div>
						<div class="bubble-mine" v-if="item.type == 1">
							<van-image width="10rem" height="10rem" fit="cover" :src="item.picture"
								@click="previewImg(item.picture)" />
						</div>
						<div class="bubble-mine" v-if="item.type == 2">{{item.yourMsg}}</div>
						<div class="bubble-mine" v-if="item.type == 3">{{item.yourMsg}}</div>
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
							<van-icon v-if="panelModel == 2" slot="right-icon" name="smile-o" size="2rem"
								color="#6d71ee" style="margin-right: 1rem;" @click="handleClosePanel" />
							<van-icon v-else slot="right-icon" name="smile-o" size="2rem" style="margin-right: 1rem;"
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
						<div class="panelItem" @click="HandleTakePhoto">
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
						<!-- 最近使用 -->
						<div class="panelTool">

						</div>
						<swiper style="height: 70%; width: 100%; margin-left: 1rem;" :indicator-dots="indicatorDots"
							indicator-color="rgba(0, 0, 0, .3)" indicator-active-color="#07c15c">
							<swiper-item v-for="(emoji, index) in emojisArray" :key="index">
								<div v-for="(item, key) in emoji" :key="key">
									<div class="emoji-common emoji-size-large" :class='item'
										@click="handleEmojiSel(item)">
									</div>
								</div>
							</swiper-item>
						</swiper>

					</div>
				</div>

			</van-col>
		</van-row>

	</view>
</template>


<script>
	import {
		emojis
	} from '../../../utils/emoji.js'
	const HEIGHT_WITH_PANEL = "60vh"
	const HEIGHT_WITHOUT_PANEL = "85vh"
	export default {
		data() {
			return {
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,

				chatUser: null,
				inputMsg: "",
				updateList: true, // 更新列表
				scrollTop: 0, // 滑动条初始位置
				userData: {
					avatar: "/static/boyAvatar.png"
				},
				indicatorDots: 0,
				panelModel: 0, // 0 不显示, 1 显示图标, 2 显示emoji
				curPos: "item0", // 当前滚动位置
				bgImage: "",
				listHeight: HEIGHT_WITHOUT_PANEL,
				showCamera:false, //控制摄像头显示
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
				],
				emojisArray: [], // 二维数组,一个里面24张图
				emojis: emojis,
				cameraPic:""
			}
		},
		mounted() {
			console.log('mounted', emojis)
			this.emojisArray = this.arrayChunk(emojis, 18)
			console.log(this.emojisArray)
			this.curPos = 'item' + (this.chatList.length - 1).toString()
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
			handleClosePanel() {
				this.panelModel = 0
				this.listHeight = HEIGHT_WITHOUT_PANEL
				this.updateChatLine()
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
			handleEmojiSel(emoji) {
				console.log(emoji)
				this.inputMsg += `[${emoji}]`
			},
			replaceEmoji: function(content) {
				//[]需要转义,加？可以最小匹配，不加则为贪婪匹配
				var temp = content.replace(/\[.*?\]/g, function(word) {
					if (word.search("emoji") != -1) {
						// 如果不是emoji则不处理
						const type = word.substring(7, word.length - 1);
						return '<div class="emoji-common emoji-' + type + ' emoji-size-small"></div>';
					}
					return word;

				});
				return temp;
			},
			handleSendPic() {
				let that = this
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album', 'camera'], //从相册选择
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
			takePhoto(){
				let camera = uni.createCameraContext() //创建照相机对象
				console.log(camera)
				camera.takePhoto({ //实现拍照功能
					quality: 'high', //high 高质量成像、 normal 普通质量、row 低质量
					success: (res) => {
						console.log(res)
						this.cameraPic = res.tempImagePath
						this.showCamera = false
					}
				})
			},
			HandleTakePhoto() {
				this.showCamera = true
				
			},
			// size每组数组多少个，如：8
			// array需要拆分的数组
			arrayChunk(array, size) {
				let data = []
				for (let i = 0; i < array.length; i += size) {
					data.push(array.slice(i, i + size))
				}
				return data
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
				let temp = this.replaceEmoji(this.inputMsg)
				this.chatList.push({
					myMsg: temp,
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
	@import "/css/emoji.css";

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

	.panel {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		padding: 1rem;
		height: 30%;
		width: 100%;
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
		align-items: center;
		height: 15rem;
	}

	.panelItem {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		height: 5rem;
		width: 5rem;
		margin-top: 0.5rem;
		margin-left: 1rem;
	}

	.panelItem-img {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		height: 3rem;
		width: 3rem;
		padding: 0.5rem;
		background-color: #ededed;
		border-radius: 10rpx;
		margin-top: 1rem;
	}

	.emoji-common {
		height: 64x;
		width: 64px;
		margin: 4px;
		background: url("https://www.blakeyi.cn/images/emoji_sprite.png") no-repeat;
	}

	.emoji-size-small {
		zoom: 0.45;
		display: inline-block;
		vertical-align: middle
	}

	.emoji-size-large {
		zoom: 0.8;
		margin: 4px;
		float: left;
	}
</style>
