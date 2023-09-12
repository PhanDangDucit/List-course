
const siteRoute = require('./site');
const financeRoute = require('./finance');
const meRoute = require('./me');

function route(app) {
    app.use('/finance', financeRoute);
    app.use('/me', meRoute);
    app.use('/', siteRoute);
}

module.exports = route;