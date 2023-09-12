const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override');
const route = require('./routes/index');
const app = express();
const port = 3000;
const db = require('./configs/mongoose');
const sortMiddleware = require('./app/middlewares/sortMiddleware');

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('combined'));
app.use(express.urlencoded({
    extended: true
}))
app.use(methodOverride('_method'));
app.engine('hbs', engine({
    extname: ".hbs",
    helpers: {
        sum: (a, b) => a + b,
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default';
            const icons = {
                default: 'fa-solid fa-sort',
                asc: 'fa-solid fa-arrow-up-wide-short',
                desc: 'fa-solid fa-arrow-up-short-wide'
            }
            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc'
            }
            const icon = icons[sortType];
            const type = types[sortType];
            return `<a href="?_sort&column=${field}&type=${type}">
                <i class="${icon}"></i>
                ${sort.column}
            </a>`
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));
db.connect();
app.use('/me/profile', sortMiddleware);
route(app);

app.listen(port);