define([
    'jquery',
    'underscore',
    'backbone',
    'text!templatepartialtodoitem'

], function ($, _, Backbone, TodoPartialTmpl) {

    // The Application
    // ---------------

    // Our overall **AppView** is the top-level piece of UI.
    var todoView = Backbone.View.extend({
        tagName: 'li',
        template: _.template(TodoPartialTmpl),
        events: {
            'click button.destroy': 'delete'
        },
        initialize: function () {
            this.listenTo(this.model, 'destroy', this.remove); //Suppression de la vue à la suppression du model 
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
        },
        delete: function () {
            this.model.destroy();
        }

    });

    return todoView;
});