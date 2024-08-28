<?php

namespace App\Controller;

use App\Entity\Habitat;
use App\Repository\HabitatRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/habitat', name: 'app_habitat_')]
class HabitatController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private SerializerInterface $serializer, private HabitatRepository $repository) {}

    #[Route('/new', name: 'new', methods: 'POST')]
    public function new(Request $request): JsonResponse
    {
        $habitat = $this->serializer->deserialize($request->getContent(), Habitat::class, 'json');

        $this->manager->persist($habitat);
        $this->manager->flush();
        return new JsonResponse(
            ['habitat' => $habitat->getId()],
            Response::HTTP_CREATED
        );
    }

    #[Route('/getHabitats', name: 'getHabitats', methods: 'GET')]
    public function getHabitats(HabitatRepository $repository): JsonResponse
    {
        $habitats = $repository->findAll();

        $habitatsData = [];
        foreach ($habitats as $habitat) {
            $habitatsData[] = [
                'name' => $habitat->getName(),
                'id' => $habitat->getId(),
                'description' => $habitat->getDescription(),
                'image' => $habitat->getImage(),
            ];
        }

        return new JsonResponse($habitatsData);
    }

    #[Route('/{id}', name: 'delete', methods: 'DELETE')]
    public function delete(int $id, HabitatRepository $repository): JsonResponse
    {
        $habitat = $repository->findOneBy(['id' => $id]);

        if (!$habitat) {
            throw $this->createNotFoundException("Pas d'habitat trouvé pour cet id");
        }

        $this->manager->remove($habitat);
        $this->manager->flush();

        return $this->json(['message' => "Avis supprimé"], Response::HTTP_NO_CONTENT);
    }
}
