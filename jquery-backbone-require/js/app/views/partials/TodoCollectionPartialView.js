define([
    'jquery',
    'underscore',
    'backbone',
    'partialtodoview'

            //'text!templatequestioncheckbox'
], function ($, _, Backbone, TodoPartialView) {

    // The Application
    // ---------------

    // Our overall **AppView** is the top-level piece of UI.
    var todoCollectionView = Backbone.View.extend({
        el: 'ul#todo-list',
        initialize: function () {

            console.log(this.collection);

            this.listenTo(this.collection, 'add', this.addOne); //On ecoute et dés que levent est generé par la collection, on ajout un traitement 
        },
        events: {
            
        },
        render: function () {

            this.collection.each(function (todo) {
                this.addOne(todo);
            }, this);

        },
        addOne: function (todo) {
            console.log("Add Object to list : Title : " +todo.get('title'));
            var todoView = new TodoPartialView({model: todo});
            this.$el.append(todoView.el); // adding all the person objects.
        }


    });

    return todoCollectionView;
});