const mongoose = require('mongoose')
const util = require('./_util');

const schema = new mongoose.Schema(
	{
		name: {
			type : String,
			required : true,
			trim: true
		},
		provider: {
			type : String,
			required : true,
			trim: true,
			enum: ['DO', 'AWS', 'GCP'],
		},
		ip: {
			type : String,
			trim: true
		},
		status: {
			type : String,
			enum: ['ONLINE', 'OFFLINE', 'PENDING'],
			required : true,
			trim: true,
			default: 'PENDING'
		},
		type: {
			type : String,
			enum: ['VALIDATOR', 'FULL'],
			required : true,
			trim: true
		},
		network: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'network',
			required : true,
			trim: true,
			autopopulate: true
		},
	},
	{ 
		timestamps: util.timestamps
	}
)

schema.plugin(require('mongoose-autopopulate'));
schema.set('toJSON', { virtuals: true })

module.exports = schema