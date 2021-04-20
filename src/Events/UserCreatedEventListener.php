<?php 

namespace App\Events;
use App\Entity\User;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserCreatedEventListener implements EventSubscriberInterface {
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;
    /**
     * @var Security
     */
    private $security;

    /**
     * Undocumented variable
     *
     * @var MailerInterface
     */
    private $mailer;

    public function __construct( MailerInterface $mailer , UserPasswordEncoderInterface $encoder , Security $security){
        $this->encoder  = $encoder;
        $this->security = $security;
        $this->mailer   = $mailer;
    }

    /**
     * Branchement sur l'evenement kernel view \
     * avant ecritre dans la base de donnee pour
     * generer un mot de passe et envoyer l'utilisateur un mail
     *
     * @return void
     */
    public static function getSubscribedEvents():array {
        return [
            KernelEvents::VIEW => ['passwordEncoder',EventPriorities::PRE_WRITE]
        ];
    }

    /**
     * intervention sur la creaion du mot de passe pour l'encoder
     *
     * @param ViewEvent $event
     * @return void
     * @throws \Symfony\Component\Mailer\Exception\TransportExceptionInterface
     */
    public function passwordEncoder (ViewEvent $event){
        if($this->security->getUser()->getRoles() == ['ROLE_ADMIN'] || $this->security->getUser()->getRoles() == ["ROLE_COACH"] ){
            $subject = $event->getControllerResult();
            $method = $event->getRequest()->getMethod();
            $password = uniqid();
            $generatedpassword = $password;

            if ($subject instanceof User && $method === 'POST'){
                $subject->setPassword($this->encoder->encodePassword($subject ,$password));

                $subject->setRoles(["ROLE_".$subject->getProfil()->getName()]);

                //Envoie de l'email à l'utilisateur 
                $email = (new Email())
                       ->from("sonatel-academy@mail.com")
                       ->to($subject->getEmail())
                       ->subject('Creation compte Plateform Apprenat Academy')
                       ->text("Veuillez vous connecter avec votre email et ce mot de passe {$generatedpassword}");
                $this->mailer->send($email);
                
            }
            if($subject instanceof User && $event->getRequest()->getMethod() === "PUT"){
                $subject->setPassword($this->encoder->encodePassword($subject,$subject->getPassword()));
                $subject->setRoles(["ROLE_".$subject->getProfil()->getName()]);
                dd($subject);
            }
        }
        else {
            throw new AccessDeniedException("Tu n'est pas authoriser à effectuer cette operation");
        }
    }
}