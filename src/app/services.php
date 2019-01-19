<?php
declare(strict_types=1);

use Controllers\ArticleController;
use Controllers\GymController;
use Slim\Container;

/** @var Container $container */
$container = $app->getContainer();

$container['database'] = function (Container $container) {
	$settings = $container['settings']['database'];
	$database = new \Nette\Database\Connection(
		$settings['dns'],
		$settings['user'],
		$settings['password']
	);
	return $database;
};

//cache
$container['storage'] = function ($c) {
	$storage = new Nette\Caching\Storages\FileStorage('temp');
	return $storage;
};

//database context
$container['database-context'] = function ($c) {
	$storage = new Nette\Caching\Storages\FileStorage('../temp');
//	$databaseCache = new \Nette\Caching\Cache($storage);
	$structure = new \Nette\Database\Structure($c->get('database'), $storage);
	$context = new \Nette\Database\Context($c->database, $structure);
	return $context;
};

$container[HomeController::class] = function ($c) {
	return new HomeController($c->get('database'), $c['environment']);
};

$container[\Controllers\TagController::class] = function (Container $container) {
	return new \Controllers\TagController($container->get('database'));
};

$container[ArticleController::class] = function (Container $container) {
	return new ArticleController(
		$container->get('database'),
		$container->get('database-context'),
		$container->get(\Model\Authenticator::class)
	);
};

$container[GymController::class] = function ($c) {
	return new GymController($c->get('database'));
};

$container[\Model\Authenticator::class] = function ($c) {
	return new \Model\Authenticator();
};
