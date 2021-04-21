<?php


namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Project;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Finder\Exception\AccessDeniedException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

class ProjectCreateListener implements EventSubscriberInterface
{

    private $security;
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    /**
     * @return array|array[]
     * branchement dans l'evenement kernel.view avnt ecriture dans la base de donnee
     */
    public static function  getSubscribedEvents()
    {
        return [KernelEvents::VIEW => ['onProjectCreate' , EventPriorities::PRE_WRITE]
        ];
    }

    /**
     * @param ViewEvent $event
     * logique à effectuer dans l'evenement
     */
    public function onProjectCreate(ViewEvent $event) {

       $subject = $event->getControllerResult();
       $method  = $event->getRequest()->getMethod();
       $user    = $this->security->getUser();
       if($subject instanceof Project && $method == "POST"){
           if($this->security->getUser()->getRoles() == ["ROLE_APPRENANT"]){
               throw new UnauthorizedHttpException("","opération non authorisé",null,403);
           }
           $subject->setUser($user);
           $subject->setCreatedAt(new \DateTime());
       }




    }
}