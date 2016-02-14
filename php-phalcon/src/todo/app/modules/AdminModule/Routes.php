<?php

/**
 * Routes
 * @copyright Copyright (c) 2011 - 2014 Aleksandr Torosh (http://wezoom.com.ua)
 * @author Aleksandr Torosh <webtorua@gmail.com>
 */

namespace Todo\AdminModule;

class Routes
{

    public function init($router)
    {
        $router->add('/admin', array(
            'module'     => 'todo-admin-module',
            'controller' => 'index',
            'action'     => 'index',
        ))->setName('todo_admin_index');
        
        $router->add('/admin/todo', array(
            'module'     => 'todo-admin-module',
            'controller' => 'todo',
            'action'     => 'index',
        ))->setName('todo_admin_todo');
        
        $router->add('/admin/todo/show/:params', array(
            'module'     => 'todo-admin-module',
            'controller' => 'todo',
            'action'     => 'show',
        ))->setName('todo_admin_todo_show');
        
        $router->add('/admin/todo/add', array(
            'module'     => 'todo-admin-module',
            'controller' => 'todo',
            'action'     => 'add',
        ))->setName('todo_admin_todo_add');
        
        
        $router->add('/admin/group', array(
            'module'     => 'todo-admin-module',
            'controller' => 'group',
            'action'     => 'index',
        ))->setName('todo_admin_group');
        
        $router->add('/admin/group/add', array(
            'module'     => 'todo-admin-module',
            'controller' => 'group',
            'action'     => 'add',
        ))->setName('todo_admin_group_add');
        
        

        return $router;

    }

}