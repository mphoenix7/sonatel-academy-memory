<?php 
namespace App\Events ;

use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;
use Symfony\Component\Finder\Exception\AccessDeniedException;


class JWTCreatedListener 
{

    public  function onJWTCreated(JWTCreatedEvent $event )
    {
        
        $user = $event->getUser();
        $data = $event->getData();
        $data['firstName'] = $user->getFirstName();
        $data['lastName']  = $user->getLastName();
        $data['isActif']   = $user->getIsActif();
        $event->setData($data);
        if($event->getData()['isActif'] == 0){
            
         throw new AccessDeniedException('Compte inactif');
        }

    }

}
