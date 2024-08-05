<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\{Response, Request, JsonResponse};
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api', name: 'app_api_')]
class UserController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private UserRepository $repository, private SerializerInterface $serializer)
    {
    }

    #[Route('/new', name: 'new', methods: 'POST')]
    public function new(Request $request): Response
    {
        $user = $this->serializer->deserialize($request->getContent(), User::class, 'json');
        $user->setCreatedAt(new DateTimeImmutable());

        $this->manager->persist($user);
        $this->manager->flush();

        $responseData = $this->serializer->serialize($user, 'json');
        
        return new JsonResponse($responseData, Response::HTTP_CREATED);
    }
}