/*
SQLyog Ultimate v11.24 (32 bit)
MySQL - 5.7.17-log : Database - nest_admin
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`nest_admin` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `nest_admin`;

/*Table structure for table `dictionary` */

DROP TABLE IF EXISTS `dictionary`;

CREATE TABLE `dictionary` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `create_user` varchar(255) DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(255) DEFAULT NULL COMMENT '更新人',
  `is_deleted` char(1) NOT NULL DEFAULT '0' COMMENT '是否删除: NULL未删除，1删除',
  `name` varchar(255) NOT NULL COMMENT '字典名称',
  `code` varchar(255) NOT NULL COMMENT '字典编码',
  `remark` varchar(255) NOT NULL COMMENT '字典备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `dictionary` */

insert  into `dictionary`(`id`,`createTime`,`update_time`,`create_user`,`update_user`,`is_deleted`,`name`,`code`,`remark`) values (1,'2024-12-07 19:32:52.000000','2024-12-07 19:32:52',NULL,NULL,'0','权限标识','permissionCode','权限标识');

/*Table structure for table `dictionary_options` */

DROP TABLE IF EXISTS `dictionary_options`;

CREATE TABLE `dictionary_options` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `create_user` varchar(255) DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(255) DEFAULT NULL COMMENT '更新人',
  `is_deleted` char(1) NOT NULL DEFAULT '0' COMMENT '是否删除: NULL未删除，1删除',
  `label` varchar(255) NOT NULL COMMENT '键',
  `value` varchar(255) NOT NULL COMMENT '值',
  `remark` varchar(255) DEFAULT NULL COMMENT '字典备注',
  `dictionary_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_5f060db5904a83732aca7c8451c` (`dictionary_id`),
  CONSTRAINT `FK_5f060db5904a83732aca7c8451c` FOREIGN KEY (`dictionary_id`) REFERENCES `dictionary` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `dictionary_options` */

insert  into `dictionary_options`(`id`,`createTime`,`update_time`,`create_user`,`update_user`,`is_deleted`,`label`,`value`,`remark`,`dictionary_id`) values (1,'2024-12-09 20:53:21.692952',NULL,NULL,NULL,'0','add','add',NULL,1);

/*Table structure for table `menu` */

DROP TABLE IF EXISTS `menu`;

