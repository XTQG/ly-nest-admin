export const rolesMeta = {
  queryRole: {
    label: "查询角色",
    value: "rolesAdm:queryRole"
  },
  saveRole: {
    label: "新增角色",
    value: "rolesAdm:saveRole"
  },
  updateRole: {
    label: "修改角色",
    value: "rolesAdm:updateRole"
  },
  removeRole: {
    label: "删除角色",
    value: "rolesAdm:removeRole"
  },
  saveRolePermission: {
    label: "设置角色权限",
    value: "rolesAdm:saveRolePermission"
  },
  queryRolePermission: {
    label: "获取角色权限",
    value: "rolesAdm:queryRolePermission"
  },
  queryRoleMenu: {
    label: "获取角色菜单",
    value: "rolesAdm:queryRoleMenu"
  },
}

export const rolesAdm = {
  label: "角色管理",
  value: "rolesAdm",
  children: Object.values(rolesMeta)
}