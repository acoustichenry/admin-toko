/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100427
 Source Host           : localhost:3306
 Source Schema         : admin-toko

 Target Server Type    : MySQL
 Target Server Version : 100427
 File Encoding         : 65001

 Date: 21/11/2025 11:09:00
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `id_produk` int NOT NULL AUTO_INCREMENT,
  `nama_produk` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `kategori` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `harga` int NULL DEFAULT NULL,
  `deskripsi` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  PRIMARY KEY (`id_produk`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES (1, 'Keyboard Mechanical', 'Elektronik', 450000, 'Keyboard mechanical Blue Switch');
INSERT INTO `product` VALUES (2, 'Mouse Wireless', 'Elektronik', 150000, 'Mouse wireless 2.4GHz');
INSERT INTO `product` VALUES (3, 'Headset Gaming', 'Elektronik', 350000, 'Headset gaming LED');
INSERT INTO `product` VALUES (4, 'Kaos Polos Hitam', 'Fashion', 50000, 'Bahan cotton combed 30s');
INSERT INTO `product` VALUES (5, 'Jaket Hoodie', 'Fashion', 120000, 'Hoodie fleece hangat');
INSERT INTO `product` VALUES (6, 'Botol Minum 1L', 'Perlengkapan', 30000, 'Botol minum BPA free');
INSERT INTO `product` VALUES (7, 'Tas Ransel', 'Fashion', 180000, 'Tas ransel waterproof');
INSERT INTO `product` VALUES (8, 'Flashdisk 32GB', 'Elektronik', 70000, 'Flashdisk USB 3.0');
INSERT INTO `product` VALUES (9, 'Powerbank 10000mAh', 'Elektronik', 200000, 'Powerbank fast charging');
INSERT INTO `product` VALUES (10, 'Charger 20W', 'Elektronik', 80000, 'Charger fast charging USB-C');
INSERT INTO `product` VALUES (11, 'hp', NULL, 15000000, 'hp flagship');
INSERT INTO `product` VALUES (12, 'hp', 'hp', 15000000, 'hp flagship');
INSERT INTO `product` VALUES (13, 'hp', 'hp', 15000000, 'hp flagship');
INSERT INTO `product` VALUES (14, 'hp', 'hp', 15000000, 'hp flagship');

-- ----------------------------
-- Table structure for product_stock
-- ----------------------------
DROP TABLE IF EXISTS `product_stock`;
CREATE TABLE `product_stock`  (
  `id_stok` int NOT NULL AUTO_INCREMENT,
  `id_produk` int NULL DEFAULT NULL,
  `stok` int NULL DEFAULT 0,
  `last_update` datetime NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_stok`) USING BTREE,
  INDEX `id_produk`(`id_produk`) USING BTREE,
  CONSTRAINT `product_stock_ibfk_1` FOREIGN KEY (`id_produk`) REFERENCES `product` (`id_produk`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of product_stock
-- ----------------------------
INSERT INTO `product_stock` VALUES (1, 1, 50, '2025-11-21 10:34:21');
INSERT INTO `product_stock` VALUES (2, 2, 35, '2025-11-20 17:40:13');
INSERT INTO `product_stock` VALUES (3, 3, -234137, '2025-11-21 10:47:04');
INSERT INTO `product_stock` VALUES (4, 4, 50, '2025-11-20 17:40:13');
INSERT INTO `product_stock` VALUES (5, 5, -13208, '2025-11-21 10:50:03');
INSERT INTO `product_stock` VALUES (6, 6, 73, '2025-11-20 22:54:07');
INSERT INTO `product_stock` VALUES (7, 7, 69, '2025-11-21 10:34:35');
INSERT INTO `product_stock` VALUES (8, 8, 30, '2025-11-20 17:40:13');
INSERT INTO `product_stock` VALUES (9, 9, 22, '2025-11-20 17:40:13');
INSERT INTO `product_stock` VALUES (10, 10, 27, '2025-11-20 17:40:13');

-- ----------------------------
-- Table structure for purchasing
-- ----------------------------
DROP TABLE IF EXISTS `purchasing`;
CREATE TABLE `purchasing`  (
  `id_pembelian` int NOT NULL AUTO_INCREMENT,
  `id_produk` int NULL DEFAULT NULL,
  `jumlah` int NULL DEFAULT NULL,
  `harga_beli` int NULL DEFAULT NULL,
  `tanggal` datetime NULL DEFAULT current_timestamp,
  `status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '0 = belum dibeli\r\n1 = sudah dibeli\r\n2 = pembatalan pembelian',
  `tanggal_batal_pembelian` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id_pembelian`) USING BTREE,
  INDEX `id_produk`(`id_produk`) USING BTREE,
  CONSTRAINT `purchasing_ibfk_1` FOREIGN KEY (`id_produk`) REFERENCES `product` (`id_produk`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of purchasing
-- ----------------------------
INSERT INTO `purchasing` VALUES (1, 1, 10, 300000, '2025-11-20 23:19:04', '2', NULL);
INSERT INTO `purchasing` VALUES (2, 5, 10, 300000, '2025-11-20 23:19:12', '0', '2025-11-21 00:03:01');
INSERT INTO `purchasing` VALUES (3, 5, 3, 300000, '2025-11-20 23:19:21', '2', NULL);
INSERT INTO `purchasing` VALUES (4, 5, 7, 300000, '2025-11-20 23:19:27', '1', NULL);
INSERT INTO `purchasing` VALUES (5, 3, 1, 300000, '2025-11-20 23:19:34', '1', NULL);
INSERT INTO `purchasing` VALUES (6, 3, 3, 300000, '2025-11-20 23:19:37', '1', NULL);
INSERT INTO `purchasing` VALUES (7, 1, 111111, 3, '2025-11-21 02:59:05', '1', NULL);
INSERT INTO `purchasing` VALUES (8, 3, 1111, 111111, '2025-11-21 03:00:44', '1', NULL);
INSERT INTO `purchasing` VALUES (9, 14, 3, 300000, '2025-11-21 10:33:19', '1', NULL);
INSERT INTO `purchasing` VALUES (10, 3, 3, 200000, '2025-11-21 10:42:14', '1', NULL);
INSERT INTO `purchasing` VALUES (11, 5, 5, 500000, '2025-11-21 10:45:23', '1', NULL);
INSERT INTO `purchasing` VALUES (12, 3, 234234, 444444, '2025-11-21 10:47:04', '1', NULL);
INSERT INTO `purchasing` VALUES (13, 5, 13333, 6, '2025-11-21 10:50:03', '1', NULL);

SET FOREIGN_KEY_CHECKS = 1;
