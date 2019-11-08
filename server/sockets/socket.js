const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');
const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.next();

        console.log(siguiente);
        callback(siguiente);
    });

    //emitir un evento del ultimo ticket
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimosCuatro: ticketControl.getUltimosCuatro()
    });

    client.on('atenderTicket', (data, callback) => {

        if(!data.escritorio){
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            });
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        
   
        client.broadcast.emit('ultimosCuatro', {
            ultimosCuatro: ticketControl.getUltimosCuatro()
        });
   
    });

});