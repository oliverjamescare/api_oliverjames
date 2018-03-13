//core
const amqp = require('amqplib').connect('amqp://localhost');
const randomstring = require("randomstring");

//config
const prefix = "base_";

module.exports = {
	publish: function(data, settings = { } )
	{
		//preparing config
		const config = {
			queue: prefix + (settings.queue || ''),
			exchange: prefix + (settings.exchange || 'main'),
		};

		//sending message
		amqp
		   .then(connection => connection.createChannel())
		   .then(channel => {
		       channel.assertExchange(config.exchange, 'fanout', { durable: false });
		       channel.publish(config.exchange, config.queue, new Buffer(JSON.stringify(data)));
		   })
		   .catch(console.log);
	},

	subscribe: function (callback, settings = {} )
	{
		//preparing config
		const config = {
			queue: prefix + (settings.queue || ''),
			exchange: prefix + (settings.exchange || 'main'),
		};

		amqp
			.then(connection => connection.createChannel())
			.then(channel => {
				channel.assertExchange(config.exchange, 'fanout', { durable: false });
				channel
					.assertQueue(config.queue, { exclusive: true })
					.then(queue => {

						channel.bindQueue(queue.queue, config.exchange, '');
						channel.consume(queue.queue, message => {
							if(message && message.content)
							{
								callback(JSON.parse(message.content.toString()));
								channel.ack(message);
							}
						})
					});
			})
	},

	//with callback
	publishSubscribe: function (data, callback, settings = {} )
	{
		//preparing config
		const config = {
			queue: prefix + (settings.queue || 'rpc_queue'),
			correlation_id: randomstring.generate(32),
		};

		//sending message
		amqp
		   .then(connection => connection.createChannel())
		   .then(channel => {
		    channel
			    .assertQueue('', { exclusive: true })
			    .then(queue => {

			    	//registering callback queue
				    channel.consume(queue.queue, message => {
					    if(message && message.content && message.properties.correlationId == config.correlation_id)
					    {
						    callback(JSON.parse(message.content.toString()));
						    channel.ack(message);
					    }
				    });

				    channel.sendToQueue(config.queue, new Buffer(JSON.stringify(data)), { correlationId: config.correlation_id, replyTo: queue.queue });
			    });
		   })
		   .catch(console.log);
	},

	subscribeReply: function (callback, settings = {} )
	{
		//preparing config
		const config = {
			queue: prefix + (settings.queue || 'rpc_queue')
		};

		//listening on queue and sending reply
		amqp
			.then(connection => connection.createChannel())
			.then(channel => {
				channel
					.assertQueue(config.queue, { durable: false })
					.then(queue => {
						channel.consume(queue.queue, message => {
							if(message && message.content)
							{
								const responseData = callback(JSON.parse(message.content.toString())) || {};

								channel.sendToQueue(message.properties.replyTo, new Buffer(JSON.stringify(responseData)), { correlationId: message.properties.correlationId });
								channel.ack(message);
							}
						});
					});
			})
			.catch(console.log);
	}
}