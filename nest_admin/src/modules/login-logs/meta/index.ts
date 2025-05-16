import { generateBaseMeta, mergeMeta } from "src/common/utils/comon"

export const loginLogBaseMeta = {
  label: "登录日志",
  value: "loginLog",
}

export const customLoginLogMeta = {
  list: {
    label: "列表",
    value: "list",
  },
}

const children = [
  // ...generateBaseMeta(loginLogBaseMeta, Object.values(customLoginLogMeta)),
  ...generateBaseMeta(loginLogBaseMeta)
]

export const loginLogMeta = {
  label: loginLogBaseMeta.label,
  value: loginLogBaseMeta.value,
  // children: Object.values(usersMeta)
  // children: mergeMeta(children)
  children: children
}
