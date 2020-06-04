const express = require('express');
const app = express();
const server = require('http').createServer(app).listen(4555);
const io = require('socket.io').listen(server);
const bodyParser = require('body-parser');

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(bodyParser.json());

  var port = process.env.PORT || 8080;

  var router = express.Router();

  /* Socket irá aqui depois */
  var emitir = function(req, res, next){
	var notificar = req.query.notificacao || '';
		if(notificar != '')	 {
		io.emit('notificacao', notificar);
		next();
	} else {
			next();
		}
  }
  
  app.use(emitir);
  app.use('/api', router);
  router.route('/notificar').get(function(req, res){
    res.json({message: "testando essa rota"})
    })
    
  app.listen(port);
  console.log('conectado a porta ' + port);