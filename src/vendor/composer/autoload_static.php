<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit9f8a8eb2f2f2aaffec3cad806e801cb3
{
    public static $files = array (
        '253c157292f75eb38082b5acb06f3f01' => __DIR__ . '/..' . '/nikic/fast-route/src/functions.php',
    );

    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'Slim\\' => 5,
        ),
        'P' => 
        array (
            'Psr\\Http\\Message\\' => 17,
            'Psr\\Container\\' => 14,
        ),
        'I' => 
        array (
            'Interop\\Container\\' => 18,
        ),
        'F' => 
        array (
            'FastRoute\\' => 10,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Slim\\' => 
        array (
            0 => __DIR__ . '/..' . '/slim/slim/Slim',
        ),
        'Psr\\Http\\Message\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/http-message/src',
        ),
        'Psr\\Container\\' => 
        array (
            0 => __DIR__ . '/..' . '/psr/container/src',
        ),
        'Interop\\Container\\' => 
        array (
            0 => __DIR__ . '/..' . '/container-interop/container-interop/src/Interop/Container',
        ),
        'FastRoute\\' => 
        array (
            0 => __DIR__ . '/..' . '/nikic/fast-route/src',
        ),
    );

    public static $fallbackDirsPsr4 = array (
        0 => __DIR__ . '/../..' . '/app',
    );

    public static $prefixesPsr0 = array (
        'P' => 
        array (
            'Pimple' => 
            array (
                0 => __DIR__ . '/..' . '/pimple/pimple/src',
            ),
        ),
        'M' => 
        array (
            'Michelf' => 
            array (
                0 => __DIR__ . '/..' . '/michelf/php-markdown',
            ),
        ),
    );

    public static $classMap = array (
        'Nette\\ArgumentOutOfRangeException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\Bridges\\CacheDI\\CacheExtension' => __DIR__ . '/..' . '/nette/caching/src/Bridges/CacheDI/CacheExtension.php',
        'Nette\\Bridges\\CacheLatte\\CacheMacro' => __DIR__ . '/..' . '/nette/caching/src/Bridges/CacheLatte/CacheMacro.php',
        'Nette\\Bridges\\DatabaseDI\\DatabaseExtension' => __DIR__ . '/..' . '/nette/database/src/Bridges/DatabaseDI/DatabaseExtension.php',
        'Nette\\Bridges\\DatabaseTracy\\ConnectionPanel' => __DIR__ . '/..' . '/nette/database/src/Bridges/DatabaseTracy/ConnectionPanel.php',
        'Nette\\Caching\\Cache' => __DIR__ . '/..' . '/nette/caching/src/Caching/Cache.php',
        'Nette\\Caching\\IBulkReader' => __DIR__ . '/..' . '/nette/caching/src/Caching/IBulkReader.php',
        'Nette\\Caching\\IStorage' => __DIR__ . '/..' . '/nette/caching/src/Caching/IStorage.php',
        'Nette\\Caching\\OutputHelper' => __DIR__ . '/..' . '/nette/caching/src/Caching/OutputHelper.php',
        'Nette\\Caching\\Storages\\DevNullStorage' => __DIR__ . '/..' . '/nette/caching/src/Caching/Storages/DevNullStorage.php',
        'Nette\\Caching\\Storages\\FileStorage' => __DIR__ . '/..' . '/nette/caching/src/Caching/Storages/FileStorage.php',
        'Nette\\Caching\\Storages\\IJournal' => __DIR__ . '/..' . '/nette/caching/src/Caching/Storages/IJournal.php',
        'Nette\\Caching\\Storages\\MemcachedStorage' => __DIR__ . '/..' . '/nette/caching/src/Caching/Storages/MemcachedStorage.php',
        'Nette\\Caching\\Storages\\MemoryStorage' => __DIR__ . '/..' . '/nette/caching/src/Caching/Storages/MemoryStorage.php',
        'Nette\\Caching\\Storages\\NewMemcachedStorage' => __DIR__ . '/..' . '/nette/caching/src/Caching/Storages/NewMemcachedStorage.php',
        'Nette\\Caching\\Storages\\SQLiteJournal' => __DIR__ . '/..' . '/nette/caching/src/Caching/Storages/SQLiteJournal.php',
        'Nette\\Caching\\Storages\\SQLiteStorage' => __DIR__ . '/..' . '/nette/caching/src/Caching/Storages/SQLiteStorage.php',
        'Nette\\Database\\Connection' => __DIR__ . '/..' . '/nette/database/src/Database/Connection.php',
        'Nette\\Database\\ConnectionException' => __DIR__ . '/..' . '/nette/database/src/Database/exceptions.php',
        'Nette\\Database\\ConstraintViolationException' => __DIR__ . '/..' . '/nette/database/src/Database/exceptions.php',
        'Nette\\Database\\Context' => __DIR__ . '/..' . '/nette/database/src/Database/Context.php',
        'Nette\\Database\\Conventions\\AmbiguousReferenceKeyException' => __DIR__ . '/..' . '/nette/database/src/Database/Conventions/AmbiguousReferenceKeyException.php',
        'Nette\\Database\\Conventions\\DiscoveredConventions' => __DIR__ . '/..' . '/nette/database/src/Database/Conventions/DiscoveredConventions.php',
        'Nette\\Database\\Conventions\\StaticConventions' => __DIR__ . '/..' . '/nette/database/src/Database/Conventions/StaticConventions.php',
        'Nette\\Database\\DriverException' => __DIR__ . '/..' . '/nette/database/src/Database/DriverException.php',
        'Nette\\Database\\Drivers\\MsSqlDriver' => __DIR__ . '/..' . '/nette/database/src/Database/Drivers/MsSqlDriver.php',
        'Nette\\Database\\Drivers\\MySqlDriver' => __DIR__ . '/..' . '/nette/database/src/Database/Drivers/MySqlDriver.php',
        'Nette\\Database\\Drivers\\OciDriver' => __DIR__ . '/..' . '/nette/database/src/Database/Drivers/OciDriver.php',
        'Nette\\Database\\Drivers\\OdbcDriver' => __DIR__ . '/..' . '/nette/database/src/Database/Drivers/OdbcDriver.php',
        'Nette\\Database\\Drivers\\PgSqlDriver' => __DIR__ . '/..' . '/nette/database/src/Database/Drivers/PgSqlDriver.php',
        'Nette\\Database\\Drivers\\Sqlite2Driver' => __DIR__ . '/..' . '/nette/database/src/Database/Drivers/Sqlite2Driver.php',
        'Nette\\Database\\Drivers\\SqliteDriver' => __DIR__ . '/..' . '/nette/database/src/Database/Drivers/SqliteDriver.php',
        'Nette\\Database\\Drivers\\SqlsrvDriver' => __DIR__ . '/..' . '/nette/database/src/Database/Drivers/SqlsrvDriver.php',
        'Nette\\Database\\ForeignKeyConstraintViolationException' => __DIR__ . '/..' . '/nette/database/src/Database/exceptions.php',
        'Nette\\Database\\Helpers' => __DIR__ . '/..' . '/nette/database/src/Database/Helpers.php',
        'Nette\\Database\\IConventions' => __DIR__ . '/..' . '/nette/database/src/Database/IConventions.php',
        'Nette\\Database\\IRow' => __DIR__ . '/..' . '/nette/database/src/Database/IRow.php',
        'Nette\\Database\\IRowContainer' => __DIR__ . '/..' . '/nette/database/src/Database/IRowContainer.php',
        'Nette\\Database\\IStructure' => __DIR__ . '/..' . '/nette/database/src/Database/IStructure.php',
        'Nette\\Database\\ISupplementalDriver' => __DIR__ . '/..' . '/nette/database/src/Database/ISupplementalDriver.php',
        'Nette\\Database\\NotNullConstraintViolationException' => __DIR__ . '/..' . '/nette/database/src/Database/exceptions.php',
        'Nette\\Database\\ResultSet' => __DIR__ . '/..' . '/nette/database/src/Database/ResultSet.php',
        'Nette\\Database\\Row' => __DIR__ . '/..' . '/nette/database/src/Database/Row.php',
        'Nette\\Database\\SqlLiteral' => __DIR__ . '/..' . '/nette/database/src/Database/SqlLiteral.php',
        'Nette\\Database\\SqlPreprocessor' => __DIR__ . '/..' . '/nette/database/src/Database/SqlPreprocessor.php',
        'Nette\\Database\\Structure' => __DIR__ . '/..' . '/nette/database/src/Database/Structure.php',
        'Nette\\Database\\Table\\ActiveRow' => __DIR__ . '/..' . '/nette/database/src/Database/Table/ActiveRow.php',
        'Nette\\Database\\Table\\GroupedSelection' => __DIR__ . '/..' . '/nette/database/src/Database/Table/GroupedSelection.php',
        'Nette\\Database\\Table\\IRow' => __DIR__ . '/..' . '/nette/database/src/Database/Table/IRow.php',
        'Nette\\Database\\Table\\IRowContainer' => __DIR__ . '/..' . '/nette/database/src/Database/Table/IRowContainer.php',
        'Nette\\Database\\Table\\Selection' => __DIR__ . '/..' . '/nette/database/src/Database/Table/Selection.php',
        'Nette\\Database\\Table\\SqlBuilder' => __DIR__ . '/..' . '/nette/database/src/Database/Table/SqlBuilder.php',
        'Nette\\Database\\UniqueConstraintViolationException' => __DIR__ . '/..' . '/nette/database/src/Database/exceptions.php',
        'Nette\\DeprecatedException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\DirectoryNotFoundException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\FileNotFoundException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\IOException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\InvalidArgumentException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\InvalidStateException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\Iterators\\CachingIterator' => __DIR__ . '/..' . '/nette/utils/src/Iterators/CachingIterator.php',
        'Nette\\Iterators\\Filter' => __DIR__ . '/..' . '/nette/utils/src/Iterators/Filter.php',
        'Nette\\Iterators\\Mapper' => __DIR__ . '/..' . '/nette/utils/src/Iterators/Mapper.php',
        'Nette\\Iterators\\RecursiveFilter' => __DIR__ . '/..' . '/nette/utils/src/Iterators/RecursiveFilter.php',
        'Nette\\Localization\\ITranslator' => __DIR__ . '/..' . '/nette/utils/src/Utils/ITranslator.php',
        'Nette\\MemberAccessException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\NotImplementedException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\NotSupportedException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\Object' => __DIR__ . '/..' . '/nette/utils/src/Utils/Object.php',
        'Nette\\OutOfRangeException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\SmartObject' => __DIR__ . '/..' . '/nette/utils/src/Utils/SmartObject.php',
        'Nette\\StaticClass' => __DIR__ . '/..' . '/nette/utils/src/Utils/StaticClass.php',
        'Nette\\StaticClassException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\UnexpectedValueException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\Utils\\ArrayHash' => __DIR__ . '/..' . '/nette/utils/src/Utils/ArrayHash.php',
        'Nette\\Utils\\ArrayList' => __DIR__ . '/..' . '/nette/utils/src/Utils/ArrayList.php',
        'Nette\\Utils\\Arrays' => __DIR__ . '/..' . '/nette/utils/src/Utils/Arrays.php',
        'Nette\\Utils\\AssertionException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\Utils\\Callback' => __DIR__ . '/..' . '/nette/utils/src/Utils/Callback.php',
        'Nette\\Utils\\DateTime' => __DIR__ . '/..' . '/nette/utils/src/Utils/DateTime.php',
        'Nette\\Utils\\FileSystem' => __DIR__ . '/..' . '/nette/utils/src/Utils/FileSystem.php',
        'Nette\\Utils\\Finder' => __DIR__ . '/..' . '/nette/finder/src/Utils/Finder.php',
        'Nette\\Utils\\Html' => __DIR__ . '/..' . '/nette/utils/src/Utils/Html.php',
        'Nette\\Utils\\IHtmlString' => __DIR__ . '/..' . '/nette/utils/src/Utils/IHtmlString.php',
        'Nette\\Utils\\Image' => __DIR__ . '/..' . '/nette/utils/src/Utils/Image.php',
        'Nette\\Utils\\ImageException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\Utils\\Json' => __DIR__ . '/..' . '/nette/utils/src/Utils/Json.php',
        'Nette\\Utils\\JsonException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\Utils\\ObjectMixin' => __DIR__ . '/..' . '/nette/utils/src/Utils/ObjectMixin.php',
        'Nette\\Utils\\Paginator' => __DIR__ . '/..' . '/nette/utils/src/Utils/Paginator.php',
        'Nette\\Utils\\Random' => __DIR__ . '/..' . '/nette/utils/src/Utils/Random.php',
        'Nette\\Utils\\Reflection' => __DIR__ . '/..' . '/nette/utils/src/Utils/Reflection.php',
        'Nette\\Utils\\RegexpException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\Utils\\Strings' => __DIR__ . '/..' . '/nette/utils/src/Utils/Strings.php',
        'Nette\\Utils\\UnknownImageFileException' => __DIR__ . '/..' . '/nette/utils/src/Utils/exceptions.php',
        'Nette\\Utils\\Validators' => __DIR__ . '/..' . '/nette/utils/src/Utils/Validators.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit9f8a8eb2f2f2aaffec3cad806e801cb3::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit9f8a8eb2f2f2aaffec3cad806e801cb3::$prefixDirsPsr4;
            $loader->fallbackDirsPsr4 = ComposerStaticInit9f8a8eb2f2f2aaffec3cad806e801cb3::$fallbackDirsPsr4;
            $loader->prefixesPsr0 = ComposerStaticInit9f8a8eb2f2f2aaffec3cad806e801cb3::$prefixesPsr0;
            $loader->classMap = ComposerStaticInit9f8a8eb2f2f2aaffec3cad806e801cb3::$classMap;

        }, null, ClassLoader::class);
    }
}
