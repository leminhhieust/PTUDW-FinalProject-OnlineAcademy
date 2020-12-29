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
  PRIMARY KEY (`CatID`),
  FULLTEXT KEY `ftx_categories` (`CatName`)
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
INSERT INTO `count` VALUES (1,1,1,4.5,2,2),(2,2,1,4,2,2),(3,3,1,4.5,2,2),(4,4,1,4.5,2,2),(5,5,1,5,2,2),(6,6,1,5,2,2),(7,7,1,4.5,2,2),(8,8,1,4.5,2,2),(9,9,1,4,2,2),(10,10,1,4.5,2,2);
/*!40000 ALTER TABLE `count` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coursecontent`
--

DROP TABLE IF EXISTS `coursecontent`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coursecontent` (
  `ContentID` int unsigned NOT NULL AUTO_INCREMENT,
  `Index` int NOT NULL,
  `CourseID` int NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Video` varchar(255) NOT NULL,
  PRIMARY KEY (`ContentID`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coursecontent`
--

LOCK TABLES `coursecontent` WRITE;
/*!40000 ALTER TABLE `coursecontent` DISABLE KEYS */;
INSERT INTO `coursecontent` VALUES (1,1,1,'Introduction','https://www.youtube.com/embed/uDwSnnhl1Ng'),(2,2,1,'Why you should Learn JavaScript Today','https://www.youtube.com/embed/uxWO8Sd8PoY'),(3,3,1,'What is Dom? | Document Object Model','https://www.youtube.com/embed/_GxpmQ54aqg'),(4,1,2,'Introduction','https://www.youtube.com/embed/OxIDLw0M-m0'),(5,2,2,'How React Works','https://www.youtube.com/embed/pKYiKbf7sP0'),(6,3,2,'React Setup (with CDN)','https://www.youtube.com/embed/SAX6RMEFVM4'),(7,1,3,'Introduction','https://www.youtube.com/embed/9CVZks6U0ZY'),(8,2,3,'Install','https://www.youtube.com/embed/JHEx7ksuz74'),(9,3,3,'File and folder structure','https://www.youtube.com/embed/q4fBJtnbqk8'),(10,1,4,'Introduction','https://www.youtube.com/embed/w-7RQ46RgxU'),(11,2,4,'Installing Node JS','https://www.youtube.com/embed/1US-P13yKVs'),(12,3,4,'The V8 Engine','https://www.youtube.com/embed/86tgU7UaJmU'),(13,1,5,'Introduction','https://www.youtube.com/embed/QXeEoD0pB3E'),(14,2,5,'Python Installation | PyCharm','https://www.youtube.com/embed/mbryl4MZJms'),(15,3,5,'Getting Started with Python','https://www.youtube.com/embed/DWgzHbglNIo'),(16,1,6,'Introduction','https://www.youtube.com/embed/iC8LRjd67Ds'),(17,2,6,'How to Install JAVA JDK for Coding in Kotlin','https://www.youtube.com/embed/toesg2HLMSs'),(18,3,6,'Installing INTELLIJ IDEA','https://www.youtube.com/embed/mcCt-Dv1lg8'),(19,1,7,'Introduction','https://www.youtube.com/embed/83WXmhin_LU'),(20,2,7,'iOS Developer Program','https://www.youtube.com/embed/qnn1paWC_pA'),(21,3,7,'Installing Xcode 6','https://www.youtube.com/embed/olojIbPqos4'),(22,1,8,'Introduction','https://www.youtube.com/embed/cF2lQ_gZeA8'),(23,2,8,'useState Hook','https://www.youtube.com/embed/lAW1Jmmr9hc'),(24,3,8,'useState with previous state','https://www.youtube.com/embed/d0plTCQgsXs'),(25,1,9,'Introduction','https://www.youtube.com/embed/k9OGmWzy42s'),(26,2,9,'Installing Android Studio','https://www.youtube.com/embed/OETAqWKIQ9Y'),(27,3,9,'Installing Android Studio Components','https://www.youtube.com/embed/XoJ13PS5JsM'),(28,1,10,'Introduction','https://www.youtube.com/embed/9boMnm5X9ak'),(29,2,10,'Getting Started','https://www.youtube.com/embed/0eluxklOZVo'),(30,3,10,'Three Core Concepts','https://www.youtube.com/embed/3rlUADfuKhQ');
/*!40000 ALTER TABLE `coursecontent` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `CourseID` int unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `CatID` int NOT NULL,
  `TeacherID` int NOT NULL,
  `Status` tinyint(1) NOT NULL,
  `DateCreate` date NOT NULL,
  `DateUpdate` date DEFAULT NULL,
  `Price` double NOT NULL,
  `TinyDes` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `FullDes` text COLLATE utf8mb4_general_ci NOT NULL,
  `IsFav` tinyint(1) NOT NULL,
  `BadgeNew` int NOT NULL,
  `BadgeBestSeller` int NOT NULL,
  PRIMARY KEY (`CourseID`),
  FULLTEXT KEY `ftx_courses` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (1,'The Complete JavaScript Course 2020: From Zero to Expert!',2,3,0,'2020-12-22','2020-12-22',129.99,'The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory. Many courses in one!','<p>For Beginners:</p>    <p>Learn JavaScript programming right from the fundamentals in a fun and easy way. If you are a beginner and want to learn JS, then this entire video series is exactly for you. In this complete JavaScript for beginners series we will learn -</p><ol><li>The core Basics & Fundamentals of JS</li><li>Syntax & Features of JS</li><li>Live JavaScript uses cases and Examples</li><li>Client Side Validations</li><li>GUI and visual effects</li><li>How to use 3rd Party JS libararies and a lot more.</li></ol><p><br></p>    <p>Some very basic pre-requisites are -</p><ol><li>Basic HTML knowledge</li><li>Basic CSS knowledge</li></ol>',1,0,0),(2,'React - The Complete Guide (incl Hooks, React Router, Redux)',3,4,0,'2020-12-22','2020-12-22',129.99,'Dive in and learn React.js from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!','',1,0,0),(3,'Angular - The Complete Guide (2020 Edition)',1,5,0,'2020-12-22','2020-12-22',129.99,'Master Angular 10 (formerly \"Angular 2\") and build awesome, reactive web apps with the successor of Angular.js','',0,0,0),(4,'The Complete Node.js Developer Course (3rd Edition)',4,4,0,'2020-12-22','2020-12-22',84.99,'Learn Node.js by building real-world applications with Node, Express, MongoDB, Jest, and more!','',0,0,0),(5,'2020 Complete Python Bootcamp From Zero to Hero in Python',5,3,0,'2020-12-22','2020-12-22',129.99,'Learn Python like a Professional Start from the basics and go all the way to creating your own applications and games','',0,0,0),(6,'Android App Development Masterclass using Kotlin',6,6,0,'2020-12-22','2020-12-22',99.99,'Learn Kotlin Android App Development And Become an Android Developer. Incl. Kotlin Tutorial and Android Tutorial Videos','',0,0,0),(7,'iOS & Swift - The Complete iOS App Development Bootcamp',7,7,0,'2020-12-22','2020-12-22',129.99,'From Beginner to iOS App Developer with Just One Course! Fully Updated with a Comprehensive Module Dedicated to SwiftUI!','',0,0,0),(8,'The Complete React Native + Hooks Course [2020 Edition]',8,8,0,'2020-12-22','2020-12-22',94.99,'Understand React Native v0.62.2 with Hooks, Context, and React Navigation.','',0,0,0),(9,'The Complete Android N Developer Course',9,9,0,'2020-12-22','2020-12-22',129.99,'Learn Android App Development with Android 7 Nougat by building real apps including Uber, Whatsapp and Instagram!','',0,0,0),(10,'Modern React with Redux [2020 Update]',10,8,0,'2020-12-22','2020-12-22',129.99,'Master React v16.6.3 and Redux with React Router, Webpack, and Create-React-App. Includes Hooks!','',0,0,0);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
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
  `Star` int DEFAULT NULL,
  `Comment` text COLLATE utf8_bin,
  PRIMARY KEY (`FeedbackID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback`
--

LOCK TABLES `feedback` WRITE;
/*!40000 ALTER TABLE `feedback` DISABLE KEYS */;
INSERT INTO `feedback` VALUES (1,10,1,5,'It is an amazing course, earlier I didn\'t have the confidence to work on UI but after this course, I have the confidence that I can build and understand the code that is written by any JS developer.'),(2,10,2,4,'It was great. Occasionally got overly complicated and seemed to show a way to do things that weren\'t the simplest, most logical way. But great overall.'),(3,10,3,4,'Some parts of the course are still using old versions packages, Feels like, he is just changing the Name of the course only. But overall It is a Great course.'),(4,10,4,5,'Great teacher, clear and precise explanations. It has a lot of contents, although so far i can\'t say If it covers a great amount of subject to consider a complete course. However it helps you to learn the basics.'),(5,10,5,5,'This course is fantastic! I learned so much so far, and I knew nothing about any programming languages.'),(6,11,1,4,'Very Awesome !! explained the java script the way a programmer should think and program , very good , i loved it'),(7,11,2,4,'This course was great to supplement the coding boot camp I went to! Starts off with the basics but it gets pretty advanced in a hurry.'),(8,11,3,5,'This course is a comprehensive compendium of knowledge about Angular. Interesting examples, understandable explanation. I recommend this course.'),(9,11,4,4,'One to best tutorial to get started in backend. Very good explanation and best for beginner those who want to learn nodejs.'),(10,11,5,5,'I enjoyed learning at my pace. I am glad that I could grow my skills as a new programmer!'),(11,12,6,5,'A very comprehensive and well explained course. Certainly it helped me to become a better and more prepared android developer. Thanks a lot Tim. I totally recommend.'),(12,12,7,5,'It was amazing experience for me .The course gave a good refresh of certain aspects of app development . Coming from the android app development background i was able relate and distinguish in most of the sections . It was an all in one package for a beginner in IOS development.'),(13,12,8,4,'All the initial tutorials have demo code attached to it. After that there are lots of tutorials which are outdated and don\'t have tutorials and hard to find a compatible match on the web.'),(14,12,9,4,'There is almost no information on how to build a modern (or any proper) user interface, with smooth transitions and data movement. Applications in the examples are non-scalable :/'),(15,12,10,4,'If is someone winning at final(the last sign r x y) ... it throw us the draw pop-up.... + we don\'t recieve any answers to the question we\'ve put ....'),(16,13,6,5,'Great course. Bit of a change of pace with lecturers changing half way through but I feel as though this is a great grounding for your own projects. Thanks Tim, David and Jean-Paul!'),(17,13,7,4,'Amazing course, it doesn’t get much better than this for this price it’s a steal, Angela does a really good job explaining things, worth every cent!'),(18,13,8,5,'This course is not updated. In the last app, I spent most of the time fixing bugs. Its better to go through medium/blogs to build small apps'),(19,13,9,4,'It\'s an amazingly well organized detailed course. It would be great if this course also adds a way typescript is used in building react applications for the basic libraries used here.'),(20,13,10,5,'Stephen has extraordinary talent in both on the subject and on teaching. He went into minute details of each concept and explained. This is definitely one of the best courses on ReactJS.');
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetails`
--

LOCK TABLES `orderdetails` WRITE;
/*!40000 ALTER TABLE `orderdetails` DISABLE KEYS */;
INSERT INTO `orderdetails` VALUES (1,1,1,129.99),(2,1,2,129.99),(3,1,3,129.99),(4,1,4,84.99),(5,1,5,129.99),(6,2,1,129.99),(7,2,2,129.99),(8,2,3,129.99),(9,2,4,84.99),(10,2,5,129.99),(11,3,6,99.99),(12,3,7,129.99),(13,3,8,94.99),(14,3,9,129.99),(15,3,10,129.99),(16,4,6,99.99),(17,4,7,129.99),(18,4,8,94.99),(19,4,9,129.99),(20,4,10,129.99);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'2020-12-22',10,0),(2,'2020-12-22',11,0),(3,'2020-12-22',12,0),(4,'2020-12-22',13,0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('y6-sFVdHEkLiGs1HLp7k5rtbESBdM-cz',1609337956,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"isAuth\":false,\"authUser\":null}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
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
  `DOB` date NOT NULL,
  `Des` text COLLATE utf8_bin,
  PRIMARY KEY (`UserID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','$2a$10$y255tnLYzrUk4i5CAQngcObkp3zfdFvlYlkpSBAfAzTM3hp6cwfg.','Administrator','leminhhieust@gmail.com',0,'2020-12-26',NULL),(2,'teacher','$2a$10$Bk2J3lYwn2aLmGWvQ.UQPeaKy4pPaaBo0cbu0q7ip55B1hfX6GPnm','Example Teacher','example@gmail.com',1,'1986-05-15',NULL),(3,'teacher1','$2a$10$8F074KknhuTelhWeEfMwXumUNBhDZ2jtnNp2X3R7UVTmD2tz6BEC.','Telusko','example1@gmail.com',1,'1980-12-29','I\'m a full-stack web developer and designer with a passion for building beautiful things from scratch. I\'ve been building websites and apps since 2007 and also have a Master\'s degree in Engineering.'),(4,'teacher2','$2a$10$2znk6uNDod0RfWWyhqaosuVSX.cv1YOsjuXhDWiRDQ8kvBaGh/dQe','The Net Ninja','example2@gmail.com',1,'1990-06-19','As a self-taught professional I really know the hard parts and the difficult topics when learning new or improving on already-known languages. This background and experience enables me to focus on the most relevant key concepts and topics. My track record of many 5-star rated courses, more than 700,000 students on Udemy as well as a successful YouTube channel is the best proof for that.'),(5,'teacher3','$2a$10$ESmJy9ucehEWBVr1gAIjHufwer9L2C1lW88Q4HAFRI4oxlrzBU./2','Code Step By Step','example3@gmail.com',1,'1980-06-19','Starting out at the age of 13 I never stopped learning new programming skills and languages. Early I started creating websites for friends and just for fun as well. Besides web development I also explored Python and other non-web-only languages. This passion has since lasted and lead to my decision of working as a freelance web developer and consultant. The success and fun I have in this job is immense and really keeps that passion burningly alive.'),(6,'teacher4','$2a$10$3WPu431yT62pAzxS53MVdusTa/kflCW.en5VTZW0VvSZ4ZF2c0Js6','Smartherd','example4@gmail.com',1,'1992-04-25','I have gained experience in a wide range of industries including Utilities, Retail, Insurance and the Motor Manufacturing industry. My clients and employers have included Northumbrian Water, Arcadia, Royal Sun Alliance, Nissan and Jaguar Landrover. I also worked for Sunderland University for 3 years preparing and delivering training courses in computing.'),(7,'teacher5','$2a$10$VUfvsA.mYXRuvfgPNKnN..VBrEtmz214j/WemDsYfcMk3lU7HwLtG','thenewboston','example5@gmail.com',1,'1992-06-05','I\'m a developer with a passion for teaching. I\'m the lead instructor at the London App Brewery, London\'s leading Programming Bootcamp. I\'ve helped hundreds of thousands of students learn to code and change their lives by becoming a developer. I\'ve been invited by companies such as Twitter, Facebook and Google to teach their employees.'),(8,'teacher6','$2a$10$Ibt.Df8JCM7hjicax0/u0uyCqk5XJnxkGWOf6qLys1zw7uvc9zdJi','Codevolution','example6@gmail.com',1,'1992-06-05','Stephen Grider has been building complex Javascript front ends for top corporations in the San Francisco Bay Area.  With an innate ability to simplify complex topics, Stephen has been mentoring engineers beginning their careers in software development for years, and has now expanded that experience onto Udemy, authoring the highest rated React course. He teaches on Udemy to share the knowledge he has gained with other software engineers.  Invest in yourself by learning from Stephen\'s published employees.'),(9,'teacher7','$2a$10$EdUXhn6FAsflLL0/hznczO.27YdPQUpFgsjhlMno2b56l9ankvZei','HBSS','example7@gmail.com',1,'1995-04-19','As a self-taught professional I really know the hard parts and the difficult topics when learning new or improving on already-known languages. This background and experience enables me to focus on the most relevant key concepts and topics. My track record of many 5-star rated courses, more than 700,000 students on Udemy as well as a successful YouTube channel is the best proof for that.'),(10,'student','$2a$10$JR1G3laG7m52K6Bbb5o9OeeJbgvBJxClNggiZGuC9eUJWoHVTJdSy','Student','example8@gmail.com',2,'1992-12-12',NULL),(11,'student1','$2a$10$SUyIsCR9A7LQNdveFfekBuWd5M039RQMiGo4TmIFeVaGJ1E2XYHIS','Student 1','example9@gmail.com',2,'1987-03-16',NULL),(12,'student2','$2a$10$KBPNUSA5VSgb4dEJEe21IeGB9DrUlOYT9cNMA4s7UnaOqmz1VxcaS','Student 2','example10@gmail.com',2,'1986-06-19',NULL),(13,'student3','$2a$10$h4vtFMau79nSI5vbCobfQu2qC1p1d7be22j0lNFLVNrQf6wPS0qzm','Student 3','example11@gmail.com',2,'1992-12-12',NULL);
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

-- Dump completed on 2020-12-29 21:23:59
