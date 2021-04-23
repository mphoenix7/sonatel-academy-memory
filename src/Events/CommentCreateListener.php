<?php


namespace App\Events;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Comment;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class CommentCreateListener implements EventSubscriberInterface
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
        //dd($subject);
        $method  = $event->getRequest()->getMethod();
        $user    = $this->security->getUser();
        if($subject instanceof Comment && $method == "POST"){
            $subject->setUser($user);
            $subject->setCreatedAt(new \DateTime());
        }
    }
}