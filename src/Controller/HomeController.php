<?php

namespace App\Controller;

use PiccoliOcchi\TvFrApi\Api\ChannelsApi;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class HomeController extends AbstractTvApiController
{
    #[Route('/', name: 'home')]
    public function index(): Response
    {
        $channelsApi = new ChannelsApi(config: $this->config);

        $channels = $channelsApi->getTntChannels();

        return $this->render('home/index.html.twig', [
            'channels' => $channels,
        ]);
    }

    #[Route('/favoris', name: 'favorites')]
    public function favorites(): Response
    {
        return $this->render('favorites/index.html.twig');
    }

    #[Route('/programmes/maintenant', name: 'programs_now')]
    public function now(): Response
    {
        return $this->render('programs/now.html.twig');
    }

    #[Route('/programmes/ce-soir', name: 'programs_tonight')]
    public function tonight(): Response
    {
        return $this->render('programs/tonight.html.twig');
    }
}
