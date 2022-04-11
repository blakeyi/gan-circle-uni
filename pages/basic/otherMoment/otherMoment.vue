<template>
	<view class="content">
		<van-row style="width: 100%">
			<van-col span="24">
				<div class="moment">
					<div class="title-item">
						<div class="title-item-left">
							<van-image round width="3rem" height="3rem" fit="cover" :src="moment.userInfo.avatar" />
						</div>
						<div class="title-item-middle">
							<div class="title-item-name">{{moment.userInfo.name}}</div>
							<div class="title-item-msg">
								{{moment.userInfo.birthYear}}.{{moment.userInfo.profession}}
							</div>
						</div>
						<div class="title-item-right">
							<van-button v-if="moment.isFocus" round size="mini" color="#ededed" type="default"
								@click="handleUnFocus">
								已关注</van-button>
							<van-button v-else round size="mini" color="#6d71ee" @click="handleFocus">关注</van-button>
						</div>
					</div>
					<div class="momentContent">
						<div class="moment-desc">{{moment.content}}</div>
						<div v-if="moment.pictures.length == 1" class="moment-picture-one"
							v-for="(pic,idx) in moment.pictures" :key="idx">
							<van-image width="12rem" height="12rem" fit="cover" :src="pic" radius="8"
								@click="previewImg(pic)" />
						</div>
						<div v-if="moment.pictures.length > 1" class="moment-picture-more">
							<div v-for="(pic,idx1) in moment.pictures" :key="idx1">
								<van-image width="6rem" height="6rem" fit="cover" :src="pic" radius="5"
									style="padding: 1rem" @click="previewImages(moment.pictures, idx1)" />
							</div>

						</div>
					</div>
					<div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
						<div class="publishTime">{{getDateDiff(moment.publishTime)}}</div>
						<div class="viewNum">
							<div>阅读{{numFormat(moment.status.views, 1)}}</div>
							<van-icon name="ellipsis" size="30px" />
						</div>
					</div>

					<div class="publishTag">
						<van-image width="1rem" height="1rem" fit="cover" src="/static/topic.png">
						</van-image>
						<div>{{moment.publishTag}}</div>
					</div>
					<div class="interactive" @click="hanleEnterInterList">
						<div style="width: 70%;">
							<van-image width="2rem" height="2rem" fit="cover" :src="item.avatar"
								style="padding: 0.5rem;" v-for="(item,index) in moment.status.interactive" :key="index">
							</van-image>
						</div>

						<div style="width: 30%; display: flex; justify-content: space-around; align-items: center;">
							<div>{{numFormat(moment.status.interactive.length, 1)}}人互动</div>
							<van-icon name="arrow" />
						</div>
					</div>
					<div class="toolbar">
						<div style="display: flex; width: 100%; justify-content: space-between;">
							<div style="display: flex; width: 40%; height: 2rem; justify-content: flex-start;"
								@click="handleLike">
								<van-icon v-if="moment.isLiked" name="like" color="#FF668A" />
								<van-icon v-else name="like-o" color="#6d71ee" />
								<div style="width: 30%; height: 2rem; line-height: 2rem;">
									{{moment.status.likes}}
								</div>
							</div>
							<div style="display: flex; width: 40%; height: 2rem; justify-content: center;">
								<van-icon name="shield-o" />
								<div style="width: 30%; height: 2rem; line-height: 2rem;"
									>
									点踩
								</div>
							</div>
							<div style="display: flex; width: 40%; height: 2rem; justify-content: flex-end;">
								<van-icon name="chat-o" color="#6d71ee" />
								<div style="width: 30%; height: 2rem; line-height: 2rem;"
									>
									{{moment.status.comments}}
								</div>
							</div>
						</div>
					</div>
					<div class="comment-notice">请勿在评论中违规透露联系方式</div>
					<div v-if="moment.popularComments.length > 0"
						style="width: 90%; display: flex; justify-content: space-between;">
						<div>热门评论({{numFormat(moment.popularComments.length, 1)}})</div>
					</div>
					<div class="comments">
						<div style="width: 100%;" v-if="index < 3" v-for="(comment,index) in moment.popularComments"
							:key="index">
							<div class="comment">
								<div class="list" @click="handleViewInroduce(comment.fromUser)">
									<van-image round width="3rem" height="3rem" fit="cover"
										:src="comment.fromUser.avatar" style="margin-top: 2rem;" />
									<div style="width: 75%; display: flex; flex-direction: column; justify-content: flex-start; margin-left: 1rem;
										align-items: flex-start;">
										<div style="height: 1.5rem; line-height: 1.5rem;">
											{{comment.fromUser.name}}
											<van-image v-if="comment.fromUser.gender=='男'" round width="1rem"
												height="1rem" fit="cover" src="/static/gender-boy.png" />
											<van-image v-else round width="1rem" height="1rem" fit="cover"
												src="/static/gender-girl.png" />
										</div>
										<div style="height: 1.5rem; line-height: 1.5rem;">
											{{comment.fromUser.birthYear}}.{{comment.fromUser.profession}}
										</div>
									</div>
									<div style="align-self: flex-end;">
										<van-icon v-if="moment.isLiked" name="like" color="#FF668A" />
										<van-icon v-else name="like-o" color="#6d71ee" />
									</div>
								</div>
								<div>{{comment.comment}}</div>
								<div class="reply">
									<div style="width: 100%; margin-top: 0.2rem;" v-if="index < 3" v-for="(reply,index) in comment.replies"
										:key="index">
										<div style="width: 100%;">
											<span style="color: #6d71ee;" @click="handleViewIntro(reply.fromUser)">{{reply.fromUser.name}}</span>
											回复
											<span style="color: #6d71ee;" @click="handleViewIntro(reply.toUser)">{{reply.toUser.name}}:</span>
										</div>
										<div>{{reply.comment}}</div>
									</div>
									<div v-if="comment.replies.length > 1" style="color:#6d71ee;font-size: 0.8rem;"
									@click="handleViewReplies(comment)">
										查看全部{{comment.replies.length}}条评论</div>
								</div>
								
							</div>
						</div>
					</div>
					<div style="width: 90%; display: flex; justify-content: space-between;">
						<div>全部评论({{numFormat(moment.comments.length, 1)}})</div>
						<div @click="handleChgSort">
							<van-button v-if="sortRule==0" plain round size="mini" icon="exchange" type="default">最早
							</van-button>
							<van-button v-else plain round size="mini" icon="exchange" type="default">最新</van-button>
						</div>
					</div>
					<div class="comments">
						<div style="width: 100%;" v-if="index < 3" v-for="(comment,index) in moment.comments"
							:key="index">
							<div class="comment">
								<div class="list" @click="handleViewInroduce(comment.fromUser)">
									<van-image round width="3rem" height="3rem" fit="cover"
										:src="comment.fromUser.avatar" style="margin-top: 2rem;" />
									<div style="width: 75%; display: flex; flex-direction: column; justify-content: flex-start; margin-left: 1rem;
										align-items: flex-start;">
										<div style="height: 1.5rem; line-height: 1.5rem;">
											{{comment.fromUser.name}}
											<van-image v-if="comment.fromUser.gender=='男'" round width="1rem"
												height="1rem" fit="cover" src="/static/gender-boy.png" />
											<van-image v-else round width="1rem" height="1rem" fit="cover"
												src="/static/gender-girl.png" />
										</div>
										<div style="height: 1.5rem; line-height: 1.5rem;">
											{{comment.fromUser.birthYear}}.{{comment.fromUser.profession}}
										</div>
									</div>
									<div style="align-self: flex-end;">
										<van-icon v-if="moment.isLiked" name="like" color="#FF668A" />
										<van-icon v-else name="like-o" color="#6d71ee" />
									</div>
								</div>
								<div>{{comment.comment}}</div>
								<div class="reply">
									<div style="width: 100%; margin-top: 0.2rem;" v-if="index < 3" v-for="(reply,index) in comment.replies"
										:key="index">
										<div style="width: 100%;">
											<span style="color: #6d71ee;" @click="handleViewIntro(reply.fromUser)">{{reply.fromUser.name}}</span>
											回复
											<span style="color: #6d71ee;" @click="handleViewIntro(reply.toUser)">{{reply.toUser.name}}:</span>
										</div>
										<div>{{reply.comment}}</div>
									</div>
									<div v-if="comment.replies.length > 1" style="color:#6d71ee;font-size: 0.8rem;"
									@click="handleViewReplies(comment)">
										查看全部{{comment.replies.length}}条评论</div>
								</div>
								
							</div>
						</div>
					</div>

					<div class="divideLine"></div>
				</div>
			</van-col>
		</van-row>
		<van-dialog id="van-dialog">

		</van-dialog>
	</view>
