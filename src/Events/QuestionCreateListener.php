<?php


namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Question;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\Security\Core\Security;

class QuestionCreateListener implements EventSubscriberInterface
{
    private $security;
    public function  __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['onCommentCreate',EventPriorities::PRE_WRITE]
        ];
    }

    public function onCommentCreate(ViewEvent $event) {
        $subject = $event->getControllerResult();
        $method  = $event->getRequest()->getMethod();
        $user    = $this->security->getUser();
        if($subject instanceof Question && $method == "POST"){
            $subject->setUser($user);
            $subject->setCreatedAt(new \DateTime());
        }
    }
}