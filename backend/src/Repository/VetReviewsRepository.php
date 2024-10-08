<?php

namespace App\Repository;

use App\Entity\VetReviews;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<VetReviews>
 *
 * @method VetReviews|null find($id, $lockMode = null, $lockVersion = null)
 * @method VetReviews|null findOneBy(array $criteria, array $orderBy = null)
 * @method VetReviews[]    findAll()
 * @method VetReviews[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class VetReviewsRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, VetReviews::class);
    }

    public function findLatestReview(int $animalId): ?VetReviews
    {
        $result =  $this->createQueryBuilder('v')
            ->andWhere('v.animal = :animal')
            ->setParameter('animal', $animalId)
            ->orderBy('v.date', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();

        if ($result === null) {
            error_log('Aucun avis vétérinaire trouvé pour cet animal');
        }

        return $result;
    }
}
