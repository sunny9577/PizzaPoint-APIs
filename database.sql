-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 30, 2018 at 04:30 PM
-- Server version: 5.7.22-0ubuntu0.16.04.1
-- PHP Version: 7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `android_food_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `address`
--

CREATE TABLE `address` (
  `address_id` int(11) NOT NULL,
  `cust_id` int(11) NOT NULL,
  `cust_name` varchar(100) NOT NULL,
  `address_line_1` varchar(100) NOT NULL,
  `address_line_2` varchar(100) NOT NULL,
  `city` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `contact_number` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `uid` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `token` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Stand-in structure for view `ALL_ORDERS_VIEW`
--
CREATE TABLE `ALL_ORDERS_VIEW` (
`order_id` int(10)
,`status` varchar(100)
,`cust_fname` varchar(20)
,`cust_lname` varchar(20)
,`product_title` varchar(100)
,`order_date` date
,`payment_method` varchar(100)
,`address_line_1` varchar(100)
,`address_line_2` varchar(100)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `ALL_PRODUCTS_VIEW`
--
CREATE TABLE `ALL_PRODUCTS_VIEW` (
`product_id` int(11)
,`product_title` varchar(100)
,`product_des` varchar(1000)
,`product_image` varchar(1000)
,`category` varchar(20)
,`veg` tinyint(1)
,`resturant_location` varchar(200)
,`contact` varchar(20)
,`price` int(10)
,`currency` varchar(10)
,`home_delivery` tinyint(1)
,`pickup` tinyint(1)
,`in_stock` int(11)
,`available` tinyint(1)
);

-- --------------------------------------------------------

--
-- Table structure for table `banners`
--

CREATE TABLE `banners` (
  `banner_id` int(10) NOT NULL,
  `banner_title` varchar(100) NOT NULL,
  `banner_img_url` varchar(1000) NOT NULL DEFAULT 'http://localhost/backend/favicon.ico',
  `banner_target_url` varchar(1000) NOT NULL,
  `active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Stand-in structure for view `CANCELED_ORDERS_VIEW`
