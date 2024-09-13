<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SpeciesController extends AbstractController
{
    #[Route('/species', name: 'app_species')]
    public function index(): Response
    {
        return $this->render('species/index.html.twig', [
            'controller_name' => 'SpeciesController',
        ]);
    }
}
