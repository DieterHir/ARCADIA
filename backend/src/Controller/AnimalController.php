<?php

namespace App\Controller;

use App\Entity\Animal;
use App\Entity\Habitat;
use App\Entity\VetReviews;
use App\Repository\AnimalRepository;
use App\Repository\VetReviewsRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/animal', name: 'app_animal_')]
class AnimalController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private SerializerInterface $serializer, private AnimalRepository $repository) {}

    #[Route('/new', name: 'new', methods: 'POST')]
    public function new(Request $request): JsonResponse
    {
        $data = $request->getContent();

        $animal = $this->serializer->deserialize($data, Animal::class, 'json');

        $decodedData = json_decode($data, true);
        $habitatId = $decodedData['habitat'] ?? null;

        if ($habitatId) {
            $habitat = $this->manager->getRepository(Habitat::class)->find($habitatId);

            if (!$habitat) {
                return new JsonResponse(['error' => 'Habitat non trouvé'], Response::HTTP_NOT_FOUND);
            }

            $animal->setHabitat($habitat);
        } else {
            return new JsonResponse(['error' => 'Habitat non spécifié'], Response::HTTP_BAD_REQUEST);
        }

        $this->manager->persist($animal);
        $this->manager->flush();
        return new JsonResponse(
            ['animal' => $animal->getId()],
            Response::HTTP_CREATED
        );
    }

    #[Route('/getAnimals', name: 'getAnimals', methods: 'GET')]
    public function getAnimals(AnimalRepository $repository, VetReviewsRepository $vetReviewsRepository): JsonResponse
    {
        $animals = $repository->findAll();

        $animalsData = [];
        foreach ($animals as $animal) {
            $lastReview = $vetReviewsRepository->findLatestReview($animal->getId());

            if (!$lastReview)
            {
                $animalsData[] = [
                    'name' => $animal->getName(),
                    'id' => $animal->getId(),
                    'image' => $animal->getImage(),
                    'species' => $animal->getSpecies(),
                    'age' => $animal->getAge(),
                    'size' => $animal->getSize(),
                    'weight' => $animal->getWeight(),
                    'habitat' => $animal->getHabitat(),
                    'state' => $animal->getState(),
                    'lastMeal' => $animal->getLastMealType(),
                    'lastMealQty' => $animal->getLastMealQty(),
                ];
            } else {
                $animalsData[] = [
                    'name' => $animal->getName(),
                    'id' => $animal->getId(),
                    'image' => $animal->getImage(),
                    'species' => $animal->getSpecies(),
                    'age' => $animal->getAge(),
                    'size' => $animal->getSize(),
                    'weight' => $animal->getWeight(),
                    'habitat' => $animal->getHabitat(),
                    'state' => $animal->getState(),
                    'lastMeal' => $animal->getLastMealType(),
                    'lastMealQty' => $animal->getLastMealQty(),
                    'lastVetVisit' => $lastReview->getDate()->format('Y-m-d H:i:s'),
                    'vetReview' => $lastReview->getReview(),
                ];
            }
        }

        return new JsonResponse($animalsData);
    }

    #[Route('/{id}', name: 'delete', methods: 'DELETE')]
    public function delete(int $id, AnimalRepository $repository): JsonResponse
    {
        $animal = $repository->findOneBy(['id' => $id]);

        if (!$animal) {
            throw $this->createNotFoundException("Pas d'animal trouvé pour cet id");
        }

        $this->manager->remove($animal);
        $this->manager->flush();

        return $this->json(['message' => "Animal supprimée"], Response::HTTP_NO_CONTENT);
    }

    #[Route('/{id}', name: 'update', methods: 'PUT')]
    public function update(int $id, AnimalRepository $repository, SerializerInterface $serializer, Request $request, EntityManagerInterface $manager): JsonResponse
    {
        $animal = $repository->findOneBy(['id' => $id]);

        if (!$animal) {
            throw $this->createNotFoundException("Pas d'animal trouvé pour cet id");
        }

        $serializer->deserialize($request->getContent(), Animal::class, 'json', ['object_to_populate' => $animal]);

        $manager->flush();

        return $this->json(['message' => 'Animal mis à jour'], Response::HTTP_NO_CONTENT);
    }

    #[Route('/{id}', name: 'displayAnimal', methods: 'GET')]
    public function displayAnimal(int $id, AnimalRepository $repository, VetReviewsRepository $vetReviewsRepository): JsonResponse
    {
        $animal = $repository->findOneBy(['id' => $id]);
        $lastReview = $vetReviewsRepository->findLatestReview($animal->getId());

        if (!$animal) {
            throw $this->createNotFoundException("Pas d'animal trouvé pour cet id");
        }

        $animalData = [
            'id' => $animal->getId(),
            'name' => $animal->getName(),
            'image' => $animal->getImage(),
            'species' => $animal->getSpecies(),
            'age' => $animal->getAge(),
            'state' => $animal->getState(),
            'stateReview' => $lastReview->getReview(),
            'lastMeal' => $animal->getLastMealType(),
            'lastMealQty' => $animal->getLastMealQty(),
            'lastVetVisit' => $lastReview->getDate()->format('Y-m-d H:i:s'),
        ];

        $habitatId = $animal->getHabitat();

        if ($habitatId !== null && $habitatId !== "") {
            $habitat = $this->manager->getRepository(Habitat::class)->find($habitatId);
            $habitatName = $habitat->getName();

            $animalData += [
                'habitatId' => ($animal->getHabitat())->getId(),
                'habitat' => $habitatName,
            ];
        }

        return new JsonResponse($animalData);
    }

    #[Route('/vet/{id}', name: 'updateVetReview', methods: 'PUT')]
    public function updateVetReview(int $id, AnimalRepository $repository, SerializerInterface $serializer, Request $request, EntityManagerInterface $manager): JsonResponse
    {
        $animal = $repository->findOneBy(['id' => $id]);
        $data = $request->getContent();

        if (!$animal) {
            throw $this->createNotFoundException("Pas d'animal trouvé pour cet id");
        }

        $vetReview = $serializer->deserialize($data, VetReviews::class, 'json');

        $reviewData = json_decode($data, true)['review'] ?? null;
        if ($reviewData !== "" && $reviewData) {
            $vetReview->setAnimal($animal);
            $vetReview->setDate(new DateTimeImmutable());

            $manager->persist($vetReview);
        }

        $animalData = json_decode($data, true)['animal'] ?? null;
        if ($animalData && isset($animalData['state'])) {
            $animal->setState($animalData['state']);
        }

        $manager->persist($animal);
        $manager->flush();

        return $this->json(['message' => 'Avis vétérinaire mis à jour avec succès']);
    }
}
