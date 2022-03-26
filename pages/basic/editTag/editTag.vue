<template>
	<view class="content">
		<div style="display: flex;flex-direction: column; background-color: #faf9fc;width: 100%; height: 15rem;">
			<div
				style="display: flex;flex-direction: row;flex-wrap: wrap;align-items:flex-start; background-color: #faf9fc; width: 100%; height: 15rem;">
				<div v-for="(item, index) in tags" :key="index" style="height: 1rem; padding: 0.5rem;">
					<van-tag round type="success" size="large" closeable color="#F4F4FF" text-color="#6E6FFF"
						@close="handleDelete(item)">{{item}}</van-tag>
				</div>
			</div>
			<div
				style="display: flex; flex-direction: row; justify-content: flex-end; line-height: 2rem; padding: 1rem;">
				<text>{{tags.length}}/20</text>
			</div>
		</div>
		<div style="width: 100%; height: 20rem;background-color: #faf9fc;">
			<van-tabs :active="curTab" @change="handleTabChg">
				<div v-for="(item,index) in tagList" :key="index">
					<van-tab :title="item.name">
						<div style="display: flex; flex-direction: row; justify-content: flex-start;flex-wrap: wrap;">
							<div v-for="(item1, index1) in item.list" :key="index1"
								@click="handleSelect(item.name, item1)" style="margin-left: 5rpx; padding: 15rpx;">
								<van-tag v-if="item1.selected" round type="success" size="large" color="#F4F4FF"
									text-color="#6E6FFF">{{item1.tag}}</van-tag>
								<van-tag v-else round type="success" size="large" color="#F4F4FF" text-color="#292939">
									{{item1.tag}}
								</van-tag>
							</div>
						</div>
					</van-tab>
				</div>
			</van-tabs>
		</div>

		<div class="exchange" @click="handleExChange">
			<van-image width="20" height="20" src="/static/exchange.png" />
			<text style="margin-left: 5rpx; margin-top: 5rpx; color: #7677FF;">换一批</text>
		</div>
		<div style="width: 100%; background-color: #fefefe; display: flex;flex-direction: row;justify-content: center;">
			<div style="width: 50%; margin-top: 50rpx;">
				<van-button type="primary" size="large" block round color="#6d71ee" @click="handleSave">保存</van-button>
			</div>

		</div>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				tags: [],
				curTab: 0,
				tagList: [{
						name: "性格",
						list: [{
								tag: "谦虚自律",
								selected: true
							},
							{
								tag: "稳重忠厚",
								selected: false
							},
							{
								tag: "乐观自信",
								selected: false
							}
						]
					},
					{
						name: "爱好",
						list: [{
								tag: "游戏",
								selected: true
							},
							{
								tag: "动漫",
								selected: false
							},
							{
								tag: "音乐",
								selected: false
							}
						]
					},
					{
						name: "运动",
						list: [{
								tag: "足球",
								selected: true
							},
							{
								tag: "篮球",
								selected: false
							},
							{
								tag: "滑雪",
								selected: false
							}
						]
					},
					{
						name: "足迹",
						list: [{
								tag: "成都",
								selected: true
							},
							{
								tag: "北京",
								selected: false
							},
							{
								tag: "上海",
								selected: false
							}
						]
					},
				]
			}
		},
		onLoad(url) {
			console.log(url)
			if (url !== null || url !== undefined) {
				this.tags = JSON.parse(url.data)
				console.log(this.tags)
			}

		},
		methods: {
			handleDelete(item) {
				this.tags = this.tags.filter(elem => {
					if (item == elem) {
						this.tagList.forEach(elem => {
							elem.list.forEach(temp => {
								if (temp.tag == item) {
									temp.selected = false
									return
								}
							})
						})
						return false
					}
					return true
				})
				console.log(this.tags)
			},
			handleTabChg(value) {
				console.log(value)
				console.log(this.curTab)
			},
			handleExChange() {

			},
			handleSelect(name, item) {
				console.log(name, item)
				if (!item.selected) {
					console.log(this.tagList[name])
					this.tagList.forEach(elem => {
						if (elem.name == name) {
							elem.list.forEach(temp => {
								if (temp.tag == item.tag) {
									temp.selected = true
									this.tags.push(temp.tag)
									return
								}
							})
						}
					})
				}

			}
		}
	}
</script>

<style>
	.exchange {
		width: 100%;
		background-color: #fefefe;
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding: 15rpx;
	}
</style>
