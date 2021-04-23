<?php


namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Feedback;
use Doctrine\DBAL\Schema\View;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class onFeedbackCreate implements EventSubscriberInterface
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
            if($user->getRoles() == ["ROLE_APPRENANT"]){
                throw new UnauthorizedHttpException("","unauthorized operation",null,403);
            }
            $subject->setUser($user);
            $subject->setCreatedAt(new \DateTime());
        }
    }
}