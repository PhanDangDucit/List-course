const financeModel = require('./../models/FinanceModel');
const mongooseToObject = require('./../../util/mongoose');

class SiteController {
    // [Get] /home
    index(req, res, next) {
        financeModel.find({}).then(finances => res.render('home', {
            finances: mongooseToObject.multipleMongooseToObject(finances)
        })).catch(next)
    }
    // [Get] / search
    search(req, res, next) {
        res.render('search');
    }
}

module.exports = new SiteController;