<?php

namespace App\Controller;

use PiccoliOcchi\TvFrApi\Api\ChannelsApi;
use PiccoliOcchi\TvFrApi\ApiException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class ChannelController extends AbstractTvApiController
{
    #[Route('/channels', name: 'channels_index')]
    public function index(): Response
    {
        $channelsApi = new ChannelsApi(config: $this->config);

        try {
            $response = $channelsApi->getChannels();
        } catch (ApiException $e) {
            return $this->render('channels/index.html.twig', [
                'channels' => [],
                'total' => 0,
                'totalPages' => 1,
                'limit' => 0,
                'loadError' => true,
            ]);
        }

        return $this->render('channels/index.html.twig', [
            'channels' => $response->getChannels(),
            'total' => $response->getTotal(),
            'totalPages' => $response->getTotalPages(),
            'limit' => $response->getLimit(),
            'loadError' => false,
        ]);
    }

    #[Route('/channels/more', name: 'channels_more')]
    public function more(Request $request): JsonResponse
    {
        $channelsApi = new ChannelsApi(config: $this->config);
        $page = max(1, (int) $request->query->get('page', 1));

        try {
            $response = $channelsApi->getChannels(page: $page);
        } catch (ApiException $e) {
            $status = $e->getCode();

            return $this->json(
                ['error' => Response::HTTP_TOO_MANY_REQUESTS === $status ? 'rate_limited' : 'unavailable'],
                $status ?: Response::HTTP_BAD_GATEWAY,
            );
        }

        return $this->json([
            'channels' => $response->getChannels(),
            'total' => $response->getTotal(),
            'totalPages' => $response->getTotalPages(),
            'limit' => $response->getLimit(),
        ]);
    }

    #[Route('/channel/{id}', name: 'channels_show', requirements: ['id' => '[^/]+'])]
    public function show(string $id): Response
    {
        $channelsApi = new ChannelsApi(config: $this->config);
        $response = $channelsApi->getChannelDetails($id);

        return $this->render('channels/show.html.twig', [
            'channel' => $response->getChannel(),
            'currentProgram' => $response->getCurrentProgram(),
            'dayPrograms' => $response->getDayPrograms(),
        ]);
    }
}
