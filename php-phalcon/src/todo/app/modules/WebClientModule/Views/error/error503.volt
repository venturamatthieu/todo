<div class="container">

    <h1>503</h1>

    <p>Server error</p>

    {% if true %}
        <p>--------------------------<br>Debug mode error details:</p>
        {% if e is defined %}
            <p>{{ e.getMessage() }}</p>
            <p>{{ e.getFile() }}::{{ e.getLine() }}</p>
            <pre>{{ e.getTraceAsString() }}</pre>
        {% endif %}
        {% if message %}
            {{ message }}
        {% endif %}
    {% endif %}

</div>