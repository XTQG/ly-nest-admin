
export const menusMeta = {
  saveMenu: {
    label: "新增菜单",
    value: "menusAdm:saveMenu"
  },
  updateMenu: {
    label: "修改菜单",
    value: "menusAdm:updateMenu"
  },
  queryMenu: {
    label: "查找菜单",
    value: "menusAdm:queryMenu"
  },
  removeMenu: {
    label: "删除菜单",
    value: "menusAdm:removeMenu"
  }
}

export const menusAdm = {
  label: "菜单管理",
  value: "menusAdm",
  children: Object.values(menusMeta)
}