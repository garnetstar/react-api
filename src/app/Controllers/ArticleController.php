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
		$this->database->query('UPDATE article SET ? WHERE article_id = ?',
			['title' => $data->title, 'content' => $data->content],
			$args['id']
			);
		return $response->withJson(['state' => 'ok']);
	}
}
