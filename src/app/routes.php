<?php
declare(strict_types=1);

use Controllers\ArticleController;
use Controllers\LoginController;

/**
 * Article
 */
$app->get('/article[/{id}]', ArticleController::class . ':get')
	->add(\Middleware\Auth::class);

$app->get('/article/filter/{field}/{word}', ArticleController::class . ':filter');
$app->put('/article', ArticleController::class . ':put');
$app->post('/article/{id}', ArticleController::class . ':post');
$app->delete('/article/{id}', ArticleController::class . ':delete');

/**
 * Gym
 */
$app->get('/gym[/{id}]', \Controllers\GymController::class . ':get');
$app->post('/gym', GymController::class . ':post');
$app->delete('/gym/{id}', GymController::class . ':delete');

/**
 * Tag
 */
$app->get('/tag[/{id}]', TagController::class . ':get');

/**
 * Login
 */
$app->post('/login', LoginController::class . ':post');
