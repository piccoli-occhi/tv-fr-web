<?php

namespace App\Controller;

use PiccoliOcchi\TvFrApi\Configuration;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\DependencyInjection\Attribute\Autowire;

abstract class AbstractTvApiController extends AbstractController
{
    protected Configuration $config;

    public function __construct(
        #[Autowire(env: 'TV_API_URL')]
        string $apiUrl,
    ) {
        $this->config = (new Configuration())->setHost($apiUrl);
    }
}
