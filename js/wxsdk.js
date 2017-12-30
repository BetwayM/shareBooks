// appid=wx466a4e9f78ef1808
//appsecret=
window.onload=function(){

};
// 获取acces_token
function getToken(){
    $.ajax({
        type: "GET",
        async:false,
        url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx466a4e9f78ef1808&secret=APPSECRET',
        success: function(data){
            config=data;
            console.log(config);
        }
    })
}