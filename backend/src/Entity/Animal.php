<?php

namespace App\Entity;

use App\Repository\AnimalRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AnimalRepository::class)]
class Animal
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $species = null;

    #[ORM\Column(nullable: true)]
    private ?int $age = null;

    #[ORM\Column(nullable: true)]
    private ?int $size = null;

    #[ORM\Column(nullable: true)]
    private ?int $weight = null;

    // #[ORM\Column(type: Types::TEXT, nullable: true)]
    // private ?string $description = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $State = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $vetReview = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $lastMealType = null;

    #[ORM\Column(nullable: true)]
    private ?int $lastMealQty = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    private ?\DateTimeInterface $lastVetVisit = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image = null;

    #[ORM\ManyToOne(targetEntity: Habitat::class, inversedBy: 'animals')]
    private ?habitat $habitat = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        if (!empty($name)) {
            $this->name = $name;
        }

        return $this;
    }

    public function getSpecies(): ?string
    {
        return $this->species;
    }

    public function setSpecies(string $species): static
    {
        if (!empty($species)) {
            $this->species = $species;
        }

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(?int $age): static
    {
        if ($age !== null) {
                $this->age = $age;
        }

        return $this;
    }

    public function getSize(): ?int
    {
        return $this->size;
    }

    public function setSize(?int $size): static
    {
        if ($size !== null) {
            $this->size = $size;
        }

        return $this;
    }

    public function getWeight(): ?int
    {
        return $this->weight;
    }

    public function setWeight(?int $weight): static
    {
        if ($weight !== null) {
            $this->weight = $weight;
        }

        return $this;
    }

    // public function getDescription(): ?string
    // {
    //     return $this->description;
    // }

    // public function setDescription(?string $description): static
    // {
    //     if (!empty($description)) {
    //         $this->description = $description;
    //     }

    //     return $this;
    // }

    public function getState(): ?string
    {
        return $this->State;
    }

    public function setState(?string $State): static
    {
        if (!empty($State)) {
            $this->State = $State;
        }

        return $this;
    }

    public function getVetReview(): ?string
    {
        return $this->vetReview;
    }

    public function setVetReview(?string $vetReview): static
    {
        if (!empty($vetReview)) {
            $this->vetReview = $vetReview;
        }

        return $this;
    }

    public function getLastMealType(): ?string
    {
        return $this->lastMealType;
    }

    public function setLastMealType(?string $lastMealType): static
    {
        if (!empty($lastMealType)) {
            $this->lastMealType = $lastMealType;
        }

        return $this;
    }

    public function getLastMealQty(): ?int
    {
        return $this->lastMealQty;
    }

    public function setLastMealQty(?int $lastMealQty): static
    {
        if (!empty($lastMealQty)) {
            $this->lastMealQty = $lastMealQty;
        }

        return $this;
    }

    public function getLastVetVisit(): ?\DateTimeInterface
    {
        return $this->lastVetVisit;
    }

    public function setLastVetVisit(?\DateTimeInterface $lastVetVisit): static
    {
        if (!empty($lastVetVisit)) {
            $this->lastVetVisit = $lastVetVisit;
        }

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        if (!empty($image)) {
            $this->image = $image;
        }

        return $this;
    }

    public function getHabitat(): ?habitat
    {
        return $this->habitat;
    }

    public function setHabitat(?habitat $habitat): static
    {
        if (!empty($habitat)) {
            $this->habitat = $habitat;
        }

        return $this;
    }
}
