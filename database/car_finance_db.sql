-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 31, 2026 at 08:06 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `car_finance_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `id` int(11) NOT NULL,
  `vehicle_type` varchar(50) DEFAULT NULL,
  `driving_licence` varchar(50) DEFAULT NULL,
  `marital_status` varchar(50) DEFAULT NULL,
  `date_of_birth` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`date_of_birth`)),
  `addresses` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`addresses`)),
  `employments` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`employments`)),
  `monthly_income` varchar(50) DEFAULT NULL,
  `loan_amount` decimal(10,2) DEFAULT NULL,
  `title` varchar(20) DEFAULT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`id`, `vehicle_type`, `driving_licence`, `marital_status`, `date_of_birth`, `addresses`, `employments`, `monthly_income`, `loan_amount`, `title`, `first_name`, `last_name`, `email`, `phone`, `created_at`) VALUES
(1, 'Car', 'Full UK', 'Married', '{\"day\":\"01\",\"month\":\"02\",\"year\":\"2005\"}', '[{\"address\":\"258 King Henrys Drive, New Addington, Croydon, CR0 0AA\",\"residentialStatus\":\"Private Tenant\",\"duration\":{\"years\":\"3\",\"months\":\"\"}}]', '[{\"employmentStatus\":\"Retired\",\"employmentDetails\":{\"jobTitle\":\"\",\"employerName\":\"\",\"workLocation\":\"\"},\"workDuration\":{\"years\":\"1\",\"months\":\"\"}}]', '2000', 100000.00, 'Mr', 'Bhavik', 'kukadiya', 'bhavik@gmail.com', '0191919191', '2026-03-31 05:24:00'),
(2, 'Van', 'Full UK', 'Single', '{\"day\":\"01\",\"month\":\"01\",\"year\":\"2005\"}', '[{\"address\":\"258 King Henrys Drive, New Addington, Croydon, CR0 0AA\",\"residentialStatus\":\"Home Owner\",\"duration\":{\"years\":\"2\",\"months\":\"\"}},{\"address\":\"\",\"residentialStatus\":\"Living with Parents\",\"duration\":{\"years\":\"10\",\"months\":\"\"},\"previousAddress\":\"Bhalka,verval ,gir simnath \"}]', '[{\"employmentStatus\":\"Part-Time\",\"employmentDetails\":{\"jobTitle\":\"counter\",\"employerName\":\"kukadiya bhavik\",\"workLocation\":\"veraval\"},\"workDuration\":{\"years\":\"\",\"months\":\"6\"}},{\"employmentStatus\":\"Part-Time\",\"employmentDetails\":{\"jobTitle\":\"helper\",\"employerName\":\"kukadiya bhavik\",\"workLocation\":\"veraval\"},\"workDuration\":{\"years\":\"\",\"months\":\"6\"}}]', '8000', 100000.00, 'Mr', 'Bhavik', 'Kukadiya ', 'bhavik@gmail.com', '0909000923', '2026-03-31 05:32:54'),
(3, 'Car', 'Full UK', 'Married', '{\"day\":\"01\",\"month\":\"01\",\"year\":\"2005\"}', '[{\"address\":\"256 King Henrys Drive, New Addington, Croydon, CR0 0AA\",\"residentialStatus\":\"Private Tenant\",\"duration\":{\"years\":\"3\",\"months\":\"\"}}]', '[{\"employmentStatus\":\"Full-Time\",\"employmentDetails\":{\"jobTitle\":\"it\",\"employerName\":\"bhavik\",\"workLocation\":\"london\"},\"workDuration\":{\"years\":\"\",\"months\":\"1\"}},{\"employmentStatus\":\"Self-Employed\",\"employmentDetails\":{\"jobTitle\":\"it\",\"employerName\":\"\",\"workLocation\":\"veraval\"},\"workDuration\":{\"years\":\"\",\"months\":\"1\"}},{\"employmentStatus\":\"Part-Time\",\"employmentDetails\":{\"jobTitle\":\"it \",\"employerName\":\"bhavik\",\"workLocation\":\"london\"},\"workDuration\":{\"years\":\"\",\"months\":\"1\"}},{\"employmentStatus\":\"Disability\",\"employmentDetails\":{\"jobTitle\":\"\",\"employerName\":\"\",\"workLocation\":\"\"},\"workDuration\":{\"years\":\"\",\"months\":\"1\"}},{\"employmentStatus\":\"Retired\",\"employmentDetails\":{\"jobTitle\":\"\",\"employerName\":\"\",\"workLocation\":\"\"},\"workDuration\":{\"years\":\"\",\"months\":\"1\"}},{\"employmentStatus\":\"Student\",\"employmentDetails\":{\"jobTitle\":\"\",\"employerName\":\"\",\"workLocation\":\"\"},\"workDuration\":{\"years\":\"\",\"months\":\"1\"}},{\"employmentStatus\":\"Family Carer\",\"employmentDetails\":{\"jobTitle\":\"\",\"employerName\":\"\",\"workLocation\":\"\"},\"workDuration\":{\"years\":\"\",\"months\":\"1\"}},{\"employmentStatus\":\"Agency Worker\",\"employmentDetails\":{\"jobTitle\":\"helper\",\"employerName\":\"bhavik kukadiay\",\"workLocation\":\"veraval\"},\"workDuration\":{\"years\":\"\",\"months\":\"1\"}},{\"employmentStatus\":\"Sub-Contractor\",\"employmentDetails\":{\"jobTitle\":\"it\",\"employerName\":\"bhavk]ik\",\"workLocation\":\"london\"},\"workDuration\":{\"years\":\"\",\"months\":\"1\"}},{\"employmentStatus\":\"Homemaker\",\"employmentDetails\":{\"jobTitle\":\"\",\"employerName\":\"\",\"workLocation\":\"\"},\"workDuration\":{\"years\":\"\",\"months\":\"6\"}},{\"employmentStatus\":\"Armed Forces\",\"employmentDetails\":{\"jobTitle\":\"computer\",\"employerName\":\"\",\"workLocation\":\"veraval\"},\"workDuration\":{\"years\":\"\",\"months\":\"1\"}},{\"employmentStatus\":\"Not Employed\",\"employmentDetails\":{\"jobTitle\":\"\",\"employerName\":\"\",\"workLocation\":\"\"},\"workDuration\":{\"years\":\"\",\"months\":\"1\"}}]', '2000', 100.00, 'Mr', 'bhavik', 'kkuadiya', 'bhavik@gmail.com', '0909090909', '2026-03-31 05:42:30'),
(4, 'Bike', 'EU Licence', 'Civil Partnership', '{\"day\":\"14\",\"month\":\"11\",\"year\":\"2000\"}', '[{\"address\":\"258 King Henrys Drive, New Addington, Croydon, CR0 0AA\",\"residentialStatus\":\"Council Tenant\",\"duration\":{\"years\":\"3\",\"months\":\"\"}}]', '[{\"employmentStatus\":\"Family Carer\",\"employmentDetails\":{\"jobTitle\":\"\",\"employerName\":\"\",\"workLocation\":\"\"},\"workDuration\":{\"years\":\"3\",\"months\":\"\"}}]', '34343', 34343.00, 'Mrs', 'bhavik', 'kukadiya', 'bhavik@gmail.com', '9012490910', '2026-03-31 05:51:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
