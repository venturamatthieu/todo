<?php

/**
 * Routes
 * @copyright Copyright (c) 2011 - 2014 Aleksandr Torosh (http://wezoom.com.ua)
 * @author Aleksandr Torosh <webtorua@gmail.com>
 */

namespace Todo\WebClientModule;

class Routes
{

    public function init($router)
    {
        $router->add('/', array(
            'module'     => 'todo-web-client-module',
            'controller' => 'index',
            'action'     => 'index',
        ))->setName('todo_webclient_index');

        return $router;

    }

}