--
CREATE TABLE `CANCELED_ORDERS_VIEW` (
`order_id` int(10)
,`cust_fname` varchar(20)
,`cust_lname` varchar(20)
,`product_title` varchar(100)
,`order_date` date
,`payment_method` varchar(100)
,`address_line_1` varchar(100)
,`address_line_2` varchar(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `cust_id` int(11) NOT NULL DEFAULT '0',
  `product_id` int(11) NOT NULL DEFAULT '0',
  `quantity` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `cid` int(11) NOT NULL,
  `cat_name` varchar(100) NOT NULL,
  `priority` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `city_id` int(11) NOT NULL,
  `city_name` varchar(30) NOT NULL,
  `state_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `currency_id` int(11) NOT NULL,
  `currency_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Stand-in structure for view `DELIVERED_ORDERS_VIEW`
--
CREATE TABLE `DELIVERED_ORDERS_VIEW` (
`order_id` int(10)
,`cust_fname` varchar(20)
,`cust_lname` varchar(20)
,`product_title` varchar(100)
,`order_date` date
,`payment_method` varchar(100)
,`address_line_1` varchar(100)
,`address_line_2` varchar(100)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `FCM_NOTIFICATION_VIEW`
--
CREATE TABLE `FCM_NOTIFICATION_VIEW` (
`order_id` int(10)
,`product_title` varchar(100)
,`fcm_token` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `gift_vouchers`
--

CREATE TABLE `gift_vouchers` (
  `voucher_id` int(11) NOT NULL,
  `voucher_code` varchar(100) NOT NULL,
  `voucher_pin` int(11) NOT NULL,
  `voucher_value` int(11) NOT NULL,
  `voucher_currency` varchar(100) NOT NULL,
  `voucher_status` varchar(15) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=COMPACT;

-- --------------------------------------------------------

--
-- Stand-in structure for view `INVOICE_VIEW`
--
CREATE TABLE `INVOICE_VIEW` (
`order_id` int(10)
,`payment_method` varchar(100)
,`order_date` date
,`order_total` varchar(10)
,`final_price` varchar(10)
,`promo` varchar(10)
,`voucher` varchar(10)
,`contact_number` varchar(100)
,`cust_name` varchar(100)
,`address_line_1` varchar(100)
,`address_line_2` varchar(100)
,`city_name` varchar(30)
,`state_name` varchar(30)
,`product_title` varchar(100)
,`voucher_value` int(11)
);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(10) NOT NULL,
  `cust_id` int(11) NOT NULL,
  `ordered_product` varchar(10) NOT NULL,
  `order_date` date NOT NULL,
  `payment_method` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `shipped_to` int(11) NOT NULL,
  `order_total` varchar(10) NOT NULL,
  `final_price` varchar(10) NOT NULL,
  `promo` varchar(10) NOT NULL,
  `voucher` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Stand-in structure for view `PENDING_ORDERS_VIEW`
--
CREATE TABLE `PENDING_ORDERS_VIEW` (
`order_id` int(10)
,`cust_fname` varchar(20)
,`cust_lname` varchar(20)
,`product_title` varchar(100)
,`order_date` date
,`payment_method` varchar(100)
,`address_line_1` varchar(100)
,`address_line_2` varchar(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_title` varchar(100) NOT NULL,
  `product_des` varchar(1000) NOT NULL,
  `product_image` varchar(1000) NOT NULL,
  `category` varchar(20) NOT NULL,
  `veg` tinyint(1) NOT NULL,
  `resturant_location` varchar(200) NOT NULL,
  `contact` varchar(20) NOT NULL,
  `price` int(10) NOT NULL,
  `currency` varchar(10) NOT NULL,
  `home_delivery` tinyint(1) NOT NULL,
  `pickup` tinyint(1) NOT NULL,
  `in_stock` int(11) NOT NULL DEFAULT '10',
  `available` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `promo_codes`
--

CREATE TABLE `promo_codes` (
  `promo_id` int(11) NOT NULL,
  `promo_code` varchar(100) NOT NULL,
  `status` varchar(15) NOT NULL,
  `discount_per` int(11) NOT NULL,
  `discount_value` int(11) NOT NULL,
  `currency` varchar(10) NOT NULL DEFAULT 'INR'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Stand-in structure for view `SHIPPED_ORDERS_VIEW`
--
CREATE TABLE `SHIPPED_ORDERS_VIEW` (
`order_id` int(10)
,`cust_fname` varchar(20)
,`cust_lname` varchar(20)
,`product_title` varchar(100)
,`order_date` date
,`payment_method` varchar(100)
,`address_line_1` varchar(100)
,`address_line_2` varchar(100)
);

-- --------------------------------------------------------

--
-- Table structure for table `states`
--

CREATE TABLE `states` (
  `state_id` int(11) NOT NULL,
  `state_name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `dataver` int(11) NOT NULL,
  `users_online` int(11) NOT NULL,
  `orders_completed` int(11) NOT NULL,
  `orders_pending` int(11) NOT NULL,
  `orders_canceled` int(11) NOT NULL,
  `total_products` int(11) NOT NULL,
  `total_users` int(11) NOT NULL,
  `version` varchar(11) NOT NULL,
  `isonline` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `cust_id` int(10) NOT NULL,
  `cust_fname` varchar(20) NOT NULL,
  `cust_lname` varchar(20) NOT NULL,
  `cust_email` varchar(50) NOT NULL,
  `cust_pass` varchar(100) NOT NULL,
  `cust_joined` date NOT NULL,
  `app_token` varchar(100) NOT NULL,
  `fcm_token` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `wishlist_id` int(11) NOT NULL,
  `cust_id` int(11) NOT NULL DEFAULT '0',
  `product_id` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure for view `ALL_ORDERS_VIEW`
--
DROP TABLE IF EXISTS `ALL_ORDERS_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `ALL_ORDERS_VIEW`  AS  select `orders`.`order_id` AS `order_id`,`orders`.`status` AS `status`,`users`.`cust_fname` AS `cust_fname`,`users`.`cust_lname` AS `cust_lname`,`products`.`product_title` AS `product_title`,`orders`.`order_date` AS `order_date`,`orders`.`payment_method` AS `payment_method`,`address`.`address_line_1` AS `address_line_1`,`address`.`address_line_2` AS `address_line_2` from (((`orders` join `users` on((`orders`.`cust_id` = `users`.`cust_id`))) join `products` on((`orders`.`ordered_product` = `products`.`product_id`))) join `address` on((`orders`.`shipped_to` = `address`.`address_id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `ALL_PRODUCTS_VIEW`
--
DROP TABLE IF EXISTS `ALL_PRODUCTS_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `ALL_PRODUCTS_VIEW`  AS  select `products`.`product_id` AS `product_id`,`products`.`product_title` AS `product_title`,`products`.`product_des` AS `product_des`,`products`.`product_image` AS `product_image`,`products`.`category` AS `category`,`products`.`veg` AS `veg`,`products`.`resturant_location` AS `resturant_location`,`products`.`contact` AS `contact`,`products`.`price` AS `price`,`products`.`currency` AS `currency`,`products`.`home_delivery` AS `home_delivery`,`products`.`pickup` AS `pickup`,`products`.`in_stock` AS `in_stock`,`products`.`available` AS `available` from `products` ;

-- --------------------------------------------------------

--
-- Structure for view `CANCELED_ORDERS_VIEW`
--
DROP TABLE IF EXISTS `CANCELED_ORDERS_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `CANCELED_ORDERS_VIEW`  AS  select `orders`.`order_id` AS `order_id`,`users`.`cust_fname` AS `cust_fname`,`users`.`cust_lname` AS `cust_lname`,`products`.`product_title` AS `product_title`,`orders`.`order_date` AS `order_date`,`orders`.`payment_method` AS `payment_method`,`address`.`address_line_1` AS `address_line_1`,`address`.`address_line_2` AS `address_line_2` from (((`orders` join `users` on((`orders`.`cust_id` = `users`.`cust_id`))) join `products` on((`orders`.`ordered_product` = `products`.`product_id`))) join `address` on((`orders`.`shipped_to` = `address`.`address_id`))) where (`orders`.`status` = 'canceled') ;

-- --------------------------------------------------------

--
-- Structure for view `DELIVERED_ORDERS_VIEW`
--
DROP TABLE IF EXISTS `DELIVERED_ORDERS_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `DELIVERED_ORDERS_VIEW`  AS  select `orders`.`order_id` AS `order_id`,`users`.`cust_fname` AS `cust_fname`,`users`.`cust_lname` AS `cust_lname`,`products`.`product_title` AS `product_title`,`orders`.`order_date` AS `order_date`,`orders`.`payment_method` AS `payment_method`,`address`.`address_line_1` AS `address_line_1`,`address`.`address_line_2` AS `address_line_2` from (((`orders` join `users` on((`orders`.`cust_id` = `users`.`cust_id`))) join `products` on((`orders`.`ordered_product` = `products`.`product_id`))) join `address` on((`orders`.`shipped_to` = `address`.`address_id`))) where (`orders`.`status` = 'delivered') ;

-- --------------------------------------------------------

--
-- Structure for view `FCM_NOTIFICATION_VIEW`
--
DROP TABLE IF EXISTS `FCM_NOTIFICATION_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `FCM_NOTIFICATION_VIEW`  AS  select `orders`.`order_id` AS `order_id`,`products`.`product_title` AS `product_title`,`users`.`fcm_token` AS `fcm_token` from ((`orders` join `products` on((`orders`.`ordered_product` = `products`.`product_id`))) join `users` on((`orders`.`cust_id` = `users`.`cust_id`))) ;

-- --------------------------------------------------------

--
-- Structure for view `INVOICE_VIEW`
--
DROP TABLE IF EXISTS `INVOICE_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `INVOICE_VIEW`  AS  select `orders`.`order_id` AS `order_id`,`orders`.`payment_method` AS `payment_method`,`orders`.`order_date` AS `order_date`,`orders`.`order_total` AS `order_total`,`orders`.`final_price` AS `final_price`,`orders`.`promo` AS `promo`,`orders`.`voucher` AS `voucher`,`address`.`contact_number` AS `contact_number`,`address`.`cust_name` AS `cust_name`,`address`.`address_line_1` AS `address_line_1`,`address`.`address_line_2` AS `address_line_2`,`cities`.`city_name` AS `city_name`,`states`.`state_name` AS `state_name`,`products`.`product_title` AS `product_title`,`gift_vouchers`.`voucher_value` AS `voucher_value` from (((((`orders` join `address` on((`address`.`address_id` = `orders`.`shipped_to`))) join `products` on((`orders`.`ordered_product` = `products`.`product_id`))) join `cities` on((`address`.`city` = `cities`.`city_id`))) join `states` on((`address`.`state` = `states`.`state_id`))) join `gift_vouchers` on((`orders`.`voucher` = `gift_vouchers`.`voucher_code`))) ;

-- --------------------------------------------------------

--
-- Structure for view `PENDING_ORDERS_VIEW`
--
DROP TABLE IF EXISTS `PENDING_ORDERS_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `PENDING_ORDERS_VIEW`  AS  select `orders`.`order_id` AS `order_id`,`users`.`cust_fname` AS `cust_fname`,`users`.`cust_lname` AS `cust_lname`,`products`.`product_title` AS `product_title`,`orders`.`order_date` AS `order_date`,`orders`.`payment_method` AS `payment_method`,`address`.`address_line_1` AS `address_line_1`,`address`.`address_line_2` AS `address_line_2` from (((`orders` join `users` on((`orders`.`cust_id` = `users`.`cust_id`))) join `products` on((`orders`.`ordered_product` = `products`.`product_id`))) join `address` on((`orders`.`shipped_to` = `address`.`address_id`))) where (`orders`.`status` = 'pending') ;

-- --------------------------------------------------------

--
-- Structure for view `SHIPPED_ORDERS_VIEW`
--
DROP TABLE IF EXISTS `SHIPPED_ORDERS_VIEW`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `SHIPPED_ORDERS_VIEW`  AS  select `orders`.`order_id` AS `order_id`,`users`.`cust_fname` AS `cust_fname`,`users`.`cust_lname` AS `cust_lname`,`products`.`product_title` AS `product_title`,`orders`.`order_date` AS `order_date`,`orders`.`payment_method` AS `payment_method`,`address`.`address_line_1` AS `address_line_1`,`address`.`address_line_2` AS `address_line_2` from (((`orders` join `users` on((`orders`.`cust_id` = `users`.`cust_id`))) join `products` on((`orders`.`ordered_product` = `products`.`product_id`))) join `address` on((`orders`.`shipped_to` = `address`.`address_id`))) where (`orders`.`status` = 'shipped') ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`address_id`),
  ADD KEY `city` (`city`),
  ADD KEY `state` (`state`),
  ADD KEY `cust_id` (`cust_id`);

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`uid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- Indexes for table `banners`
--
ALTER TABLE `banners`
  ADD PRIMARY KEY (`banner_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`cid`),
  ADD UNIQUE KEY `cat_name` (`cat_name`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city_id`),
  ADD KEY `state_id` (`state_id`);

--
-- Indexes for table `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`currency_id`),
  ADD UNIQUE KEY `currency_name` (`currency_name`),
  ADD UNIQUE KEY `currency_name_2` (`currency_name`);

--
-- Indexes for table `gift_vouchers`
--
ALTER TABLE `gift_vouchers`
  ADD PRIMARY KEY (`voucher_id`),
  ADD UNIQUE KEY `voucher_code` (`voucher_code`),
  ADD UNIQUE KEY `voucher_code_2` (`voucher_code`),
  ADD KEY `currency_restriction` (`voucher_currency`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `cust_id_const` (`cust_id`),
  ADD KEY `product_id_const` (`ordered_product`),
  ADD KEY `promo` (`promo`),
  ADD KEY `voucher` (`voucher`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `caterogy` (`category`),
  ADD KEY `currency` (`currency`);

--
-- Indexes for table `promo_codes`
--
ALTER TABLE `promo_codes`
  ADD PRIMARY KEY (`promo_id`),
  ADD UNIQUE KEY `promo_code` (`promo_code`);

--
-- Indexes for table `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`state_id`),
  ADD KEY `state_name` (`state_name`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`dataver`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`cust_id`),
  ADD UNIQUE KEY `cust_email` (`cust_email`),
  ADD UNIQUE KEY `cust_email_2` (`cust_email`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`wishlist_id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `address`
--
ALTER TABLE `address`
  MODIFY `address_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `banners`
--
ALTER TABLE `banners`
  MODIFY `banner_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `cid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `currency`
--
ALTER TABLE `currency`
  MODIFY `currency_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `gift_vouchers`
--
ALTER TABLE `gift_vouchers`
  MODIFY `voucher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `promo_codes`
--
ALTER TABLE `promo_codes`
  MODIFY `promo_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `states`
--
ALTER TABLE `states`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `cust_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `wishlist_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `city_const` FOREIGN KEY (`city`) REFERENCES `cities` (`city_id`),
  ADD CONSTRAINT `cust_id_const_add` FOREIGN KEY (`cust_id`) REFERENCES `users` (`cust_id`),
  ADD CONSTRAINT `state_const_add` FOREIGN KEY (`state`) REFERENCES `states` (`state_id`);

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `product_added_const` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `state_const` FOREIGN KEY (`state_id`) REFERENCES `states` (`state_id`);

--
-- Constraints for table `gift_vouchers`
--
ALTER TABLE `gift_vouchers`
  ADD CONSTRAINT `currency_restriction` FOREIGN KEY (`voucher_currency`) REFERENCES `currency` (`currency_name`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `cust_id_const` FOREIGN KEY (`cust_id`) REFERENCES `users` (`cust_id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `caterogy` FOREIGN KEY (`category`) REFERENCES `categories` (`cat_name`),
  ADD CONSTRAINT `currency` FOREIGN KEY (`currency`) REFERENCES `currency` (`currency_name`);

--
-- Constraints for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
