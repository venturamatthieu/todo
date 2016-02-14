{% extends 'layout.volt' %}

{% block content %}

<div> Todo </div> 

<ul>
    <li>{{todo.id}}</li>
    <li>{{todo.title}}</li>
    <li>{{todo.completed}}</li>
<ul>

{{link_to('todo')}}

{% endblock  %}