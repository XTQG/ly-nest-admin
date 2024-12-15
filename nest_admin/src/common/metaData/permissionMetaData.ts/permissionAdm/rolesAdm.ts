export const rolesMeta = {
  queryRole: {
    label: "查询角色",
    value: "queryRole"
  },
  saveRole: {
    label: "新增角色",
    value: "saveRole"
  },
  updateRole: {
    label: "修改角色",
    value: "updateRole"
  },
  removeRole: {
    label: "删除角色",
    value: "removeRole"
  }
}

export const rolesAdm = {
  label: "角色管理",
  value: "rolesAdm",
  children: Object.values(rolesMeta)
}