<?php

namespace App\Events;

use App\Entity\User;
use Laminas\EventManager\Event;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use ApiPlatform\Core\EventListener\EventPriorities;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserCreatedListener implements EventSubscriberInterface
{
    /**
     * @var UserPasswordEncoderInterface
     */
    private $encoder;
  
    /**
     * @var MailerInterface
     */
    private $mailer;

    public function __construct(MailerInterface $mailer, UserPasswordEncoderInterface $encoder)
    {
        $this->encoder = $encoder;
        $this->mailer = $mailer;
    }

    /**
     * @return array|array[]
     * Branchement sur l'evenement kernel view \
     * avant ecriture des donnees dans la base de donnee 
     * 
     */
    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::VIEW => [
                'passwordEncoder', EventPriorities::PRE_WRITE,
            ],
        ];
    }


    /**
     * encode le mot de passe de l'utilisateur et envoie un email contenant le mot de passe  de  l'utilsateur 
     *
     * @param ViewEvent $event
     * @return void
     */
    public function passwordEncoder(ViewEvent $event)
    {
        $subject = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();

        if ($subject instanceof User && $method == "POST") {
            $password = uniqid();
            $generatedpassword = $password;
            $subject->setPassword($this->encoder->encodePassword($subject, $password));
            $subject->setIsActif(true);

            $subject->setRoles(["ROLE_" . $subject->getProfil()->getName()]);


            /**
             * Envoie de l'email à l'utilisateur
             */
            $email = (new Email())
                ->from("sonatel-academy@mail.com")
                ->to($subject->getEmail())
                ->subject('Creation compte Plateform Apprenant Academy')
                ->text("Veuillez vous connecter avec votre email et ce mot de passe:{$generatedpassword}");
            $this->mailer->send($email);
        }

        //si on fait un update de l'utilisateur et qu'il y a un nouveau profil
        if ($subject instanceof User && $method === "PUT") {
            $subject->setRoles(["ROLE_" . $subject->getProfil()->getName()]);

        }
    }
}