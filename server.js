const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');  //express set for templates

app.use(express.static(__dirname+'/public')); //when we want to use our own html pages using midleware
//registering express middleware
app.use((req, res, next) => //next tells we are done
    {
        var now = new Date().toString();
        var log = `${now}: ${req.method} ${req.url}`;
        console.log(log);
        fs.appendFile('server.log', log+'\n', (err)=>
            {
                if(err)
                    console.log('Unable to append file');
            }
        );

        next();
    }
);
app.use((req,res,next)=>
    {
        res.render('maintanance.hbs');
    }
);
hbs.registerHelper('getCurrentYear', ()=> 
    {
        return new Date().getFullYear();
    }
);
hbs.registerHelper('screamIt', (text) =>
    {
        return text.toUpperCase();
    }
);

app.get('/', (req, res) => //url and what to send back
    {
        //res.send('<h1>Hello express!!!</h1>');
        // res.send(
        //     {
        //         name:'kiki',
        //         age:20,
        //         city:'Karachi',
        //         cars: ['Audi', 'Civic', 'Vezel']
        //     }
        // );
        res.render('home.hbs', 
            {
                pageTitle : 'HOME PAGE',
                currentYear: new Date().getFullYear(),
                welcomeMessage: 'Hey WELCOME to my website'
            }
        );
    }
) //handler for http req

app.get('/about', (req, res) => //url and what to send back
    {
        //res.send('<h1>Hello express!!! Its About page</h1>');
        res.render('about.hbs', //rendering about.hbs template then making few things dynamic updated in html page
            {   
                pageTitle : 'ABOUT PAGE',
                currentYear: new Date().getFullYear()
            }
        );
    }
) 
app.get('/contact', (req, res) => 
    {
        res.render('about.hbs',
            {
                pageTitle : 'CONTACT PAGE',
                currentYear: new Date().getFullYear()
            }
        );
    }
)
app.get('/bad', (req, res) => //url and what to send back
    {
        res.send(
            {
                errorMsg: 'Unable to Handle'
            }
        );
    }
) 

app.listen(3000, ()=>
    {
        console.log('Server up on port 3000');
    }
);   //listener to request