<?php

namespace App\Controller;

use App\Entity\Review;
use App\Repository\ReviewRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface as SerializerSerializerInterface;

#[Route('/review', name: 'app_review_')]
class ReviewController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private SerializerSerializerInterface $serializer, private ReviewRepository $repository) {}

    #[Route('/new', name: 'new', methods: 'POST')]
    public function new(Request $request): JsonResponse
    {
        $review = $this->serializer->deserialize($request->getContent(), Review::class, 'json');
        $review->setCreatedAt(new DateTimeImmutable());
        $review->setState("toCheck");

        $this->manager->persist($review);
        $this->manager->flush();
        return new JsonResponse(
            ['review' => $review->getId()],
            Response::HTTP_CREATED
        );
    }

     #[Route('/displayReviews', name: 'displayReviews', methods: 'GET')]
     public function displayReviews(ReviewRepository $repository): JsonResponse
     {
        $reviews = $repository->findAll();

        $reviewsData = [];
        foreach ($reviews as $review) {
            $reviewsData[] = [
                'id' => $review->getId(),
                'visitor_name' => $review->getVisitorName(),
                'message' => $review->getMessage(),
                'createdAt' => $review->getCreatedAt(),
                'state' => $review->getState(),
            ];
        }

        return new JsonResponse($reviewsData);
     }

     #[Route('/{id}', name: 'delete', methods: 'DELETE')]
     public function delete(int $id, ReviewRepository $repository): JsonResponse
     {
        $review = $repository->findOneBy(['id' => $id]);

        if (!$review) {
            throw $this->createNotFoundException("Pas d'avis trouvé pour cet id");
        }

        $this->manager->remove($review);
        $this->manager->flush();

        return $this->json(['message' => "Avis supprimé"], Response::HTTP_NO_CONTENT);
     }

     #[Route('/{id}', name: 'checked', methods: 'PUT')]
     public function check(int $id, ReviewRepository $repository): JsonResponse
     {
        $review = $repository->findOneBy(['id' => $id]);

        if (!$review) {
            throw $this->createNotFoundException("Pas d'avis trouvé pour cet id");
        }

        $review->setState("checked");
        
        $this->manager->flush();

        return new JsonResponse(
            ['review' => $review->getId()],
            Response::HTTP_NO_CONTENT
        );
     }
}
