<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @ApiResource(
 *     itemOperations={
 *          "get"={"security"="is_granted('ROLE_ADMIN','ROLE_COACH')"},
 *          "put"={"security"="is_granted('PASSWORD_RESET',object)"},
 *          "delete"={"security"="is_granted('ROLE_ADMIN','ROLE_COACH')"}
 *
 *      },
 *     normalizationContext={"groups"={"users_read"}},
 *
 * )
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @UniqueEntity("email", message="cet email existe deja")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ApiProperty(identifier=true)
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"users_read","classrooms_read","cohort_read","comment_read","post_read","comment_read","project_read","question_read","deliverable_read","feedback_read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\NotBlank(message="ce champs est obligatoire")
     * @Assert\Email(message= "format invalid")
     * @Groups({"users_read","classrooms_read","cohort_read","comment_read","post_read","comment_read","project_read","question_read","deliverable_read","feedback_read"})
     */
    private $email;

    /**
     * @ORM\Column(type="json")
     * @Groups({"users_read","classrooms_read","cohort_read","comment_read","post_read","comment_read","project_read","question_read","deliverable_read","feedback_read"})
     */
    private $roles = [];

    /**
     * @var string The hashed password
     * @ORM\Column(type="string",nullable=true)
     * @Groups({"users_read"})
     */
    private $password;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="ce champs est obligatoire")
     * @Groups({"users_read","classrooms_read","cohort_read","comment_read","post_read","comment_read","project_read","question_read","deliverable_read","feedback_read"})
     */
    private $firstName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="ce champs est obligatoire")
     * @Groups({"users_read","classrooms_read","cohort_read","comment_read","post_read","comment_read","project_read","question_read","deliverable_read","feedback_read"})
     */
    private $lastName;

    /**
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank(message="ce champs est obligatoire")
     * @Groups({"users_read","classrooms_read","cohort_read","comment_read","post_read","comment_read","project_read","question_read","deliverable_read","feedback_read"})
     */
    private $phoneNumber;

    /**
     * @ORM\Column(type="date", nullable=true)
     * @Groups({"users_read","classrooms_read","cohort_read","comment_read"})
     */
    private $dateOfBirth;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"users_read","classrooms_read","cohort_read","comment_read"})
     */
    private $placeOfBirth;

    /**
     * @ORM\Column(type="boolean")
     *
     *
     */
    private $isActif;



    /**
     * @ORM\ManyToOne(targetEntity=Profil::class, inversedBy="user")
     * @ORM\JoinColumn(nullable=false)
     * @Assert\NotBlank(message="ce champs ne peut pas etre nul")
     * @Groups({"users_read"})
     */
    private $profil;

    /**
     * @ORM\ManyToOne(targetEntity=Classroom::class, inversedBy="user")
     */
    private $classroom;

    /**
     * @ORM\OneToMany(targetEntity=Comment::class, mappedBy="user", orphanRemoval=true)
     */
    private $comments;

    /**
     * @ORM\OneToMany(targetEntity=Post::class, mappedBy="user", orphanRemoval=true)
     */
    private $posts;

    /**
     * @ORM\OneToMany(targetEntity=Question::class, mappedBy="user", orphanRemoval=true)
     */
    private $questions;

    /**
     * @ORM\OneToMany(targetEntity=Feedback::class, mappedBy="user", orphanRemoval=true)
     */
    private $feedback;

    /**
     * @ORM\OneToMany(targetEntity=Deliverable::class, mappedBy="user", orphanRemoval=true)
     */
    private $deliverables;

    /**
     * @ORM\OneToMany(targetEntity=Project::class, mappedBy="user", orphanRemoval=true)
     */
    private $projects;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     * @Groups({"users_read"})
     */
    private $sex;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->posts = new ArrayCollection();
        $this->questions = new ArrayCollection();
        $this->feedback = new ArrayCollection();
        $this->deliverables = new ArrayCollection();
        $this->projects = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        //$roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Returning a salt is only needed, if you are not using a modern
     * hashing algorithm (e.g. bcrypt or sodium) in your security.yaml.
     *
     * @see UserInterface
     */
    public function getSalt(): ?string
    {
        return null;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getDateOfBirth(): ?\DateTimeInterface
    {
        return $this->dateOfBirth;
    }

    public function setDateOfBirth( $dateOfBirth): self
    {
        $this->dateOfBirth = $dateOfBirth;

        return $this;
    }

    public function getPlaceOfBirth(): ?string
    {
        return $this->placeOfBirth;
    }

    public function setPlaceOfBirth(?string $placeOfBirth): self
    {
        $this->placeOfBirth = $placeOfBirth;

        return $this;
    }

    public function getIsActif(): ?bool
    {
        return $this->isActif;
    }

    public function setIsActif(bool $isActif): self
    {
        $this->isActif = $isActif;

        return $this;
    }



    public function getProfil(): ?Profil
    {
        return $this->profil;
    }

    public function setProfil(?Profil $profil): self
    {
        $this->profil = $profil;

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
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setUser($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getUser() === $this) {
                $comment->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Post[]
     */
    public function getPosts(): Collection
    {
        return $this->posts;
    }

    public function addPost(Post $post): self
    {
        if (!$this->posts->contains($post)) {
            $this->posts[] = $post;
            $post->setUser($this);
        }

        return $this;
    }

    public function removePost(Post $post): self
    {
        if ($this->posts->removeElement($post)) {
            // set the owning side to null (unless already changed)
            if ($post->getUser() === $this) {
                $post->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Question[]
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): self
    {
        if (!$this->questions->contains($question)) {
            $this->questions[] = $question;
            $question->setUser($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): self
    {
        if ($this->questions->removeElement($question)) {
            // set the owning side to null (unless already changed)
            if ($question->getUser() === $this) {
                $question->setUser(null);
            }
        }

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
            $feedback->setUser($this);
        }

        return $this;
    }

    public function removeFeedback(Feedback $feedback): self
    {
        if ($this->feedback->removeElement($feedback)) {
            // set the owning side to null (unless already changed)
            if ($feedback->getUser() === $this) {
                $feedback->setUser(null);
            }
        }

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
            $deliverable->setUser($this);
        }

        return $this;
    }

    public function removeDeliverable(Deliverable $deliverable): self
    {
        if ($this->deliverables->removeElement($deliverable)) {
            // set the owning side to null (unless already changed)
            if ($deliverable->getUser() === $this) {
                $deliverable->setUser(null);
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
            $project->setUser($this);
        }

        return $this;
    }

    public function removeProject(Project $project): self
    {
        if ($this->projects->removeElement($project)) {
            // set the owning side to null (unless already changed)
            if ($project->getUser() === $this) {
                $project->setUser(null);
            }
        }

        return $this;
    }

    public function getSex(): ?string
    {
        return $this->sex;
    }

    public function setSex(?string $sex): self
    {
        $this->sex = $sex;

        return $this;
    }
}
