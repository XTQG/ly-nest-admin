/*
 Navicat Premium Dump SQL

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80040 (8.0.40)
 Source Host           : localhost:3306
 Source Schema         : nest_admin

 Target Server Type    : MySQL
 Target Server Version : 80040 (8.0.40)
 File Encoding         : 65001

 Date: 16/05/2025 11:10:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for dictionary
-- ----------------------------
DROP TABLE IF EXISTS `dictionary`;
CREATE TABLE `dictionary`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `create_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '更新人',
  `is_deleted` char(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '0' COMMENT '是否删除: NULL未删除，1删除',
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '字典名称',
  `code` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '字典编码',
  `remark` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '字典备注',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dictionary
-- ----------------------------
INSERT INTO `dictionary` VALUES (1, '2024-12-07 19:32:52', '2024-12-07 19:32:52', NULL, NULL, '0', '权限标识', 'permissionCode', '权限标识');

-- ----------------------------
-- Table structure for dictionary_options
-- ----------------------------
DROP TABLE IF EXISTS `dictionary_options`;
CREATE TABLE `dictionary_options`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `create_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '更新人',
  `is_deleted` char(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '0' COMMENT '是否删除: NULL未删除，1删除',
  `label` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '键',
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '值',
  `remark` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '字典备注',
  `dictionary_id` bigint NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_5f060db5904a83732aca7c8451c`(`dictionary_id` ASC) USING BTREE,
  CONSTRAINT `FK_5f060db5904a83732aca7c8451c` FOREIGN KEY (`dictionary_id`) REFERENCES `dictionary` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dictionary_options
-- ----------------------------
INSERT INTO `dictionary_options` VALUES (1, '2024-12-09 20:53:22', NULL, NULL, NULL, '0', 'add', 'add', NULL, 1);

-- ----------------------------
-- Table structure for login_logs
-- ----------------------------
DROP TABLE IF EXISTS `login_logs`;
CREATE TABLE `login_logs`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `create_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '更新人',
  `is_deleted` char(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '0' COMMENT '是否删除: NULL未删除，1删除',
  `account` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '登录账号',
  `ip` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'ip地址',
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '登录地点',
  `browser` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '浏览器类型',
  `os` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '操作系统',
  `isSuccess` int NULL DEFAULT NULL COMMENT '是否登录成功',
  `msg` varchar(500) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '登录成功' COMMENT '提示消息',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 90 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of login_logs
-- ----------------------------
INSERT INTO `login_logs` VALUES (1, '2025-04-21 22:41:12', NULL, NULL, NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (2, '2025-04-21 22:43:04', NULL, NULL, NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (3, '2025-04-21 22:44:49', NULL, NULL, NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (4, '2025-04-21 22:45:08', NULL, NULL, NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (5, '2025-04-21 22:45:13', NULL, NULL, NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (6, '2025-04-21 22:45:22', NULL, NULL, NULL, '0', 'admin111', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (7, '2025-04-21 22:45:42', NULL, NULL, NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (8, '2025-04-21 22:45:49', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (9, '2025-04-21 22:46:41', NULL, NULL, NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 0, '密码错误');
INSERT INTO `login_logs` VALUES (10, '2025-04-21 22:48:02', NULL, NULL, NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (11, '2025-04-21 22:48:08', NULL, NULL, NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 0, '密码错误');
INSERT INTO `login_logs` VALUES (12, '2025-04-21 22:48:24', NULL, NULL, NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (13, '2025-04-21 22:48:32', NULL, NULL, NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 0, '密码错误');
INSERT INTO `login_logs` VALUES (14, '2025-04-21 22:49:32', NULL, NULL, NULL, '0', 'admin11', '::1', '本地', 'Chrome', 'Windows', 0, '用户不存在');
INSERT INTO `login_logs` VALUES (15, '2025-04-21 22:49:45', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (16, '2025-04-22 16:05:29', NULL, '28', NULL, '0', 'user19', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (17, '2025-04-22 19:01:45', NULL, NULL, NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 0, '密码错误');
INSERT INTO `login_logs` VALUES (18, '2025-04-22 19:02:21', NULL, NULL, NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 0, '密码错误');
INSERT INTO `login_logs` VALUES (19, '2025-04-22 19:02:31', NULL, NULL, NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 0, '密码错误');
INSERT INTO `login_logs` VALUES (20, '2025-04-22 19:02:39', NULL, NULL, NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 0, '密码错误');
INSERT INTO `login_logs` VALUES (21, '2025-04-22 19:02:53', NULL, NULL, NULL, '0', '111', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (22, '2025-04-22 19:03:24', NULL, NULL, NULL, '0', 'user1121', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (23, '2025-04-22 19:03:28', NULL, NULL, NULL, '0', 'user1121', '::1', '本地', 'Chrome', 'Windows', 0, '密码错误');
INSERT INTO `login_logs` VALUES (24, '2025-04-22 19:04:10', NULL, NULL, NULL, '0', 'user1121', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (25, '2025-04-22 19:04:15', NULL, NULL, NULL, '0', 'user1121', '::1', '本地', 'Chrome', 'Windows', 0, '密码错误');
INSERT INTO `login_logs` VALUES (26, '2025-04-22 19:04:23', NULL, NULL, NULL, '0', 'user1121', '::1', '本地', 'Chrome', 'Windows', 0, '密码不能为空');
INSERT INTO `login_logs` VALUES (27, '2025-04-22 19:04:41', NULL, NULL, NULL, '0', 'user1121', '::1', '本地', 'Chrome', 'Windows', 0, '密码错误');
INSERT INTO `login_logs` VALUES (28, '2025-04-22 19:04:57', NULL, '10', NULL, '0', 'user2', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (29, '2025-04-22 19:05:16', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (30, '2025-04-22 19:05:44', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (31, '2025-04-22 19:19:09', NULL, '10', NULL, '0', 'user2', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (32, '2025-04-22 19:19:32', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (33, '2025-04-22 20:26:12', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (34, '2025-04-22 20:49:16', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (35, '2025-04-22 20:50:19', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (36, '2025-04-22 20:55:57', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (37, '2025-04-22 20:58:54', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (38, '2025-04-22 21:06:07', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (39, '2025-04-22 22:41:22', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (40, '2025-04-22 22:42:12', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (41, '2025-04-22 22:47:12', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (42, '2025-04-23 09:48:31', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (43, '2025-04-23 09:58:44', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (44, '2025-04-23 12:38:13', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (45, '2025-04-23 12:44:28', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (46, '2025-04-23 12:45:47', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (47, '2025-04-23 12:46:37', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (48, '2025-04-23 14:29:47', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (49, '2025-04-23 14:31:04', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (50, '2025-04-23 14:55:03', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (51, '2025-04-23 14:58:52', NULL, NULL, NULL, '0', 'user1121', '::1', '本地', 'Chrome', 'Windows', 0, '密码错误');
INSERT INTO `login_logs` VALUES (52, '2025-04-23 14:58:58', NULL, NULL, NULL, '0', 'user1121', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (53, '2025-04-23 14:59:06', NULL, NULL, NULL, '0', 'user2', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (54, '2025-04-23 14:59:11', NULL, '10', NULL, '0', 'user2', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (55, '2025-04-23 14:59:50', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (56, '2025-04-23 16:11:00', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (57, '2025-04-23 16:46:26', NULL, '12', NULL, '0', 'user4', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (58, '2025-04-23 17:47:43', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (59, '2025-04-23 17:48:10', NULL, '9', NULL, '0', 'user1', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (60, '2025-04-23 17:49:22', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (61, '2025-04-23 17:50:02', NULL, '9', NULL, '0', 'user1', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (62, '2025-04-23 17:51:02', NULL, '6', NULL, '0', 'admin', '::ffff:127.0.0.1', NULL, 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (63, '2025-04-23 17:51:09', NULL, '6', NULL, '0', 'admin', '::ffff:127.0.0.1', NULL, 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (64, '2025-04-23 17:51:19', NULL, '6', NULL, '0', 'admin', '::ffff:127.0.0.1', NULL, 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (65, '2025-04-23 17:52:45', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (66, '2025-04-23 17:53:28', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (67, '2025-04-23 17:54:11', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (68, '2025-04-23 17:54:45', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (69, '2025-04-23 17:55:00', NULL, '12', NULL, '0', 'user4', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (70, '2025-04-23 17:55:10', NULL, NULL, NULL, '0', 'user4', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (71, '2025-04-23 17:55:10', NULL, NULL, NULL, '0', 'user4', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (72, '2025-04-23 17:55:18', NULL, '12', NULL, '0', 'user4', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (73, '2025-04-23 17:55:33', NULL, NULL, NULL, '0', 'user4', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (74, '2025-04-23 17:55:39', NULL, '12', NULL, '0', 'user4', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (75, '2025-04-23 17:58:00', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (76, '2025-04-23 17:58:16', NULL, '12', NULL, '0', 'user4', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (77, '2025-04-23 18:00:01', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (78, '2025-04-23 18:00:07', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (79, '2025-04-23 18:00:17', NULL, '12', NULL, '0', 'user4', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (80, '2025-04-23 18:00:30', NULL, '12', NULL, '0', 'user4', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (81, '2025-04-23 18:00:33', NULL, NULL, NULL, '0', 'user4', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (82, '2025-04-23 18:00:34', NULL, NULL, NULL, '0', 'user4', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (83, '2025-04-23 18:00:35', NULL, NULL, NULL, '0', 'user4', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (84, '2025-04-23 18:00:40', NULL, '12', NULL, '0', 'user4', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (85, '2025-04-23 18:02:30', NULL, NULL, NULL, '0', 'user4', '::1', '本地', 'Chrome', 'Windows', 0, '验证码错误');
INSERT INTO `login_logs` VALUES (86, '2025-04-23 18:02:37', NULL, '12', NULL, '0', 'user4', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (87, '2025-04-23 18:02:44', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (88, '2025-04-23 18:08:08', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');
INSERT INTO `login_logs` VALUES (89, '2025-05-16 09:19:09', NULL, '6', NULL, '0', 'admin', '::1', '本地', 'Chrome', 'Windows', 1, '登录成功');

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '路由名称',
  `path` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '路由路径',
  `component` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '路由组件',
  `update_time` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `create_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '更新人',
  `is_deleted` char(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '0' COMMENT '是否删除: NULL未删除，1删除',
  `desc` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '路由描述',
  `redirect` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '路由重定向',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `parent_id` bigint NULL DEFAULT NULL COMMENT '父级id',
  `meta_id` bigint NOT NULL,
  `sort` int NOT NULL DEFAULT 0 COMMENT '排序',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `REL_29df45b522a9d3995c1156fa2c`(`meta_id` ASC) USING BTREE,
  INDEX `FK_e5e28130fd17f88ab5ee5d3aa4c`(`parent_id` ASC) USING BTREE,
  CONSTRAINT `FK_29df45b522a9d3995c1156fa2ca` FOREIGN KEY (`meta_id`) REFERENCES `menu_meta` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_e5e28130fd17f88ab5ee5d3aa4c` FOREIGN KEY (`parent_id`) REFERENCES `menu` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 79 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES (1, 'Dashbord', '/dashboard', '#', '2025-03-30 12:23:04', NULL, NULL, '0', NULL, '/dashboard/analysis', '2025-01-14 21:38:49', NULL, 1, 0);
INSERT INTO `menu` VALUES (2, 'Analysis', 'analysis', '/admin/dashboard/Analysis', '2025-04-23 15:13:50', NULL, NULL, '0', NULL, NULL, '2024-12-07 23:31:56', 1, 2, 3);
INSERT INTO `menu` VALUES (7, 'Workplace', 'workplace', '/admin/dashboard/Workplace', '2025-04-11 17:55:50', NULL, NULL, '0', NULL, NULL, '2024-12-07 23:32:00', 1, 7, 2);
INSERT INTO `menu` VALUES (8, 'Authorization', '/authorization', '#', '2025-04-23 16:11:51', NULL, NULL, '0', NULL, '/authorization/department', '2024-12-17 21:30:57', NULL, 8, 1);
INSERT INTO `menu` VALUES (9, 'Department', 'department', '/admin/authorization/Department', '2025-04-23 16:15:52', NULL, NULL, '0', NULL, NULL, '2024-12-07 23:32:09', 8, 9, 15);
INSERT INTO `menu` VALUES (10, 'User', 'user', '/admin/authorization/user/User', '2025-04-23 16:14:58', NULL, NULL, '0', NULL, NULL, '2024-12-07 23:32:13', 8, 10, 11);
INSERT INTO `menu` VALUES (11, 'Menu', 'menu', '/admin/authorization/menu/Menu', '2025-04-23 16:15:29', NULL, NULL, '0', NULL, NULL, '2024-12-07 23:01:37', 8, 11, 12);
INSERT INTO `menu` VALUES (12, 'Role', 'role', '/admin/authorization/role/Role', '2025-04-23 16:15:10', NULL, NULL, '0', NULL, NULL, '2024-12-07 23:01:40', 8, 12, 13);
INSERT INTO `menu` VALUES (13, 'System', '/system', '#', '2025-04-23 16:11:54', NULL, NULL, '0', NULL, '/system/log', '2024-12-07 23:31:31', NULL, 13, 2);
INSERT INTO `menu` VALUES (14, 'Log', 'log', '/admin/system/Log', '2025-04-23 22:00:08', NULL, NULL, '0', NULL, NULL, '2024-12-07 23:01:50', 13, 14, 22);
INSERT INTO `menu` VALUES (15, 'Public', 'public', '/admin/system/Public', '2025-04-23 22:11:17', NULL, NULL, '0', NULL, NULL, '2024-12-07 23:01:53', 13, 15, 24);
INSERT INTO `menu` VALUES (16, 'Config', 'config', '/admin/system/Config', '2025-04-23 22:07:02', NULL, NULL, '0', NULL, NULL, '2024-12-07 23:01:56', 13, 16, 23);
INSERT INTO `menu` VALUES (17, 'SystemMonitor', '/system-monitor', '#', '2025-04-23 22:15:57', NULL, NULL, '0', NULL, '/system-monitor/online-user', '2024-12-17 00:06:25', NULL, 17, 3);
INSERT INTO `menu` VALUES (19, 'LoginLog', 'loginLog', '/admin/systemMonitor/LoginLog', '2025-04-23 22:11:39', NULL, NULL, '0', NULL, NULL, '2024-12-07 23:02:10', 17, 19, 31);
INSERT INTO `menu` VALUES (20, 'ServiceMonitor', 'service-monitor', '/admin/systemMonitor/ServiceMonitor', '2025-04-23 22:12:08', NULL, NULL, '0', NULL, NULL, '2024-12-07 23:02:13', 17, 20, 32);
INSERT INTO `menu` VALUES (61, 'Permission', 'permission', '/admin/authorization/permission/Permission', '2025-04-23 16:15:40', NULL, NULL, '0', NULL, NULL, '2024-12-07 23:01:46', 8, 80, 14);
INSERT INTO `menu` VALUES (62, 'Dictionary', 'dictionary', NULL, '2025-04-23 22:38:51', NULL, NULL, '0', NULL, NULL, '2024-12-08 22:28:41', 13, 82, 21);
INSERT INTO `menu` VALUES (68, 'DictionaryConfig', 'dictionaryConfig', '/admin/system/dictionary/dictionaryConfig/DictionaryConfig', '2025-04-23 16:19:27', NULL, NULL, '0', NULL, NULL, '2024-12-08 22:25:57', 62, 88, 211);
INSERT INTO `menu` VALUES (70, 'DictionaryOptions', 'dictionaryOptions', '/admin/system/dictionary/dictionaryOptions/DictionaryOptions', '2025-04-23 16:19:34', NULL, NULL, '0', NULL, NULL, '2024-12-08 22:22:40', 62, 90, 212);
INSERT INTO `menu` VALUES (74, 'componentDemo', '/componentDemo', '#', '2025-04-23 16:12:01', NULL, NULL, '0', NULL, '', '2025-04-11 19:50:43', NULL, 94, 4);
INSERT INTO `menu` VALUES (75, 'table', 'table', '/admin/componentsDemo/table/Table', '2025-04-23 16:13:39', NULL, NULL, '0', NULL, '', '2025-04-11 19:51:33', 74, 95, 41);
INSERT INTO `menu` VALUES (78, 'editor', 'editor', '/admin/componentsDemo/editor/Editor', NULL, NULL, NULL, '0', NULL, '', '2025-04-29 16:39:33', 74, 98, 52);

-- ----------------------------
-- Table structure for menu_closure
-- ----------------------------
DROP TABLE IF EXISTS `menu_closure`;
CREATE TABLE `menu_closure`  (
  `id_ancestor` bigint NOT NULL,
  `id_descendant` bigint NOT NULL,
  PRIMARY KEY (`id_ancestor`, `id_descendant`) USING BTREE,
  INDEX `IDX_2547be0cdfeccb9221c68976fd`(`id_ancestor` ASC) USING BTREE,
  INDEX `IDX_6a0038e7e00bb09a06ba3b1131`(`id_descendant` ASC) USING BTREE,
  CONSTRAINT `FK_2547be0cdfeccb9221c68976fd7` FOREIGN KEY (`id_ancestor`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_6a0038e7e00bb09a06ba3b11319` FOREIGN KEY (`id_descendant`) REFERENCES `menu` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu_closure
-- ----------------------------
INSERT INTO `menu_closure` VALUES (1, 1);
INSERT INTO `menu_closure` VALUES (1, 2);
INSERT INTO `menu_closure` VALUES (1, 7);
INSERT INTO `menu_closure` VALUES (2, 2);
INSERT INTO `menu_closure` VALUES (7, 7);
INSERT INTO `menu_closure` VALUES (8, 8);
INSERT INTO `menu_closure` VALUES (8, 9);
INSERT INTO `menu_closure` VALUES (8, 10);
INSERT INTO `menu_closure` VALUES (8, 11);
INSERT INTO `menu_closure` VALUES (8, 12);
INSERT INTO `menu_closure` VALUES (8, 61);
INSERT INTO `menu_closure` VALUES (9, 9);
INSERT INTO `menu_closure` VALUES (10, 10);
INSERT INTO `menu_closure` VALUES (11, 11);
INSERT INTO `menu_closure` VALUES (12, 12);
INSERT INTO `menu_closure` VALUES (13, 13);
INSERT INTO `menu_closure` VALUES (13, 14);
INSERT INTO `menu_closure` VALUES (13, 15);
INSERT INTO `menu_closure` VALUES (13, 16);
INSERT INTO `menu_closure` VALUES (13, 62);
INSERT INTO `menu_closure` VALUES (13, 68);
INSERT INTO `menu_closure` VALUES (13, 70);
INSERT INTO `menu_closure` VALUES (14, 14);
INSERT INTO `menu_closure` VALUES (15, 15);
INSERT INTO `menu_closure` VALUES (16, 16);
INSERT INTO `menu_closure` VALUES (17, 17);
INSERT INTO `menu_closure` VALUES (17, 19);
INSERT INTO `menu_closure` VALUES (17, 20);
INSERT INTO `menu_closure` VALUES (19, 19);
INSERT INTO `menu_closure` VALUES (20, 20);
INSERT INTO `menu_closure` VALUES (30, 30);
INSERT INTO `menu_closure` VALUES (61, 61);
INSERT INTO `menu_closure` VALUES (62, 62);
INSERT INTO `menu_closure` VALUES (62, 68);
INSERT INTO `menu_closure` VALUES (62, 70);
INSERT INTO `menu_closure` VALUES (68, 68);
INSERT INTO `menu_closure` VALUES (70, 70);
INSERT INTO `menu_closure` VALUES (74, 74);
INSERT INTO `menu_closure` VALUES (74, 75);
INSERT INTO `menu_closure` VALUES (74, 78);
INSERT INTO `menu_closure` VALUES (75, 75);
INSERT INTO `menu_closure` VALUES (78, 78);

-- ----------------------------
-- Table structure for menu_meta
-- ----------------------------
DROP TABLE IF EXISTS `menu_meta`;
CREATE TABLE `menu_meta`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '菜单标题',
  `icon` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '菜单图标',
  `onCache` tinyint NOT NULL DEFAULT 0 COMMENT '是否不缓存',
  `menuType` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '菜单类型',
  `hidden` char(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '0' COMMENT '是否隐藏,1是0否，默认0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 99 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu_meta
-- ----------------------------
INSERT INTO `menu_meta` VALUES (1, '首页', 'el:House', 0, 'catalog', '0');
INSERT INTO `menu_meta` VALUES (2, '分析页', NULL, 0, 'menu', '0');
INSERT INTO `menu_meta` VALUES (7, '工作台', NULL, 0, 'menu', '0');
INSERT INTO `menu_meta` VALUES (8, '权限管理', 'el:SetUp', 0, 'catalog', '0');
INSERT INTO `menu_meta` VALUES (9, '部门管理', NULL, 0, 'menu', '1');
INSERT INTO `menu_meta` VALUES (10, '用户管理', NULL, 0, 'menu', '0');
INSERT INTO `menu_meta` VALUES (11, '菜单管理', NULL, 0, 'menu', '0');
INSERT INTO `menu_meta` VALUES (12, '角色管理', NULL, 0, 'menu', '0');
INSERT INTO `menu_meta` VALUES (13, '系统管理', 'el:DataLine', 0, 'catalog', '0');
INSERT INTO `menu_meta` VALUES (14, '日志管理', NULL, 0, 'menu', '0');
INSERT INTO `menu_meta` VALUES (15, '通知管理', NULL, 0, 'menu', '0');
INSERT INTO `menu_meta` VALUES (16, '配置管理', NULL, 0, 'menu', '0');
INSERT INTO `menu_meta` VALUES (17, '系统监控', 'el:Monitor', 0, 'catalog', '0');
INSERT INTO `menu_meta` VALUES (19, '登录日志', NULL, 0, 'menu', '0');
INSERT INTO `menu_meta` VALUES (20, '服务监控', NULL, 0, 'menu', '0');
INSERT INTO `menu_meta` VALUES (80, '菜单权限', '', 0, 'menu', '1');
INSERT INTO `menu_meta` VALUES (82, '字典管理', '', 0, 'catalog', '0');
INSERT INTO `menu_meta` VALUES (88, '字典配置', '', 0, 'menu', '0');
INSERT INTO `menu_meta` VALUES (90, '字典数据', '', 0, 'menu', '0');
INSERT INTO `menu_meta` VALUES (94, '组件示例', '', 0, 'catalog', '0');
INSERT INTO `menu_meta` VALUES (95, '表格组件', '', 0, 'menu', '0');
INSERT INTO `menu_meta` VALUES (98, '富文本编辑器', '', 0, 'menu', '0');

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `value` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '权限名称',
  `role_id` bigint NOT NULL COMMENT '所属角色的id',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_383892d758d08d346f837d3d8b7`(`role_id` ASC) USING BTREE,
  CONSTRAINT `FK_383892d758d08d346f837d3d8b7` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1582 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES (700, 'permissionAdm', 24);
INSERT INTO `permission` VALUES (701, 'menus', 24);
INSERT INTO `permission` VALUES (702, 'menus_save', 24);
INSERT INTO `permission` VALUES (703, 'menus_update', 24);
INSERT INTO `permission` VALUES (704, 'menus_remove', 24);
INSERT INTO `permission` VALUES (705, 'menus_query', 24);
INSERT INTO `permission` VALUES (706, 'role', 24);
INSERT INTO `permission` VALUES (707, 'role_all', 24);
INSERT INTO `permission` VALUES (708, 'role_permissionSave', 24);
INSERT INTO `permission` VALUES (709, 'role_permissionQuery', 24);
INSERT INTO `permission` VALUES (710, 'role_add', 24);
INSERT INTO `permission` VALUES (711, 'role_update', 24);
INSERT INTO `permission` VALUES (712, 'role_save', 24);
INSERT INTO `permission` VALUES (713, 'role_remove', 24);
INSERT INTO `permission` VALUES (714, 'role_delete', 24);
INSERT INTO `permission` VALUES (715, 'role_removeBatch', 24);
INSERT INTO `permission` VALUES (716, 'role_deleteBatch', 24);
INSERT INTO `permission` VALUES (717, 'role_list', 24);
INSERT INTO `permission` VALUES (718, 'user', 24);
INSERT INTO `permission` VALUES (719, 'user_menus', 24);
INSERT INTO `permission` VALUES (720, 'user_save', 24);
INSERT INTO `permission` VALUES (721, 'user_add', 24);
INSERT INTO `permission` VALUES (722, 'user_update', 24);
INSERT INTO `permission` VALUES (723, 'user_remove', 24);
INSERT INTO `permission` VALUES (724, 'user_delete', 24);
INSERT INTO `permission` VALUES (725, 'user_removeBatch', 24);
INSERT INTO `permission` VALUES (726, 'user_deleteBatch', 24);
INSERT INTO `permission` VALUES (727, 'user_list', 24);
INSERT INTO `permission` VALUES (728, 'user_all', 24);
INSERT INTO `permission` VALUES (788, 'permissionAdm', 22);
INSERT INTO `permission` VALUES (789, 'menus', 22);
INSERT INTO `permission` VALUES (790, 'menus_save', 22);
INSERT INTO `permission` VALUES (791, 'menus_update', 22);
INSERT INTO `permission` VALUES (792, 'menus_remove', 22);
INSERT INTO `permission` VALUES (793, 'menus_query', 22);
INSERT INTO `permission` VALUES (794, 'role', 22);
INSERT INTO `permission` VALUES (795, 'role_all', 22);
INSERT INTO `permission` VALUES (796, 'role_permissionSave', 22);
INSERT INTO `permission` VALUES (797, 'role_permissionQuery', 22);
INSERT INTO `permission` VALUES (798, 'role_add', 22);
INSERT INTO `permission` VALUES (799, 'role_update', 22);
INSERT INTO `permission` VALUES (800, 'role_save', 22);
INSERT INTO `permission` VALUES (801, 'role_remove', 22);
INSERT INTO `permission` VALUES (802, 'role_delete', 22);
INSERT INTO `permission` VALUES (803, 'role_removeBatch', 22);
INSERT INTO `permission` VALUES (804, 'role_deleteBatch', 22);
INSERT INTO `permission` VALUES (805, 'role_list', 22);
INSERT INTO `permission` VALUES (806, 'user', 22);
INSERT INTO `permission` VALUES (807, 'user_menus', 22);
INSERT INTO `permission` VALUES (808, 'user_updateRole', 22);
INSERT INTO `permission` VALUES (809, 'user_save', 22);
INSERT INTO `permission` VALUES (810, 'user_add', 22);
INSERT INTO `permission` VALUES (811, 'user_update', 22);
INSERT INTO `permission` VALUES (812, 'user_remove', 22);
INSERT INTO `permission` VALUES (813, 'user_delete', 22);
INSERT INTO `permission` VALUES (814, 'user_removeBatch', 22);
INSERT INTO `permission` VALUES (815, 'user_deleteBatch', 22);
INSERT INTO `permission` VALUES (816, 'user_list', 22);
INSERT INTO `permission` VALUES (817, 'user_all', 22);
INSERT INTO `permission` VALUES (1226, 'role', 23);
INSERT INTO `permission` VALUES (1227, 'role_all', 23);
INSERT INTO `permission` VALUES (1228, 'role_permissionSave', 23);
INSERT INTO `permission` VALUES (1229, 'role_permissionQuery', 23);
INSERT INTO `permission` VALUES (1230, 'role_menusQuery', 23);
INSERT INTO `permission` VALUES (1231, 'role_add', 23);
INSERT INTO `permission` VALUES (1232, 'role_update', 23);
INSERT INTO `permission` VALUES (1233, 'role_save', 23);
INSERT INTO `permission` VALUES (1234, 'role_remove', 23);
INSERT INTO `permission` VALUES (1235, 'role_delete', 23);
INSERT INTO `permission` VALUES (1236, 'role_removeBatch', 23);
INSERT INTO `permission` VALUES (1237, 'role_deleteBatch', 23);
INSERT INTO `permission` VALUES (1238, 'role_list', 23);
INSERT INTO `permission` VALUES (1239, 'user_menus', 23);
INSERT INTO `permission` VALUES (1536, 'permissionAdm', 21);
INSERT INTO `permission` VALUES (1537, 'menus', 21);
INSERT INTO `permission` VALUES (1538, 'menus_save', 21);
INSERT INTO `permission` VALUES (1539, 'menus_update', 21);
INSERT INTO `permission` VALUES (1540, 'menus_remove', 21);
INSERT INTO `permission` VALUES (1541, 'menus_query', 21);
INSERT INTO `permission` VALUES (1542, 'role', 21);
INSERT INTO `permission` VALUES (1543, 'role_all', 21);
INSERT INTO `permission` VALUES (1544, 'role_permissionSave', 21);
INSERT INTO `permission` VALUES (1545, 'role_permissionQuery', 21);
INSERT INTO `permission` VALUES (1546, 'role_menusQuery', 21);
INSERT INTO `permission` VALUES (1547, 'role_add', 21);
INSERT INTO `permission` VALUES (1548, 'role_update', 21);
INSERT INTO `permission` VALUES (1549, 'role_save', 21);
INSERT INTO `permission` VALUES (1550, 'role_remove', 21);
INSERT INTO `permission` VALUES (1551, 'role_delete', 21);
INSERT INTO `permission` VALUES (1552, 'role_removeBatch', 21);
INSERT INTO `permission` VALUES (1553, 'role_deleteBatch', 21);
INSERT INTO `permission` VALUES (1554, 'role_list', 21);
INSERT INTO `permission` VALUES (1555, 'user', 21);
INSERT INTO `permission` VALUES (1556, 'user_menus', 21);
INSERT INTO `permission` VALUES (1557, 'user_updateRole', 21);
INSERT INTO `permission` VALUES (1558, 'user_update', 21);
INSERT INTO `permission` VALUES (1559, 'user_list', 21);
INSERT INTO `permission` VALUES (1560, 'user_permission', 21);
INSERT INTO `permission` VALUES (1561, 'user_save', 21);
INSERT INTO `permission` VALUES (1562, 'user_add', 21);
INSERT INTO `permission` VALUES (1563, 'user_remove', 21);
INSERT INTO `permission` VALUES (1564, 'user_delete', 21);
INSERT INTO `permission` VALUES (1565, 'user_removeBatch', 21);
INSERT INTO `permission` VALUES (1566, 'user_deleteBatch', 21);
INSERT INTO `permission` VALUES (1567, 'user_all', 21);
INSERT INTO `permission` VALUES (1568, 'permission', 21);
INSERT INTO `permission` VALUES (1569, 'permission_tree', 21);
INSERT INTO `permission` VALUES (1570, 'permission_remove', 21);
INSERT INTO `permission` VALUES (1571, 'systemMonitor', 21);
INSERT INTO `permission` VALUES (1572, 'loginLog', 21);
INSERT INTO `permission` VALUES (1573, 'loginLog_save', 21);
INSERT INTO `permission` VALUES (1574, 'loginLog_add', 21);
INSERT INTO `permission` VALUES (1575, 'loginLog_update', 21);
INSERT INTO `permission` VALUES (1576, 'loginLog_remove', 21);
INSERT INTO `permission` VALUES (1577, 'loginLog_delete', 21);
INSERT INTO `permission` VALUES (1578, 'loginLog_removeBatch', 21);
INSERT INTO `permission` VALUES (1579, 'loginLog_deleteBatch', 21);
INSERT INTO `permission` VALUES (1580, 'loginLog_list', 21);
INSERT INTO `permission` VALUES (1581, 'loginLog_all', 21);

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT '更新人',
  `is_deleted` char(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '0' COMMENT '是否删除: NULL未删除，1删除',
  `name` varchar(55) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '角色名称',
  `remark` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL COMMENT '备注',
  `update_time` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (21, '2025-03-26 22:55:31', NULL, NULL, '0', '超级管理员', '超级管理员拥有所有权限', '2024-12-01 21:26:23');
INSERT INTO `role` VALUES (22, '2024-12-22 19:46:48', NULL, NULL, '0', '角色1', '角色1', NULL);
INSERT INTO `role` VALUES (23, '2025-04-21 12:48:28', NULL, NULL, '0', '2233', '22', '2025-04-21 12:50:51');
INSERT INTO `role` VALUES (24, '2025-04-21 12:50:28', NULL, '6', '1', '22', '22', '2025-04-21 16:37:57');

-- ----------------------------
-- Table structure for role_menu_relation
-- ----------------------------
DROP TABLE IF EXISTS `role_menu_relation`;
CREATE TABLE `role_menu_relation`  (
  `role_id` bigint NOT NULL,
  `menu_id` bigint NOT NULL,
  PRIMARY KEY (`role_id`, `menu_id`) USING BTREE,
  INDEX `IDX_b81d49ed8ca6f03f339c0e8e6b`(`role_id` ASC) USING BTREE,
  INDEX `IDX_f46d8eb5359af5f34998b018d8`(`menu_id` ASC) USING BTREE,
  CONSTRAINT `FK_b81d49ed8ca6f03f339c0e8e6b8` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_f46d8eb5359af5f34998b018d82` FOREIGN KEY (`menu_id`) REFERENCES `menu` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_menu_relation
-- ----------------------------
INSERT INTO `role_menu_relation` VALUES (21, 1);
INSERT INTO `role_menu_relation` VALUES (21, 2);
INSERT INTO `role_menu_relation` VALUES (21, 7);
INSERT INTO `role_menu_relation` VALUES (21, 8);
INSERT INTO `role_menu_relation` VALUES (21, 9);
INSERT INTO `role_menu_relation` VALUES (21, 10);
INSERT INTO `role_menu_relation` VALUES (21, 11);
INSERT INTO `role_menu_relation` VALUES (21, 12);
INSERT INTO `role_menu_relation` VALUES (21, 13);
INSERT INTO `role_menu_relation` VALUES (21, 14);
INSERT INTO `role_menu_relation` VALUES (21, 15);
INSERT INTO `role_menu_relation` VALUES (21, 16);
INSERT INTO `role_menu_relation` VALUES (21, 17);
INSERT INTO `role_menu_relation` VALUES (21, 19);
INSERT INTO `role_menu_relation` VALUES (21, 20);
INSERT INTO `role_menu_relation` VALUES (21, 61);
INSERT INTO `role_menu_relation` VALUES (21, 62);
INSERT INTO `role_menu_relation` VALUES (21, 68);
INSERT INTO `role_menu_relation` VALUES (21, 70);
INSERT INTO `role_menu_relation` VALUES (21, 74);
INSERT INTO `role_menu_relation` VALUES (21, 75);
INSERT INTO `role_menu_relation` VALUES (21, 78);
INSERT INTO `role_menu_relation` VALUES (22, 17);
INSERT INTO `role_menu_relation` VALUES (22, 19);
INSERT INTO `role_menu_relation` VALUES (22, 20);
INSERT INTO `role_menu_relation` VALUES (23, 1);
INSERT INTO `role_menu_relation` VALUES (23, 2);
INSERT INTO `role_menu_relation` VALUES (23, 7);
INSERT INTO `role_menu_relation` VALUES (23, 8);
INSERT INTO `role_menu_relation` VALUES (23, 9);
INSERT INTO `role_menu_relation` VALUES (23, 10);
INSERT INTO `role_menu_relation` VALUES (23, 11);
INSERT INTO `role_menu_relation` VALUES (23, 12);
INSERT INTO `role_menu_relation` VALUES (23, 61);
INSERT INTO `role_menu_relation` VALUES (24, 1);
INSERT INTO `role_menu_relation` VALUES (24, 2);
INSERT INTO `role_menu_relation` VALUES (24, 7);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `create_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `create_user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '创建人',
  `update_user` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '更新人',
  `is_deleted` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '0' COMMENT '是否删除: NULL未删除，1删除',
  `account` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账号',
  `update_time` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_4ab2df0a57a74fdf904e0e2708`(`account` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (6, '$2y$10$FxY2.jG6kmE6jb4p4ze97OUeUX5q8FWYx02Q5TceFQOWP3aRRob0a', '2024-12-02 07:31:04', NULL, '6', '0', 'admin', '2025-04-22 19:05:07', NULL);
INSERT INTO `user` VALUES (9, '$2y$10$PK66VISL0kZUckLyhy36bOE4YhtFR/.P2lZ6mJ971zWw4neIRG7nO', '2025-03-26 22:57:16', NULL, '6', '0', 'user1', '2025-04-23 16:46:00', NULL);
INSERT INTO `user` VALUES (10, '$2y$10$Vc4kTveez2jTec.U2SrQBOG6uT1pHjXL8Ig336B33uVYtJHPN735S', '2024-12-21 21:46:48', NULL, NULL, '0', 'user2', NULL, NULL);
INSERT INTO `user` VALUES (11, '$2y$10$F99h.8K7I1.bHY.DWp2il.9Rlrr77cKJaeFfUIDEfsvsqAjl/h0Pi', '2024-12-21 21:46:54', NULL, NULL, '0', 'user3', NULL, NULL);
INSERT INTO `user` VALUES (12, '$2y$10$16nuynP0lCKalUoEPWlQe.ZwO/uZMDRNkoi4jyItTgnfQSOP5Y6tG', '2024-12-21 21:46:59', NULL, '9', '0', 'user4', '2025-04-29 16:08:31', 'default\\2025-04-29/1745914109630-542395363.png');
INSERT INTO `user` VALUES (13, '$2y$10$e0E8l6ngs957yLu5KZqTaummHYQ2JZUKSBjshON37sv8xYr09WM6i', '2024-12-21 21:47:07', NULL, NULL, '0', 'user5', NULL, NULL);
INSERT INTO `user` VALUES (14, '$2y$10$PtQ9gzdiRAVSCXSYDwRAiuzEy/juRFF9.YiC2sxZMlMfvzxvQrgGW', '2024-12-21 21:47:17', NULL, NULL, '0', 'user6', NULL, NULL);
INSERT INTO `user` VALUES (15, '$2y$10$XvGLmp1rqjAYB7lClJbiFuADh7DadXyWVKFLKJBjXbzxcS4eUj8lW', '2024-12-21 21:47:24', NULL, NULL, '0', 'user7', NULL, NULL);
INSERT INTO `user` VALUES (16, '$2y$10$afPcguKftke5FODJep38nenAGkjbKS7CRxodPdZT9FIuUdWb6psyy', '2024-12-21 21:47:32', NULL, NULL, '0', 'user8', NULL, NULL);
INSERT INTO `user` VALUES (17, '$2y$10$mtIgDWSxlsFcj9F90OIT9.C0sboaTuJ53rSLD3ek0XMumfhEgG4Xi', '2024-12-23 21:28:49', NULL, NULL, '0', 'user9', NULL, NULL);
INSERT INTO `user` VALUES (18, '$2y$10$Qc8P42dgMl23m0UvS/QD.ug2rMMVeL0X/T.UBjed6u5OlUpaY0xTe', '2024-12-23 21:28:57', NULL, NULL, '0', 'user10', NULL, NULL);
INSERT INTO `user` VALUES (19, '$2y$10$pS/hTUNB9.BJhbPdMD72vOlrKDc8IsOtb/gSVNB/PBb0Nkci02c8O', '2025-03-26 23:04:23', NULL, NULL, '0', '112233', '2025-03-26 23:04:41', NULL);
INSERT INTO `user` VALUES (20, '$2y$10$0JjTby2KnIql0rjczJncl.4F8IjmiNaE/daCvwMKxk7/oxGFZJoh2', '2025-04-11 18:12:08', NULL, NULL, '0', 'user11', NULL, NULL);
INSERT INTO `user` VALUES (21, '$2y$10$5mVuzzOpvUXrDMsUIZxHB.5g6ZlbtvxRo1V5CyoCFdQck.Tu5Ts9q', '2025-04-11 18:12:18', NULL, NULL, '0', 'user12', NULL, NULL);
INSERT INTO `user` VALUES (22, '$2y$10$zenDLxR4w6qhlkLgwJjXo.mzRxfXTY3uwSuzAQh411GgpMyvLIow6', '2025-04-11 18:12:30', NULL, NULL, '0', 'user13', NULL, NULL);
INSERT INTO `user` VALUES (23, '$2y$10$Qt9oJIa4kETdJbcIdCbn8OHuofHSuaqRvzafck4k9eOKg3/BS7Rau', '2025-04-11 18:12:39', NULL, NULL, '0', 'user14', NULL, NULL);
INSERT INTO `user` VALUES (24, '$2y$10$N5QzVW9ZQHRyJFr0v8xiluVkb0FwpIkiYYct62iq9UulScsUXKTC.', '2025-04-11 18:12:49', NULL, NULL, '0', 'user15', NULL, NULL);
INSERT INTO `user` VALUES (25, '$2y$10$PDdgW70ODW6YuFmW0qF.2OVPF4azj8ejOfweASy2o.sguJnry34Eu', '2025-04-11 18:19:07', NULL, NULL, '0', 'user16', NULL, NULL);
INSERT INTO `user` VALUES (26, '$2y$10$VHEYyGT2xXpU59ec39LUkuBQgucpPuzkUf07LCbMPmwvVZ7hwX3Uu', '2025-04-11 18:19:16', NULL, NULL, '0', 'user17', NULL, NULL);
INSERT INTO `user` VALUES (27, '$2y$10$6p7BHJyW/H8RmR4FjqFk3eOAI7O9iujC1fFd0IiAv94pAykmpAsX6', '2025-04-11 18:19:25', NULL, NULL, '0', 'user18', NULL, NULL);
INSERT INTO `user` VALUES (28, '$2y$10$rxfA39aNTHcfin5CyALnNuj319u8itV6.1.uL2Hhw0qpzNPqL.U/e', '2025-04-11 18:19:35', NULL, '6', '0', 'user19', '2025-04-22 16:04:44', NULL);
INSERT INTO `user` VALUES (29, '$2y$10$fHMSBIwgZwraTHE/aZaezewaAwAEGw3UPz9rfmOG8cpCXfvlnkDW6', '2025-04-11 18:19:46', NULL, '6', '0', 'user20', '2025-04-22 16:04:47', NULL);
INSERT INTO `user` VALUES (30, '$2y$10$A2NQLm7KBwI3ytVt4Etxe.uQhG.y6oGo0nim2bzORh9AUWtZp6HFO', '2025-04-11 18:19:55', NULL, '6', '0', 'user21', '2025-04-22 16:04:48', NULL);
INSERT INTO `user` VALUES (31, '$2y$10$yEEaHOu2QZVZ.nUHuxsw1OxPPUK5jifMPyvnzYvgeZQTZCXp7BmPu', '2025-04-11 18:20:03', NULL, '6', '0', 'user22', '2025-04-22 16:04:51', NULL);
INSERT INTO `user` VALUES (32, '$2y$10$UQfx5AEdiwIz4b0FyS45VuLFoxnu1p.hWrS1VxsMBSplbryyiDn3G', '2025-04-11 18:20:11', NULL, '6', '0', 'user23', '2025-04-22 16:04:52', NULL);
INSERT INTO `user` VALUES (33, '$2y$10$I6hHTMHzVw8OPQNqu3a1QuDgev5Wso3KekbrdTrIid4oMpt1fqEBW', '2025-04-15 18:10:21', NULL, '6', '0', '1111', '2025-04-22 16:04:55', NULL);
INSERT INTO `user` VALUES (34, '$2y$10$iO2oMtPaiPbwwUdVSqEP.ufIQ2UwUp2SX4voaoZU8lKbOLtj23xnC', '2025-04-20 19:06:54', '6', '6', '0', '2222', '2025-04-22 16:04:56', NULL);

-- ----------------------------
-- Table structure for user_role_relation
-- ----------------------------
DROP TABLE IF EXISTS `user_role_relation`;
CREATE TABLE `user_role_relation`  (
  `roleId` bigint NOT NULL,
  `userId` bigint NOT NULL,
  PRIMARY KEY (`roleId`, `userId`) USING BTREE,
  INDEX `IDX_bed18db98a78c46f0bcfedfe65`(`roleId` ASC) USING BTREE,
  INDEX `IDX_387a09a362c32ee04b33fc4eaa`(`userId` ASC) USING BTREE,
  CONSTRAINT `FK_387a09a362c32ee04b33fc4eaab` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_bed18db98a78c46f0bcfedfe652` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_role_relation
-- ----------------------------
INSERT INTO `user_role_relation` VALUES (21, 6);
INSERT INTO `user_role_relation` VALUES (21, 9);
INSERT INTO `user_role_relation` VALUES (21, 10);
INSERT INTO `user_role_relation` VALUES (21, 11);
INSERT INTO `user_role_relation` VALUES (21, 12);
INSERT INTO `user_role_relation` VALUES (21, 28);
INSERT INTO `user_role_relation` VALUES (21, 30);
INSERT INTO `user_role_relation` VALUES (21, 31);
INSERT INTO `user_role_relation` VALUES (21, 34);
INSERT INTO `user_role_relation` VALUES (22, 9);
INSERT INTO `user_role_relation` VALUES (22, 10);
INSERT INTO `user_role_relation` VALUES (22, 11);
INSERT INTO `user_role_relation` VALUES (22, 29);
INSERT INTO `user_role_relation` VALUES (22, 32);
INSERT INTO `user_role_relation` VALUES (22, 33);
INSERT INTO `user_role_relation` VALUES (23, 9);

SET FOREIGN_KEY_CHECKS = 1;
