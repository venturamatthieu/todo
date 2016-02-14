<?php

/**
 * Routes
 * @copyright Copyright (c) 2011 - 2014 Aleksandr Torosh (http://wezoom.com.ua)
 * @author Aleksandr Torosh <webtorua@gmail.com>
 */

namespace Todo\ApiModule;

class Routes
{

    public function init($router)
    {
        $router->add('/api', array(
            'module'     => 'api',
            'controller' => 'index',
            'action'     => 'index',
        ))->setName('api');

        return $router;

    }

}