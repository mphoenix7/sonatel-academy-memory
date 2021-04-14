<?php

namespace App\Repository;

use App\Entity\Cohort;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Cohort|null find($id, $lockMode = null, $lockVersion = null)
 * @method Cohort|null findOneBy(array $criteria, array $orderBy = null)
 * @method Cohort[]    findAll()
 * @method Cohort[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CohortRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Cohort::class);
    }

    // /**
    //  * @return Cohort[] Returns an array of Cohort objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Cohort
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
