import { permissionAdm } from "./permissionAdm"

export const PermissionMetaData = [
  {
    label: "权限管理",
    value: "permissionAdm",
    children: permissionAdm,
  }
]

import { SetMetadata } from '@nestjs/common';

export const PER_META_KEY = 'PER_META_KEY';

export const PermissionMeta = (per) => SetMetadata(PER_META_KEY, per);