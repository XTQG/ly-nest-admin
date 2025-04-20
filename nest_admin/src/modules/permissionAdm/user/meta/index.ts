import { generateBaseMeta } from "src/common/utils/comon"

export const userBaseMeta = {
  label: "用户",
  value: "user",
}

export const userMeta = {
  label: userBaseMeta.label,
  value: userBaseMeta.value,
  // children: Object.values(usersMeta)
  children: generateBaseMeta(userBaseMeta)
}