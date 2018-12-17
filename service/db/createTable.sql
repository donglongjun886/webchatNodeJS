create database wechat;

CREATE TABLE `reserver` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '自增序列',
  `openid` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '用户编号',
  `user_name` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '客户姓名',
  `user_phone` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '客户电话',
  `reserver_time` datetime DEFAULT NULL COMMENT '预约时间',
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='预约表';

CREATE TABLE `token` (
  `access_token` varchar(200) COLLATE utf8_bin NOT NULL COMMENT '令牌',
  `expires_in` varchar(10) COLLATE utf8_bin NOT NULL COMMENT '有效期',
  `refresh_token` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '刷新参数',
  `openid` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '用户编号',
  `scope` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '作用域',
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '令牌建立时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='微信令牌表';
