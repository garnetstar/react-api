<?php

namespace Controllers;

use Nette\Database\Connection;
use Nette\Utils\DateTime;
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
			$data = $this->database->query('SELECT * FROM article WHERE isnull(deleted) AND article_id=?', $args['id'])->fetch();
			return $response->withJson($data);
		} else {
			$data = $this->database->query('SELECT article_id, title FROM article WHERE isnull(deleted) ')->fetchAll();
			return $response->withJson($data);
		}
	}
	
	public function put(Request $request, Response $response, $args) {
		$data = json_decode($request->getBody()->getContents());
			$this->database->query('INSERT INTO article', ['title' => $data->title, 'content'=> '', 'last_update' => new DateTime]);
			$articleId = $this->database->getInsertId();
		return $response->withJson(['state' => 'ok', 'article_id' => $articleId]);
	}

	public function post(Request $request, Response $response, $args)
	{
		$data = json_decode($request->getBody()->getContents());
		$this->database->query('UPDATE article SET ? WHERE article_id = ?',
			['title' => $data->title, 'content' => $data->content, 'last_update' => new DateTime()],
			$args['id']
			);
		return $response->withJson(['state' => 'ok']);
	}
	
	public function delete(Request $request, Response $response, $args) {
		$this->database->query('UPDATE article SET deleted=NOW() WHERE article_id=?', $args['id']);
		return $response->withJson(['state' => 'ok']);
	}
}
