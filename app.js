const express= require("express");
const exphbs  = require('express-handlebars');


const app= express();



//handlebar 

app.engine('handlebars', exphbs({
  defaultLayout:"main"
}));
app.set('view engine', 'handlebars'); 


//index route

app.get('/', (req, res) => {
  const title="Welcome"
  res.render("index",{
    title:title
  });
});

//about route

app.get('/about', (req, res) => {
  res.render("about");
});





const PORT=3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});




{% extends "layout/app-layout.twig" %}
{% import "utilities/app" as appHelper %}
{% set baseLink = '/locksafe-tools/pin-authentication/logout' %}
{% if success %}
{% set backLink = '' %}
{% else %}
{% set backLink = baseLink ~ 'index' %}
{%endif%}
{% block content %}

<div class="container-fluid">
    {{ appHelper.titleRow('Login PIN','Enter your PIN to complete the log on:') }}
    <div class="row">
        <div class="col-6 offset-3">
            <form id="login-pin" method="post" action="/locksafe-tools/pin-authentication/pin-login" class="{% if invalid %}invalid-pin{% elseif success %}valid-pin{%endif%}">
                <div class="mb-3">
                  <input type="text" name="pin" class="form-control pincode-input-text" id="pincode" {% if success %}disabled="disabled"{% endif %}aria-describedby="pincodeHelp">
                  {% if invalid %}
                    <div id="pincodeHelp" class="form-text">{{"The PIN entered was incorrect please try again. If you don't know your PIN, please contact your support contact."|trans}}</div>
                    {% elseif success %}
                    <div id="pincodeHelp" class="form-text">{{"The PIN entered is correct."|trans}}</div>
                {% else %}
                    <div id="pincodeHelp" class="form-text">{{"If you don't know your PIN, please contact your support contact"|trans}}</div>
                {%endif%}
                </div>
              </form>
        </div>
    </div>
    <div class="row">
        <div class="col-6 offset-3">
                {% if success %}
                  <div class="text-center mt-3">
                    <div class="spinner-border text-success" style="width: 5rem; height: 5rem;"  role="status">
                    </div>
                  </div>
                  <div class="text-center mt-2">
                        <strong>{{"Loading..."|trans}}</strong>
                  </div>
                {% else %}
                    <div class="container-fluid">
                            <div class="btn-group-vertical pin-input-keyboard" role="group" aria-label="" >
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary py-3">1</button>
                                    <button type="button" class="btn btn-outline-secondary py-3">2</button>
                                    <button type="button" class="btn btn-outline-secondary py-3">3</button>
                                </div>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary py-3">4</button>
                                    <button type="button" class="btn btn-outline-secondary py-3">5</button>
                                    <button type="button" class="btn btn-outline-secondary py-3">6</button>
                                </div>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary py-3">7</button>
                                    <button type="button" class="btn btn-outline-secondary py-3">8</button>
                                    <button type="button" class="btn btn-outline-secondary py-3">9</button>
                                </div>
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary py-3" style="width: 235px;">0</button>
                                    <button type="button" class="btn btn-danger py-3">C</button>
                                </div>
                            </div>
                    </div>
                {%endif%}
        </div>
    </div>
</div>
<script type="text/javascript">
var focusedElement = 0;
$(document).ready(function () {
  $('form#login-pin').on('change', function(e){
  e.preventDefault();
  });
    $('#pincode').pincodeInput({
        hidedigits: true,
        inputs: 6,
        {% if success %}placeholders:"X X X X X X",{% endif %}
        complete: function (value, e, errorElement) {
            $('form#login-pin').submit();
        }
    });
});
</script>
{% if not success %}
<script type="text/javascript">
$(document).ready(function () {
    $('input.pincode-input-text').focus(function() {
        focusedElement = $(this);
    });
    $('.pin-input-keyboard button').on('click', function() {
        $this = $(this);
        $this.addClass( "active" );
        var char = $this.html();
        if (char === 'C') {
            focusedElement.val('');
            focusedElement.keyup();
            focusedElement.prev().focus();
        } else {
            focusedElement.val(char);
            focusedElement.keyup();
        }
        setTimeout(function() { 
        $this.removeClass( "active" );
        },100);
    });
    $('input.pincode-input-text:first').focus();
});
</script>
{% endif %}

{% endblock %}
