# authority-server

#### 介绍

authority-server是一个使用NestJS框架构建的后台管理的开源项目。NestJS的强大架构和丰富功能，使得本项目具有高效、可扩展、易维护等特点。
本项目利用nest的特性实现了基于rbac架构的权限设计思想，将接口权限，菜单权限分配给角色，不同的角色负责不同的工作。

该项目通过元数据来设置权限标识，在身份验证守卫来验证和权限校验守卫来控制权限，在守卫中获取接口元数据对比角色的权限，从而实现权限控制。


#### 软件架构

一个基于 NestJS + Typeorm + Mysql + Redis 的项目

#### 安装教程

1. 安装依赖

`npm install`

2. 配置数据库

    1. 创建数据库
    2. 执行文件 `doc/数据库基础数据.md` 的基础数据sql命令
    3. 修改app.modules.ts和nest_admin下config的env文件的数据库配置

3. 运行

`npm run start`

热重载运行

`npm run start:dev`

#### 使用

新增模块
   新增模块使用`nest g resource <module-name>`命令创建一个模块，该模块会生成控制器，服务，模块，路由，测试文件，
   如果不想生成测试文件，可以使用`nest g resource <module-name> --no-spec`   
   该项目的权限是通过元数据来控制的，当你编写完接口和服务之后，还需要在你的模块下新增`meta`文件夹，在该文件夹下新增一个index.ts文件，在该文件中定义接口的权限标识，

示例：

```ts
   import { generateBaseMeta } from "src/common/utils/comon"

        export const menusBaseMeta = {
        label: "菜单",
        value: "menus",
        }

        export const customMenusMeta = {
        saveMenu: {
            label: "新增",
            value: "save"
        },
        updateMenu: {
            label: "修改",
            value: "update"
        },
        removeMenu: {
            label: "删除",
            value: "remove"
        },
        queryMenu: {
            label: "查询",
            value: "query"
        },
        }

        export const menusMeta = {
        label: menusBaseMeta.label,
        value: menusBaseMeta.value,
        children: [
            ...generateBaseMeta(menusBaseMeta,Object.values(customMenusMeta)),
        ]
        }
```
并在`common/metaData/permissionMetaData.ts/index.ts`中添加该模块的权限标识

#### 参与贡献

1.  Fork 本仓库
2.  新建 Feat_xxx 分支
3.  提交代码
4.  新建 Pull Request


#### 特技

1.  使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2.  Gitee 官方博客 [blog.gitee.com](https://blog.gitee.com)
3.  你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解 Gitee 上的优秀开源项目
4.  [GVP](https://gitee.com/gvp) 全称是 Gitee 最有价值开源项目，是综合评定出的优秀开源项目
5.  Gitee 官方提供的使用手册 [https://gitee.com/help](https://gitee.com/help)
6.  Gitee 封面人物是一档用来展示 Gitee 会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
