<?php
declare(strict_types=1);

namespace Controllers;

use Slim\Http\Request;
use Slim\Http\Response;

class SecureController
{

	public function hasAccessToken(Request $request): bool
	{
		$parameters = $request->getParams();
		if (!isset($parameters['access_token'])) {
			return false;
		}

		return true;
	}

	protected function getUnauthorizedResponse(Response $response, string $message): Response
	{
		return $response->withStatus(401)
			->withHeader('Content-Type', 'text/html')
			->write(sprintf('Unauthorized. %s', $message));
	}
}
