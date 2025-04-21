import { generateBaseMeta } from "src/common/utils/comon"

export const menusBaseMeta = {
  label: "菜单",
  value: "menus",
}

export const customMenusMeta = {
  saveMenu: {
    label: "新增",
    value: "save"
  },
  updateMenu: {
    label: "修改",
    value: "update"
  },
  removeMenu: {
    label: "删除",
    value: "remove"
  },
  queryMenu: {
    label: "查询",
    value: "query"
  },
}

export const menusMeta = {
  label: menusBaseMeta.label,
  value: menusBaseMeta.value,
  children: [
    ...generateBaseMeta(menusBaseMeta,Object.values(customMenusMeta)),
  ]
}
