import { getList } from "@/utils/request";
import { defineStore } from "pinia";

import type {
  RootObject,
  Child,
  ChinaTotal,
  ChinaAdd,
  StatisGradeCityDetail,
} from "./types/index";

export const useStore = defineStore({
  id: "store",
  state: () => ({
    list: <RootObject>{},
    item: <any>{},
    chinaAdd: <ChinaAdd>{},
    chinaTotal: <ChinaTotal>{},
    cityDetail: <StatisGradeCityDetail[]>[],
  }),
  getters: {
    doubleCount: (state) => state.list,
  },
  actions: {
    async getList() {
      await getList().then((res) => {
        this.list = res;
        this.chinaAdd = this.list.diseaseh5Shelf.chinaAdd;
        this.chinaTotal = this.list.diseaseh5Shelf.chinaTotal;
      });
    },
  },
});
