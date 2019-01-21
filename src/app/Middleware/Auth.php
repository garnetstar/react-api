<?php
declare(strict_types=1);

namespace Middleware;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

class Auth
{
	public function __invoke(ServerRequestInterface $request, ResponseInterface $response, callable $next)
	{
		$queryParams = $request->getQueryParams();

		if (isset($queryParams['access_token'])) {
			$response = $next($request, $response);
		} else {
			$response->getBody()->write('Missing auth token');
			$response->withStatus(403);
		}

		return $response;
	}
}
