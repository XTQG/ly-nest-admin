import { generateBaseMeta, mergeMeta } from "src/common/utils/comon"

export const userBaseMeta = {
  label: "用户",
  value: "user",
}

export const customUserMeta = {
  menus: {
    label: "菜单",
    value: "menus"
  },
  updateUserRole: {
    label: "设置角色",
    value: "updateRole"
  },
  list: {
    label: "分页列表",
    value: "list"
  },
  permission:{
    label: "权限",
    value: "permission"
  }
}

const children = [
  ...generateBaseMeta(userBaseMeta, Object.values(customUserMeta)),
  ...generateBaseMeta(userBaseMeta)
]

export const userMeta = {
  label: userBaseMeta.label,
  value: userBaseMeta.value,
  // children: Object.values(usersMeta)
  children: mergeMeta(children)
}