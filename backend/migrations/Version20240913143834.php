<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240913143834 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE vet_reviews (id INT AUTO_INCREMENT NOT NULL, animal_id INT NOT NULL, date DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', review LONGTEXT NOT NULL, INDEX IDX_9F8BA1AA8E962C16 (animal_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE vet_reviews ADD CONSTRAINT FK_9F8BA1AA8E962C16 FOREIGN KEY (animal_id) REFERENCES animal (id)');
        $this->addSql('ALTER TABLE animal DROP vet_review, DROP last_vet_visit');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE vet_reviews DROP FOREIGN KEY FK_9F8BA1AA8E962C16');
        $this->addSql('DROP TABLE vet_reviews');
        $this->addSql('ALTER TABLE animal ADD vet_review LONGTEXT DEFAULT NULL, ADD last_vet_visit DATETIME DEFAULT NULL');
    }
}