CREATE TABLE `menu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL COMMENT '路由名称',
  `path` varchar(255) NOT NULL COMMENT '路由路径',
  `component` varchar(255) DEFAULT NULL COMMENT '路由组件',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `create_user` varchar(255) DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(255) DEFAULT NULL COMMENT '更新人',
  `is_deleted` char(1) NOT NULL DEFAULT '0' COMMENT '是否删除: NULL未删除，1删除',
  `desc` varchar(255) DEFAULT NULL COMMENT '路由描述',
  `redirect` varchar(255) DEFAULT NULL COMMENT '路由重定向',
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `parent_id` bigint(20) DEFAULT NULL COMMENT '父级id',
  `meta_id` bigint(20) NOT NULL,
  `sort` int(11) NOT NULL COMMENT '排序',
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_29df45b522a9d3995c1156fa2c` (`meta_id`),
  KEY `FK_e5e28130fd17f88ab5ee5d3aa4c` (`parent_id`),
  CONSTRAINT `FK_29df45b522a9d3995c1156fa2ca` FOREIGN KEY (`meta_id`) REFERENCES `menu_meta` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_e5e28130fd17f88ab5ee5d3aa4c` FOREIGN KEY (`parent_id`) REFERENCES `menu` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8;

/*Data for the table `menu` */

insert  into `menu`(`id`,`name`,`path`,`component`,`update_time`,`create_user`,`update_user`,`is_deleted`,`desc`,`redirect`,`createTime`,`parent_id`,`meta_id`,`sort`) values (1,'Dashbord','/dashboard','#','2024-12-17 00:06:30',NULL,NULL,'0',NULL,'/dashboard/analysis','2024-12-17 00:06:30.000000',NULL,1,1),(2,'Analysis','analysis','/dashboard/Analysis','2024-12-07 23:31:56',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:31:56.000000',1,2,1),(7,'Workplace','workplace','/dashboard/Workplace','2024-12-07 23:32:00',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:32:00.000000',1,7,2),(8,'Authorization','/authorization','#','2024-12-17 21:30:57',NULL,NULL,'0',NULL,'/authorization/department','2024-12-17 21:30:57.000000',NULL,8,2),(9,'Department','department','/authorization/Department','2024-12-07 23:32:09',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:32:09.000000',8,9,1),(10,'User','user','/authorization/user/User','2024-12-07 23:32:13',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:32:13.000000',8,10,2),(11,'Menu','menu','/authorization/menu/Menu','2024-12-07 23:01:37',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:01:37.000000',8,11,3),(12,'Role','role','/authorization/role/Role','2024-12-07 23:01:40',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:01:40.000000',8,12,4),(13,'System','/system','#','2024-12-07 23:31:31',NULL,NULL,'0',NULL,'/system/log','2024-12-07 23:31:31.000000',NULL,13,3),(14,'Log','log','/system/Log','2024-12-07 23:01:50',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:01:50.000000',13,14,1),(15,'Public ','public','/system/Public','2024-12-07 23:01:53',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:01:53.000000',13,15,2),(16,'Config ','config','/system/Config','2024-12-07 23:01:56',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:01:56.000000',13,16,3),(17,'SystemMonitor','/system-monitor','#','2024-12-17 00:06:25',NULL,NULL,'0',NULL,'/system-monitor/online-user','2024-12-17 00:06:25.000000',NULL,17,4),(18,'OnlineUser','online-user','/systemMonitor/OnlineUser','2024-12-07 23:02:07',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:02:07.000000',17,18,1),(19,'LoginLog ','login-log','/systemMonitor/LoginLog','2024-12-07 23:02:10',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:02:10.000000',17,19,2),(20,'ServiceMonitor ','service-monitor','/systemMonitor/ServiceMonitor','2024-12-07 23:02:13',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:02:13.000000',17,20,3),(55,'test1','/test1','#','2024-12-17 21:24:24',NULL,NULL,'0',NULL,NULL,'2024-12-17 21:24:24.000000',NULL,74,5),(56,'test1-1','test1-1','','2024-12-08 21:22:21',NULL,NULL,'0',NULL,NULL,'2024-12-08 21:22:21.000000',55,75,1),(57,'test1-1-1','test1-1-1','/system/dictionary/Dictionary','2024-12-07 23:02:30',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:02:30.000000',56,76,1),(60,'test1-1-2','test1-1-2','/authorization/menu/Menu','2024-12-07 23:02:33',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:02:33.000000',56,79,2),(61,'Permission','permission','/authorization/permission/Permission','2024-12-07 23:01:46',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:01:46.000000',8,80,5),(62,'Dictionary','dictionary',NULL,'2024-12-08 22:28:41',NULL,NULL,'0',NULL,NULL,'2024-12-08 22:28:41.000000',13,82,4),(68,'DictionaryConfig','dictionaryConfig','/system/dictionary/dictionaryConfig/DictionaryConfig','2024-12-08 22:25:57',NULL,NULL,'0',NULL,NULL,'2024-12-08 22:25:57.000000',62,88,1),(70,'DictionaryOptions','dictionaryOptions','/system/dictionary/dictionaryOptions/DictionaryOptions',NULL,NULL,NULL,'0',NULL,NULL,'2024-12-08 22:22:40.388111',62,90,1);

/*Table structure for table `menu_closure` */

DROP TABLE IF EXISTS `menu_closure`;

CREATE TABLE `menu_closure` (
  `id_ancestor` bigint(20) NOT NULL,
  `id_descendant` bigint(20) NOT NULL,
  PRIMARY KEY (`id_ancestor`,`id_descendant`),
  KEY `IDX_2547be0cdfeccb9221c68976fd` (`id_ancestor`),
  KEY `IDX_6a0038e7e00bb09a06ba3b1131` (`id_descendant`),
  CONSTRAINT `FK_2547be0cdfeccb9221c68976fd7` FOREIGN KEY (`id_ancestor`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  CONSTRAINT `FK_6a0038e7e00bb09a06ba3b11319` FOREIGN KEY (`id_descendant`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `menu_closure` */

insert  into `menu_closure`(`id_ancestor`,`id_descendant`) values (1,1),(1,2),(1,7),(2,2),(7,7),(8,8),(8,9),(8,10),(8,11),(8,12),(8,61),(9,9),(10,10),(11,11),(12,12),(13,13),(13,14),(13,15),(13,16),(13,62),(13,68),(13,70),(14,14),(15,15),(16,16),(17,17),(17,18),(17,19),(17,20),(18,18),(19,19),(20,20),(30,30),(55,55),(55,56),(55,57),(55,60),(56,56),(56,57),(56,60),(57,57),(60,60),(61,61),(62,62),(62,68),(62,70),(68,68),(70,70);

/*Table structure for table `menu_meta` */

DROP TABLE IF EXISTS `menu_meta`;

CREATE TABLE `menu_meta` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT '菜单标题',
  `icon` varchar(255) DEFAULT NULL COMMENT '菜单图标',
  `onCache` tinyint(4) NOT NULL DEFAULT '0' COMMENT '是否不缓存',
  `menuType` varchar(255) NOT NULL COMMENT '菜单类型',
  `hidden` char(1) NOT NULL DEFAULT '0' COMMENT '是否隐藏,1是0否，默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8;

/*Data for the table `menu_meta` */

insert  into `menu_meta`(`id`,`title`,`icon`,`onCache`,`menuType`,`hidden`) values (1,'首页','el:House',0,'catalog','0'),(2,'分析页',NULL,0,'menu','0'),(7,'工作台',NULL,0,'menu','0'),(8,'权限管理','el:SetUp',0,'catalog','0'),(9,'部门管理',NULL,0,'menu','0'),(10,'用户管理',NULL,0,'menu','0'),(11,'菜单管理',NULL,0,'menu','0'),(12,'角色管理',NULL,0,'menu','0'),(13,'系统管理','el:DataLine',0,'catalog','0'),(14,'日志管理',NULL,0,'menu','0'),(15,'通知管理',NULL,0,'menu','0'),(16,'配置管理',NULL,0,'menu','0'),(17,'系统监控','el:Monitor',0,'catalog','0'),(18,'在线用户',NULL,0,'menu','0'),(19,'登录日志',NULL,0,'menu','0'),(20,'服务监控',NULL,0,'menu','0'),(74,'测试一级','',0,'catalog','0'),(75,'测试一级一级','',0,'catalog','0'),(76,'测试一级一级一级','',0,'menu','0'),(79,'测试一级一级二级','',0,'menu','0'),(80,'菜单权限','',0,'menu','0'),(82,'字典管理','',0,'catalog','0'),(88,'字典配置','',0,'menu','0'),(90,'字典数据','',0,'menu','0');

/*Table structure for table `permission` */

DROP TABLE IF EXISTS `permission`;

CREATE TABLE `permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `menu_id` bigint(20) NOT NULL COMMENT '所属菜单的id',
  `label` varchar(255) NOT NULL COMMENT '权限名称',
  `value` varchar(255) NOT NULL COMMENT '权限名称',
  PRIMARY KEY (`id`),
  KEY `FK_b4083bde507bb8b760a2aaf9c08` (`menu_id`),
  CONSTRAINT `FK_b4083bde507bb8b760a2aaf9c08` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=141 DEFAULT CHARSET=utf8;

