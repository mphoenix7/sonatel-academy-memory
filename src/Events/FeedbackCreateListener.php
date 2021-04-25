<?php


namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Feedback;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class FeedbackCreateListener implements EventSubscriberInterface
{
    private $security;
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents(){
        return [
            KernelEvents::VIEW => ['onFeedbackCreate',EventPriorities::PRE_WRITE]
        ];
    }

    public function onFeedbackCreate(ViewEvent $event){
        $subject = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        $user = $this->security->getUser();
        if($subject instanceof Feedback && $method == ["POST"]){
            $subject->setUser($user);
            $subject->setCreatedAt(new \DateTime());
        }
    }
}