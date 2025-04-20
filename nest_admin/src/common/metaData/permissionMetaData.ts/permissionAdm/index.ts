import { userMeta } from "src/modules/permissionAdm/user/meta";
import { menusAdm } from "./menusAdm";
import { rolesAdm } from "./rolesAdm";

export const permissionAdm = [
  { ...menusAdm },
  { ...rolesAdm },
  { ...userMeta },
]
