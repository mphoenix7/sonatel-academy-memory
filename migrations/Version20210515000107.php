<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210515000107 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cohort CHANGE created_at created_at DATE DEFAULT NULL');
        $this->addSql('ALTER TABLE comment CHANGE post_id post_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE post ADD classroom_id INT NOT NULL, CHANGE title title VARCHAR(255) DEFAULT NULL, CHANGE created_at created_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE post ADD CONSTRAINT FK_5A8A6C8D6278D5A8 FOREIGN KEY (classroom_id) REFERENCES classroom (id)');
        $this->addSql('CREATE INDEX IDX_5A8A6C8D6278D5A8 ON post (classroom_id)');
        $this->addSql('ALTER TABLE project CHANGE title title VARCHAR(255) DEFAULT NULL, CHANGE created_at created_at DATETIME DEFAULT NULL');
        $this->addSql('ALTER TABLE question CHANGE project_id project_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD confirm_password VARCHAR(255) DEFAULT NULL, CHANGE classroom_id classroom_id INT DEFAULT NULL, CHANGE roles roles JSON NOT NULL, CHANGE password password VARCHAR(255) DEFAULT NULL, CHANGE date_of_birth date_of_birth DATE DEFAULT NULL, CHANGE place_of_birth place_of_birth VARCHAR(255) DEFAULT NULL, CHANGE sex sex LONGTEXT DEFAULT NULL COMMENT \'(DC2Type:array)\'');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE cohort CHANGE created_at created_at DATE NOT NULL');
        $this->addSql('ALTER TABLE comment CHANGE post_id post_id INT NOT NULL');
        $this->addSql('ALTER TABLE post DROP FOREIGN KEY FK_5A8A6C8D6278D5A8');
        $this->addSql('DROP INDEX IDX_5A8A6C8D6278D5A8 ON post');
        $this->addSql('ALTER TABLE post DROP classroom_id, CHANGE title title VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE created_at created_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE project CHANGE title title VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE created_at created_at DATETIME NOT NULL');
        $this->addSql('ALTER TABLE question CHANGE project_id project_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE user DROP confirm_password, CHANGE classroom_id classroom_id INT DEFAULT NULL, CHANGE roles roles LONGTEXT CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_bin`, CHANGE password password VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE date_of_birth date_of_birth DATE DEFAULT \'NULL\', CHANGE place_of_birth place_of_birth VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE sex sex LONGTEXT CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci` COMMENT \'(DC2Type:array)\'');
    }
}
