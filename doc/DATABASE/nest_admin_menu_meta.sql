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
-- Table structure for table `menu_meta`
--

DROP TABLE IF EXISTS `menu_meta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `menu_meta` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT '菜单标题',
  `icon` varchar(255) DEFAULT NULL COMMENT '菜单图标',
  `onCache` tinyint NOT NULL DEFAULT '0' COMMENT '是否不缓存',
  `menuType` varchar(255) NOT NULL COMMENT '菜单类型',
  `hidden` char(1) NOT NULL DEFAULT '0' COMMENT '是否隐藏,1是0否，默认0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_meta`
--

LOCK TABLES `menu_meta` WRITE;
/*!40000 ALTER TABLE `menu_meta` DISABLE KEYS */;
INSERT INTO `menu_meta` VALUES (1,'首页','el:House',0,'catalog','0'),(2,'分析页',NULL,0,'menu','0'),(7,'工作台',NULL,0,'menu','0'),(8,'权限管理','el:SetUp',0,'catalog','0'),(9,'部门管理',NULL,0,'menu','0'),(10,'用户管理',NULL,0,'menu','0'),(11,'菜单管理',NULL,0,'menu','0'),(12,'角色管理',NULL,0,'menu','0'),(13,'系统管理','el:DataLine',0,'catalog','0'),(14,'日志管理',NULL,0,'menu','0'),(15,'通知管理',NULL,0,'menu','0'),(16,'配置管理',NULL,0,'menu','0'),(17,'系统监控','el:Monitor',0,'catalog','0'),(18,'在线用户',NULL,0,'menu','0'),(19,'登录日志',NULL,0,'menu','0'),(20,'服务监控',NULL,0,'menu','0'),(80,'菜单权限','',0,'menu','1'),(82,'字典管理','',0,'catalog','0'),(88,'字典配置','',0,'menu','0'),(90,'字典数据','',0,'menu','0'),(91,'组件示例','',0,'catalog','0'),(92,'表格组件','',0,'menu','0');
/*!40000 ALTER TABLE `menu_meta` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-17 16:18:08
