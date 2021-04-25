<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\BranchRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ORM\Entity(repositoryClass=BranchRepository::class)
 * @ApiResource(
 *     accessControl="is_granted('ROLE_ADMIN')",
 *     normalizationContext={"groups"={"branch_read"}}
 * )
 */
class Branch
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"branch_read","classrooms_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"branch_read","classrooms_read"})
     */
    private $name;

    /**
     * @ORM\OneToMany(targetEntity=Classroom::class, mappedBy="branch", orphanRemoval=true)
     */
    private $classroom;

    public function __construct()
    {
        $this->classroom = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Classroom[]
     */
    public function getClassroom(): Collection
    {
        return $this->classroom;
    }

    public function addClassroom(Classroom $classroom): self
    {
        if (!$this->classroom->contains($classroom)) {
            $this->classroom[] = $classroom;
            $classroom->setBranch($this);
        }

        return $this;
    }

    public function removeClassroom(Classroom $classroom): self
    {
        if ($this->classroom->removeElement($classroom)) {
            // set the owning side to null (unless already changed)
            if ($classroom->getBranch() === $this) {
                $classroom->setBranch(null);
            }
        }

        return $this;
    }
}
