express = require('express');

hbs = require('hbs');
fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view_engine','hbs');


app.use( (req,res, next) => {
    now = new Date().toString();
    log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err) => {
        if (err) {
            console.log( 'Unable to append to server.log.')
        }
    })
    next();
});

/* app.use((req,res, next) => {
    res.render('maintenance.hbs');
}); */

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear() + 1;
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1>  Hello Express!</h1>');
   /*  res.send({
        name: 'Alber',
        likes: ['Cities', 'Running']
    }); */
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to de home page'
    });

});

app.get('/about', (req,res) => {
    // res.send('About page'); 
    res.render('about.hbs',{
        pageTitle: 'aboutPage'
    });

});

app.get('/bad', (req,res) => {
    res.send({
        errorCode: 100,
        errorMessage: 'Something went wrong'
    });
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
  });
