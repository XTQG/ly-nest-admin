-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: nest_admin
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `menu`
--

DROP TABLE IF EXISTS `menu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu` (
  `id` bigint NOT NULL AUTO_INCREMENT,
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
  `parent_id` bigint DEFAULT NULL COMMENT '父级id',
  `meta_id` bigint NOT NULL,
  `sort` int NOT NULL COMMENT '排序',
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_29df45b522a9d3995c1156fa2c` (`meta_id`),
  KEY `FK_e5e28130fd17f88ab5ee5d3aa4c` (`parent_id`),
  CONSTRAINT `FK_29df45b522a9d3995c1156fa2ca` FOREIGN KEY (`meta_id`) REFERENCES `menu_meta` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_e5e28130fd17f88ab5ee5d3aa4c` FOREIGN KEY (`parent_id`) REFERENCES `menu` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu`
--

LOCK TABLES `menu` WRITE;
/*!40000 ALTER TABLE `menu` DISABLE KEYS */;
INSERT INTO `menu` VALUES (1,'Dashbord','/dashboard','#','2024-12-17 00:06:30',NULL,NULL,'0',NULL,'/dashboard/analysis','2024-12-17 00:06:30.000000',NULL,1,1),(2,'Analysis','analysis','/dashboard/Analysis','2024-12-07 23:31:56',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:31:56.000000',1,2,1),(7,'Workplace','workplace','/dashboard/Workplace','2024-12-07 23:32:00',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:32:00.000000',1,7,2),(8,'Authorization','/authorization','#','2024-12-17 21:30:57',NULL,NULL,'0',NULL,'/authorization/department','2024-12-17 21:30:57.000000',NULL,8,2),(9,'Department','department','/authorization/Department','2024-12-07 23:32:09',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:32:09.000000',8,9,1),(10,'User','user','/authorization/user/User','2024-12-07 23:32:13',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:32:13.000000',8,10,2),(11,'Menu','menu','/authorization/menu/Menu','2024-12-07 23:01:37',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:01:37.000000',8,11,3),(12,'Role','role','/authorization/role/Role','2024-12-07 23:01:40',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:01:40.000000',8,12,4),(13,'System','/system','#','2024-12-07 23:31:31',NULL,NULL,'0',NULL,'/system/log','2024-12-07 23:31:31.000000',NULL,13,3),(14,'Log','log','/system/Log','2024-12-07 23:01:50',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:01:50.000000',13,14,1),(15,'Public ','public','/system/Public','2024-12-07 23:01:53',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:01:53.000000',13,15,2),(16,'Config ','config','/system/Config','2024-12-07 23:01:56',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:01:56.000000',13,16,3),(17,'SystemMonitor','/system-monitor','#','2024-12-17 00:06:25',NULL,NULL,'0',NULL,'/system-monitor/online-user','2024-12-17 00:06:25.000000',NULL,17,4),(18,'OnlineUser','online-user','/systemMonitor/OnlineUser','2024-12-07 23:02:07',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:02:07.000000',17,18,1),(19,'LoginLog ','login-log','/systemMonitor/LoginLog','2024-12-07 23:02:10',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:02:10.000000',17,19,2),(20,'ServiceMonitor ','service-monitor','/systemMonitor/ServiceMonitor','2024-12-07 23:02:13',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:02:13.000000',17,20,3),(61,'Permission','permission','/authorization/permission/Permission','2024-12-07 23:01:46',NULL,NULL,'0',NULL,NULL,'2024-12-07 23:01:46.000000',8,80,5),(62,'Dictionary','dictionary',NULL,'2024-12-08 22:28:41',NULL,NULL,'0',NULL,NULL,'2024-12-08 22:28:41.000000',13,82,4),(68,'DictionaryConfig','dictionaryConfig','/system/dictionary/dictionaryConfig/DictionaryConfig','2024-12-08 22:25:57',NULL,NULL,'0',NULL,NULL,'2024-12-08 22:25:57.000000',62,88,1),(70,'DictionaryOptions','dictionaryOptions','/system/dictionary/dictionaryOptions/DictionaryOptions',NULL,NULL,NULL,'0',NULL,NULL,'2024-12-08 22:22:40.388111',62,90,1),(71,'componentsDemo','/componentsDemo','#',NULL,NULL,NULL,'0',NULL,NULL,'2025-01-17 14:15:02.132177',NULL,91,0),(72,'table','table','/componentsDemo/table/Table',NULL,NULL,NULL,'0',NULL,NULL,'2025-01-17 14:18:58.721873',71,92,0);
/*!40000 ALTER TABLE `menu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-17 16:18:09
