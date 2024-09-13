<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class VetReviewController extends AbstractController
{
    #[Route('/vet/review', name: 'app_vet_review')]
    public function index(): Response
    {
        return $this->render('vet_review/index.html.twig', [
            'controller_name' => 'VetReviewController',
        ]);
    }
}
