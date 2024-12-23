export const rolePermissionMeta = {
  savePermission: {
    label: "新增菜单权限",
    value: "saveMenuPermission"
  },
  removePermission: {
    label: "删除菜单权限",
    value: "removeMenuPermission"
  },
}

export const rolePermissionAdm = {
  label: "菜单权限管理",
  value: "menuPermissionAdm",
  children: Object.values(rolePermissionMeta)
}