<?php


namespace App\Events;


use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\Cohort;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\Exception\UnauthorizedHttpException;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Security\Core\Security;

/**
 * Class CohortCreateListener intervient pour creer la date
 * @package App\Events
 */
class CohortCreateListener implements EventSubscriberInterface {
    private  $security;
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
            KernelEvents::VIEW => ['onCohortCreate' , EventPriorities::PRE_WRITE]
        ];
    }

    /**
     * @param ViewEvent $event
     * logique à ajouter dans l'evenement
     */
    public function onCohortCreate(ViewEvent $event) {
        $subject = $event->getControllerResult();
        $method = $event->getRequest()->getMethod();
        if($subject instanceof Cohort && $method == "POST"){
            $subject->setCreatedAt( new \DateTime());
            $subject->setIsActif(true);
        }

    }
}
