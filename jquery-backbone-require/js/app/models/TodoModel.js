define([
    'underscore',
    'backbone'
            //'text!templatequestioncheckbox'
], function (_, Backbone) {

    'use strict';

    var Todo = Backbone.Model.extend({
        // Default attributes for the todo
        // and ensure that each todo created has `title` and `completed` keys.
        defaults: {
            title: '',
            completed: false
        },
        initialize: function() {
            console.log('New Object Todo created : '+ 'Title : ' + this.get('title'));
            //console.log(this.toJSON());
        },
        validate: function(attributes){

		if ( !attributes.title ){
			return 'Every Todo must have a title.';
		}
	},
        // Toggle the `completed` state of this todo item.
        toggle: function () {
            this.save({
                completed: !this.get('completed')
            });
        }
    });

    return Todo;
});