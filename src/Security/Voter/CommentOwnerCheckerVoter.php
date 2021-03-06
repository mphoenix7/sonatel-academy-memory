<?php

namespace App\Security\Voter;

use App\Entity\Comment;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;

class CommentOwnerCheckerVoter extends Voter
{
    private $security ;
    public function __construct(Security $security)
    {
        $this->security = $security;
    }

    protected function supports($attribute, $subject)
    {
        return in_array($attribute, ['EDIT', 'DELETE'])
            && $subject instanceof Comment;
    }

    protected function voteOnAttribute($attribute, $subject, TokenInterface $token)
    {
        $user = $token->getUser();
        // if the user is anonymous, do not grant access
        if (!$user instanceof UserInterface) {
            return false;
        }

        // ... (check conditions and return true to grant permission) ...
        switch ($attribute) {
            case 'EDIT':
                if($subject->getUser() === $user){
                    return true;
                }
                return false;
                break;
            case 'DELETE':
                if($this->security->isGranted('ROLE_ADMIN')){
                    return  true;
                }
                if($this->security->isGranted('ROLE_COACH')){
                    return true;
                }
                if( $subject->getUser() === $user) {
                    return true;
                }
                return false;
        }

        return false;
    }
}
