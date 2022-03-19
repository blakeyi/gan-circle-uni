<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "/wxcomponents/vant/dist/common/index.wxss";
	.van-doc-card {
	    background-color: #fff;
	    border-radius: 10px;
	    box-shadow: 0 5px 8px #ebedf0;
	    margin-bottom: 10px;
	    padding: 10px;
	}
</style>
