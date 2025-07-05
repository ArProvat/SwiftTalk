
import { default as mongoose } from 'mongoose';

const Group_Schema = new mongoose.Schema({
    G_name:{
        type: 'string',
        required: true
    },
    members: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User',

    }],
    Group_photo:{
        type: 'string'  
    },
    admin:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    LastUpdate:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    }
},{
    timestamps: true
})

const Group_model = mongoose.model('Group','Group_Schema')
export default Group_model