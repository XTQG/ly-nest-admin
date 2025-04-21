import { userMeta } from "src/modules/permissionAdm/user/meta";
import { roleMeta } from "src/modules/permissionAdm/roles/meta";
import { menusMeta } from "src/modules/permissionAdm/menus/meta";

export const permissionAdm = [
  { ...menusMeta },
  { ...roleMeta },
  { ...userMeta },
]
