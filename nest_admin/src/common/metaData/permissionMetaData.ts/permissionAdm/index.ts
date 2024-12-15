import { menuPermissionAdm } from "./menuPermissionAdm";
import { menusAdm } from "./menusAdm";
import { rolesAdm } from "./rolesAdm";
import { userAdm } from "./usersAdm";

export const permissionAdm = [
  { ...menusAdm },
  { ...rolesAdm },
  { ...userAdm },
  { ...menuPermissionAdm }
]