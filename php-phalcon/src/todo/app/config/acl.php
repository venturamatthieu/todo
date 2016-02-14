<?php

return [

    // Module 1
    'guest' => [
        'admin/index'       => '*',
        'index/index'       => '*',
        'index/error'       => '*',
    ],
    // Module 2
    'role_1' => [
        'path/url'  => [
            'action_1',
            'action_2',
            'edit',
        ],
        'path/url'=> '*'
    ],
    'role_2'     => [
        'path/url'  => '*',
    ],
    'role_3'      => [
        'path/url'   => '*'
    ],
];