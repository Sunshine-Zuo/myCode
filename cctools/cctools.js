//传入时间戳  返回YYYY-MM-DD hh:mm:ss格式字符串
function timestampToString(timestamp){
	var d = new Date(timestamp);
	var yyyy = d.getFullYear().toString();
	//var yy = yyyy.substr(2);
	var MM = d.getMonth()+1;
	var dd = d.getDate() < 10 ? "0" + d.getDate() : d.getDate().toString();
	var hh = d.getHours() < 10 ? "0" + d.getHours() : d.getHours().toString();
	var mm = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes().toString();
	var ss = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds().toString();
	return yyyy+"-"+MM+"-"+dd+" "+hh+":"+mm+":"+ss;
}
/**
 * 将日期转换成字符串，返回字符串格式yyyy-mm-dd
 * @date：需要转换的日期
 * @n：+n 加上n天 -n 减去n天 0或不填或其他非整数数字 日期当天
 */
function dateToString(date,n){
	var reg = /^[-+]?[1-9]+$/;
	if(reg.test(n)){
		date.setTime(date.getTime()+n*24*60*60*1000);
	}
	var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString();
	var mm = date.getMonth()+1;
	var yyyy = date.getFullYear().toString();
	return yyyy+"-"+mm+"-"+dd;
}

function gettoday(){
	var date = new Date();
	var y = date.getFullYear()+"";
	var m = date.getMonth()+1+"";
	if(m.length<2){
		m = "0"+m;
	}
	var d = date.getDate()+"";
	if(d.length<2){
		d = "0"+d;
	}
	return y+"-"+m+"-"+d;
}
//提示框 2秒后自动隐藏
function showMessage(message){
	$("body").append("<div style='display: none;width:250px;height:100px;z-index:8888;background-color:#CCFFFF;" +
			"position:fixed;top:5px;left:40%;box-shadow:#888888 0 0 5px ;border-radius: 4px;overflow:auto;'>" +
			"<p style='text-align:center;font-size:18px;font-weight:bold;'>提示</p>" +
			"<p style='font-size:14px;margin:0px 10px'>"+message+"</p>" +
			"</div>");
	$("body>div:last").fadeIn().delay(2000).fadeOut();
}
//呈现loading效果
function showLoadingMask(){
	//获取浏览器页面可见高度和宽度
	var _PageHeight = document.documentElement.clientHeight,
	    _PageWidth = document.documentElement.clientWidth;
	//计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）
	var _LoadingTop = _PageHeight > 61 ? (_PageHeight - 61) / 2 : 0,
	    _LoadingLeft = _PageWidth > 215 ? (_PageWidth - 215) / 2 : 0;
	//在页面未加载完毕之前显示的loading Html自定义内容
	var _LoadingHtml = '<div id="loadingDiv" style="position:absolute;left:0;width:100%;height:100%;top:0;background:#f3f8ff;opacity:0.6;filter:alpha(opacity=60);z-index:999;">'+
		'<div style="position: absolute; cursor1: wait; left: ' + _LoadingLeft + 'px; top:' + _LoadingTop + 'px; width: auto; height: 57px; line-height: 57px; padding-left: 50px; padding-right: 5px; ' +
		'background: #fff url(./img/loading.gif) no-repeat scroll 5px 10px;z-index:1000;border: 2px solid #95B8E7; color: #696969; font-family:\'Microsoft YaHei\';">加载中...</div></div>';
	$("body").append(_LoadingHtml);
}
//隐藏loading效果
function hideLoadingMask(){
	$('#loadingDiv').remove();
}


//返回传入对象的所有属性的键值对数据
function getProperties(obj){
	if(obj){
		return Object.getOwnPropertyNames(obj).map(function(key){
			return key+":"+obj[key];
		});
	}else{
		return null;
	}
}
/**
*计算两个数相除的结果，以两位百分比显示
*/
function getPercent(num, total) {
	num = parseFloat(num);
	total = parseFloat(total);
	if (isNaN(num) || isNaN(total)) {
		return "-";
	}
	return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00)+"%";
}
/**
*修改浏览器copy事件
*/
function changeCopyEvent(){
  document.addEventListener("copy",function(e){
    //取消默认事件，才能修改复制的值
    e.preventDefault();
    //复制的内容
    var copyTxt = `${window.getSelection(0).toString()}\n————————————————\n原文链接：${window.location.href}\n本文为「TinyMeng个人博客」的原创文章，遵循 CC 4.0 BY-SA 版权协议，转载请附上原文出处链接及本声明。`;
    if(e.clipboardData) {
      e.clipboardData.setData('text/plain',  copyTxt);
    }
    else if(window.clipboardData){
    return window.clipboardData.setData("text", copyTxt);
    }
    })
}
