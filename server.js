require('module-alias/register')
require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const schema = require('@interface/schema')
const socket = require('@util/socketio')

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', () => {
	const server = new ApolloServer({ schema });
	server.listen(process.env.GRAPHQL_PORT||4000).then(({ url }) => console.log(`🚀 Server ready at ${url}`));

	socket.init({ port: process.env.SOCKETIO_PORT })
})

