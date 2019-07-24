<template>
  <div class="Mapcontainer">
    <!-- 地图显示 -->
    <div class="Map">
      <div id="map" style="width:630px; height: 400px;"></div>
      <div class="mapItems">
        <div class="listTitle">
          <span @click="handleChangeList('风景名胜')">风景</span>
          <span @click="handleChangeList('交通设施服务')">交通</span>
        </div>
        <ul class="viewlist">
          <li
            v-for="(value,index) in landscapeList"
            :key="index"
            @click="changeMapCenter(value)"
            style="cursor:pointer"
          >
            {{value.name}}
            <span style="float:right">{{GetDistance(value.location)}}公里</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 酒店功能显示 -->
    <div class="hotelCons">
      <ul class="facility_list">
        <li>
          <span>基本信息</span>
          <span>入住时间: 14:00之后</span>
          <span>离店时间: 12:00之前</span>
          <span>2010年开业 / 2015年装修</span>
          <span>酒店规模: 148间客房</span>
        </li>
        <li>
          <span>主要设施</span>
          <i v-for="(v,i) in data.hotelassets" :key="i" >{{v.name}}</i>
          
        </li>
        <li>
          <span>停车服务</span>
        </li>
        <li>
          <span>品牌信息</span>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      landscapeList: []
    };
  },
  mounted() {
    window.onLoad = () => {
      var map = new AMap.Map("map", {
        zoom: 15,
        center: [this.data.location.longitude, this.data.location.latitude],
        //传递后台返回的经纬度
        viewMode: "3D",
        resizeEnable: true
      });
      // 将map对象挂载vm实例上
      this.map = map;
      this.handleChangeList("风景名胜");
    };
    this.$axios({
      url:'/hotels/comments',
    }).then(res=>{
      console.log(res)
    })

    var key = "8b8049fef9a383f206a6b30dea74a052";
    var url = `https://webapi.amap.com/maps?v=1.4.15&key=${key}&callback=onLoad`;
    var jsapi = document.createElement("script");
    jsapi.charset = "utf-8";
    jsapi.src = url;
    document.head.appendChild(jsapi);
  },
  methods: {
    // 根据经纬度计算两地之间的距离

    GetDistance: function(location) {
      var arr = location.split(",");
      var lat2 = arr[1];
      var lng2 = arr[0];
      var lat1 = this.data.location.latitude;
      var lng1 = this.data.location.longitude;
      var radLat1 = (lat1 * Math.PI) / 180.0;
      var radLat2 = (lat2 * Math.PI) / 180.0;
      var a = radLat1 - radLat2;
      var b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
      var s =2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +Math.cos(radLat1) *Math.cos(radLat2) *Math.pow(Math.sin(b / 2), 2)));
      s = s * 6378.137;
      s = Math.round(s * 10000) / 10000;
      s = s.toFixed(2);
      return s;
    },
    // 切换附近列表的方法
    handleChangeList(type) {
      var result = axios({
        url: "https://restapi.amap.com/v3/place/text",
        params: {
          keywords: "",
          city: "南京",
          location:
            this.data.location.longitude + "," + this.data.location.latitude,
          types: type,
          output: "json",
          page: 1,
          offset: 10,
          key: "7354c921b6d83e3a3bd7b8b69f2fc446"
          // key: "79041dfa1c752f49599e2b507c64da42"
        }
      }).then(res => {
        // console.log(res);
        const { pois } = res.data;
        this.landscapeList = pois;
        // console.log(this.landscapeList);
        return pois;
      });
      result.then(res => {
        // 清除点标记
        this.map.remove(this.markerList || []);
        let markerList = [];
        // 自定义图标
        var Icon = new AMap.Icon({
          size: new AMap.Size(25, 34),
          image:
            "//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png",
          imageSize: new AMap.Size(135, 40),
          imageOffset: new AMap.Pixel(-9, -3)
        });
        var marker1 = new AMap.Marker({
          offset: new AMap.Pixel(-10, -10),
          icon: Icon,
          position: new AMap.LngLat(
            this.data.location.longitude,
            this.data.location.latitude
          ), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
        });
        markerList.push(marker1);
        res.forEach((e,i) => {
          var arr = e.location.split(",");
          var lng = parseFloat(arr[0]);
          var lat = parseFloat(arr[1]);
          var marker = new AMap.Marker({
            offset: new AMap.Pixel(-10, -10),
            position: new AMap.LngLat(lng, lat),
             // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            content: `<div style="width:40px; height:40px; background-image: url('https://webapi.amap.com/theme/v1.3/markers/b/mark_b.png') 
            ; background-size: 62%;background-repeat:no-repeat;text-align: center; line-height:20px;">
            <span style="margin-right:13px;font-size:18px;color:white">${i+1}</span></div>`,
          });
          AMap.event.addListener(marker, 'mouseover', ()=> {
          this.map.setCenter([lng, lat]) 
          var infoWindow = new AMap.InfoWindow({
          content: `<p class='input-item'>${e.name}</p></div></div>` 
          });
          infoWindow.open(this.map, marker.getPosition());
          });
          markerList.push(marker);
        });
        // console.log(markerList);
        // 挂载图标列表到vm实例上
        this.markerList = markerList;
        this.map.add(markerList);
        this.map.setCenter([
          this.data.location.longitude,
          this.data.location.latitude
        ]);
        this.appearmessage(this.data.name)
      });
    },
    changeMapCenter(val) {
      var arr = val.location.split(",");
      var lat = parseFloat(arr[1]);
      var lng = parseFloat(arr[0]);
      this.map.setCenter([lng, lat]);
      this.appearmessage(val.name)
    },
    // 弹出相应锚点对应信息弹框的函数
    appearmessage(item){
      var infoWindow = new AMap.InfoWindow({
      content: `<p class='input-item'>${item}</p></div></div>` 
      });

      infoWindow.open(this.map, this.map.getCenter());
    },
    showInfoOver(e){
      console.log(this)
    }

  }
};
</script>
  

<style lang="less" scoped>
.Mapcontainer {
  position: relative;
  font-size: 14px;
  .Map {
    margin-bottom: 30px;
    .mapItems {
      position: absolute;
      top: 0;
      right: 0;
      width: 300px;
      height: 400px;
      line-height: 50px;
      .listTitle {
        height: 50px;
        border-bottom: 1px solid #666;
        span {
          margin-right: 20px;
          cursor: pointer;
          &:hover {
            color: #00a4ff;
          }
        }
      }
      .viewlist {
        height: 350px;
        overflow-y: scroll;
        li {
          height: 50px;
          
        }
      }
    }
  }
  .hotelCons {
    .facility_list {
      line-height: 60px;
      li {
        height: 60px;
        border-bottom: 1px solid #eee;
        span {
          margin-right: 80px;
        }
        &:nth-child(2) {
          i {
            display: inline-block;
            height: 30px;
            line-height: 30px;
            padding: 0 12px;
            margin-right: 30px;
            background-color: #eee;
          }
        }
      }
    }
  }
}
</style>

