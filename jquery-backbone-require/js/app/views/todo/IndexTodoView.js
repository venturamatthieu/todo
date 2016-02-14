define([
    'jquery',
    'underscore',
    'backbone',
    'tools',
    'todocollection',
    'modeltodo',
    'text!templatepagetodoindex',
    'abstractbaseview',
    'partialtodocollectionview'

            //'text!templatequestioncheckbox'
], function ($, _, Backbone, Tools, TodoCollection, Todo, TodoIndexTmpl, AbstractBaseView, TodoCollectionPartialView) {

    'use strict';

    // The Application
    // ---------------

    // Our overall **AppView** is the top-level piece of UI.
    var IndexTodoView = AbstractBaseView.extend({
        // Instead of generating a new element, bind to the existing skeleton of
        // the App already present in the HTML.
        el: $("#app"),
        todos: null,
        template: _.template(TodoIndexTmpl),
        // Our template for the line of statistics at the bottom of the app.
        // Delegated events for creating new items, and clearing completed ones.
        events: {
            'keypress #new-todo': 'create'

        },
        // At initialization we bind to the relevant events on the `Todos`
        // collection, when items are added or changed. Kick things off by
        // loading any preexisting todos that might be saved in *localStorage*.
        initialize: function () {

            if (this.todos == null) {
                this.todos = new TodoCollection(); //liste Vide 
            }

            this.todos.fetch({reset: true}); //enregistrement en session de la collection

            this.render();

        },
        // Re-rendering the App just means refreshing the statistics -- the rest
        // of the app doesn't change.
        render: function () {

            this.$el.html(this.template);

            if (this.todos != null) {

                var todoCollectionView = new TodoCollectionPartialView({collection: this.todos});
                todoCollectionView.render();

            }

            //this.showPoney(); // ou AbstractBaseView.prototype.test();

            //this.collection = new ProjectsCollection();
            //this.collection.add({ name: "Ginger Kid"});

        },
        create: function (event) {

            var $input = $(event.target); // on recupere l'element 
            var val = $input.val().trim();


            if (event.which !== Tools.enter_key || !val) {
                return;
            }

            //var todo = new Todo();
            //todo.set("title", val);
            //todo.save();

            //TodoCollection.add(todo);

            this.todos.create({title: val});

            $input.val('');

        }
    });

    //Gestion de l'heritage via underscoreJs
    //_.extend(IndexTodoView, AbstractBaseView);

    return IndexTodoView;
});