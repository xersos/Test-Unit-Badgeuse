module.exports = function(app) {

    let http = require('http').Server(app);
    let io = require('socket.io').listen(http);

    app.listen = function(){
        return http.listen.apply(http, arguments)
    };

    io.on('connection', (socket) => {

        /**
         * send a signal for refresh the user list of presence
         */
        socket.on('presence', (content) => {
            io.emit('presence', content);
        });

        /**
         * send a signal for refresh the number of absence in wait
         */
        socket.on('absenceList', (content) => {
            io.emit('absenceList', content);
        });
    });
}
