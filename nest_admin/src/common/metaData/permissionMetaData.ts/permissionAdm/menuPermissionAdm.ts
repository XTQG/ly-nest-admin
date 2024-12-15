export const permissionMeta = {
  savePermission: {
    label: "新增菜单权限",
    value: "saveMenuPermission"
  },
  removePermission: {
    label: "删除菜单权限",
    value: "saveMenuPermission"
  },
}

export const menuPermissionAdm = {
  label: "菜单权限管理",
  value: "menuPermissionAdm",
  children: Object.values(permissionMeta)
}