/*Data for the table `permission` */

insert  into `permission`(`id`,`menu_id`,`label`,`value`) values (93,12,'查找菜单权限','menuPermission'),(94,12,'查找菜单','queryMenu'),(95,12,'角色管理','rolesAdm'),(96,12,'查询角色','queryRole'),(97,12,'新增角色','saveRole'),(98,12,'修改角色','updateRole'),(99,12,'删除角色','removeRole'),(100,11,'菜单管理','menusAdm'),(101,11,'新增菜单','saveMenu'),(102,11,'修改菜单','updateMenu'),(103,11,'查找菜单权限','menuPermission'),(104,11,'查找菜单','queryMenu'),(105,11,'删除菜单','removeMenu'),(106,10,'用户管理','userAdm'),(107,10,'查询用户','queryUser'),(108,10,'新增用户','saveUser'),(109,10,'修改用户','updateUser'),(110,10,'删除用户','removeUser'),(111,10,'修改用户角色','updateUserRole'),(115,61,'查找菜单权限','menuPermission'),(116,61,'查找菜单','queryMenu'),(117,61,'菜单权限管理','menuPermissionAdm'),(118,61,'新增菜单权限','saveMenuPermission'),(119,61,'删除菜单权限','saveMenuPermission');

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `create_user` varchar(255) DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(255) DEFAULT NULL COMMENT '更新人',
  `is_deleted` char(1) NOT NULL DEFAULT '0' COMMENT '是否删除: NULL未删除，1删除',
  `name` varchar(55) NOT NULL COMMENT '角色名称',
  `remark` varchar(100) NOT NULL COMMENT '备注',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

