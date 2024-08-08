<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api', name: 'app_api_')]
class SecurityController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private SerializerInterface $serializer, private UserRepository $repository,)
    {
    }

    #[Route('/registration', name: 'registration', methods: 'POST')]
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $user = $this->serializer->deserialize($request->getContent(), User::class, 'json');
        $user->setPassword($passwordHasher->hashPassword($user, $user->getPassword()));
        $user->setCreatedAt(new DateTimeImmutable());

        $this->manager->persist($user);
        $this->manager->flush();
        return new JsonResponse(
            ['user' => $user->getUserIdentifier(), 'apiToken' => $user->getApiToken(), 'roles' => $user->getRoles()],
            Response::HTTP_CREATED
        );
    }

    #[Route('/login', name: 'login', methods: 'POST')]
    public function login(UserRepository $repository): JsonResponse
    {
        if (null === $repository) {
            return new JsonResponse(['message' => 'Missing credentials'], Response::HTTP_UNAUTHORIZED);
        }

        return new JsonResponse([
            'user' => $repository->getUserIdentifier(),
            'apiToken' => $repository->getApiToken(),
            'roles' => $repository->getRoles(),
        ]);
    }

    #[Route('/accounts', name: 'accounts', methods: 'GET')]
    public function display(UserRepository $repository) {
        $users = $repository->findAll();

        $usersData = [];
        foreach($users as $user) {
            $usersData[] = [
                'email' => $user->getEmail(),
            ];
        }

        return new JsonResponse($usersData);
    }

    #[Route('/{email}', name: 'delete', methods: 'DELETE')]
    public function delete(string $email, UserRepository $repository)
    {
        $user = $repository->findOneBy(['email' => $email]);
        if (!$user) {
            throw $this->createNotFoundException("Pas d'utilisateur trouvé pour cet email");
        }

        $this->manager->remove($user);
        $this->manager->flush();

        return $this->json(['message' => "Compte employé supprimé"], Response::HTTP_NO_CONTENT);
    }
}
