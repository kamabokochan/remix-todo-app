-- CreateTable
CREATE TABLE `todos` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `title` TEXT NOT NULL,
    `status` ENUM('pending', 'completed') NULL DEFAULT 'pending',
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
