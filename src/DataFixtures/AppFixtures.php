<?php

namespace App\DataFixtures;

use App\Entity\User;
use App\Entity\Profil;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


class AppFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordEncoderInterface $encoder){
        $this->encoder = $encoder;
    }
    
    public function load(ObjectManager $manager)
    {
        $role_array = ["ADMIN","COACH","APPRENANT"];
        for ($i=0; $i < count($role_array); $i++) { 
            $profil = new Profil();
            $profil->setName($role_array[$i]);
            $manager->persist($profil);

            if($i == 0){
                $user = new User();
                $user->setFirstName("Omar")
                     ->setLastName("Diallo")
                     ->setEmail("omzard10@gmail.com")
                     ->setPassword($this->encoder->encodePassword($user,"passwordencoded"))
                     ->setIsActif(true)
                     ->setPhoneNumber("773662180")
                     ->setProfil($profil)
                     ->setRoles(["ROLE_".$role_array[$i]]);
                $manager->persist($user);
            }
        }

        $manager->flush();
    }
}
