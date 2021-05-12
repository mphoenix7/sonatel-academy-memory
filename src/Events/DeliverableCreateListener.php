<?php


namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Deliverable;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class DeliverableCreateListener implements EventSubscriberInterface
{

    private $security;
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    public static function getSubscribedEvents()
    {
        return [KernelEvents::VIEW => ['onDeliverableCreate',EventPriorities::PRE_WRITE]];
    }

    public function onDeliverableCreate(ViewEvent $event) {
        $subject = $event->getControllerResult();
        $method  = $event->getRequest()->getMethod();
        $user    = $this->security->getUser();
        if($subject instanceof Deliverable && $method == "POST"){
            $subject->setUser($user);
            $subject->setCreatedAt(new \DateTime());
        }
    }
}