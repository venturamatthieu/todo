<?php

return [
    
    'base_path' => '/',
    
    'database' => [
        'adapter' => 'Mysql',
        'host' => 'localhost',
        'username' => 'todo',
        'password' => 'todo',
        'dbname' => 'todo',
        'charset' => 'utf8',
    ], 
    
    'memcache'  => [
        'host' => 'localhost',
        'port' => 11211,
    ],
    'cache'     => 'file',
    //'cache'     => 'memcache',
    
];