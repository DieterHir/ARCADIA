<?php

namespace App\Controller;

use App\Repository\HabitatRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/habitat', name: 'app_habitat')]
class HabitatController extends AbstractController
{
    public function __construct(private EntityManagerInterface $manager, private SerializerInterface $serializer, private HabitatRepository $repository) {}

    #[Route('/new', name: 'new', methods: 'POST')]
}