/*Data for the table `role` */

insert  into `role`(`id`,`createTime`,`create_user`,`update_user`,`is_deleted`,`name`,`remark`,`update_time`) values (21,'2024-12-17 00:07:23.000000',NULL,NULL,'0','超级管理员','超级管理员拥有所有权限','2024-12-01 21:26:23');

/*Table structure for table `role_menu_relation` */

DROP TABLE IF EXISTS `role_menu_relation`;

CREATE TABLE `role_menu_relation` (
  `role_id` bigint(20) NOT NULL,
  `menu_id` bigint(20) NOT NULL,
  PRIMARY KEY (`role_id`,`menu_id`),
  KEY `IDX_b81d49ed8ca6f03f339c0e8e6b` (`role_id`),
  KEY `IDX_f46d8eb5359af5f34998b018d8` (`menu_id`),
  CONSTRAINT `FK_b81d49ed8ca6f03f339c0e8e6b8` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_f46d8eb5359af5f34998b018d82` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `role_menu_relation` */

insert  into `role_menu_relation`(`role_id`,`menu_id`) values (21,1),(21,2),(21,7),(21,8),(21,9),(21,10),(21,11),(21,12),(21,14),(21,15),(21,18),(21,19),(21,55),(21,56),(21,57),(21,60),(21,61),(21,62),(21,68),(21,70);

/*Table structure for table `role_permission_permission` */

DROP TABLE IF EXISTS `role_permission_permission`;

CREATE TABLE `role_permission_permission` (
  `roleId` bigint(20) NOT NULL,
  `permissionId` bigint(20) NOT NULL,
  PRIMARY KEY (`roleId`,`permissionId`),
  KEY `IDX_be73ed38a02ea01cef07836835` (`roleId`),
  KEY `IDX_1fff5824ba3354f53d4fae760c` (`permissionId`),
  CONSTRAINT `FK_1fff5824ba3354f53d4fae760c3` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_be73ed38a02ea01cef07836835e` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `role_permission_permission` */

insert  into `role_permission_permission`(`roleId`,`permissionId`) values (21,93),(21,94),(21,95),(21,96),(21,97),(21,98),(21,99),(21,100),(21,101),(21,102),(21,103),(21,104),(21,105),(21,106),(21,107),(21,108),(21,109),(21,110),(21,111),(21,115),(21,116),(21,117),(21,118),(21,119);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `createTime` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `create_user` varchar(255) DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(255) DEFAULT NULL COMMENT '更新人',
  `is_deleted` char(1) NOT NULL DEFAULT '0' COMMENT '是否删除: NULL未删除，1删除',
  `account` varchar(20) NOT NULL COMMENT '账号',
  `update_time` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_4ab2df0a57a74fdf904e0e2708` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4;

/*Data for the table `user` */

insert  into `user`(`id`,`password`,`createTime`,`create_user`,`update_user`,`is_deleted`,`account`,`update_time`) values (6,'$2y$10$eRNe5nKB6LUzTmm2b0z7gOFtZ3oY9VFoHQckJezvZV2RwuKumOFpe','2024-12-02 07:31:03.863954',NULL,NULL,'0','admin',NULL);

/*Table structure for table `user_role_relation` */

DROP TABLE IF EXISTS `user_role_relation`;

CREATE TABLE `user_role_relation` (
  `roleId` bigint(20) NOT NULL,
  `userId` bigint(20) NOT NULL,
  PRIMARY KEY (`roleId`,`userId`),
  KEY `IDX_bed18db98a78c46f0bcfedfe65` (`roleId`),
  KEY `IDX_387a09a362c32ee04b33fc4eaa` (`userId`),
  CONSTRAINT `FK_387a09a362c32ee04b33fc4eaab` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_bed18db98a78c46f0bcfedfe652` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `user_role_relation` */

insert  into `user_role_relation`(`roleId`,`userId`) values (21,6);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
