<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\DeliverableRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert ;

/**
 * @ORM\Entity(repositoryClass=DeliverableRepository::class)
 * @ApiResource(
 *     normalizationContext={"groups"={"deliverable_read"}}
 * )
 */
class Deliverable
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"deliverable_read","project_read","feedback_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=2000)
     * @Groups({"deliverable_read","project_read","feedback_read"})
     * @Assert\NotBlank(message="ce champs ne peut pas etre vide")
     */
    private $link;

    /**
     * @ORM\Column(type="text")
     * @Groups({"deliverable_read","project_read","feedback_read"})
     * @Assert\NotBlank(message="ce champs ne peut pas etre vide")
     */
    private $description;

    /**
     * @ORM\Column(type="blob", nullable=true)
     * @Groups({"deliverable_read","project_read","feedback_read"})
     */
    private $file;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"deliverable_read","project_read","feedback_read"})
     */
    private $createdAt;

    /**
     * @ORM\OneToMany(targetEntity=Feedback::class, mappedBy="deliverable", orphanRemoval=true)
     * @Groups({"deliverable_read","project_read"})
     */
    private $feedback;

    /**
     * @ORM\ManyToOne(targetEntity=Project::class, inversedBy="deliverables")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"deliverable_read"})
     */
    private $project;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="deliverables")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"deliverable_read","project_read"})
     */
    private $user;

    public function __construct()
    {
        $this->feedback = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(string $link): self
    {
        $this->link = $link;

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

    public function getFile()
    {
        return $this->file;
    }

    public function setFile($file): self
    {
        $this->file = $file;

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
     * @return Collection|Feedback[]
     */
    public function getFeedback(): Collection
    {
        return $this->feedback;
    }

    public function addFeedback(Feedback $feedback): self
    {
        if (!$this->feedback->contains($feedback)) {
            $this->feedback[] = $feedback;
            $feedback->setDeliverable($this);
        }

        return $this;
    }

    public function removeFeedback(Feedback $feedback): self
    {
        if ($this->feedback->removeElement($feedback)) {
            // set the owning side to null (unless already changed)
            if ($feedback->getDeliverable() === $this) {
                $feedback->setDeliverable(null);
            }
        }

        return $this;
    }

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function setProject(?Project $project): self
    {
        $this->project = $project;

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
}
