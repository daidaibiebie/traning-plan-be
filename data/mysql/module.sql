
-- Table structure for employees
-- ----------------------------

SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `module`;
SET FOREIGN_KEY_CHECKS=1;
CREATE TABLE `module`  (
  `module_eid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT  NULL  COMMENT '课程模块',
  `mod_parent_id` int(11) NULL DEFAULT NULL COMMENT '上级ID',
  `expect_score` varchar(11) NULL DEFAULT NULL COMMENT '学分限制',
  `mod_tag` char(255) NULL DEFAULT NULL COMMENT  '模块标签',
  PRIMARY KEY (`module_eid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of employees
-- ----------------------------
INSERT INTO `module` VALUE(1,'计算机科学与技术',null,null,null);
INSERT INTO `module` VALUE(2,'通识公共课',1,null,null);
INSERT INTO `module` VALUE(3,'学科专业课',1,null,null);
INSERT INTO `module` VALUE(4,'实践教学环节',1,null,null);
INSERT INTO `module` VALUE(5,'专业课',1,null,null);
INSERT INTO `module` VALUE(6,'课外教育项目',1,null,null);
INSERT INTO `module` VALUE(7,'通识必修',2,null,null);
INSERT INTO `module` VALUE(8,'学科必修',3,null,null);
INSERT INTO `module` VALUE(9,'实践必修',4,null,null);
INSERT INTO `module` VALUE(10,'专业必修',5,null,null);
INSERT INTO `module` VALUE(11,'专业选修',5,null,null);
INSERT INTO `module` VALUE(12,'课外教育项目',6,null,null);
INSERT INTO `module` VALUE(13,'35学分',7,null,null);
INSERT INTO `module` VALUE(14,'13学分',8,null,null);
INSERT INTO `module` VALUE(15,'1学分',9,null,null);
INSERT INTO `module` VALUE(16,'25.5学分',7,null,null);
INSERT INTO `module` VALUE(17,'16学分',8,null,null);
INSERT INTO `module` VALUE(18,'13学分',10,null,null);
INSERT INTO `module` VALUE(19,'计算机系统模块',11,null,null);
INSERT INTO `module` VALUE(20,'物联网工程模块',11,null,null);
INSERT INTO `module` VALUE(21,'人工智能模块',11,null,null);
INSERT INTO `module` VALUE(22,'数据科学模块',11,null,null);
INSERT INTO `module` VALUE(23,'网络安全模块',11,null,null);
INSERT INTO `module` VALUE(24,'公共模块',11,null,null);
INSERT INTO `module` VALUE(25,'31.5学分',9,null,null);
INSERT INTO `module` VALUE(26,'7学分',12,null,null);
INSERT INTO `module` VALUE(27,'通识选修',2,null,null);
INSERT INTO `module` VALUE(28,'3学分',27,null,null);
INSERT INTO `module` VALUE(29,'通识选修课',1,null,null);
INSERT INTO `module` VALUE(30,'10学分',27,null,null);



