import { generateBaseMeta, mergeMeta } from "src/common/utils/comon"


export const roleBaseMeta = {
  label: "角色",
  value: "role",
}

export const customRoleMeta = {
  queryRole: {
    label: "查询",
    value: "all"
  },
  saveRolePermission: {
    label: "设置权限",
    value: "permissionSave"
  },
  queryRolePermission: {
    label: "获取权限",
    value: "permissionQuery"
  },
  queryRoleMenu: {
    label: "获取菜单",
    value: "menusQuery"
  },
  addRole: {
    label: "新增",
    value: "add"
  },
  updateRole: {
    label: "修改",
    value: "update"
  }
}

const childrenMeta = [
  ...generateBaseMeta(roleBaseMeta, Object.values(customRoleMeta))
  , ...generateBaseMeta(roleBaseMeta)
]

export const roleMeta = {
  label: roleBaseMeta.label,
  value: roleBaseMeta.value,
  // children: Object.values(usersMeta)
  children: mergeMeta(childrenMeta)
}