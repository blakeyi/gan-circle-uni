// 公共使用的方法

// An highlighted block
// 预览图片单张
export default function previewImg(logourl) {
	let _this = this;
	let imgsArray = [];
	imgsArray[0] = logourl
	uni.previewImage({
		current: 0,
		urls: imgsArray
	});
}
