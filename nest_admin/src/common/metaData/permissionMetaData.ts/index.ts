import { permissionAdm } from "./permissionAdm"
import { systemMonitor } from "./systemMonitor";
export const PermissionMetaData = [
  {
    label: "权限管理",
    value: "permissionAdm",
    children: permissionAdm,
  },
  {
    label: "系统监控",
    value: "systemMonitor",
    children: systemMonitor
  }
]

import { SetMetadata } from '@nestjs/common';


export const PER_META_KEY = 'PER_META_KEY';

export const PermissionMeta = (per) => SetMetadata(PER_META_KEY, per);


export const PER_PUBLIC_KEY = 'PER_PUBLIC_KEY';
// 这个是给已经登录的用户通行的
export const PerPublic = () => SetMetadata(PER_PUBLIC_KEY, true);