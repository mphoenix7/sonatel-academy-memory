<?php


namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Post;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;


class PostCreateListener implements EventSubscriberInterface
{
    private $security ;
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @return array|array[]
     * On se branche dans l'evenement kernel.view avant ecriture dans la base de donnee
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['onPostCreate',EventPriorities::PRE_WRITE]
        ];
    }
    public function onPostCreate(ViewEvent $event){
        $subject = $event->getControllerResult();
        $method  = $event->getRequest()->getMethod();
        $user    = $this->security->getUser();
        if($subject instanceof Post && $method == "POST"){
            $subject->setUser($user);
            $subject->setCreatedAt(new \DateTime());
            if($user->getRoles() == ['ROLE_APPRENANT']){
                $subject->setClassroom($user->getClassroom());
            }
        }
//
    }
}