<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ClassroomRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity(repositoryClass=ClassroomRepository::class)
 * @ApiResource(
 *     normalizationContext={"groups"={"classrooms_read"}}
 * )
 */
class Classroom
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"classrooms_read","cohort_read","project_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="ce champs ne peut pas etre vide")
     * @Groups({"classrooms_read","cohort_read","project_read"})
     */
    private $name;

    /**
     * @ORM\ManyToOne(targetEntity=Branch::class, inversedBy="classroom")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="ce champs ne peut pas etre vide")
     */
    private $branch;

    /**
     * @ORM\OneToMany(targetEntity=User::class, mappedBy="classroom")
     * @Groups({"classrooms_read","cohort_read"})
     */
    private $user;

    /**
     * @ORM\OneToMany(targetEntity=Project::class, mappedBy="classroom", orphanRemoval=true)
     */
    private $projects;

    /**
     * @ORM\ManyToOne(targetEntity=Cohort::class, inversedBy="classrooms")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="ce champs ne peut pas etre vide")
     */
    private $cohort;

    public function __construct()
    {
        $this->user = new ArrayCollection();
        $this->projects = new ArrayCollection();
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

    public function getBranch(): ?Branch
    {
        return $this->branch;
    }

    public function setBranch(?Branch $branch): self
    {
        $this->branch = $branch;

        return $this;
    }

    /**
     * @return Collection|User[]
     */
    public function getUser(): Collection
    {
        return $this->user;
    }

    public function addUser(User $user): self
    {
        if (!$this->user->contains($user)) {
            $this->user[] = $user;
            $user->setClassroom($this);
        }

        return $this;
    }

    public function removeUser(User $user): self
    {
        if ($this->user->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getClassroom() === $this) {
                $user->setClassroom(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Project[]
     */
    public function getProjects(): Collection
    {
        return $this->projects;
    }

    public function addProject(Project $project): self
    {
        if (!$this->projects->contains($project)) {
            $this->projects[] = $project;
            $project->setClassroom($this);
        }

        return $this;
    }

    public function removeProject(Project $project): self
    {
        if ($this->projects->removeElement($project)) {
            // set the owning side to null (unless already changed)
            if ($project->getClassroom() === $this) {
                $project->setClassroom(null);
            }
        }

        return $this;
    }

    public function getCohort(): ?Cohort
    {
        return $this->cohort;
    }

    public function setCohort(?Cohort $cohort): self
    {
        $this->cohort = $cohort;

        return $this;
    }
}
