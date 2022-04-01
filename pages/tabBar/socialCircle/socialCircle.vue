<template>
	<view class="content">
		<!-- 功能栏 -->
		<van-row gutter="20" style="width: 100%; margin-top: 1rem;">
			<van-col span="10" offset="1">
				<van-image round width="2rem" height="2rem" fit="cover" src="/static/circle.png"
					@click="handleEnterMyCircle" />
			</van-col>
			<van-col span="6">
				<span style="vertical-align: 5px;">圈儿</span>
			</van-col>
		</van-row>
		<!-- 活动卡片栏 -->
		<van-row gutter="20" style="width: 100%; margin-top: 1rem;">
			<van-col span="22" offset="1">
				<view class="uni-padding-wrap">
					<view class="page-section swiper">
						<view class="page-section-spacing">
							<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay"
								:interval="interval" :duration="duration">
								<swiper-item>
									<van-image width="100%" height="150rpx" fit="container"
										src="/static/activityCard.jpg"></van-image>
								</swiper-item>
								<swiper-item>
									<van-image width="100%" height="150rpx" fit="container"
										src="/static/activityCard1.jpg"></van-image>
								</swiper-item>
								<swiper-item>
									<van-image width="100%" height="150rpx" fit="container"
										src="/static/activityCard2.jpg"></van-image>
								</swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</van-col>
		</van-row>
		<!-- 功能栏 -->
		<van-row style="width: 100%">
			<van-col span="24">
				<div class="van-doc-card">
					<van-grid column-num="3" :border="false">
						<van-grid-item icon="guide-o" text="纸飞机" icon-color="#9b1ebb" link-type="navigateTo"
							url="/pages/basic/paperAirplane/paperAirplane" />
						<van-grid-item icon="location-o" text="线下活动" icon-color="#f3ca7e" link-type="navigateTo"
							url="/pages/basic/offlineActivity/offlineActivity" />
						<van-grid-item icon="like-o" text="撒狗粮" icon-color="#1296db" link-type="navigateTo"
							url="/pages/basic/marry/marry" />
					</van-grid>
				</div>
			</van-col>
		</van-row>
		<!-- 日常-->
		<van-row style="width: 100%">
			<van-col span="24">
				<van-tabs animated>
					<van-tab title="关注">
						<div v-for="(item,index) in moments" :key="index">
							<div class="moment">
								<div class="title-item">
									<div class="title-item-left">
										<van-image round width="3rem" height="3rem" fit="cover"
											:src="item.userInfo.avatar" />
									</div>
									<div class="title-item-middle">
										<div class="title-item-name">{{item.userInfo.name}}</div>
										<div class="title-item-msg">
											{{item.userInfo.birthYear}}.{{item.userInfo.profession}}
										</div>
									</div>
									<div class="title-item-right">
										<van-icon name="ellipsis" size="30px" />
									</div>
								</div>
								<div class="momentContent" @click="handleEnterMoment(item)">
									<div class="moment-desc">{{item.content}}</div>
									<div v-if="item.pictures.length == 1" class="moment-picture-one"
										v-for="(pic,idx) in item.pictures" :key="idx">
										<van-image width="12rem" height="12rem" fit="cover" :src="pic" radius="8"
											@click="previewImg(pic)" />
									</div>
									<div v-if="item.pictures.length > 1" class="moment-picture-more">
										<div v-for="(pic,idx1) in item.pictures" :key="idx1">
											<van-image width="6rem" height="6rem" fit="cover" :src="pic" radius="5"
												style="padding: 1rem" @click="previewImages(item.pictures, idx1)" />
										</div>

									</div>
								</div>
								<div class="publishTime">{{getDateDiff(item.publishTime)}}</div>
								<div class="publishTag">
									<van-image width="1.5rem" height="1.5rem" style="margin-top: 0.2rem;" fit="cover"
										src="/static/topic.png">
									</van-image>
									<div>{{item.publishTag}}</div>
								</div>
								<div class="toolbar">
									<div style="display: flex; width: 40%; justify-content: flex-start;">
										<div
											style="display: flex; width: 40%; height: 2rem; justify-content: flex-start;">
											<van-icon name="like-o" color="#6d71ee" />
											<div style="width: 30%; height: 2rem; line-height: 2rem;">
												{{item.status.likes}}
											</div>
										</div>
										<div
											style="display: flex; width: 40%; height: 2rem; justify-content: flex-start;">
											<van-icon name="chat-o" color="#6d71ee" />
											<div style="width: 30%; height: 2rem; line-height: 2rem;" @click="handleEnterMoment(item)">
												{{item.status.comments}}
											</div>
										</div>
									</div>
									<div style="display: flex; width: 40%; height: 2rem; justify-content: flex-end;">
										<van-icon name="share-o" color="#6d71ee" />
										<div style="width: 30%; height: 2rem; line-height: 2rem;">分享</div>
									</div>

								</div>
								<div class="comment" @click="handleEnterMoment(item)">
									<div style="width: 100%;" v-if="index < 3" v-for="(comment,index) in item.comments"
										:key="index">
										<div>
											<span class="comment-author">{{comment.userName}}:</span>
											<span class="comment-content">{{comment.comment}}</span>
											<br>
										</div>
									</div>
									<div v-if="item.comments.length > 2" style="color:#6d71ee">查看全部{{item.comments.length}}条评论</div>
								</div>
								<div class="divideLine"></div>
							</div>
						</div>
					</van-tab>
					<van-tab title="推荐">推荐</van-tab>
					<van-tab title="最新">最新</van-tab>
					<van-tab title="匿名">匿名</van-tab>
				</van-tabs>
			</van-col>
		</van-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				// 动态
				moments: [{
					momentId: 1234,
					publishTime: 1648826822000,
					publishTag: "单身狗的日常",
					comments: [{
							userName: "blakeyi",
							comment: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了"
						},
						{
							userName: "blakeyi",
							comment: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了"
						},
						{
							userName: "blakeyi",
							comment: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了"
						},
						{
							userName: "blakeyi",
							comment: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了"
						},
					],
					status: {
						likes: 12,
						comments: 12,
					},
					content: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了，忘记一切，也" +
						"原谅一切。是真的忘记，做到心平气和，在安稳的现世里，循规蹈矩的过日子。不再追求虚浮的奢华" +
						"不再喜好俏丽的颜色，不再渴望热烈的爱情。只愿在简约的四季里，穿粗布素衣，和某个平淡的人，一\n同老去，相约白头。",
					pictures: ["/static/pic1.jpeg", "/static/pic2.jpeg"],
					userInfo: {
						id: "12345",
						avatar: "/static/boyAvatar.png",
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
						city: "深圳",
						province: "江西",
						hometown: "宜春"
					},
				}]
			}
		},
		methods: {
			handleEnterMyCircle() {
				uni.navigateTo({
					url: "../../basic/lifeStatus/lifeStatus"
				})
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.detail.value
			},
			durationChange(e) {
				this.duration = e.detail.value
			},
			handleViewInroduce() {},
			handleEnterMoment(item){
				uni.navigateTo({
					url:"/pages/basic/otherMoment/otherMoment"
				})
			},
			previewImg(logourl) {
				let _this = this;
				let imgsArray = [];
				imgsArray[0] = logourl
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
			previewImages(photos, index) {
				console.log(photos, index)
				uni.previewImage({
					urls: photos,
					current: index,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}

				});
			},
			getDateDiff(dateTimeStamp) {
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var halfamonth = day * 15;
				var month = day * 30;
				var now = new Date().getTime();
				var diffValue = now - dateTimeStamp;
				if (diffValue < 0) {
					return;
				}
				var monthC = diffValue / month;
				var weekC = diffValue / (7 * day);
				var dayC = diffValue / day;
				var hourC = diffValue / hour;
				var minC = diffValue / minute;
				let result = "刚刚"
				if (monthC >= 1) {
					result = "" + parseInt(monthC) + "月前";
				} else if (weekC >= 1) {
					result = "" + parseInt(weekC) + "周前";
				} else if (dayC >= 1) {
					result = "" + parseInt(dayC) + "天前";
				} else if (hourC >= 1) {
					result = "" + parseInt(hourC) + "小时前";
				} else if (minC >= 1) {
					result = "" + parseInt(minC) + "分钟前";
				}
				return result;
			},
			// 最多展示3条评论
			getComment(item) {
				console.log(item)
				return item.comments.splice(0, 3)
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

	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
		;
	}

	.swiper {
		height: 200rpx;
	}

	.swiper-item {
		display: block;
		height: 200rpx;
		line-height: 200rpx;
		text-align: center;
	}

	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}

	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}

	.info {
		position: absolute;
		right: 20rpx;
	}

	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}

	/* flex布局 */
	.title-item {
		background-color: white;
		width: 100%;
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		height: 80px;
	}

	.title-item-left {
		width: 20%;
		display: flex;
		vertical-align: middle;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: white;
	}

	.title-item-middle {
		width: 50%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		text-align: left;
		color: black;
	}

	.title-item-name {
		font-size: 18px;
		margin: 5px;
	}

	.title-item-msg {
		font-size: 13px;
		margin: 5px;
	}

	.title-item-right {
		display: flex;
		width: 30%;
		margin: 5px;
		vertical-align: middle;
		justify-content: flex-end;
		align-items: center;
		text-align: right;
		line-height: 50px;
		color: black;
		font-size: 10px;
	}

	.moment {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.momentContent {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.moment-desc {
		line-height: 25px;
		width: 90%;
		vertical-align: middle;
		margin-bottom: 1rem;
	}

	.moment-picture-one {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		width: 90%;

	}

	.moment-picture-more {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
		width: 90%;
		height: 7rem;
	}

	,
	.publishTime {
		width: 90%;
		font-size: 13px;
		margin: 5px;
	}

	.publishTag {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-self: flex-start;
		margin-left: 1rem;
		padding: 0.1rem;
		height: 2rem;
		line-height: 2rem;
		font-size: 1rem;
		background-color: #ededed;
		border-radius: 20rpx;
	}

	.toolbar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 90%;
	}

	.comment {
		display: flex;
		flex-direction: column;
		width: 90%;
		background-color: #ededed;
	}

	.comment-author {
		line-height: 1.5rem;
		height: 1.5rem;
		color: #6d71ee;
		padding: 0.3rem;

	}

	.comment-content {
		line-height: 1.5rem;
		height: 1.5rem;
		padding: 0.3rem;

	}
</style>
