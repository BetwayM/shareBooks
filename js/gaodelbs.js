// web服务key=7c56c78343d9410312b699ea954c8e89
// web端key=59744d787042b1ef9b5fa87fa8161a97
// 获取用户位置
var map, geolocation,marker,toolBar;
var site=[];
window.onload=function(){
    initMap(map);
    DomAction();
}
function DomAction(){
    $('.position_btn').on('click',function(e){
        geolocation.getCurrentPosition();
    });
    $('.kefu_btn').on('click',function(e){
        location.href='tel://1369660263'
    });
}
function getUserSite(map){
    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,//是否使用高精度定位，默认:true
            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            showButton: false,        //显示定位按钮，默认：true
            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            showMarker: false,        //定位成功后在定位到的位置显示点标记，默认：true
            showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true  （去掉圆形区域）
            panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            zoomToAccuracy:true,    //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            buttonDom:'<input hidden="true" >',
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
    });
    var customMarker = new AMap.Marker({
        offset: new AMap.Pixel(-14, -34),//相对于基点的位置
        icon: new AMap.Icon({  //复杂图标
            size: new AMap.Size(22, 32),//图标大小
            image: "http://momo9406.iask.in/HB/Library/images/mepot.png", //大图地址
            imageOffset: new AMap.Pixel(0,0)//相对于大图的取图位置
        })
    });
    //   地图中添加地图操作ToolBar插件
map.plugin(["AMap.ToolBar"], function() {
    toolBar = new AMap.ToolBar({locationMarker: customMarker,visible: false}); //设置地位标记为自定义标记
    map.addControl(toolBar);
    toolBar.doLocation();
});
}
//解析定位结果
function onComplete(data) {
    console.log(JSON.stringify(data))
    $('.nav_site_search').attr('placeholder',data.formattedAddress)
    var sitear=[];
    var lng=data.position.getLng()//经度
    var lat=data.position.getLat()//纬度
    // sitearr.push(lng);
    // sitearr.push(lat);
    if(data.accuracy){
         data.accuracy//精度
    }//如为IP精确定位结果则没有精度信息
   site=[lng,lat];
   addMarker(site);
   setCircle(site);
   console.log(site)
   console.log('用户位置：'+data.formattedAddress)
}
//解析定位错误信息
function onError(data) {
    toastBG('定位失败')
}
// AMap.event.addDomListener(document.getElementById('position'),'click',function(){
//     addMarker();
// })
// 圆圈
function setCircle(position){
    var circle = new AMap.Circle({
        //设置圆心位置
        center: position,
        //设置圆的半径
        redius: 0,
        //设置圆形填充透明度
        fillOpacity:1,
        //圆形填充颜色
        fillColor:'#fff',
        //设置线条颜色
        strokeColor:'#fff',
        //轮廓线宽度 
        strokeWeight:0
})
//将圆形扩状物加载到地图上
circle.setMap(map);
}
// 点标记
function addMarker(position) {
 
    //添加点标记，并使用自己的icon
    new AMap.Marker({
        map: map,
		position: position,
        icon: new AMap.Icon({            
            size: new AMap.Size(40, 50),  //图标大小
            image: "http://momo9406.iask.in/HB/Library/images/mepot.png",
            imageOffset: new AMap.Pixel(0, -60)
        })        
    });
    
}


// 初始化地图
function initMap(map){
    map = new AMap.Map('library_map',{
        resizeEnable: true,
        zoom: 13,
        
    });
    map.setFitView()
    
    getUserSite(map);
}
