<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\ProjectRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass=ProjectRepository::class)
 */
class Project
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $title;

    /**
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @ORM\Column(type="datetime")
     */
    private $deadline;

    /**
     * @ORM\Column(type="datetime")
     */
    private $createdAt;

    /**
     * @ORM\OneToMany(targetEntity=Deliverable::class, mappedBy="project", orphanRemoval=true)
     */
    private $deliverables;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="projects")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Classroom::class, inversedBy="projects")
     * @ORM\JoinColumn(nullable=false)
     */
    private $classroom;

    /**
     * @ORM\OneToMany(targetEntity=Question::class, mappedBy="project")
     */
    private $question;

    public function __construct()
    {
        $this->deliverables = new ArrayCollection();
        $this->question = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): self
    {
        $this->title = $title;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getDeadline(): ?\DateTimeInterface
    {
        return $this->deadline;
    }

    public function setDeadline(\DateTimeInterface $deadline): self
    {
        $this->deadline = $deadline;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * @return Collection|Deliverable[]
     */
    public function getDeliverables(): Collection
    {
        return $this->deliverables;
    }

    public function addDeliverable(Deliverable $deliverable): self
    {
        if (!$this->deliverables->contains($deliverable)) {
            $this->deliverables[] = $deliverable;
            $deliverable->setProject($this);
        }

        return $this;
    }

    public function removeDeliverable(Deliverable $deliverable): self
    {
        if ($this->deliverables->removeElement($deliverable)) {
            // set the owning side to null (unless already changed)
            if ($deliverable->getProject() === $this) {
                $deliverable->setProject(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getClassroom(): ?Classroom
    {
        return $this->classroom;
    }

    public function setClassroom(?Classroom $classroom): self
    {
        $this->classroom = $classroom;

        return $this;
    }

    /**
     * @return Collection|Question[]
     */
    public function getQuestion(): Collection
    {
        return $this->question;
    }

    public function addQuestion(Question $question): self
    {
        if (!$this->question->contains($question)) {
            $this->question[] = $question;
            $question->setProject($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): self
    {
        if ($this->question->removeElement($question)) {
            // set the owning side to null (unless already changed)
            if ($question->getProject() === $this) {
                $question->setProject(null);
            }
        }

        return $this;
    }
}
