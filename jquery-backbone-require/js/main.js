// Author: Thomas Davis <thomasalwyndavis@gmail.com>
// Filename: main.js

// Require.js allows us to configure shortcut alias
// Their usage will become more apparent futher along in the tutorial.
require.config({
    
    urlArgs: "bust=" + (new Date()).getTime(), //Remove for prod
    enforceDefine: false,
    waitSeconds: 0,
    paths: {
        
        jquery: './../vendors/jquery/1.12.0/jquery-min',
        underscore: './../vendors/underscore/1.8.3/underscore-min',
        backbone: './../vendors/backbone/1.2.3/backbone-min',
        backbonelayoutmanager: "./../vendors/backbone-layoutmanager/0.1.0/backbone.layoutmanager",
        backbonelocalstorage: './../vendors/backbone-localstorage/1.1.16/backbone.localstorage-min',
       
        //Abstract
        abstract: './app/abstract',
        abstractbaseview: './app/abstract/views/BaseView',
        abstractbasecontroller: './app/abstract/controllers/BaseController',
       
        //Routes
        routerapp: './router',
        
        //Controllers
        controllers: './app/controllers/',
        controllerDefault: './app/controllers/defaultController',
        controllerTodo: './app/controllers/todoController',
        
        //Models
        models: './app/models/',
        modeltodo: './app/models/TodoModel',
        
        //Collections
        collections: './app/collections',
        todocollection: './app/collections/TodoCollection',
        
        //Views
        views: './app/views',
        indexdefaultview: './app/views/default/IndexDefaultView', 
        indextodoview : './app/views/todo/IndexTodoView',
        partialtodocollectionview: './app/views/partials/TodoCollectionPartialView',
        partialtodoview: './app/views/partials/TodoPartialView',
        
        //Templates
        templates: './../tpl/',
        templatelayout: './../tpl/layout/layout.html',
        templatepagedefaultindex: './../tpl/pages/default/index.html',
        templatepagetodoindex: './../tpl/pages/todo/index.html',
        templatepartialtodoitem: './../tpl/partials/todo/item.html',
        templatepartialtodolist: './../tpl/partials/todo/list.html',

        //Autres
        tools:'./app/tools/Tools'
        
    }

});

require([
    // Load our app module and pass it to our definition function
    'app' //charge le fichier app.js

], function(App) {
    // The "app" dependency is passed in as "App"
    // Again, the other dependencies passed in are not "AMD" therefore don't pass a parameter to this function
    App.initialize();
});