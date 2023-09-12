const Model = require('./../../app/models/FinanceModel');
const mongooseToObject = require('./../../util/mongoose');

class FinanceController {
    // [Get] /:slug
    detail(req, res, next) {
        Model.findOne({slug: req.params.slug}).then(finance => res.render('finance/detailVideo', {
            finance: mongooseToObject.mongooseToObject(finance)
        })).catch(next)
    }
    //  [Get] /finance/create
    createPage(req, res, next) {
        res.render('finance/createVideo');
    }
    // [Post] /finance/create
    create(req, res, next) {
        const formData = new Model(req.body);
        formData.img = `https://img.youtube.com/vi/${formData.videoID}/sddefault.jpg`;
        formData.save().then(() => res.redirect('/')).catch(next)
    }
}

module.exports = new FinanceController;