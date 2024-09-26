<?php

namespace App\Controller;

use App\Repository\AnimalRepository;
use MongoDB\Client;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/mongoDB', name: 'mongodb_')]
class MongoController extends AbstractController
{
    #[Route('/{id}', name: 'increaseVisits', methods: 'PUT')]
    public function increaseVisits(int $id, AnimalRepository $repository): JsonResponse
    {
        error_log("Requête reçue pour l'animal avec l'ID: " . $id);

        $mongoClient = new Client("mongodb://localhost:27017");
        $mongoCollection = $mongoClient->arcadia->animalsVisits;

        $animalId = $mongoCollection->findOne(['id' => $id]);
        $mariaAnimal = $repository->findOneBy(['id' => $id]);

        if (!$animalId) {
            error_log("Aucun enregistrement trouvé dans MongoDB, insertion d'un nouveau document pour l'ID: " . $id);

            $mongoCollection->insertOne([
                'id' => $id,
                'name' => $mariaAnimal->getName(),
                'visitsCount' => 1
            ]);
        } else {
            error_log("Mise à jour du compteur de visites pour l'animal avec l'ID: " . $id);

            $mongoCollection->updateOne(
                ['id' => $id],
                ['$inc' => ['visitsCount' => 1]]
            );
        }

        return new JsonResponse(['message' => 'Compteur mis à jour']);
    }
}
