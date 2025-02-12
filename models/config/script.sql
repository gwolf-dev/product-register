CREATE SCHEMA `product_register` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;

USE product_register;

CREATE TABLE `product_register`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `password` VARCHAR(128) NOT NULL,
  `phone` VARCHAR(250) NOT NULL,
  `language` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `product_register`.`companies` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  `address` VARCHAR(200) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `foundation` INT NOT NULL,
  `department` VARCHAR(150) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `companies_userId_users_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `companies_userId_users`
    FOREIGN KEY (`userId`)
    REFERENCES `product_register`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

CREATE TABLE `product_register`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `companyId` INT NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `price` FLOAT NOT NULL,
  `barcode` VARCHAR(13) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `products_userId_users_idx` (`userId` ASC) VISIBLE,
  INDEX `products_companyId_companies_idx` (`companyId` ASC) VISIBLE,
  CONSTRAINT `products_userId_users`
    FOREIGN KEY (`userId`)
    REFERENCES `product_register`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `products_companyId_companies`
    FOREIGN KEY (`companyId`)
    REFERENCES `product_register`.`companies` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;

