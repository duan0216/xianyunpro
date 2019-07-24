<template>
  <div id="container1" style="width:450px; height: 300px;"></div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {};
  },
  watch:{
    'data'(){
      //  console.log(123)
       if(this.markerList){
         this.changeMarker()
       }
       

    }
  },
  mounted() {
    // 页面加载需要的时间很长发生在组件传值之后
    window.onLoad = () => {
      // 等待页面加载完成之后才执行
      // container是页面的div容器
      var map = new AMap.Map("container1", {
        zoom: 8.5, //级别
        center: [118.78333, 31.75003], //中心点坐标
        viewMode: "3D" //使用3D视图
      });
      // console.log(this.data)
      // 将map实例挂载到vm实例上
      this.map = map 
      this.changeMarker()
     
    };
    var key = "8d35f32afdac653b5e8cb7dfbcdb5fe0";
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`;
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  methods:{
    changeMarker(){
      this.map.remove(this.markerList || [])
      var markerList = [];
      var infoWindow
      // markerList.push(marker1)
      var arr = this.data.data;
      arr.forEach((e,i) => {
        var marker = new AMap.Marker({
          position: new AMap.LngLat(e.location.longitude, e.location.latitude),
          content: `<div style="width:40px; height:40px; background-image: url('https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png') 
            ; background-size: 62%;background-repeat:no-repeat;text-align: center; line-height:20px;">
            <span style="margin-right:13px;font-size:18px;color:white">${i+1}</span></div>`,
          // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        });
        AMap.event.addListener(marker, "mouseover", () => {
          this.map.setCenter([e.location.longitude, e.location.latitude]);
          infoWindow = new AMap.InfoWindow({
            content: `<p class='input-item' style="font-size:12px">${e.name}</p></div></div>`
          });
          infoWindow.open(this.map, marker.getPosition());
        });
        AMap.event.addListener(marker, "mouseout", () => {
          infoWindow.close()
        });
        markerList.push(marker);
      });
      // 添加标记点
      this.markerList = markerList
      this.map.add(markerList);
    }
  }
};
</script>

<style lang="less" scoped>
#container1 {
  position: absolute;
  top: 190px;
  right: 265px;
  // background-color: red;
}
</style>
