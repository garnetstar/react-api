<?php

namespace Controllers;

use Nette\Database\Connection;
use Slim\Http\Request;
use Slim\Http\Response;

/**
 * Description of ArticleController
 *
 * @author machacej
 */
class ArticleController
{

	/** @var Connection */
	private $database;

	public function __construct(Connection $database)
	{
		$this->database = $database;
	}

	public function get(Request $request, Response $response, $args)
	{
		if (isset($args['id'])) {
			$data = $this->database->query('SELECT * FROM article WHERE article_id=?', $args['id'])->fetch();
			return $response->withJson($data);
		} else {
			$data = $this->database->query('SELECT article_id, title FROM article')->fetchAll();
			return $response->withJson($data);
		}
	}

	public function post(Request $request, Response $response, $args)
	{
		$data = json_decode($request->getBody()->getContents());
		$this->database->query('INSERT INTO article', ['title' => $data->title, 'content' => $data->content]);


		return $response->withJson(['state' => 'ok']);

//		$response->setStatus(200);
//        $response()->headers->set('Content-Type', 'application/json');
//        echo json_encode(array("status" => "success", "code" => 1));
//
//		die();
//		if (isset($args['id'])) {
//		} else {
//			die("ssss");
////			$data = $this->database->query('SELECT * FROM tag')->fetchAll();
////			return $response->withJson($data);
//		}
	}
}
