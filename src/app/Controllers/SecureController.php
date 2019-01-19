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
//
//		$t = "eyJhbGciOiJSUzI1NiIsImtpZCI6IjA4ZDMyNDVjNjJmODZiNjM2MmFmY2JiZmZlMWQwNjk4MjZkZDFkYzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMTkyNzQwNDI5NTc4LXM4dDMxZXNsbjRiOGFiNjRvczVhZmcxMWltYjkzbDM1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMTkyNzQwNDI5NTc4LXM4dDMxZXNsbjRiOGFiNjRvczVhZmcxMWltYjkzbDM1LmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE2ODE2OTM4NjYwODI0MjY3MjQ5IiwiZW1haWwiOiJtYWNoYWNlay5qQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiODR4amlxVG9jYmFPR1dvVGJFbE1tdyIsIm5hbWUiOiJKYW4gTWFjaMOhxI1layIsInBpY3R1cmUiOiJodHRwczovL2xoNC5nb29nbGV1c2VyY29udGVudC5jb20vLWV0REZ0SjBXbjNRL0FBQUFBQUFBQUFJL0FBQUFBQUFBREtvL0F1M2NYOUVWdmlFL3M5Ni1jL3Bob3RvLmpwZyIsImdpdmVuX25hbWUiOiJKYW4iLCJmYW1pbHlfbmFtZSI6Ik1hY2jDocSNZWsiLCJsb2NhbGUiOiJjcyIsImlhdCI6MTU0NzYyMjA1NCwiZXhwIjoxNTQ3NjI1NjU0LCJqdGkiOiI3N2JiMGRjZWJjNjdmYWM1MDdjNzJkNzNhMTExM2NjOWU5YjNhYjEyIn0.MpCkU54mlmyg9uUWDwHiruB8HBT5Ovk6c3aHtMgUJFyk0OC74nelP--a3c4Mf5gQlISpmTl1jLhWsQWxjpsYEs19We_z9nZPuFMWmqj0EBPoj3aisU79uy74574ElDDGiX7h0J6sESU3a8SZPD8KCXe9Tg2are3D_JVk2-PdQDA3v_82n5SiZMDDiEBn7lEzFnmiMgbbnRMoqU47FsRdr8oNv_vue6vaxTqQ_wHU5ytuILjnmzyPDSNmu-Hb0w33O6OARRZv1rRLiqW2MA-fFrVnJf13mixSQ3BuWJhnc18q9WobM4EmrLvwZ_pMgqqLAFJyjLRIRLqPTHbeCVpm1w";
//
//		$client = new \Google_Client(['client_id' => '192740429578-s8t31esln4b8ab64os5afg11imb93l35.apps.googleusercontent.com']);
//		$payload = $client->fetchAccessTokenWithAuthCode($parameters['access_token']);
////		$payload = $client->verifyIdToken($t);
//
//		dump($payload);
//
//
//		die();
		return true;
	}

	protected function getUnauthorizedResponse(Response $response, string $message): Response
	{
		return $response->withStatus(401)
			->withHeader('Content-Type', 'text/html')
			->write(sprintf('Unauthorized. %s', $message));
	}
}
