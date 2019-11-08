//import { emit } from "cluster";

//Establecer la conexion
var socket = io();

var label = $('#lblNuevoTicket');

// escuchar
socket.on('connect', function() {
    console.log('Conectado al servidor');
});
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});

// Ultimo ticket
socket.on('estadoActual', function(resp){
    label.text(resp.actual);
})

$('button').on('click', function(){
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});