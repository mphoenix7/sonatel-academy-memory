<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210414121517 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE classroom ADD cohort_id INT NOT NULL');
        $this->addSql('ALTER TABLE classroom ADD CONSTRAINT FK_497D309D35983C93 FOREIGN KEY (cohort_id) REFERENCES cohort (id)');
        $this->addSql('CREATE INDEX IDX_497D309D35983C93 ON classroom (cohort_id)');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE classroom DROP FOREIGN KEY FK_497D309D35983C93');
        $this->addSql('DROP INDEX IDX_497D309D35983C93 ON classroom');
        $this->addSql('ALTER TABLE classroom DROP cohort_id');
    }
}
