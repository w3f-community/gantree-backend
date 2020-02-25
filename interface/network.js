const Network = require('@models/network')

module.exports = {
	typeDef: `
		type Network {
			_id: String!
			name: String!
			repo: String!
			config: Config!
			nodes: [Node]
		}

		extend type Query {
			networks: [Network],
			network(_id: String!): Network
		}

		extend type Mutation {
			addNetwork(name: String! count: Int! validators: Boolean! provider: String! repo: String! config: String!): Network!
			deleteNetwork(_id: String!): Boolean
		}
	`,
	resolvers: {
		Query: {
			networks: async (_, {}, {user}) => Network.fetchAllByTeam(user.team_id),
			network: async (_, {_id}, {user}) => Network.fetchById(_id, user.team_id)
		},
		Mutation: {
			addNetwork: async (_, network, {user}) => await Network.add(network, user.team_id),
			deleteNetwork: async (_, {_id}, {user}) => await Network.delete(_id, user.team_id) 
		}
	}
}