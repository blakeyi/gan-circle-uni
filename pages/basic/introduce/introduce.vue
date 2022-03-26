<template>
	<view class="content">
		<!-- 照片 -->
		<van-row gutter="20" style="width: 100%; margin-top: 0.5rem;">
			<van-col span="22" offset="1">
				<div style="display: flex; justify-content: center;">
					<van-image width="91.7vw" height="300" radius="5" style="box-shadow: 0 5px 8px #ebedf0;" fit="cover"
						src="/static/girl.jpg">
					</van-image>
				</div>
			</van-col>
		</van-row>
		<!-- 个人资料 -->
		<van-row gutter="20" style="width: 100%; margin-top: 0.5rem;">
			<van-col span="22" offset="1">
				<div class="van-doc-card">
					<div style="display: flex; justify-content: space-between; ">
						<div style="height: 30px; line-height: 30px; padding: 5px;">
							<text>{{userInfo.name}}</text>
							<van-image width="30" height="30" fit="cover" src="/static/circle.png"
								style="margin-left:5px"></van-image>
							<van-image width="30" height="30" fit="cover" src="/static/circle.png"
								style="margin-left:5px"></van-image>
						</div>
						<div style="height: 30px; line-height: 30px; padding: 5px;">
							<van-button plain round color="#11111" size="mini">编辑</van-button>
						</div>

					</div>
					<!-- 分割线 -->
					<div class="tableTitle"></div>
					<!-- 个人信息 -->
					<div class="personInfo">
						<van-icon name="birthday-cake-o" size="20px" />
						<text>{{userInfo.birthYear}}.{{userInfo.Constellation}}</text>
						<van-icon name="user-o" size="20px" style="margin-left: 15px;" />
						<text>{{userInfo.height}}.{{userInfo.weight}}</text>
					</div>

					<div class="personInfo">
						<van-icon name="location-o" size="20px" />
						<text>现居{{userInfo.city}}.{{userInfo.province}}{{userInfo.hometown}}人</text>
					</div>
					<div class="personInfo">
						<van-icon name="notes-o" size="20px" />
						<text>{{userInfo.education}}.{{userInfo.university}}</text>
						<van-icon name="user-circle-o" size="20px" style="margin-left: 15px;" />
						<text>{{userInfo.company}}.{{userInfo.profession}}</text>
					</div>
				</div>
			</van-col>
		</van-row>
		<!-- 身份认证 -->
		<van-row gutter="20" style="width: 100%;">
			<van-col span="22" offset="1">
				<div class="van-doc-card" style="display: flex; flex-direction: column;">
					<div style="display: flex; justify-content: space-between;">
						<text>身份认证</text>
						<text style="color: #07C160;">证件综合可信度</text>
					</div>
					<van-grid v-if="!certExpand" column-num="3" :border="false">
						<van-grid-item v-if="userInfo.certData.name.isCert" icon="certificate" text="实名已认证"
							icon-color="#9b1ebb" link-type="navigateTo" url="/pages/basic/certificate/certificate" />
						<van-grid-item v-else icon="certificate" text="实名未认证" icon-color="#9b1ebb"
							link-type="navigateTo" url="/pages/basic/certificate/certificate" />
						<van-grid-item v-if="userInfo.certData.job.isCert" icon="like-o" text="工作已认证"
							icon-color="#f3ca7e" link-type="navigateTo" url="/pages/basic/question/question" />
						<van-grid-item v-else icon="like-o" text="工作未认证" icon-color="#f3ca7e" link-type="navigateTo"
							url="/pages/basic/question/question" />
						<van-grid-item v-if="userInfo.certData.education.isCert" icon="setting-o" text="学历已认证"
							icon-color="#1296db" link-type="navigateTo" url="/pages/basic/matching/matching" />
						<van-grid-item v-else icon="setting-o" text="学历未认证" icon-color="#1296db" link-type="navigateTo"
							url="/pages/basic/matching/matching" />
					</van-grid>
					<div v-else>
						<div style="display: flex; flex-direction: row; justify-content: space-between;">
							<div style="display: flex; flex-direction: row;justify-content: flex-start;">
								<van-icon name="certificate" size="50px" style="margin-top: 5px; padding: 10rpx;"
									icon-color="#9b1ebb" />
								<div style="display: flex; flex-direction: column; width: 55vw;height:50px ;">
									<text v-if="userInfo.certData.name.isCert" class="personInfo">实名已认证</text>
									<text v-else class="personInfo">实名未认证</text>
									<text v-if="userInfo.certData.name.isCert"
										class="personInfo1">认证方式:{{userInfo.certData.name.method}}</text>
								</div>
							</div>
							<div
								style="display: flex; flex-direction: column;width: 35vw; height:65px; align-self: flex-end;">
								<text style="color: #1785FF;"
									class="personInfo">{{userInfo.certData.name.credibility}}%</text>
								<text class="personInfo1">可信度</text>
							</div>
						</div>

						<div style="display: flex; flex-direction: row; justify-content: space-between;">
							<div style="display: flex; flex-direction: row;justify-content: flex-start;">
								<van-icon name="certificate" size="50px" style="margin-top: 5px; padding: 10rpx;"
									icon-color="#9b1ebb" />
								<div style="display: flex; flex-direction: column; width: 55vw;height:50px ;">
									<text v-if="userInfo.certData.job.isCert" class="personInfo">工作已认证</text>
									<text v-else class="personInfo">工作未认证</text>
									<text v-if="userInfo.certData.job.isCert"
										class="personInfo1">认证方式:{{userInfo.certData.job.method}}</text>
								</div>
							</div>
							<div
								style="display: flex; flex-direction: column;width: 35vw; height:65px; align-self: flex-end;">
								<text style="color: #1785FF;"
									class="personInfo">{{userInfo.certData.job.credibility}}%</text>
								<text class="personInfo1">可信度</text>
							</div>
						</div>

						<div style="display: flex; flex-direction: row; justify-content: space-between;">
							<div style="display: flex; flex-direction: row;justify-content: flex-start;">
								<van-icon name="certificate" size="50px" style="margin-top: 5px; padding: 10rpx;"
									icon-color="#9b1ebb" />
								<div style="display: flex; flex-direction: column; width: 55vw;height:50px ;">
									<text v-if="userInfo.certData.education.isCert" class="personInfo">学历已认证</text>
									<text v-else class="personInfo">学历未认证</text>
									<text v-if="userInfo.certData.education.isCert"
										class="personInfo1">认证方式:{{userInfo.certData.education.method}}</text>
								</div>
							</div>
							<div
								style="display: flex; flex-direction: column;width: 35vw; height:65px; align-self: flex-end;">
								<text style="color: #1785FF;"
									class="personInfo">{{userInfo.certData.education.credibility}}%</text>
								<text class="personInfo1">可信度</text>
							</div>
						</div>
					</div>

					<van-button v-if="!certExpand" plain round icon="arrow-down" style="align-self: center;" size="mini"
						@click="certExpand = !certExpand" />
					<van-button v-else plain round icon="arrow-up" style="align-self: center;" size="mini"
						@click="certExpand = !certExpand" />
				</div>
			</van-col>
		</van-row>

		<!-- 精美照片 -->
		<van-row gutter="20" style="width: 100%;">
			<van-col span="22" offset="1">
				<div class="van-doc-card" style="display: flex; flex-direction: column;">
					<div>
						<text>精美照片({{userInfo.photos.length}}/6)</text>
					</div>
					<div style="display: flex; flex-direction: row; flex-wrap: wrap;">
						<div v-for="(item, index) in userInfo.photos" :key="index" style="padding: 10px;">
							<div>
								<van-icon name="cross" @click="deleteImg(item)"
									style="position: absolute; z-index: 1000;margin-left: 34px; color: #fefefe;">
								</van-icon>
								<van-image width="50" height="50" radius="5" style="box-shadow: 0 5px 8px #ebedf0;"
									fit="cover" :src="item" @click="previewImg(item)">
								</van-image>
							</div>
						</div>
						<div v-if="userInfo.photos.length < 6" class="add" @click="uploadImg"> </div>
					</div>
				</div>
			</van-col>

		</van-row>
		<!-- 个人动态 -->
		<van-row gutter="20" style="width: 100%;">
			<van-col span="22" offset="1">
				<div class="van-doc-card" style="display: flex; flex-direction: column;">
					<div style="display: flex; flex-direction: row; justify-content: space-between;"
						@click="handleViewMoments">
						<text>个人动态({{userInfo.moments.num}})</text>
						<van-icon name="arrow" />
					</div>
					<div v-if="userInfo.moments.num > 0" style="display: flex; flex-direction: row; flex-wrap: wrap;">
						<div v-for="(item, index) in userInfo.moments.urls" :key="index" style="padding: 10px;">
							<van-image width="50" height="50" radius="5" style="box-shadow: 0 5px 8px #ebedf0;"
								fit="cover" :src="item" @click="handleViewMoments">
							</van-image>
						</div>
					</div>
				</div>
			</van-col>

		</van-row>
		<!-- 关于我 -->
		<van-row gutter="20" style="width: 100%;">
			<van-col span="22" offset="1">
				<div class="van-doc-card" style="display: flex; flex-direction: column;">
					<div style="display: flex; flex-direction: row; justify-content: space-between;"
						@click="handleViewMoments">
						<text>关于我</text>
					</div>

					<div class="infoDesc">
						<div v-for="(item, index) in userInfo.introduce" :key="index">
							<div style="display: flex; flex-direction: row; justify-content: space-between;">
								<div class="title">
									<div class="dot"></div>
									<text>{{item.title}}</text>
								</div>
								<div @click="handleEditDesc(item)">
									<text style="color: #969599; font-size: 16px;">编辑</text>
									<van-icon name="arrow" />
								</div>
							</div>
							<div class="introduce">
								{{item.desc}}
							</div>
						</div>
					</div>
				</div>
			</van-col>
		</van-row>
		<!-- 个人标签 -->
		<van-row gutter="20" style="width: 100%;">
			<van-col span="22" offset="1">
				<div class="van-doc-card" style="display: flex; flex-direction: column;">
					<div style="display: flex; flex-direction: row; justify-content: space-between;">
						<text>我的标签</text>
						<div @click="handleEditTag">
							<text style="color: #969599; font-size: 16px;">编辑</text>
							<van-icon name="arrow" />
						</div>
					</div>
					<div style="display: flex; flex-direction: row; justify-content: flex-start;">
						<div v-for="(item, index) in userInfo.tags" :key="index" style="margin-left: 5rpx; padding: 5rpx;">
							<van-tag round type="success" size="large" color="#F4F4FF" text-color="#6E6FFF">{{item}}</van-tag>
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
				userInfo: {
					uid: "12345",
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
					//是否认证
					certData: {
						name: {
							isCert: true,
							method: "居民身份证",
							credibility: 80
						},
						job: {
							isCert: true,
							method: "名片/工牌/工作证",
							credibility: 80
						},
						education: {
							isCert: false,
							method: "暂未认证",
							credibility: 0
						}
					},
					cover: "/static/girl.jpg", // 封面照片
					photos: ["/static/girl.jpg", "/static/girl.jpg"], // 其他照片
					moments: {
						num: 10,
						urls: ["/static/girl.jpg", "/static/girl.jpg"] // 此处最多展示最近四条动态

					}, // 动态数
					introduce: [{
							title: "自我描述",
							desc: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了，忘记一切，也" +
								"原谅一切。是真的忘记，做到心平气和，在安稳的现世里，循规蹈矩的过日子。不再追求虚浮的奢华" +
								"不再喜好俏丽的颜色，不再渴望热烈的爱情。只愿在简约的四季里，穿粗布素衣，和某个平淡的人，一\n同老去，相约白头。",
						},
						{
							title: "家庭背景",
							desc: "世事早已擦肩而过，我们又何必反复追忆，反复提起。是时候和昨天告别了，忘记一切，也" +
								"原谅一切。是真的忘记，做到心平气和，在安稳的现世里，循规蹈矩的过日子。不再追求虚浮的奢华" +
								"不再喜好俏丽的颜色，不再渴望热烈的爱情。只愿在简约的四季里，穿粗布素衣，和某个平淡的人，一\n同老去，相约白头。",
						},
					],
					tags:['谦虚自律', '游戏', '足球', '成都']
					
				},
				certExpand: false, // 认证详情默认不展开

			}
		},
		onReady() {
			uni.setNavigationBarTitle({
				title: '用户主页'
			})
		},
		methods: {
			handleViewMoments() {
				uni.navigateTo({
					url: "/pages/basic/moments/moments"
				})
			},
			uploadImg() {
				let that = this
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						that.userInfo.photos.push(res.tempFilePaths[0])
					}
				});
			},
			deleteImg(url) {
				this.userInfo.photos.forEach((value, index, arr) => {
					if (url == value) {
						arr.splice(index, 1)
						return
					}
				})
			},
			handleEditDesc(item) {
				console.log(item)
				uni.navigateTo({
					url: "/pages/basic/editDesc/editDesc?data=" + JSON.stringify(item)
				})
			},
			
			handleEditTag() {
				console.log(this.userInfo.tags)
				uni.navigateTo({
					url: "/pages/basic/editTag/editTag?data=" + JSON.stringify(this.userInfo.tags)
				})
			},
			// An highlighted block
			// 预览图片单张
			previewImg(logourl) {
				let _this = this;
				let imgsArray = [];
				imgsArray[0] = logourl
				uni.previewImage({
					current: 0,
					urls: imgsArray
				});
			},
			// 预览图片多张
			previewImgs(index) {
				let _this = this;
				let imgsArray = [];
				for (let i = 0; i < this.imgUrlList.length; i++) {
					if (this.imgUrlList[i].videoUrl == "") {
						imgsArray.push(this.imgUrlList[i].imgUrl);
					}
				}

				// #ifdef MP
				uni.previewImage({
					current: index - 1,
					urls: imgsArray,
					indicator: 'number',
					loop: true
				});
				// #endif

				// #ifndef MP
				uni.previewImage({
					current: index - 1,
					urls: imgsArray,
					indicator: 'number',
					loop: true
				});
				// #endif

			},
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

	.personInfo {
		height: 30px;
		line-height: 30rpx;
		padding: 10px;
		vertical-align: middle;
	}

	.personInfo1 {
		height: 30px;
		line-height: 30rpx;
		padding: 10px;
		vertical-align: middle;
		font-size: 25rpx;
	}

	.img {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tableTitle {
		position: relative;
		margin: 0 auto;
		width: 85vw;
		height: 1px;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		background-color: #d4d4d4;
		text-align: center;
		font-size: 16px;
		color: rgba(101, 101, 101, 1);
	}

	.add {
		border: 1px solid;
		padding: 5px;
		margin-top: 11px;
		width: 40px;
		height: 40px;
		color: #ccc;
		transition: color .25s;
		position: relative;
		background-color: #ededed;
	}

	.add::before {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		width: 10px;
		margin-left: -5px;
		margin-top: -5px;
		border-top: 2px solid;
	}

	.add::after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		height: 10px;
		margin-left: -1px;
		margin-top: -9px;
		border-left: 2px solid;
	}

	.add:hover {
		color: blue;
	}

	/* 描述信息 */
	.infoDesc {
		display: flex;
		flex-direction: column;
		padding: 10rpx;
		margin-top: 10rpx;
	}

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
		padding: 10rpx;
	}

	.introduce {
		display: flex;
		width: 100%;
		line-height: 20px;
		padding: 5px;
		overflow: hidden;
		word-wrap: break-word;
		word-break: break-all;
		color: #363638;
	}
</style>
