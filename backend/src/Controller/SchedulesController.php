<?php

namespace App\Controller;

use App\Entity\Schedules;
use App\Repository\SchedulesRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/schedules', name: 'app_schedules')]
class SchedulesController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private SerializerInterface $serializer, private SchedulesRepository $repository) {}

    #[Route('/getSchedules', name: 'getSchedules', methods: 'GET')]
    public function getSchedules(SchedulesRepository $repository): JsonResponse
    {
        $schedules = $repository->findAll();

        $schedulesData = [];

        foreach ($schedules as $schedule) {
            $schedulesData = [
                'openingDays' => $schedule->getDays(),
                'openingTime' => $schedule->getOpeningTime(),
                'closingTime' => $schedule->getClosingTime(),
                'id' => $schedule->getId(),
            ];
        }
        return new JsonResponse($schedulesData);
    }

    #[Route('/{id}', name: 'updateSchedules', methods: 'PUT')]
    public function update(int $id, SchedulesRepository $repository, SerializerInterface $serializer, Request $request, EntityManagerInterface $manager): JsonResponse
    {
        $schedules = $repository->findOneBy(['id' => $id]);

        if (!$schedules) {
            throw $this->createNotFoundException("Problème dans la récupération des horaires");
        }

        $serializer->deserialize($request->getContent(), Schedules::class, 'json', ['object_to_populate' => $schedules]);

        $manager->flush();

        $response = $this->json(['message' => 'Horaires mis à jour'], Response::HTTP_OK);
        // $response->headers->set('Access-Control-Allow-Origin', '*');
        // $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        // $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return $response;
    }
}
