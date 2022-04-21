<!-- 懒得重构了 -->
<template>
  <div
    class="box"
    :style="{
      background: `url(${bg}) top no-repeat`,
      backgroundSize: '100% 100%',
    }"
  >
    <div class="box-left">
      <div class="box-left-card">
        <section>
          <div>较上日+ {{ store.chinaAdd.localConfirmH5 }}</div>
          <div>{{ store.chinaTotal.localConfirm }}</div>
          <div>本土现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.nowConfirm }}</div>
          <div>{{ store.chinaTotal.nowConfirm }}</div>
          <div>现有确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.confirm }}</div>
          <div>{{ store.chinaTotal.confirm }}</div>
          <div>累计确诊</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.noInfect }}</div>
          <div>{{ store.chinaTotal.noInfect }}</div>
          <div>无症状感染者</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.importedCase }}</div>
          <div>{{ store.chinaTotal.importedCase }}</div>
          <div>境外输入</div>
        </section>
        <section>
          <div>较上日+ {{ store.chinaAdd.dead }}</div>
          <div>{{ store.chinaTotal.dead }}</div>
          <div>累计死亡</div>
        </section>
      </div>
      <div class="box-left-pie"></div>
      <div class="box-left-line"></div>
    </div>
    <div class="box-center" id="echarts-cont"></div>
    <div class="box-right">
      <div class="table-cont scroll-custom">
        <span>{{ date + "" + currentCity }}</span>
        <table cellspacing="0" border="1">
          <thead>
            <tr>
              <th>地区</th>
              <th>新增确诊</th>
              <th>累计确诊</th>
              <th>治愈</th>
              <th>死亡</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in store.item" :key="index">
              <td align="center">{{ item.name }}</td>
              <td align="center">{{ item.today.confirm }}</td>
              <td align="center">{{ item.total.confirm }}</td>
              <td align="center">{{ item.total.heal }}</td>
              <td align="center">{{ item.total.dead }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "./stores/store";
import * as echarts from "echarts";
import "@/assets/china";
import { geoCoordMap } from "@/assets/mapPosition";
import bg from "@/assets/pc-black.webp";

let store = useStore();
onMounted(async () => {
  await store.getList();
  initEcharts();
});

let currentCity = ref("");
let date = new Date().getMonth() + 1 + "-" + new Date().getDate();

const initEcharts = () => {
  const city = store.list.diseaseh5Shelf.areaTree[0].children;
  store.item = city[2].children;
  currentCity.value = city[2].name;
  const data = city.map((v) => {
    return {
      name: v.name,
      value: geoCoordMap[v.name].concat(v.total.nowConfirm),
      children: v.children,
    };
  });
  const option = {
    geo: {
      map: "china",
      aspectScale: 0.8,
      layoutCenter: ["50%", "50%"],
      layoutSize: "100%",
      itemStyle: {
        // normal: {
        areaColor: {
          type: "linear-gradient",
          x: 0,
          y: 1200,
          x2: 1000,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: "#152E6E", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#ffffff", // 50% 处的颜色
            },
          ],
          global: true, // 缺省为 false
        },
        shadowColor: "#0f5d9d",
        shadowOffsetX: 0,
        shadowOffsetY: 15,
        opacity: 0.5,
        // },
      },
      emphasis: {
        areaColor: "#0f5d9d",
      },
      regions: [
        {
          name: "南海诸岛",
          itemStyle: {
            areaColor: "rgba(0, 10, 52, 1)",
            borderColor: "rgba(0, 10, 52, 1)",
            // normal: {
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            },
            // },
          },
          label: {
            show: false,
            color: "#FFFFFF",
            fontSize: 12,
          },
        },
      ],
    },
    series: [
      {
        type: "map",
        map: "china",
        aspectScale: 0.8,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "100%",
        zoom: 1, //当前视角的缩放比例
        // roam: true, //是否开启平游或缩放
        scaleLimit: {
          //滚轮缩放的极限控制
          min: 1,
          max: 2,
        },
        label: {
          show: true,
          color: "#FFFFFF",
          fontSize: 12,
        },
        itemStyle: {
          // normal: {
          areaColor: "#0c3653",
          borderColor: "#1cccff",
          borderWidth: 1.8,
          // },
        },
        emphasis: {
          areaColor: "#56b1da",
          label: {
            show: false,
            color: "#fff",
          },
        },
        data: data,
      },
      {
        type: "scatter",
        coordinateSystem: "geo",
        //   symbol: 'image://http://ssq168.shupf.cn/data/biaoji.png',
        // symbolSize: [30,120],
        // symbolOffset:[0, '-40%'] ,
        symbol: "pin",
        symbolSize: [45, 45],
        label: {
          // normal: {
          show: true,
          formatter(value: any) {
            return value.data.value[2];
          },
          // },
        },
        itemStyle: {
          // normal: {
          color: "#1E90FF", //标志颜色
          // },
        },
        data: data,
      },
    ],
  };
  const chart = echarts.init(
    document.getElementById("echarts-cont") as HTMLDivElement
  );
  chart.setOption(option);
  chart.on("click", (e: any) => {
    store.item = e.data.children;
    currentCity.value = e.data.name;
  });
};
</script>

<style lang="less">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
html,
body,
#app {
  height: 100%;
}
@itemColor: #41b0db;
@itemBg: #223651;
@itemBorder: #212028;
.box {
  // padding: 1px;
  height: 100%;
  display: flex;
  &-left {
    width: 400px;
    white-space: nowrap;

    &-pie {
      height: 320px;
      margin-top: 20px;
    }
    &-line {
      height: 320px;
      margin-top: 20px;
    }
    &-card {
      top: 15px;
      left: 15px;
      position: absolute;
      display: grid;
      grid-template-columns: auto auto auto;
      grid-template-rows: auto auto;
      section {
        background: @itemBg;
        border: 1px solid @itemBorder;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        div:nth-child(2) {
          color: @itemColor;
          padding: 10px 0;
          font-size: 20px;
          font-weight: bold;
        }
      }
    }
  }
  &-center {
    flex: 1;
    height: 80%;
  }
  &-right {
    width: 400px;
    color: white;
    margin: 20px;

    .table-cont {
      text-align: center;
      max-height: 90vh;
      overflow: auto;
      span {
        display: inline-block;
        margin-bottom: 10px;
      }
      table {
        width: 100%;
        max-height: 80vh;
        overflow: auto;
        background: #212028;
        tr {
          th {
            padding: 5px;
            white-space: nowrap;
          }
          td {
            padding: 5px 10px;
            width: 100px;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
.scroll-custom::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.scroll-custom::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #8d8d9f;
}
.scroll-custom::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  background: #535c68;
}
</style>
