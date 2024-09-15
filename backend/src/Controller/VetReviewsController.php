<?php

namespace App\Controller;

use App\Repository\AnimalRepository;
use App\Repository\VetReviewsRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Messenger\Transport\Serialization\SerializerInterface;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/vet', name: 'app_vet_' )]
class VetReviewsController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private SerializerInterface $serializer, private VetReviewsRepository $repository) {}

    #[Route('/getReviews', name: 'getReviews', methods: 'GET')]
    public function getReviews(VetReviewsRepository $repository, AnimalRepository $animalRepository): JsonResponse
    {
        $reviews = $repository->findAll();

        $reviewsData = [];

        foreach ($reviews as $review) {
            $animal = $animalRepository->findOneBy(['id' => $review->getAnimal()]);

            $reviewsData[] = [
                'id' => $review->getId(),
                'review' => $review->getReview(),
                'name' => $animal->getName(),
                'animal_id' => $animal->getId(),
                'date' => $review->getDate(),
            ];
        }
        
        return new JsonResponse($reviewsData);
    }
}
