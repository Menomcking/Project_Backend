-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2023 at 02:37 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `projectdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `ratings`
--

CREATE TABLE `ratings` (
  `id` int(11) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `usersId` int(11) DEFAULT NULL,
  `storyId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `story`
--

CREATE TABLE `story` (
  `id` int(11) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `rating` double NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `usersId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `story`
--

INSERT INTO `story` (`id`, `picture`, `rating`, `title`, `description`, `usersId`) VALUES
(1, 'www.kep.hu/kep1', 0, 'Egy jó történet', 'Egy jó leírás', 1),
(2, 'www.kep.hu/kep2', 0, 'Egy jó történet 2', 'Egy jó leírás 2', 2);

-- --------------------------------------------------------

--
-- Table structure for table `story_parts`
--

CREATE TABLE `story_parts` (
  `textPartId` int(11) NOT NULL,
  `textPart` text NOT NULL,
  `storyId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `story_parts`
--

INSERT INTO `story_parts` (`textPartId`, `textPart`, `storyId`) VALUES
(1, 'Egy jó szöveg', 1),
(2, 'Még egy jó szöveg', 1),
(3, 'Egy újabb jó szöveg', 1),
(4, 'Egy negyedik jó szöveg', 1),
(5, 'Egy jó szöveg 2', 2),
(6, 'Még egy jó szöveg 2', 2),
(7, 'Egy újabb jó szöveg 2', 2),
(8, 'Egy negyedik jó szöveg 2', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `commentsNumber` int(11) NOT NULL DEFAULT 0,
  `rating` double NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `commentsNumber`, `rating`) VALUES
(1, 'Testuser01', '$2b$10$i3bC.52J2pr/yATcGSY2qeE0/Oahi7Zwh91doiuO3gSDnoezP.tRG', 'testuser01@email.com', 0, 0),
(2, 'Testuser02', '$2b$10$3rIZByE92yxwRiyLeqPGnehVY.0d9KgSZZYBd52U/IYDm8eCXkjva', 'testuser02@email.com', 0, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ratings`
--
ALTER TABLE `ratings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_26e22323b9ec398a1aa11ba505a` (`usersId`),
  ADD KEY `FK_cb5423b4f0730eec6ecb637fd1f` (`storyId`);

--
-- Indexes for table `story`
--
ALTER TABLE `story`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_41de21d4d3cbfc414fa38c2b31f` (`usersId`);

--
-- Indexes for table `story_parts`
--
ALTER TABLE `story_parts`
  ADD PRIMARY KEY (`textPartId`),
  ADD KEY `FK_ba2786439cc867bdb69b9b5cb59` (`storyId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ratings`
--
ALTER TABLE `ratings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `story`
--
ALTER TABLE `story`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `story_parts`
--
ALTER TABLE `story_parts`
  MODIFY `textPartId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ratings`
--
ALTER TABLE `ratings`
  ADD CONSTRAINT `FK_26e22323b9ec398a1aa11ba505a` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_cb5423b4f0730eec6ecb637fd1f` FOREIGN KEY (`storyId`) REFERENCES `story` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `story`
--
ALTER TABLE `story`
  ADD CONSTRAINT `FK_41de21d4d3cbfc414fa38c2b31f` FOREIGN KEY (`usersId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `story_parts`
--
ALTER TABLE `story_parts`
  ADD CONSTRAINT `FK_ba2786439cc867bdb69b9b5cb59` FOREIGN KEY (`storyId`) REFERENCES `story` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
