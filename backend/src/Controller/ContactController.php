<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/contact', name: 'app_contact_')]
class ContactController extends AbstractController
{
    #[Route('/send', name: 'sendEmail', methods: 'POST')]
    public function sendEmail(Request $request, MailerInterface $mailer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!isset($data['title'], $data['email'], $data['message'])) {
            return new JsonResponse(['message' => 'Données invalides ou manquantes'], 400);
        }

        $email = (new Email())
            ->from($data['email'])
            ->to('arcadia.projectst@gmail.com')
            ->subject($data['title'])
            ->text($data['message']);

        try {
            $mailer->send($email);
            return new JsonResponse(['message' => 'Email envoyé avec succès !']);
        } catch (\Exception $e) {
            return new JsonResponse(['message' => "Erreur dans l\'envoi"], 500);
        }
    }
}
