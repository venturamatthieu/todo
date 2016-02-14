<?php

/**
 * Modules "Application" and "Cms" loads automatically
 * */

return array(
    'Todo' => [
        'AdminModule' => [
            'className' => 'Todo\AdminModule'
        ],
        'ApiModule' => [
            'className' => 'Todo\ApiModule'
        ],
        'WebClientModule' => [
            'className' => 'Todo\WebClientModule'
        ]
    ]
);