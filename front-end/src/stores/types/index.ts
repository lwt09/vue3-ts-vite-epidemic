export interface ShowAddSwitch {
  suspect: boolean;
  heal: boolean;
  importedCase: boolean;
  localConfirm: boolean;
  localinfeciton: boolean;
  confirm: boolean;
  dead: boolean;
  nowConfirm: boolean;
  nowSevere: boolean;
  noInfect: boolean;
  all: boolean;
}

export interface Today {
  confirm: number;
  isUpdated: boolean;
}

export interface Total {
  continueDayZeroLocalConfirmAdd: number;
  nowConfirm: number;
  confirm: number;
  showRate: boolean;
  heal: number;
  dead: number;
  highRiskAreaNum: number;
  mtime: string;
  wzz: number;
  adcode: string;
  mediumRiskAreaNum: number;
  continueDayZeroLocalConfirm: number;
  showHeal: boolean;
  provinceLocalConfirm: number;
}

export interface Today2 {
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
}

export interface Total2 {
  mediumRiskAreaNum: number;
  continueDayZeroLocalConfirmAdd: number;
  mtime: string;
  nowConfirm: number;
  showHeal: boolean;
  adcode: string;
  highRiskAreaNum: number;
  heal: number;
  wzz: number;
  provinceLocalConfirm: number;
  showRate: boolean;
  confirm: number;
  dead: number;
  continueDayZeroLocalConfirm: number;
  grade: string;
}

export interface Child2 {
  name: string;
  today: Today2;
  total: Total2;
}

export interface Today3 {
  tip: string;
  wzz_add: number;
  confirm: number;
  confirmCuts: number;
  isUpdated: boolean;
}

export interface Total3 {
  showHeal: boolean;
  wzz: number;
  mediumRiskAreaNum: number;
  continueDayZeroLocalConfirmAdd: number;
  nowConfirm: number;
  adcode: string;
  mtime: string;
  dead: number;
  showRate: boolean;
  confirm: number;
  provinceLocalConfirm: number;
  highRiskAreaNum: number;
  continueDayZeroLocalConfirm: number;
  heal: number;
}

export interface Child {
  children: Child2[];
  name: string;
  today: Today3;
  total: Total3;
}

export interface AreaTree {
  name: string;
  today: Today;
  total: Total;
  children: Child[];
}

export interface ChinaTotal {
  dead: number;
  importedCase: number;
  showlocalinfeciton: number;
  heal: number;
  suspect: number;
  showLocalConfirm: number;
  confirm: number;
  local_acc_confirm: number;
  nowConfirm: number;
  nowSevere: number;
  noInfect: number;
  localConfirm: number;
  noInfectH5: number;
  localConfirmH5: number;
}

export interface ChinaAdd {
  noInfect: number;
  noInfectH5: number;
  heal: number;
  nowConfirm: number;
  nowSevere: number;
  importedCase: number;
  localConfirm: number;
  localConfirmH5: number;
  confirm: number;
  dead: number;
  suspect: number;
}

export interface Diseaseh5Shelf {
  isShowAdd: boolean;
  showAddSwitch: ShowAddSwitch;
  areaTree: AreaTree[];
  lastUpdateTime: string;
  chinaTotal: ChinaTotal;
  chinaAdd: ChinaAdd;
}

export interface StatisGradeCityDetail {
  date: string;
  sdate: string;
  syear: number;
  city: string;
  confirmAdd: number;
  confirm: number;
  heal: number;
  grade: string;
  province: string;
  nowConfirm: number;
  dead: number;
}

export interface RootObject {
  diseaseh5Shelf: Diseaseh5Shelf;
  statisGradeCityDetail: StatisGradeCityDetail[];
}
