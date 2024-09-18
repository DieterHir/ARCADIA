<?php

namespace App\Controller;

use App\Entity\Users;
use App\Repository\UsersRepository;
use DateTimeImmutable;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\CurrentUser;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api', name: 'app_api_')]
class SecurityController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private SerializerInterface $serializer, private UsersRepository $repository) {}

    #[Route('/registration', name: 'registration', methods: 'POST')]
    public function register(Request $request, UserPasswordHasherInterface $passwordHasher, UsersRepository $repository, ValidatorInterface $validator): JsonResponse
    {
        $user = $this->serializer->deserialize($request->getContent(), Users::class, 'json');
        $user->setEmail($user->getEmail());

        $errors = $validator->validate($user);

        if (count($errors) > 0) {
            return new JsonResponse(['message' => 'Email déjà utilisé'], Response::HTTP_UNAUTHORIZED);
        } else {
            $user->setPassword($passwordHasher->hashPassword($user, $user->getPassword()));
            $user->setCreatedAt(new DateTimeImmutable());

            $this->manager->persist($user);
            $this->manager->flush();
            return new JsonResponse(
                ['user' => $user->getUserIdentifier(), 'apiToken' => $user->getApiToken(), 'roles' => $user->getRoles()],
                Response::HTTP_CREATED
            );
        }
    }

    #[Route('/login', name: 'login', methods: 'POST')]
    public function login(#[CurrentUser] ?Users $user): JsonResponse
    {
        if ($user === null) {
            return new JsonResponse(['message' => 'Missing credentials'], Response::HTTP_UNAUTHORIZED);
        }

        return new JsonResponse([
            'user' => $user->getUserIdentifier(),
            'apiToken' => $user->getApiToken(),
            'roles' => $user->getRoles(),
        ]);
    }

    #[Route('/accounts', name: 'accounts', methods: 'GET')]
    public function display(UsersRepository $repository): JsonResponse
    {
        $users = $repository->findAll();

        $usersData = [];
        foreach ($users as $user) {
            $usersData[] = [
                'email' => $user->getEmail(),
                'id' => $user->getId(),
            ];
        }

        return new JsonResponse($usersData);
    }

    #[Route('/{id}', name: 'delete', methods: 'DELETE')]
    public function delete(int $id, UsersRepository $repository): JsonResponse
    {
        print_r($id);

        $user = $repository->findOneBy(['id' => $id]);
        if (!$user) {
            throw $this->createNotFoundException("Pas d'utilisateur trouvé pour cet id");
        }

        $this->manager->remove($user);
        $this->manager->flush();

        return $this->json(['message' => "Compte employé supprimé"], Response::HTTP_NO_CONTENT);
    }
}
