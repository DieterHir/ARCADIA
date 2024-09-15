<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SchedulesController extends AbstractController
{
    #[Route('/schedules', name: 'app_schedules')]
    public function index(): Response
    {
        return $this->render('schedules/index.html.twig', [
            'controller_name' => 'SchedulesController',
        ]);
    }
}
