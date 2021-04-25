<?php 

namespace App\Events;
use App\Entity\User;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserCreatedListener implements EventSubscriberInterface {
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
     * @return array|array[]
     * Branchement sur l'evenement kernel view \
     * avant ecritre dans la base de donnee pour
     * generer un mot de passe et envoyer l'utilisateur un mail
     */
    public static function getSubscribedEvents():array {
        return [
            KernelEvents::VIEW => ['passwordEncoder',EventPriorities::PRE_WRITE]
        ];
    }

    /**
     * @param ViewEvent $event
     * @return Response
     * @throws TransportExceptionInterface
     */
    public function passwordEncoder (ViewEvent $event){
        $subject = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if( $subject instanceof User && $method == "POST"){
            $password = uniqid();
            $generatedpassword = $password;
            $subject->setPassword($this->encoder->encodePassword($subject ,$password));

            $subject->setRoles(["ROLE_".$subject->getProfil()->getName()]);

            /**
             * Envoie de l'email à l'utilisateur
             */
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

        }

    }
}