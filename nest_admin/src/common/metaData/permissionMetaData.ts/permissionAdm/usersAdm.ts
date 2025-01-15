export const usersMeta = {
  queryUser: {
    label: "查询用户",
    value: "userAdm:queryUser"
  },
  saveUser: {
    label: "新增用户",
    value: "userAdm:saveUser"
  },
  updateUser: {
    label: "修改用户",
    value: "userAdm:updateUser"
  },
  removeUser: {
    label: "删除用户",
    value: "userAdm:removeUser"
  },
  updateUserRole: {
    label: "修改用户角色",
    value: "userAdm:updateUserRole"
  },
}

export const userAdm = {
  label: "用户管理",
  value: "userAdm",
  children: Object.values(usersMeta)
}