</template>

<script>
	import Dialog from '../../../wxcomponents/vant/dist/dialog/dialog.js';
	export default {
		data() {
			return {
				sortRule: 0, //排序规则, 0为最新
				moment: {
					momentId: 1234,
					publishTime: 1648826822000,
					publishTag: "单身狗的日常",
					isFocus: false, // 是否已经关注
					isLiked: true,
					comments: [{
							fromUser: {
								id: "12345",
								avatar: "/static/boyAvatar.png",
								name: "总想",
								birthYear: "95年",
								profession: "老师",
								gender: "男",
							},
							toUser: {
								id: "12345",
								avatar: "/static/boyAvatar.png",
								name: "总想",
								birthYear: "95年",
								profession: "老师",
								gender: "男",
							},
							commentTime:1648826822000,
							comment: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了",
							replies: [{
								fromUser: {
									id: "12345",
									avatar: "/static/boyAvatar.png",
									name: "总想",
									birthYear: "95年",
									profession: "老师",
									gender: "男",
								},
								toUser: {
									id: "12345",
									avatar: "/static/boyAvatar.png",
									name: "总想",
									birthYear: "95年",
									profession: "老师",
									gender: "男",
								},
								comment: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了",
							},
							{
								fromUser: {
									id: "12345",
									avatar: "/static/boyAvatar.png",
									name: "总想",
									birthYear: "95年",
									profession: "老师",
									gender: "男",
								},
								toUser: {
									id: "12345",
									avatar: "/static/boyAvatar.png",
									name: "总想",
									birthYear: "95年",
									profession: "老师",
									gender: "男",
								},
								commentTime:1648826822000,
								comment: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了",
							}]
						},
						{
							fromUser: {
								id: "12345",
								avatar: "/static/boyAvatar.png",
								name: "总想",
								birthYear: "95年",
								profession: "老师",
								gender: "男",
							},
							toUser: {
								id: "12345",
								avatar: "/static/boyAvatar.png",
								name: "总想",
								birthYear: "95年",
								profession: "老师",
								gender: "男",
							},
							commentTime:1648826822000,
							comment: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了",
							replies: [{
								fromUser: {
									id: "12345",
									avatar: "/static/boyAvatar.png",
									name: "总想",
									birthYear: "95年",
									profession: "老师",
									gender: "男",
								},
								toUser: {
									id: "12345",
									avatar: "/static/boyAvatar.png",
									name: "总想",
									birthYear: "95年",
									profession: "老师",
									gender: "男",
								},
								commentTime:1648826822000,
								comment: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了",
							},
							{
								fromUser: {
									id: "12345",
									avatar: "/static/boyAvatar.png",
									name: "总想",
									birthYear: "95年",
									profession: "老师",
									gender: "男",
								},
								toUser: {
									id: "12345",
									avatar: "/static/boyAvatar.png",
									name: "总想",
									birthYear: "95年",
									profession: "老师",
									gender: "男",
								},
								commentTime:1648826822000,
								comment: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了",
							}]
						},
						{
							fromUser: {
								id: "12345",
								avatar: "/static/boyAvatar.png",
								name: "总想",
								birthYear: "95年",
								profession: "老师",
								gender: "男",
							},
							toUser: {
								id: "12345",
								avatar: "/static/boyAvatar.png",
								name: "总想",
								birthYear: "95年",
								profession: "老师",
								gender: "男",
							},
							commentTime:1648826822000,
							comment: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了"
						},
						{
							fromUser: {
								id: "12345",
								avatar: "/static/boyAvatar.png",
								name: "总想",
								birthYear: "95年",
								profession: "老师",
								gender: "男",
							},
							toUser: {
								id: "12345",
								avatar: "/static/boyAvatar.png",
								name: "总想",
								birthYear: "95年",
								profession: "老师",
								gender: "男",
							},
							commentTime:1648826822000,
							comment: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了"
						},
					],
					popularComments: [{
						fromUser: {
							id: "12345",
							avatar: "/static/boyAvatar.png",
							name: "总想",
							birthYear: "95年",
							profession: "老师",
							gender: "男",
						},
						toUser: {
							id: "12345",
							avatar: "/static/boyAvatar.png",
							name: "总想",
							birthYear: "95年",
							profession: "老师",
							gender: "男",
						},
						commentTime:1648826822000,
						comment: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了",
						replies: [{
							fromUser: {
								id: "12345",
								avatar: "/static/boyAvatar.png",
								name: "总想",
								birthYear: "95年",
								profession: "老师",
								gender: "男",
							},
							toUser: {
								id: "12345",
								avatar: "/static/boyAvatar.png",
								name: "总想",
								birthYear: "95年",
								profession: "老师",
								gender: "男",
							},
							commentTime:1648826822000,
							comment: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了",
						},
						{
							fromUser: {
								id: "12345",
								avatar: "/static/boyAvatar.png",
								name: "总想",
								birthYear: "95年",
								profession: "老师",
								gender: "男",
							},
							toUser: {
								id: "12345",
								avatar: "/static/boyAvatar.png",
								name: "总想",
								birthYear: "95年",
								profession: "老师",
								gender: "男",
							},
							commentTime:1648826822000,
							comment: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了",
						}]
					}],
					status: {
						likes: 12,
						comments: 12,
						views: 70500,
						interactive: [{
								id: "12345",
								avatar: "/static/boyAvatar.png",
								name: "总想",
								birthYear: "95年",
								profession: "老师",
								gender: "女",

							},
							{
								id: "12345",
								avatar: "/static/boyAvatar.png",
								name: "总想",
								birthYear: "95年",
								profession: "老师",
								gender: "男",
							},
							{
								id: "12345",
								avatar: "/static/boyAvatar.png",
								name: "总想",
								birthYear: "95年",
								profession: "老师",
								gender: "男",
							}
						]
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
						hometown: "宜春",
					},
				}
			}
		},
		onLoad(url) {
			console.log(url)
			if (url !== null || url !== undefined) {
				//this.moment = JSON.parse(url.data)
			}
			console.log(this.moment.momentId)

		},
		methods: {
			handleChgSort() {
				if (this.sortRule == 0) {
					this.sortRule = 1
				} else {
					this.sortRule = 0
				}

			},
			handleLike() {
				this.moment.isLiked = !this.moment.isLiked
			},
			handleFocus() {
				console.log('handleFocus')
				this.moment.isFocus = true
			},
			handleViewReplies(comment){
				uni.navigateTo({
					url: '/pages/basic/replies/replies?data='+JSON.stringify(comment)
				})
			},
			
			handleUnFocus() {
				console.log('handleUnFocus')
				Dialog.confirm({
						title: '确认取消关注吗?',
					})
					.then(() => {
						this.moment.isFocus = false
					})
					.catch(() => {
						// on cancel
					});

			},
			hanleEnterInterList() {
				let temp = {
					momentId: this.moment.momentId,
					interactive: this.moment.status.interactive
				}
				uni.navigateTo({
					url: '/pages/basic/interactive/interactive?data=' + JSON.stringify(temp)
				})
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

			numFormat(num, digits) {
				var si = [{
						value: 1,
						symbol: ""
					},
					{
						value: 1E3,
						symbol: "k"
					},
					{
						value: 1E6,
						symbol: "m"
					}
				];
				var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
				var i;
				for (i = si.length - 1; i > 0; i--) {
					if (num >= si[i].value) {
						break;
					}
				}
				return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
			}
		}
	}
</script>

<style>
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
		padding: 1rem;
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
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
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


	.publishTime {
		width: 70%;
		font-size: 13px;
		margin: 5px;
	}


	.publishTag {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-self: flex-start;
		margin-left: 1rem;
		padding: 0.2rem;
		height: 1rem;
		line-height: 1rem;
		font-size: 0.5rem;
		background-color: #ededed;
		border-radius: 20rpx;

	}

	.toolbar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 90%;
		padding: 0.5rem;
	}

	.comments {
		display: flex;
		flex-direction: column;
		width: 90%;
		padding: 0.5rem;
		border-radius: 10rpx;
	}

	.comment {
		width: 90%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;

	}

	.comment-author {
		line-height: 1.5rem;
		height: 1.5rem;
		color: #6d71ee;
		padding: 0.3rem;
		font-size: 0.8rem;

	}

	.comment-content {
		line-height: 1.5rem;
		height: 1.5rem;
		padding: 0.3rem;
		font-size: 0.8rem;

	}

	.viewNum {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		width: 30%;
		font-size: 13px;
		margin: 5px;
	}

	.interactive {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 90%;
		padding: 0.5rem;
		background-color: #ededed;
		border-radius: 20rpx;
		margin-top: 0.5rem;
	}

	.comment-notice {
		background-color: #ededed;
		width: 90%;
		font-size: 13px;
		margin: 5px;
		padding: 0.5rem;
		border-radius: 10rpx;
	}

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
		width: 100%;
	}
	
	.reply {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		width: 100%;
		background-color: #ededed;
		border-radius: 20rpx;
		padding: 0.5rem;
		margin-top: 1rem;
	}
</style>
