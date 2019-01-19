<?php

use Slim\App;

//phpinfo();

require __DIR__. '/../vendor/autoload.php';

$settings = require __DIR__ . '/../src/app/settings.php';

$app = new App(['settings' => $settings]);

require __DIR__ . '/../src/app/services.php';

require __DIR__ . '/../src/app/middleware.php';

require __DIR__ . '/../src/app/routes.php';

require __DIR__ . '/../src/app/functions.php';

$app->run();

