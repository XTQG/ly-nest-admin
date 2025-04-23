import { generateBaseMeta, mergeMeta } from "src/common/utils/comon"


export const permissionBaseMeta = {
  label: "权限",
  value: "permission",
}

export const customPermissionMeta = {
  tree: {
    label: "树",
    value: "tree"
  },
  remove: {
    label: "删除",
    value: "remove"
  },
}

const childrenMeta = [
  ...generateBaseMeta(permissionBaseMeta, Object.values(customPermissionMeta))
]

export const permissionMeta = {
  label: permissionBaseMeta.label,
  value: permissionBaseMeta.value,
  // children: Object.values(usersMeta)
  children: mergeMeta(childrenMeta)
}