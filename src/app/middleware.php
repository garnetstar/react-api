<?php
declare(strict_types=1);

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

$app->add(function (ServerRequestInterface $request, ResponseInterface $response, callable $next) {
	return $next($request, $response);
});
