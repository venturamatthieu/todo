{% extends 'layout.volt' %}

{% block content %}

<div> Todos </div> 
<table>
<tr>
    <td>Id</td>
    <td>Title</td>
    <td>Completed</td>
    <td>*</td>
</tr>

{% for todo in todos%}
    <tr>
        <td>{{todo.id}}</td>
        <td>{{todo.title}}</td>
        <td>{{todo.completed}}</td>
        <td>{{ link_to(['for': 'todo_admin_todo_show', 'id': todo.id ], 'Show', 'class': 'show-btn') }}</td>
    </tr>
{% else %}
    <tr>
        <td colspan="4">Nothing</td>
    </tr> 
{% endfor %}

</table>

{{ link_to(['for': 'todo_admin_todo_add'], 'Add todo') }}

<br/>
<br/>
<br/>


<div> Groups </div> 
<table>
<tr>
    <td>Id</td>
    <td>Name</td>
    <td>*</td>
</tr>

{% for group in groups %}
<tr>
    <td>{{group.id}}</td>
    <td>{{group.title}}</td>
    <td>{{ link_to(['for': 'todo_admin_group_show', 'id': group.id ], 'Show', 'class': 'show-btn') }}</td>
</tr>
{% else %}
    <tr>
        <td colspan="3">Nothing</td>
    </tr> 
{% endfor %}

</table>

{{ link_to(['for': 'todo_admin_group_add'], 'Add group') }}


{% endblock  %}
