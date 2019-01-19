<?php
declare(strict_types=1);

use Controllers\ArticleController;

/**
 * Article
 */
$app->put('/article', ArticleController::class.':put');
$app->get('/article[/{id}]', ArticleController::class . ':get');
$app->get('/article/filter/{field}/{word}', ArticleController::class.':filter');
$app->post('/article/{id}', ArticleController::class . ':post');
$app->delete('/article/{id}', ArticleController::class. ':delete');

/**
 * Gym
 */
$app->get('/gym[/{id}]', \Controllers\GymController::class . ':get');
$app->post('/gym', GymController::class . ':post');
$app->delete('/gym/{id}', GymController::class. ':delete');

/**
 * Tag
 */
$app->get('/tag[/{id}]', TagController::class . ':get');