const mongoose = require('mongoose');
const schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const financeSchema = new schema({
    name: {type: String, maxLength: 100},
    description: {type: String},
    videoID: {type: String},
    author: {type: String, maxLength: 50},
    release: {type: Number},
    level: { type: String },
    slug: { type: String, slug: "name", unique: true},
    img: {type: String}
},
{
    timestamps: true
}
)
mongoose.plugin(slug);
mongoose.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all'
});

module.exports = mongoose.model('financestatements', financeSchema);