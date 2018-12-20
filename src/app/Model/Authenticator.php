<?php
declare(strict_types=1);

namespace Model;

class Authenticator
{
	public function authenticate(string $accessToken): bool
	{
		return true;
	}
}
