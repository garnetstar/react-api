<?php

use Controllers\ArticleController;
use Controllers\GymController;
use Controllers\HomeController;
use Controllers\TagController;
use Nette\Database\Connection;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\App;

//phpinfo();

require '../vendor/autoload.php';

$config['displayErrorDetails'] = true;

$app = new App(['settings' => $config]);

$container = $app->getContainer();

$container['database'] = function($c) {
	$database = new Connection('mysql:host=db;dbname=' . getenv('DB_NAME'), 'root', getenv('DB_PASSWORD'));
	return $database;
};

//cache
$container['storage'] = function($c) {
    $storage = new Nette\Caching\Storages\FileStorage('temp');
    return $storage;
};

//database context
$container['database-context'] = function($c){
    $storage = new Nette\Caching\Storages\FileStorage('../temp');
    $databaseCache = new \Nette\Caching\Cache($storage);
    $structure = new \Nette\Database\Structure($c->get('database'), $storage);
    $context = new \Nette\Database\Context($c->database,$structure);
    return $context;
};

$container[HomeController::class] = function($c) {
	return new HomeController($c->get('database'), $c['environment']);
};

$container[TagController::class] = function($c) {
	return new TagController($c->get('database'));
};

$container[ArticleController::class] = function($c) {
	return new ArticleController($c->get('database'), $c->get('database-context'));
};

$container[GymController::class] = function($c) {
	return new GymController($c->get('database'));
};

$app->add(function (ServerRequestInterface $request, ResponseInterface $response, callable $next) {

	return $next($request, $response);
});

$app->get('/', HomeController::class . ":home");

$app->get('/tag[/{id}]', TagController::class . ':get');
//$app->post('/user/{id}', UserController::class . ':update');

$app->put('/article', ArticleController::class.':put');
$app->get('/article[/{id}]', ArticleController::class . ':get');
$app->get('/article/filter/{field}/{word}', ArticleController::class.':filter');
$app->post('/article/{id}', ArticleController::class . ':post');
$app->delete('/article/{id}', ArticleController::class. ':delete');

$app->get('/gym[/{id}]', GymController::class . ':get');
$app->post('/gym', GymController::class . ':post');
$app->delete('/gym/{id}', GymController::class. ':delete');



$app->run();

function dump($var)
{
	echo '<pre>' . print_r($var, true) . '</pre>';
}
