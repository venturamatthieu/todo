<?php

namespace Todo;

/**
 * Bootstrap
 * @copyright Copyright (c) 2016 -  Matthieu Ventura
 * @author Matthieu Ventura <venturamatthieu@gmail.com>
 * 
 */
use Phalcon\Mvc\Router as Router;
use Phalcon\Mvc\View as View;
use Phalcon\Text as Text;

date_default_timezone_set('US/Eastern');
setlocale(LC_ALL, 'ru_RU.UTF-8');

if (PHP_VERSION_ID < 50600) {
    iconv_set_encoding('internal_encoding', 'UTF-8');
}

class Bootstrap {

    public function run() {

        $di = new \Phalcon\DI\FactoryDefault();

        // Config
        $config = self::get();
        $di->set('config', $config);

        // Registry
        $registry = new \Phalcon\Registry();
        $di->set('registry', $registry);

        // Loader        
        
        $loader = new \Phalcon\Loader();
        $loader->registerNamespaces($config->loader->namespaces->toArray());  
        
        $loader->registerDirs([APPLICATION_PATH . "/../library/"]);
                
        require_once APPLICATION_PATH . '/../vendor/autoload.php';
        
        $loader->register();
        
        // Database
        $db = new \Phalcon\Db\Adapter\Pdo\Mysql([
            "host" => $config->database->host,
            "username" => $config->database->username,
            "password" => $config->database->password,
            "dbname" => $config->database->dbname,
            "charset" => $config->database->charset,
        ]);
        $di->set('db', $db);

        // View
        $this->initView($di);

        // URL
        $url = new \Phalcon\Mvc\Url();
        $url->setBasePath($config->base_path);
        $url->setBaseUri($config->base_path);
        $di->set('url', $url);

        // Cache
        //$this->initCache($di);
        // Application
        $application = new \Phalcon\Mvc\Application();
        $application->registerModules($config->modules->toArray());

        // Events Manager, Dispatcher
        //$this->initEventManager($di);
        // Session
        $session = new \Phalcon\Session\Adapter\Files();
        $session->start();
        $di->set('session', $session);
        //$acl = new \Application\Acl\DefaultAcl();
        //$di->set('acl', $acl);
        // JS Assets
        //$this->initAssetsManager($di);
        // Flash helper
        $flash = new \Phalcon\Flash\Session([
            'error' => 'ui red inverted segment',
            'success' => 'ui green inverted segment',
            'notice' => 'ui blue inverted segment',
            'warning' => 'ui orange inverted segment',
        ]);
        $di->set('flash', $flash);

        //$di->set('helper', new \Application\Mvc\Helper());
        // Routing

        $this->initRouting($application, $di);
        $application->setDI($di);

        // Main dispatching process
        $this->dispatch($di);
    }

    // Object

    private function dispatch($di) {

        $router = $di->get('router');

        $router->handle();

        $view = $di->get('view');
        $dispatcher = $di->get('dispatcher');
        $response = $di->get('response');
                
        $dispatcher->setModuleName($router->getModuleName());
        $dispatcher->setControllerName($router->getControllerName());
        $dispatcher->setActionName($router->getActionName());
        $dispatcher->setParams($router->getParams());
            
        $moduleName = self::camelize($router->getModuleName());

        $ModuleClassName = $moduleName . '\Module';
        
        if (class_exists($ModuleClassName)) {

            $module = new $ModuleClassName;
            $module->registerAutoloaders();
            $module->registerServices($di);
        }

        $view->start();
        $registry = $di['registry'];

        if (false) { //$registry->cms['DEBUG_MODE']
            $debug = new \Phalcon\Debug();
            $debug->listen();
            $dispatcher->dispatch();
        } else {

            try {

                $dispatcher->dispatch();
            } catch (\Phalcon\Exception $e) {

                // Errors catching
                $view->setViewsDir(__DIR__ . '/modules/webclientmodule/views/');
                //$view->setPartialsDir('');
                $view->e = $e;

                if ($e instanceof \Phalcon\Mvc\Dispatcher\Exception) {

                    $response->setHeader(404, 'Not Found');
                    $view->partial('error/error404');
                } else {

                    $response->setHeader(503, 'Service Unavailable');
                    $view->partial('error/error503');
                }

                $response->sendHeaders();
                echo $response->getContent();

                return;
            }
        }

        $view->render(
                $dispatcher->getControllerName(), $dispatcher->getActionName(), $dispatcher->getParams()
        );

        $view->finish();

        $response = $di['response'];

        // AJAX
        $request = $di['request'];
        $_ajax = $request->getQuery('_ajax');

        if ($_ajax) {

            $contents = $view->getContent();
            $return = new \stdClass();
            $return->html = $contents;
            $return->title = $di->get('helper')->title()->get();
            $return->success = true;
            if ($view->bodyClass) {
                $return->bodyClass = $view->bodyClass;
            }
            $headers = $response->getHeaders()->toArray();
            if (isset($headers[404]) || isset($headers[503])) {
                $return->success = false;
            }
            $response->setContentType('application/json', 'UTF-8');
            $response->setContent(json_encode($return));
        } else {

            $response->setContent($view->getContent());
        }

        $response->sendHeaders();

        echo $response->getContent();
    }

