import compress from 'compression';
import express from 'express';
import exphbs from 'express-handlebars';
import main from './controllers/main';
import home from './controllers/home';
import http from 'http';

const app = express();

// Enable trust proxy for X-Forwarded-Proto headers
app.enable('trust proxy');

// Setup view engine
app.set('views', __dirname + '/views');
app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'handlebars');

// Gzip all the things!
app.use(compress());

// Load all of our controllers/routes
home(app);
main(app);

// Create the server
let server = http.createServer(app);

// Listen on the specified port
//server.listen(8080, () => console.log(`Server started at ${server.address().port}`)); // eslint-disable-line no-console
//app.listen(process.env.PORT || 3000, function(){
//  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
//});
server.listen(process.env.PORT || 8080, () => console.log(`Server started at ${server.address().port}`)); // eslint-disable-line no-console