/*
 * @Author: huangbo 
 * @Date: 2017-11-21 13:25:53 
 * @Last Modified by: heying
 * @Last Modified time: 2017-12-13 12:33:03
 */
//解决iOS10的Safari下Meta设置user-scalable=no无效的方法
function ckeckScreen() {  
    document.addEventListener('touchstart',function (event) {  
        if(event.touches.length>1){  
            event.preventDefault();  
        }  
    })  
    var lastTouchEnd=0;  
    document.addEventListener('touchend',function (event) {  
        var now=(new Date()).getTime();  
        if(now-lastTouchEnd<=300){  
            event.preventDefault();  
        }  
        lastTouchEnd=now;  
    },false)  
} 
ckeckScreen();
function toastBG(text) {
    $('body').toast({
        position:'fixed',
        content:text,
        duration:1000,
        animateDuration:500,
        isCenter:false,
        background:'rgba(244,64,64,0.8)',//244,64,64
        animateIn:'bounceIn-hastrans',
        animateOut:'bounceOut-hastrans',
    });
 }
//获取参数
function getUrlParam(position) {
	var reg = new RegExp("(^|&)" + position + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return decodeURI(r[2]);
	} else {
		return null;
	}
};
// 弹窗
    // 传入参数模型
    // //  {
    //     "tip":"提示1",
    //         "title":"dfdfsds",
    //         "btns":['确定'],
    //         "cancel":callback,
    //         "confirm":callback
    //     }
    // 
    // 
    function PopWithBtn(data){
        if(data.btns.length==1){
            $('#btn1').hide();
            $('.pop_model .btns .btn').removeClass('pop1');
            $('.pop_model .btns .btn').removeClass('pop2');
            $('.pop_model .btns .btn').addClass('pop1');
            $('#btn2').text(data.btns[0])
            $('#btn2').on('click',data.confirm)
        }else{
            $('#btn1').show();$('#btn2').show();
            $('#btn1').text(data.btns[0])
            $('#btn2').text(data.btns[1]);
            $('#btn1').on('click',data.cancel);
            $('#btn2').on('click',data.confirm);
            $('.pop_model .btns .btn').removeClass('pop1');
            $('.pop_model .btns .btn').removeClass('pop2');
            $('.pop_model .btns .btn').addClass('pop2');  
        }
        $('#pop_tip').text(data.tip);
        $('#pop_title').text(data.title);
        $('#cover').show();
        // 布局
        // $('.pop_model').css('height',$('.pop_model').height()+5);
        $('.pop_model').css('margin-top',-$('.pop_model').height()/2);
    }