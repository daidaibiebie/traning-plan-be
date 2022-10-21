
-- Table structure for employees
-- ----------------------------
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '1234';
SET FOREIGN_KEY_CHECKS=0;
DROP TABLE IF EXISTS `course`;
SET FOREIGN_KEY_CHECKS=1;
CREATE TABLE `course`  (
  `course_eid` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `code` char(100)  NOT NULL DEFAULT 0 COMMENT'课程代号',
  `name` char(100)  NOT NULL UNIQUE DEFAULT  0 COMMENT '课程名',
  `englishName` char(100)  NOT NULL UNIQUE DEFAULT 0 COMMENT '课程英文名',
  `credits` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT  NULL  COMMENT '学分',
  `total_hour` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT  NULL  COMMENT '总学时',
  `teacher_hour` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT  NULL  COMMENT '授课时长',
  `practice_hour` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT  NULL  COMMENT '课程实践',
  `experiment_hour` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT  NULL  COMMENT '实验',
  `in_class` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT  NULL  COMMENT '课内上机',
  `out_class` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT  NULL  COMMENT '课外上机',
  `term` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT  NULL  COMMENT '开课学期',
  `exam` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT  NULL  COMMENT '考核方式',
  `start` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT  NULL  COMMENT '起始周',
  `remark` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT  NULL  COMMENT '备注',
  `cou_expect_score` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT  NULL  COMMENT '学分上限',
  `on_group` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT  NULL  COMMENT '多选',
  `cou_parent_id` int(11) NULL DEFAULT NULL COMMENT '上级ID',
  PRIMARY KEY (`course_eid`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of employees
-- ----------------------------
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (87, 'A2301210', '中国近现代史纲要', 'The Outline of Modern and Contemporary History of China', 3, 48, 42, 6, null, null, null, 2, 'Y', '1月16日', null, null, null, 13);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (88, 'A2301260', '思想道德与法治', 'Ideological and  Moral Cultivation and Rule of Law', 3, 48, 42, 6, null, null, null, 1, 'Y', '1月16日', null, null, null, 13);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (89, 'T1301011', '体育1', 'Physical Education1', 1, 32, 4, 28, null, null, null, 1, 'C', '1月16日', null, null, null, 13);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (90, 'T1301012', '体育2', 'Physical Education2', 1, 32, 4, 28, null, null, null, 2, 'C', '1月16日', null, null, null, 13);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (91, 'A110112*', '大学英语精读1', 'College English Intensive Reading1', 2, 32, 32, null, null, null, null, 1, 'X', '1月16日', '注1', null, null, 13);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (92, 'A110118*', '大学英语听说1', 'College English Listening ＆ Speaking1', 1, 16, 16, null, null, null, null, 1, 'X', '1月16日', '注1', null, null, 13);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (93, 'A110114*', '大学英语精读2', 'College English Intensive Reading2', 2, 32, 32, null, null, null, null, 2, 'X', '1月16日', '注1', null, null, 13);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (94, 'A110119*', '大学英语听说2', 'College English Listening ＆Speaking2', 1, 16, 16, null, null, null, null, 2, 'X', '1月16日', '注1', null, null, 13);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (95, 'A0714201', '高等数学A1', 'Higher Mathematics A1', 5, 80, 80, null, null, null, null, 1, 'X', '1月16日', null, null, null, 13);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (96, 'A0714202', '高等数学A2', 'Higher Mathematics A2', 5, 80, 80, null, null, null, null, 2, 'X', '1月16日', null, null, null, 13);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (97, 'A0714030', '线性代数', 'Linear Algebra', 3, 48, 48, null, null, null, null, 1, 'X', '1月16日', null, null, null, 13);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (98, 'A0715011', '大学物理1', 'College Physics1', 3, 48, 48, null, null, null, null, 2, 'X', '1月16日', '注2', null, null, 13);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (99, 'A0715051', '物理学原理及工程应用1', 'Physics Principle and Engineering Application 1', 3, 48, 48, null, null, null, null, 2, 'X', '1月16日', '注2', null, null, 13);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (100, 'A2301250', '大学生心理健康教育', 'College Students Mental Health Education', 2, 32, 28, 4, null, null, null, 2, 'C', '1月16日', null, null, null, 13);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (101, 'A050163s', '工程伦理', 'Engineering Ethics', 1, 16, 16, null, null, null, null, 2, 'C', '1月16日', '双语', null, null, 13);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (102, 'A0501180', '程序设计基础', 'Basis of Programming', 4, 64, 48, null, null, 16, null, 1, 'X', '1月16日', null, null, null, 14);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (103, 'A0512020', '计算机类学科导论', 'Introduction to Computer Science', 1, 16, 16, null, null, null, null, 1, 'C', '1月16日', null, null, null, 14);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (104, 'A051201s', '计算机科学概论', 'A Brief Overview of Computer Science', 1, 16, 16, null, null, null, null, 1, 'C', '1月16日', '双语', null, null, 14);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (105, 'A0501520', '离散数学', 'Discrete Mathematics', 4, 64, 64, null, null, null, null, 2, 'Y', '1月16日', null, null, null, 14);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (106, 'A0502380', '面向对象程序设计（C++）', 'Object Oriented Programming (C++)', 3, 48, 36, null, null, 12, null, 2, 'Y', '1月16日', '注3', null, null, 14);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (107, 'A0500820', '面向对象程序设计（Java）', 'Object Oriented Programming (Java)', 3, 48, 36, null, null, 12, 20, 2, 'Y', '1月16日', '注3', null, null, 14);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (108, 'S05*****', '程序设计课程实践', 'Course Practice of Programming', 1, 24, 8, null, null, 16, 16, 2, 'C', '1月16日', null, null, null, 15);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (109, 'A2301240', '马克思主义基本原理', 'Basic Principles of Marxism', 3, 48, 42, 6, null, null, null, 6, 'Y', '1月16日', null, null, null, 16);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (110, 'T1301013', '体育3', 'Physical Education3', 1, 32, 4, 28, null, null, null, 3, 'C', '1月16日', null, null, null, 16);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (111, 'T1301014', '体育4', 'Physical Education4', 1, 32, 4, 28, null, null, null, 4, 'C', '1月16日', null, null, null, 16);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (112, 'A0714040', '概率论与数理统计', 'Probability Theory and Mathematical Statistics', 3, 48, 48, null, null, null, null, 4, 'X', '1月16日', null, null, null, 16);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (113, 'A0715012', '大学物理2', 'College Physics2', 3, 48, 48, null, null, null, null, 3, 'X', '1月16日', '注2', null, null, 16);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (114, 'A0715052', '物理学原理及工程应用2', 'Physics Principle and Engineering Application 2', 3, 48, 48, null, null, null, null, 3, 'X', '1月16日', '注2', null, null, 16);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (115, 'A0302280', '工程经济学', 'Engineering Economics', 2, 32, 32, null, null, null, null, 3, 'C', '1月16日', null, null, null, 16);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (119, 'A0512040', '计算机网络', 'Computer Network ', 4, 64, 64, null, null, null, null, 5, 'X', '1月16日', null, null, null, 17);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (120, 'A0507980', '数字电路设计', 'Digital Circuits Design', 3, 48, 48, null, null, null, null, 3, 'X', '1月16日', null, null, null, 18);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (121, 'A05*****', '数据库系统原理', 'Principle of Database System ', 3, 48, 48, null, null, null, null, 4, 'Y', '1月16日', null, null, null, 18);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (122, 'A05*****', '软件工程', 'Software Engineering', 2, 32, 32, null, null, null, null, 5, 'X', '1月16日', null, null, null, 18);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (123, 'A0507970', '项目管理与案例分析', 'Project Management and Case Analysis', 2, 32, 32, null, null, null, null, 6, 'Y', '1月16日', null, null, null, 18);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (124, 'B0504720', '嵌入式系统原理', 'Principles of Embedded Systems', 3, 48, 48, null, null, null, null, 5, 'Y', '1月16日', null, null, null, 19);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (125, 'S05*****', '嵌入式系统课程设计', 'Course Design for Embedded System', 1, 24, 8, null, 16, null, null, 5, 'C', '1月16日', null, null, null, 19);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (126, 'B0504070', '计算机系统结构', 'Computer Architecture', 3, 48, 36, null, 12, null, null, 5, 'Y', '1月16日', null, null, null, 19);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (127, 'B0501410', '并行与分布式处理系统', 'Parallel and Distributed Processing System', 3, 48, 36, null, null, 12, null, 6, 'Y', '1月16日', null, null, null, 19);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (128, 'B0505130', 'Linux系统及应用', 'Linux System and Application ', 3, 48, 32, null, null, 16, 16, 4, 'C', '1月16日', null, null, null, 19);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (129, 'B050801s', '物联网工程导论', 'Introduction to IoT Enginneering ', 2, 32, 32, null, null, null, null, 3, 'C', '1月16日', '双语', null, null, 20);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (130, 'B050816s', '传感器与传感网', 'Sensor and Sensor Networks', 2, 32, 16, null, 16, null, null, 4, 'C', '1月16日', '双语', null, null, 20);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (131, 'B0501320', '物联网硬件基础', 'Fundamental of IoT Hardware', 3, 48, 24, null, 24, null, null, 5, 'C', '1月16日', null, null, null, 20);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (132, 'B050807s', '网络通信系统', 'Network Communication System', 2, 32, 26, null, 6, null, null, 6, 'Y', '1月16日', '双语', null, null, 20);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (133, 'B0501540', '人工智能导论', 'Introduction to Artificial Intelligence', 2, 32, 32, null, null, null, 24, 3, 'C', '1月16日', null, null, null, 21);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (134, 'B050155s', '机器学习', 'Machine Learning', 2, 32, 32, null, null, null, 24, 4, 'C', '1月16日', '双语', null, null, 21);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (135, 'B050156s', '深度学习', 'Deep Learning', 2, 32, 32, null, null, null, 16, 5, 'C', '1月16日', '双语', null, null, 21);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (136, 'B0501660', '脑机智能原理与方法', 'Brain-Machine Intelligence Principles and Methods', 2, 32, 16, null, null, 16, 16, 5, 'C', '1月16日', null, null, null, 21);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (137, 'B050165s', '自然语言处理', 'Natural Language Processing', 2, 32, 32, null, null, null, null, 6, 'C', '1月16日', '双语', null, null, 21);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (138, 'B050164s', '计算机视觉', 'Computer Vision', 2, 32, 32, null, null, null, 24, 6, 'Y', '1月16日', '双语', null, null, 21);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (139, 'B0501670', '智能计算系统', 'AI Computing Systems', 2, 32, 32, null, null, null, null, 6, 'Y', '1月16日', null, null, null, 21);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (140, 'B0501570', '数据科学导论', 'Introduction of Data Science', 2, 32, 24, null, null, 8, null, 4, 'C', '1月16日', null, null, null, 22);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (141, 'B05******', '大数据原理及应用', 'Principles and applications of big data', 3, 48, 32, null, null, 16, 32, 5, 'Y', '1月16日', null, null, null, 22);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (142, 'B0505950', '大数据实用案例及分析', 'Big data Cases and Analysis ', 2, 32, 16, null, null, 16, 16, 6, 'C', '1月16日', null, null, null, 22);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (143, 'B050737s', '数据挖掘', 'Data Mining', 3, 48, 36, null, null, 12, 12, 5, 'C', '1月16日', '双语', null, null, 22);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (144, 'B05******', '数据可视化基础与应用', 'Basic and Application of Data Visualization', 3, 48, 32, null, null, 16, 16, 5, 'C', '1月16日', '双语', null, null, 22);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (145, 'B0501690', '网络安全原理与实践', 'Network Security Principles and Practices', 3, 48, 32, null, 16, null, 16, 6, 'Y', '1月16日', null, null, null, 23);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (146, 'B0504870', '信息安全技术', 'Information Security Technology', 3, 48, 36, null, null, 12, null, 6, 'Y', '1月16日', null, null, null, 23);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (147, 'B0500170', '网络编程', 'Network Programming', 3, 48, 32, null, null, 16, null, 6, 'C', '1月16日', null, null, null, 23);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (148, 'B0501790', '区块链技术原理与开发实战', 'Principles of  Blockchain and its application development', 3, 48, 32, null, null, 16, null, 5, 'C', '1月16日', null, null, null, 23);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (149, 'B0503260', '算法分析与设计', 'Analysis and Design of Algorithms', 3, 48, 32, null, null, 16, 16, 4, 'Y', '1月16日', null, null, null, 24);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (150, 'B05*****', '软件系统设计与体系架构', 'Software System Design and Architecture', 2, 32, 16, null, null, 16, 16, 5, 'C', '1月16日', null, null, null, 24);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (151, 'B0506430', '可视计算基础', 'Fundamental of Visible Computing', 3, 48, 36, null, null, 12, null, 5, 'C', '1月16日', null, null, null, 24);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (152, 'B0504770', '数字图像处理', 'Digital Image Processing', 2, 32, 24, null, null, 8, null, 5, 'C', '1月16日', null, null, null, 24);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (153, 'B0504060', '计算机图形学', 'Computer Graphics', 3, 48, 36, null, null, 12, 21, 4, 'C', '1月16日', null, null, null, 24);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (154, 'B0512060', 'ACM程序设计竞赛实训', 'ACM Programming Training', 3, 48, 48, null, null, null, null, 3, 'C', '1月16日', null, null, null, 24);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (155, 'B0502900', '服务外包竞赛实践', 'Practice of Service Outsourcing', 2, 32, 8, 24, null, null, null, 4, 'C', '1月16日', null, null, null, 24);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (156, 'B0714160', '数学建模', 'Mathematical Modelling', 2, 32, 32, null, null, null, null, 3, 'C', '1月16日', null, null, null, 24);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (157, 'B0504880', '云计算技术', 'Cloud Computing Technology', 3, 48, 38, null, null, 10, 20, 6, 'Y', '1月16日', null, null, null, 24);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (158, 'B05*****', '工业软件导论', 'Introduction to industrial software', 2, 32, 32, null, null, null, null, 2, 'C', '1月16日', null, null, null, 24);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (159, 'B050519s', '虚拟现实技术基础与应用', 'Basis and Application of Virtual Reality Technology', 3, 48, 32, null, null, 16, 16, 6, 'C', '1月16日', '全英文', null, null, 24);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (160, 'S0718060', '大学物理实验B', 'Experiments in College Physics B', 0, 16, null, null, 16, null, null, 3, 'C', '1月16日', null, null, null, 25);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (161, 'S05*****', '数据结构课程实践', 'Course Practice of Data Structure', 1, 24, null, null, null, 24, 24, 3, 'C', '1月16日', null, null, null, 25);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (162, 'S05*****', '数字电路课程设计', 'Digital Circuits Course Design', 1, 24, null, null, 24, null, 24, 3, 'C', '1月16日', null, null, null, 25);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (163, 'S05*****', '计算机组成原理课程设计（甲）', 'Course Design of Principle of Computer Organization（A）', 1, 24, null, null, 24, null, 24, 4, 'C', '1月16日', null, null, null, 25);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (164, 'S05*****', '操作系统课程实践', 'Course Practice for Operating System', 1, 24, null, null, null, 24, 24, 6, 'C', '1月16日', null, null, null, 25);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (165, 'S05*****', '编译原理课程实践', 'Course Practice for Compiler', 1, 24, null, null, null, 24, 24, 5, 'C', '1月16日', null, null, null, 25);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (166, 'S05*****', '计算机网络实验', 'Experiment of Computer Network ', 1, 24, null, null, 24, null, 24, 5, 'C', '1月16日', null, null, null, 25);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (167, 'S05*****', '软件工程课程设计', 'Course Practice for Software Engineering', 1, 24, null, null, null, 24, 24, 5, 'C', '1月16日', null, null, null, 25);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (168, 'S05*****', '数据库系统原理课程设计', 'Course Design for Database', 1, 24, null, null, null, 24, 24, 4, 'C', '1月16日', null, null, null, 25);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (169, 'S05*****', '创新实践1', 'Innovation Practice 1', 1, 24, null, null, 24, null, 24, 3, 'C', '1月16日', null, null, null, 25);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (170, 'S05*****', '创新实践2', 'Innovation Practice 2', 1, 24, null, null, 24, null, 24, 4, 'C', '1月16日', null, null, null, 25);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (171, 'S05*****', '创新实践3', 'Innovation Practice 3', 1, 24, null, null, 24, null, 24, 5, 'C', '1月16日', null, null, null, 25);
INSERT INTO course.course (course_eid, code, name, englishName, credits, total_hour, teacher_hour, practice_hour, experiment_hour, in_class, out_class, term, exam, start, remark, cou_expect_score, on_group, cou_parent_id) VALUES (172, 'S05*****', '创新综合实践', 'Comprehensive Innovation Practice', 1, 24, null, null, 24, null, 24, 6, 'C', '1月16日', null, null, null, 25);
