-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: qlkh
-- ------------------------------------------------------
-- Server version	8.0.21

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `CatID` int unsigned NOT NULL AUTO_INCREMENT,
  `CatName` varchar(50) COLLATE utf8_bin NOT NULL,
  `CatType` tinyint(1) NOT NULL,
  PRIMARY KEY (`CatID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Angular',1),(2,'JavaScript',1),(3,'React',1),(4,'NodeJs',1),(5,'Python',1),(6,'Kotlin',0),(7,'Swift',0),(8,'React Native',0),(9,'Android',0),(10,'Redux',0);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `count`
--

DROP TABLE IF EXISTS `count`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `count` (
  `CountID` int unsigned NOT NULL AUTO_INCREMENT,
  `CourseID` int NOT NULL,
  `ViewCount` int NOT NULL,
  `AvgStar` double DEFAULT NULL,
  `StudentCount` int DEFAULT NULL,
  `Ratings` int DEFAULT NULL,
  PRIMARY KEY (`CountID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `count`
--

LOCK TABLES `count` WRITE;
/*!40000 ALTER TABLE `count` DISABLE KEYS */;
INSERT INTO `count` VALUES (1,1,1,4.7,383446,91291),(2,2,2,4.6,333194,98158),(3,3,1,4.6,445464,135252),(4,4,3,4.7,214140,53431),(5,5,1,4.6,1176620,335440),(6,6,4,4.3,26742,3920),(7,7,1,4.8,195656,54167),(8,8,2,4.6,138376,35632),(9,9,1,4.4,147881,27221),(10,10,3,4.7,216464,63721);
/*!40000 ALTER TABLE `count` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coursedetails`
--

DROP TABLE IF EXISTS `coursedetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coursedetails` (
  `CourseID` int unsigned NOT NULL AUTO_INCREMENT,
  `CouseID` int NOT NULL,
  `FullImg` varchar(255) COLLATE utf8_bin NOT NULL,
  `TinyDes` text COLLATE utf8_bin NOT NULL,
  `FullDes` mediumtext COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`CourseID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coursedetails`
--

LOCK TABLES `coursedetails` WRITE;
/*!40000 ALTER TABLE `coursedetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `coursedetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `CourseID` int unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) COLLATE utf8_bin NOT NULL,
  `CatID` int NOT NULL,
  `TeacherID` int NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `DateCreate` date NOT NULL,
  `Price` double NOT NULL,
  PRIMARY KEY (`CourseID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'The Complete JavaScript Course 2020: From Zero to Expert!',2,1,0,'2020-12-22',129.99),(2,'React - The Complete Guide (incl Hooks, React Router, Redux)',3,1,0,'2020-12-22',129.99),(3,'Angular - The Complete Guide (2020 Edition)',1,1,0,'2020-12-22',129.99),(4,'The Complete Node.js Developer Course (3rd Edition)',4,1,0,'2020-12-22',84.99),(5,'2020 Complete Python Bootcamp From Zero to Hero in Python',5,1,0,'2020-12-22',129.99),(6,'Android App Development Masterclass using Kotlin',6,1,0,'2020-12-22',99.99),(7,'iOS & Swift - The Complete iOS App Development Bootcamp',7,1,0,'2020-12-22',129.99),(8,'The Complete React Native + Hooks Course [2020 Edition]',8,1,0,'2020-12-22',94.99),(9,'The Complete Android N Developer Course',9,1,0,'2020-12-22',129.99),(10,'Modern React with Redux [2020 Update]',10,1,0,'2020-12-22',129.99);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cousecontents`
--

DROP TABLE IF EXISTS `cousecontents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cousecontents` (
  `ContentID` int unsigned NOT NULL AUTO_INCREMENT,
  `CourseID` int NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Video` varchar(255) NOT NULL,
  PRIMARY KEY (`ContentID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cousecontents`
--

LOCK TABLES `cousecontents` WRITE;
/*!40000 ALTER TABLE `cousecontents` DISABLE KEYS */;
/*!40000 ALTER TABLE `cousecontents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedback` (
  `FeedbackID` int unsigned NOT NULL AUTO_INCREMENT,
  `StudentID` int NOT NULL,
  `CourseID` int NOT NULL,
  `Star` int NOT NULL,
  `Comment` text COLLATE utf8_bin,
  PRIMARY KEY (`FeedbackID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetails`
--

DROP TABLE IF EXISTS `orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetails` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT,
  `OrderID` int NOT NULL,
  `CourseID` int NOT NULL,
  `Price` double NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (1,1,1,129.99),(2,1,2,129.99),(3,1,3,129.99),(4,1,4,84.99),(5,1,5,129.99),(6,1,6,94.99),(7,1,7,129.99),(8,1,8,94.99),(9,1,9,129.99),(10,1,10,129.99);
/*!40000 ALTER TABLE `orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `OrderID` int unsigned NOT NULL AUTO_INCREMENT,
  `OrderDate` date NOT NULL,
  `UserID` int NOT NULL,
  `Total` double NOT NULL,
  PRIMARY KEY (`OrderID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2020-12-22',2,1184.9);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registeredcourses`
--

DROP TABLE IF EXISTS `registeredcourses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registeredcourses` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT,
  `StudentID` int NOT NULL,
  `CourseID` int NOT NULL,
  `IsFav` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registeredcourses`
--

LOCK TABLES `registeredcourses` WRITE;
/*!40000 ALTER TABLE `registeredcourses` DISABLE KEYS */;
/*!40000 ALTER TABLE `registeredcourses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `UserID` int unsigned NOT NULL AUTO_INCREMENT,
  `Username` varchar(50) COLLATE utf8_bin NOT NULL,
  `Password` varchar(255) COLLATE utf8_bin NOT NULL,
  `Name` varchar(50) COLLATE utf8_bin NOT NULL,
  `Email` varchar(50) COLLATE utf8_bin NOT NULL,
  `Permission` int NOT NULL,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'teacher','teacher','Lê Minh Hiếu','leminhhieust@gmail.com',1),(2,'student','student','Trần Thanh Hiền','tranthanhhien@gmail.com',2);
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

-- Dump completed on 2020-12-23 11:15:57
