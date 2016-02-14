/*global jQuery, Handlebars, Router */
$(function () {

    'use strict'; //script entier en mode strict ECMAScript 5
    
    //On ajout un bloc a handlebar
    Handlebars.registerHelper('eq', function (a, b, options) {
		return a === b ? options.fn(this) : options.inverse(this);
	});
    
    //Code des touches clavier pour l'event KeyUp
    var ENTER_KEY = 13;
    var ESCAPE_KEY = 27;

    //Fonction partagé
    var util = {
        uuid: function () {
            /*jshint bitwise:false */
            var i, random;
            var uuid = '';

            for (i = 0; i < 32; i++) {
                random = Math.random() * 16 | 0;
                if (i === 8 || i === 12 || i === 16 || i === 20) {
                    uuid += '-';
                }
                uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
            }

            return uuid;
        },
        pluralize: function (count, word) {
            return count === 1 ? word : word + 's';
        },
        store: function (namespace, data) {
            if (arguments.length > 1) {
                return localStorage.setItem(namespace, JSON.stringify(data));
            } else {
                var store = localStorage.getItem(namespace);
                return (store && JSON.parse(store)) || [];
            }
        }
    };

    //Core de l'app -  objet
    
    var App = {
        
        init: function () {
            
            this.todos = util.store('todos-jquery'); //initialise une lite de todo
            this.todoTemplate = Handlebars.compile($('#todo-template').html()); //Compile la vue 
            this.todoFooterTemplate = Handlebars.compile($('#footer-template').html()); //Compile la vue 

            this.bindEvents();
            this.render();
            
            //Gestion des urls - filtres
            new Router({
                '/:filter': function (filter) {
                    this.filter = filter;
                    this.render();
                }.bind(this)
            }).init('/all'); //par defaut All

        },
        bindEvents: function () {
            
            //console.log(this); //Ici le this vaut App
            
            $('#new-todo').on('keyup', this.create.bind(this)); //Ici le this vaut Event keyup lie a element input text
            $("#todo-list").on("click", "button.remove", this.remove.bind(this)); //Redefinit
            $("#todo-list").on('dblclick', 'span.task', this.edit.bind(this)); 
            $("#todo-list").on('keyup', '.edit', this.editKeyup.bind(this)); 
            $("#todo-list").on('focusout', '.edit', this.update.bind(this));

        },
        render: function () {
            
            var todos = this.getFilteredTodos();
                        
            $('ul#todo-list').html(this.todoTemplate(todos));
            this.renderFooter();
            
            util.store('todos-jquery', this.todos);
            
        },
        renderFooter: function () {
            
            var todoCount = this.todos.length;
            var activeTodoCount = this.getActiveTodos().length;

            var template = this.todoFooterTemplate({
                activeTodoCount: activeTodoCount,
                activeTodoWord: util.pluralize(activeTodoCount, 'item'),
                completedTodos: todoCount - activeTodoCount,
                filter: this.filter
            });

            $('#footer').toggle(todoCount > 0).html(template);

        },
        // accepts an element from inside the `.item` div and
        // returns the corresponding index in the `todos` array
        indexFromEl: function (el) {
            var id = $(el).closest('li').data('id');
            var todos = this.todos;
            var i = todos.length;

            while (i--) {
                if (todos[i].id === id) {
                    return i;
                }
            }
        },
        getActiveTodos: function () {
            return this.todos.filter(function (todo) { //utilisation de filter sur un array 
                return !todo.completed;
            });
        },
        getCompletedTodos: function () {
            return this.todos.filter(function (todo) { //utilisation de filter sur un array 
                return todo.completed;
            });
        },
        getFilteredTodos: function () {
            if (this.filter === 'active') {
                return this.getActiveTodos();
            }

            if (this.filter === 'completed') {
                return this.getCompletedTodos();
            }

            return this.todos;
        },
        create: function (event) {

            var $input = $(event.target); // on recupere l'element 
            var val = $input.val().trim();

            if (event.which !== ENTER_KEY || !val) {
                return;
            }

            this.todos.push({
                id: util.uuid(),
                title: val,
                completed: false
            });

            $input.val('');

            this.render();

        },
        edit : function (event){
            
            var $span = $(event.target); // on recupere l'element
            var $input =  $span.next(); 
            
            $input.show(); 
            $span.hide();
                        
        },
        editKeyup : function (event){
            
            var $input =  $(event.target); // on recupere l'element

            if (event.which === ENTER_KEY) {
		$input.blur(); //perte du focus par element
            }

            if (event.which === ESCAPE_KEY) {
                $input.data('abort', true).blur(); //Remet la valeur par defaut et perte du focus par element
            }
        },
        update : function (event){
             
            //Chercher la nouvelle valeur
            var $input =  $(event.target); // on recupere l'element
            var val = $input.val().trim();
            
            this.todos[this.indexFromEl($input)].title = val;
           
            //Affiche 
            this.render();
            
        },
        remove: function (event) {

            this.todos.splice(this.indexFromEl(event.target), 1); //utilisation de slipce pour supprimer une entrée sur un array 

            this.render();

        }

    };

    App.init();
});
