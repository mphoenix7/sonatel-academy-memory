<?php

namespace App\Security\Voter;

use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class UserAccessVoter extends Voter
{
    private $security ;
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports($attribute, $subject)
    {

        return in_array($attribute, [ 'PASSWORD_RESET'])
            && $subject instanceof User;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();



        if (!$user instanceof UserInterface) {
            return false;
        }

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case 'PASSWORD_RESET':
                if($this->security->isGranted('ROLE_ADMIN') || $this->security->isGranted('ROLE_COACH')
                    ||($subject->getUsername() == $user->getUsername())){
                    return  true;
                }


        }

        return false;
    }
}
