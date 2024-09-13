<?php

namespace App\Repository;

use App\Entity\VetReview;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<VetReview>
 *
 * @method VetReview|null find($id, $lockMode = null, $lockVersion = null)
 * @method VetReview|null findOneBy(array $criteria, array $orderBy = null)
 * @method VetReview[]    findAll()
 * @method VetReview[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VetReviewRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, VetReview::class);
    }

//    /**
//     * @return VetReview[] Returns an array of VetReview objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('v')
//            ->andWhere('v.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('v.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?VetReview
//    {
//        return $this->createQueryBuilder('v')
//            ->andWhere('v.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
