export const usersMeta = {
  queryUser: {
    label: "查询用户",
    value: "queryUser"
  },
  saveUser: {
    label: "新增用户",
    value: "saveUser"
  },
  updateUser: {
    label: "修改用户",
    value: "updateUser"
  },
  removeUser: {
    label: "删除用户",
    value: "removeUser"
  },
  updateUserRole: {
    label: "修改用户角色",
    value: "updateUserRole"
  },
}

export const userAdm = {
  label: "用户管理",
  value: "userAdm",
  children: Object.values(usersMeta)
}