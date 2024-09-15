<?php

namespace App\Controller;

use App\Entity\Services;
use App\Repository\ServicesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\DependencyInjection\ServicesResetter;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/services', name: 'app_services')]
class ServicesController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private SerializerInterface $serializer, private ServicesRepository $repository) {}

    #[Route('/new', name: 'new', methods: 'POST')]
    public function new(Request $request): JsonResponse
    {
        $service = $this->serializer->deserialize($request->getContent(), Services::class, 'json');

        $this->manager->persist($service);
        $this->manager->flush();
        return new JsonResponse(
            ['service' => $service->getId()],
            Response::HTTP_CREATED
        );
    }

    #[Route('/getServices', name: 'getServices', methods: 'GET')]
    public function getServices(ServicesRepository $repository): JsonResponse
    {
        $services = $repository->findAll();

        $servicesData = [];
        foreach ($services as $service) {
            $servicesData[] = [
                'id' => $service->getId(),
                'name' => $service->getName(),
                'description' => $service->getDescription(),
                'image' => $service->getImage(),
            ];
        }
        return new JsonResponse($servicesData);
    }

    #[Route('/{id}', name: 'delete', methods: 'DELETE')]
    public function delete(int $id, ServicesRepository $repository): JsonResponse
    {
        $service = $repository->findOneBy(['id' => $id]);

        if (!$service) {
            throw $this->createNotFoundException("Pas de service trouvé pour cet id");
        }

        $this->manager->remove($service);
        $this->manager->flush();

        return $this->json(['message' => "Service supprimé"], Response::HTTP_NO_CONTENT);
    }

    #[Route('/{id}', name: 'update', methods: 'PUT')]
    public function update(int $id, ServicesRepository $repository, SerializerInterface $serializer, Request $request, EntityManagerInterface $manager): JsonResponse
    {
        $service = $repository->findOneBy(['id' => $id]);

        if (!$service) {
            throw $this->createNotFoundException("Pas de service trouvé pour cet id");
        }

        $serializer->deserialize($request->getContent(), Services::class, 'json', ['object_to_populate' => $service]);

        $manager->flush();

        return $this->json(['message' => 'Service mis à jour'], Response::HTTP_NO_CONTENT);
    }
}
