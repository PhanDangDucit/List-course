const Model = require('./../../app/models/FinanceModel');
const mongooseToObject = require('./../../util/mongoose');

class MeController {
    // [Get] /me/profile
    profile(req, res, next) {
        let financeQuery = Model.find({});
        if(req.query.hasOwnProperty('_sort')) {
            const isValidate = ['desc', 'asc'].includes(req.query.type);
            financeQuery = financeQuery.sort({
                [req.query.column]: isValidate ? req.query.type : 'desc' //name: desc
            })
        }
        Promise.all([financeQuery, Model.countDocumentsDeleted({})])
        .then(([finances, countDocumentsDeleted]) => res.render('me/profile', {
            countDocumentsDeleted,
            finances: mongooseToObject.multipleMongooseToObject(finances)
        })).catch(next)
    }
    // [Get] /me/:id/edit
    edit(req, res, next) {
        Model.findById(req.params.id).then(finance => res.render('me/editVideo', {
            finance: mongooseToObject.mongooseToObject(finance)
        })).catch(next)
    }
    // [Put] /me/:id/update
    update(req, res, next) {
        Model.updateOne({_id: req.params.id}, req.body).then(() => res.redirect('/me/profile')).catch(next)
    }
    // [Delete] /me/:id/deleteCheck
    deleteCheck(req, res, next) {
        Model.delete({_id: {$in: req.body.financeIds}}).then(() => res.redirect('back')).catch(next)
    }
    // [Delete] /me/:id/delete
    delete(req, res, next) {
        Model.delete({_id: req.params.id}).then(() => res.redirect('back')).catch(next)
    }
    // [Get] /me/trash
    trash(req, res, next) {
        Model.findDeleted({}).then(finances => res.render('me/trash', {
            finances: mongooseToObject.multipleMongooseToObject(finances)
        })).catch(next)
    }
    // [delete] /me/deleteForce
    deleteForce(req, res, next) {
        Model.deleteOne({_id: req.params.id}).then(() => res.redirect('/me/profile')).catch(next)
    }
    // [Patch] /me/:id/restore
    restoreDocument(req, res, next) {
        Model.restore({_id: req.params.id}).then(() => res.redirect('/me/profile')).catch(next)
    }
}

module.exports = new MeController;