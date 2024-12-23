
export const menusMeta = {
  saveMenu: {
    label: "新增菜单",
    value: "saveMenu"
  },
  updateMenu: {
    label: "修改菜单",
    value: "updateMenu"
  },
  queryMenu: {
    label: "查找菜单",
    value: "queryMenu"
  },
  removeMenu: {
    label: "删除菜单",
    value: "removeMenu"
  }
}

export const menusAdm = {
  label: "菜单管理",
  value: "menusAdm",
  children: Object.values(menusMeta)
}