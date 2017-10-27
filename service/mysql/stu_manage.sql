/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : stu_manage

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-10-05 17:32:45
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `s_class`
-- ----------------------------
DROP TABLE IF EXISTS `s_class`;
CREATE TABLE `s_class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL COMMENT '班级名称',
  `grade` int(11) NOT NULL,
  `manage_id` int(11) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0未激活，1使用中，-1已删除',
  PRIMARY KEY (`id`),
  KEY `manage_id` (`manage_id`),
);

-- ----------------------------
-- Records of s_class
-- ----------------------------

-- ----------------------------
-- Table structure for `s_role`
-- ----------------------------
DROP TABLE IF EXISTS `s_role`;
CREATE TABLE `s_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL COMMENT '角色名称',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0未激活，1使用中，-1已删除',
  PRIMARY KEY (`id`)
);

-- ----------------------------
-- Records of s_role
-- ----------------------------
INSERT INTO `s_role` VALUES ('1', '???', '2017-10-05 17:06:13', '2017-10-05 17:06:13', '1');
INSERT INTO `s_role` VALUES ('2', '??', '2017-10-05 17:06:22', '2017-10-05 17:06:44', '1');
INSERT INTO `s_role` VALUES ('3', '??', '2017-10-05 17:06:55', '2017-10-05 17:06:55', '1');

-- ----------------------------
-- Table structure for `s_student`
-- ----------------------------
DROP TABLE IF EXISTS `s_student`;
CREATE TABLE `s_student` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL COMMENT '学生姓名',
  `sex` int(11) NOT NULL DEFAULT '0' COMMENT '性别0为女，1为男',
  `birth` date NOT NULL COMMENT '出生年月',
  `grade` int(11) NOT NULL,
  `class` varchar(20) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0未激活，1使用中，-1已删除',
  PRIMARY KEY (`id`),
  KEY `FK_id` (`user_id`),
  CONSTRAINT `FK_id` FOREIGN KEY (`user_id`) REFERENCES `s_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- ----------------------------
-- Records of s_student
-- ----------------------------
INSERT INTO `s_student` VALUES ('1', '1', 'xy', '0', '2017-10-05', '1', '2', '2017-10-05 16:44:58', '2017-10-05 16:44:58', '0');

-- ----------------------------
-- Table structure for `s_teacher`
-- ----------------------------
DROP TABLE IF EXISTS `s_teacher`;
CREATE TABLE `s_teacher` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL COMMENT '老师姓名',
  `sex` int(11) NOT NULL DEFAULT '0' COMMENT '性别0为女，1为男',
  `birth` date NOT NULL COMMENT '出生年月',
  `class` varchar(20) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL DEFAULT '0' COMMENT '0未激活，1使用中，-1已删除',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `s_teacher_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `s_user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

-- ----------------------------
-- Records of s_teacher
-- ----------------------------

-- ----------------------------
-- Table structure for `s_user`
-- ----------------------------
DROP TABLE IF EXISTS `s_user`;
CREATE TABLE `s_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(20) NOT NULL COMMENT '账号',
  `pwd` varchar(25) NOT NULL DEFAULT '',
  `invite_code` int(11) NOT NULL COMMENT '邀请码',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int(11) NOT NULL DEFAULT '0',
  `role` varchar(20) NOT NULL COMMENT '角色',
  PRIMARY KEY (`id`),
  UNIQUE KEY `account` (`account`)
);

-- ----------------------------
-- Records of s_user
-- ----------------------------
INSERT INTO `s_user` VALUES ('1', 'admin', '1234', '1111', '2017-10-05 16:15:53', '2017-10-05 16:17:55', '1', '1,2,3');
