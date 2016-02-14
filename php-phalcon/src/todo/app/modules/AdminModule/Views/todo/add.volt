{% extends 'layout.volt' %}

{% block content %}

<div> Todo </div> 

<form method="post">
<p>
    Title {{text_field('title')}}
</p>

<p>
    {{ submit_button('save')}}
</p>

</form>

{{ link_to(['for': 'todo_admin_todo'], 'Annuler', 'class': 'cancel-btn') }}

{% endblock  %}