/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  matthieu
 * Created: Feb 14, 2016
 */

CREATE TABLE `todo`.`to_todo` ( `id` BIGINT NOT NULL AUTO_INCREMENT , `title` TEXT NOT NULL , `completed` BOOLEAN NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_unicode_ci;

CREATE TABLE `todo`.`to_group` ( `id` BIGINT NOT NULL AUTO_INCREMENT , `name` VARCHAR(255) NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_unicode_ci;


CREATE TABLE `todo`.`to_todo_group` ( `id` BIGINT NOT NULL AUTO_INCREMENT , `group_id` BIGINT NOT NULL , `todo_id` BIGINT NOT NULL , PRIMARY KEY (`id`), INDEX `idx_group_id` (`group_id`), INDEX `idx_todo_id` (`todo_id`)) ENGINE = InnoDB COLLATE utf8_unicode_ci;