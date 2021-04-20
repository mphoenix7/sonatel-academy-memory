<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\FeedbackRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert ;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"feedback_read"}}
 * )
 * @ORM\Entity(repositoryClass=FeedbackRepository::class)
 * 
 */
class Feedback
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"feedback_read","project_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="text")
     * @Groups({"feedback_read","project_read"})
     * @Assert\NotBlank(message="Ce champs ne peut pas etre vide")
     */
    private $content;

    /**
     * @ORM\Column(type="datetime")
     * @Groups({"feedback_read","project_read"})
     */
    private $createdAt;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="feedback")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"feedback_read","project_read"})
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Deliverable::class, inversedBy="feedback")
     * @ORM\JoinColumn(nullable=false)
     * @Groups({"feedback_read"})
     */
    private $deliverable;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): self
    {
        $this->content = $content;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getDeliverable(): ?Deliverable
    {
        return $this->deliverable;
    }

    public function setDeliverable(?Deliverable $deliverable): self
    {
        $this->deliverable = $deliverable;

        return $this;
    }
}