    private function initRouting($application, $di) {
        
        $router = new Router();

        $router->setDefaultNamespace('WebClientModule');
        $router->setDefaultModule('webclientmodule');
        $router->setDefaultController('index');
        $router->setDefaultAction('index');

        $router->add('/:module/:controller/:action/:params', [
            'module' => 1,
            'controller' => 2,
            'action' => 3,
            'params' => 4
        ])->setName('default');

        $router->add('/:module/:controller', [
            'module' => 1,
            'controller' => 2,
            'action' => 'index',
        ])->setName('default_action');

        $router->add('/:module', [
            'module' => 1,
            'controller' => 'index',
            'action' => 'index',
        ])->setName('default_controller');


        $router->setDi($di);
        $listNamespace = $di->get("config")-> get("loader")->get("namespaces");

        foreach ($listNamespace as $namespace => $pathNamespace) {
                        
            $routesClassName =  $namespace.'\Routes';
            
            if (class_exists($routesClassName)) {
                
                $routesClass = new $routesClassName();
                $router = $routesClass->init($router);
            }
            $initClassName = $namespace.'\Init';
            
            if (class_exists($initClassName)) {
                new $initClassName();
            }
        }

        $di->set('router', $router);
                
    }

    private function initView($di) {

        $view = new \Phalcon\Mvc\View();

        define('MAIN_VIEW_PATH', '../../../views/');

        //$view->setMainView(MAIN_VIEW_PATH . 'main');
        //$view->setLayoutsDir(MAIN_VIEW_PATH . '/layouts/');
        //$view->setLayout('main');
        //$view->setPartialsDir(MAIN_VIEW_PATH . '/partials/');
        // Volt
        $volt = new \Phalcon\Mvc\View\Engine\Volt($view, $di);
        $volt->setOptions(['compiledPath' => APPLICATION_PATH . '/../data/cache/volt/']);
        $volt->getCompiler();

        $phtml = new \Phalcon\Mvc\View\Engine\Php($view, $di);

        $viewEngines = [
            ".volt" => $volt,
            ".phtml" => $phtml,
        ];

        $view->registerEngines($viewEngines);

        $ajax = $di->get('request')->getQuery('_ajax');

        if ($ajax) {
            $view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_LAYOUT);
        }

        $di->set('view', $view);

        return $view;
    }

    //STATIC
    private static function get() {

        $application = include_once APPLICATION_PATH . '/config/environment/' . APPLICATION_ENV . '.php';

        $config_default = [
            'loader' => [
                'namespaces' => [
                    //'Todo' => APPLICATION_PATH . '/modules'
                //'Backman'     => APPLICATION_PATH . '/modules/Backman'
                ],
            ],
            'modules' => [
//                'cms' => [
//                    'className' => 'Cms\Module',
//                    'path' => APPLICATION_PATH . '/modules/Cms/Module.php'
//                ],
            ],
            'base_path' => (isset($application['base_path'])) ? $application['base_path'] : null,
            'database' => (isset($application['database'])) ? $application['database'] : null,
            'cache' => (isset($application['cache'])) ? $application['cache'] : null,
            'memcache' => (isset($application['memcache'])) ? $application['memcache'] : null,
            'assets' => (isset($application['assets'])) ? $application['assets'] : null,
        ];

        $global = include_once APPLICATION_PATH . '/config/global.php';

        // Modules configuration list
        $modules_list = include_once APPLICATION_PATH . '/config/modules.php';
        $modules_config = self::modulesConfig($modules_list);
        
        $config = array_merge_recursive($config_default, $global, $modules_config);
        return new \Phalcon\Config($config);
    }

    private static function modulesConfig($modules_list) {

        $namespaces = array();
        $modules = array();

        if (!empty($modules_list)) {

            foreach ($modules_list as $parentmodule => $childsmodule) {
                
                foreach ($childsmodule as $module => $namespace) {
                    
                    $namespaces[$namespace['className']] = APPLICATION_PATH . '/modules/' . $module;

                    $simple = Text::uncamelize($parentmodule.$module);
                    $simple = str_replace('_', '-', $simple);

                    $modules[$simple] = array(
                        'className' => $namespace['className'] . '\Module',
                        'path' => APPLICATION_PATH . '/modules/' . $module . '/Module.php'
                    );
                }                
            }
        }

        $modules_array = array(
            'loader' => array(
                'namespaces' => $namespaces,
            ),
            'modules' => $modules,
        );        
        return $modules_array;
    }

    private static function camelize($module) {
        
        $tmpModuleNameArr = explode('-', $module);
        $moduleName = '';
        
        foreach ($tmpModuleNameArr as $key=>$part) {
            if($key ==  0){
                $moduleName .= Text::camelize($part)."\\"; //Fix namespace error
            }else{
                $moduleName .= Text::camelize($part);
            }
        }
        
        return $moduleName;
    }

}
