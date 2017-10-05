-- MySQL dump 10.13  Distrib 5.7.18, for Linux (x86_64)
--
-- Host: localhost    Database: autodeployment
-- ------------------------------------------------------
-- Server version	5.7.18-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `action_tokens`
--

DROP TABLE IF EXISTS `action_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `action_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `type` enum('verify-email','forgot-password') DEFAULT NULL,
  `expiredOn` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  UNIQUE KEY `action_tokens_token_unique` (`token`),
  KEY `userId` (`userId`),
  CONSTRAINT `action_tokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `action_tokens`
--

LOCK TABLES `action_tokens` WRITE;
/*!40000 ALTER TABLE `action_tokens` DISABLE KEYS */;
INSERT INTO `action_tokens` VALUES (1,'589bed6359fc7525494f9b73c75e68da','verify-email','2017-04-27 16:25:17','2017-04-26 16:25:17','2017-04-26 16:25:17',1);
/*!40000 ALTER TABLE `action_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applications` (
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `organizationId` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `ami` varchar(255) NOT NULL,
  `sshUser` varchar(255) DEFAULT NULL,
  `accessKey` varchar(255) NOT NULL,
  `accessSecretKey` varchar(255) NOT NULL,
  `instanceType` varchar(255) DEFAULT NULL,
  `region` varchar(255) NOT NULL,
  `securityGroup` varchar(255) DEFAULT NULL,
  `subnet` varchar(255) NOT NULL,
  `vpc` varchar(255) NOT NULL,
  `zone` varchar(255) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `github` varchar(255) NOT NULL,
  `instanceName` varchar(255) NOT NULL,
  `configFile` varchar(255) NOT NULL,
  `configFilePath` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES ('4f3e3b10-2ce9-11e7-be5e-a971ad30cc57','cc7604f0-2aa0-11e7-b06f-d7863b545409n','Application 1','Lorem Ipsum is simply dummy text of the printing and typesetting industry.\nLorem Ipsum is simply dummy text of the printing and typesetting industry.','ami-40d28157',NULL,'AKIAIGCXEAAIUOMYGCYQ','mpwnkiyRZwIoTsbhuDZLbyQHBPkYILi4ZiCMpKSs',NULL,'us-east-1',NULL,'subnet-8f1da3f8','vpc-ac34a9c9','c',NULL,NULL,'git@bitbucket.org:codeonco/tarabalamnew.git','tarabalam','https://s3.amazonaws.com/qpairboto/codedeploy/tarabalam/deploy.env','src/config/env/.deploy.json','2017-04-29 14:37:02','2017-05-01 13:04:33'),('5fc27830-2e6e-11e7-b8ba-fdd90f930b6f','cc7604f0-2aa0-11e7-b06f-d7863b545409n','Application 2','This is the description of second app','ami-40d28157',NULL,'AKIAJUSPBWGPMJNLZXSA','eDEiUz9MVaHnzMxgbfI9VlMX+z5QmxulG9k8btJU',NULL,'us-east-1',NULL,'subnet-8f1da3f8','vpc-ac34a9c9','c',NULL,NULL,'git@bitbucket.org:codeonco/tarabalamnew.git','tarabalam','https://s3.amazonaws.com/qpairboto/codedeploy/tarabalam/deploy.env','src/config/env/.deploy.json','2017-05-01 13:02:04','2017-05-01 13:04:40');
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `builds`
--

DROP TABLE IF EXISTS `builds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `builds` (
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `organizationId` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text,
  `ami` varchar(255) NOT NULL,
  `sshUser` varchar(255) DEFAULT NULL,
  `accessKey` varchar(255) NOT NULL,
  `accessSecretKey` varchar(255) NOT NULL,
  `instanceType` varchar(255) DEFAULT NULL,
  `region` varchar(255) NOT NULL,
  `securityGroup` varchar(255) DEFAULT NULL,
  `subnet` varchar(255) NOT NULL,
  `vpc` varchar(255) NOT NULL,
  `zone` varchar(255) NOT NULL,
  `tags` varchar(255) DEFAULT NULL,
  `profile` varchar(255) DEFAULT NULL,
  `github` varchar(255) NOT NULL,
  `instanceName` varchar(255) NOT NULL,
  `configFile` varchar(255) NOT NULL,
  `configFilePath` varchar(255) NOT NULL,
  `applicationId` varchar(255) DEFAULT NULL,
  `status` enum('pending','deploying','finished','failed') DEFAULT 'pending',
  `domain` varchar(255) DEFAULT NULL,
  `log` text,
  `machineName` varchar(255) DEFAULT NULL,
  `machineIP` varchar(128) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `builds`
--

LOCK TABLES `builds` WRITE;
/*!40000 ALTER TABLE `builds` DISABLE KEYS */;
/*!40000 ALTER TABLE `builds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credentials`
--

DROP TABLE IF EXISTS `credentials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `credentials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `identifier` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `json` json DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `credentials_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credentials`
--

LOCK TABLES `credentials` WRITE;
/*!40000 ALTER TABLE `credentials` DISABLE KEYS */;
INSERT INTO `credentials` VALUES (1,'local','$2a$10$ZqUIkq9C2PpuwKW8JgFmzOgHJNTAYbD.GwADUlUnJdzuLH/qn9YhG',NULL,NULL,NULL,NULL,'2017-04-26 16:25:17','2017-04-26 16:25:17',1);
/*!40000 ALTER TABLE `credentials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizationMemberships`
--

DROP TABLE IF EXISTS `organizationMemberships`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organizationMemberships` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `organizationId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizationMemberships`
--

LOCK TABLES `organizationMemberships` WRITE;
/*!40000 ALTER TABLE `organizationMemberships` DISABLE KEYS */;
INSERT INTO `organizationMemberships` VALUES (1,1,'cc7604f0-2aa0-11e7-b06f-d7863b545409n','2017-04-26 17:18:06','2017-04-26 17:18:06'),(2,1,'cc7604f0-2aa0-11e7-b06f-d7863b545409','2017-04-26 17:19:44','2017-04-26 17:19:44');
/*!40000 ALTER TABLE `organizationMemberships` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organizations`
--

DROP TABLE IF EXISTS `organizations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organizations` (
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organizations`
--

LOCK TABLES `organizations` WRITE;
/*!40000 ALTER TABLE `organizations` DISABLE KEYS */;
INSERT INTO `organizations` VALUES ('cc7604f0-2aa0-11e7-b06f-d7863b545409','Organization 1','Org description','2017-04-26 16:52:57','2017-04-26 16:52:57');
/*!40000 ALTER TABLE `organizations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `uuid` char(36) CHARACTER SET latin1 COLLATE latin1_bin NOT NULL,
  `organizationId` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES ('10a92020-2b65-11e7-a302-a10eaeb36ace','cc7604f0-2aa0-11e7-b06f-d7863b545409n','New Project 2','ABCDEF','2017-04-27 16:17:52','2017-04-27 16:17:52'),('876125b0-2b23-11e7-a523-f57c080f830d','cc7604f0-2aa0-11e7-b06f-d7863b545409n','Project 5','Project 1 description','2017-04-27 08:28:45','2017-04-27 09:00:34'),('ce4bbfd0-2b23-11e7-a523-f57c080f830d','cc7604f0-2aa0-11e7-b06f-d7863b545409n','Project 2','Project 2 description','2017-04-27 08:30:44','2017-04-27 08:30:44'),('dd8fc400-2b64-11e7-a302-a10eaeb36ace','cc7604f0-2aa0-11e7-b06f-d7863b545409n','new project','Project description','2017-04-27 16:16:27','2017-04-27 16:16:27');
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') DEFAULT 'USER',
  `emailVerified` tinyint(1) DEFAULT '0',
  `enabled` tinyint(1) DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Chuong','Tran','admin@admin.com','USER',0,1,'2017-04-26 16:25:17','2017-04-26 16:25:17');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-01 20:12:51
