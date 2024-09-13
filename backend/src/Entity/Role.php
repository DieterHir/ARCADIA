<?php

namespace App\Entity;

use App\Repository\RoleRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RoleRepository::class)]
class Role
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\OneToMany(targetEntity: User::class, mappedBy: 'role')]
    private Collection $vetReview;

    public function __construct()
    {
        $this->vetReview = new ArrayCollection();
    }

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
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getVetReview(): Collection
    {
        return $this->vetReview;
    }

    public function addVetReview(User $vetReview): static
    {
        if (!$this->vetReview->contains($vetReview)) {
            $this->vetReview->add($vetReview);
            $vetReview->setRole($this);
        }

        return $this;
    }

    public function removeVetReview(User $vetReview): static
    {
        if ($this->vetReview->removeElement($vetReview)) {
            // set the owning side to null (unless already changed)
            if ($vetReview->getRole() === $this) {
                $vetReview->setRole(null);
            }
        }

        return $this;
    }
}
