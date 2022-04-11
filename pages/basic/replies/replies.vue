<template>
	<view class="content">
		<van-row style="width: 100%">
			<van-col span="24">
				<div class="list" @click="handleViewInroduce(comment.fromUser)">
					<van-image round width="3rem" height="3rem" fit="cover" :src="comment.fromUser.avatar"
						style="margin-top: 2rem;" />
					<div style="width: 75%; display: flex; flex-direction: column; justify-content: flex-start; margin-left: 1rem;
				align-items: flex-start;">
						<div style="height: 1.5rem; line-height: 1.5rem;">
							{{comment.fromUser.name}}
							<van-image v-if="comment.fromUser.gender=='男'" round width="1rem" height="1rem" fit="cover"
								src="/static/gender-boy.png" />
							<van-image v-else round width="1rem" height="1rem" fit="cover"
								src="/static/gender-girl.png" />
						</div>
						<div style="height: 1.5rem; line-height: 1.5rem;">
							{{comment.fromUser.birthYear}}.{{comment.fromUser.profession}}
						</div>
					</div>
					<div style="align-self: flex-end;">
						<van-icon v-if="comment.isLiked" name="like" color="#FF668A" />
						<van-icon v-else name="like-o" color="#6d71ee" />
					</div>
				</div>
				<div>
					{{comment.comment}}
				</div>
				<div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;">
					<div class="publishTime">{{getDateDiff(comment.commentTime)}}</div>
					<div class="viewNum">
						<van-icon name="ellipsis" size="30px" />
					</div>
				</div>
				<div class="replies">
					<div class="reply" v-for="(item,index) in comment.replies" :key="index" >
						<div class="list" @click="handleViewInroduce(comment.fromUser)">
							<van-image round width="3rem" height="3rem" fit="cover" :src="comment.fromUser.avatar"
								style="margin-top: 2rem;" />
							<div style="width: 75%; display: flex; flex-direction: column; justify-content: flex-start; 
									margin-left: 1rem;align-items: flex-start;">
								<div style="height: 1.5rem; line-height: 1.5rem;">
									{{item.fromUser.name}}
									<van-image v-if="item.fromUser.gender=='男'" round width="1rem" height="1rem"
										fit="cover" src="/static/gender-boy.png" />
									<van-image v-else round width="1rem" height="1rem" fit="cover"
										src="/static/gender-girl.png" />
								</div>
								<div style="height: 1.5rem; line-height: 1.5rem;">
									{{item.fromUser.birthYear}}.{{item.fromUser.profession}}
								</div>
							</div>
							<div style="align-self: flex-end;">
								<van-icon v-if="item.isLiked" name="like" color="#FF668A" />
								<van-icon v-else name="like-o" color="#6d71ee" />
							</div>
						</div>
						回复<span style="color: #8182FF;">{{item.toUser.name}}:</span>
						<span>{{item.comment}}</span>
						<div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%;
						margin-top: 1rem;">
							<div class="publishTime">{{getDateDiff(item.commentTime)}}</div>
							<div class="viewNum">
								<van-icon name="ellipsis" size="30px" />
							</div>
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
				comment: {},
			}
		},
		onLoad(url) {
			if (url !== null || url !== undefined) {
				this.comment = JSON.parse(url.data)
			}
			console.log(this.comment)

		},
		methods: {
			getDateDiff(dateTimeStamp) {
				console.log(dateTimeStamp)
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
		width: 100%;
	}
	
	.replies {
		display: flex;
		flex-direction: column;
		width: 90%;
		justify-content: flex-end;
		align-items: flex-end;
		margin-left: 10%;
	}
	
	.reply{
		width: 100%;
	}
</style>
