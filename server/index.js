const express=require("express");
const dbConnect = require("./config/dbConnect.config");
const { notFound, handleError } = require("./middlewares/errorHandler");
const userRoute = require("./routes/userRoute.route");
const bodyParser = require("body-parser");
const MongoStore = require("connect-mongo");
const session = require("express-session");
const passport = require("passport");
const googleRoute = require("./routes/googleRoute.route");
const app=express();
const dotenv=require('dotenv').config();
const PORT =process.env.PORT || 5000;
const  passportsetup=require('./utils/passport');
const TutorialCategoryRoute = require("./routes/TutoriaCatRoute.route");
const tutorialRoute = require("./routes/tutorialRoute.route");
const newsLatterRouter = require("./routes/newsLetterRoute.route");
const reviewRouter = require("./routes/reviewRoute.route");
const contectRouter = require("./routes/contectRoute.route");
const videoRouter = require("./routes/videoRoute.route");
const documentationRouter = require("./routes/documentRoute.route");
const docCatRouter = require("./routes/docCatRoute.route");
const blogCatRouter = require("./routes/blogCatRoute.route");
const blogRouter = require("./routes/blogRoute.route");
const videoCatRouter = require("./routes/videoCatRoute.route");
const CourceCatRouter = require("./routes/courceCatRoute.route");
const courceRouter = require("./routes/courceRoute.route");
const  apiRequestLimiter  = require("./utils/reqLimit");
const limiter = require("./utils/reqLimit");
const rateLimiter = require("./utils/reqLimit");
const workRouter = require("./routes/workRoute.route");
const projectCatRouter = require("./routes/projectCatRoute.route");

//calling a function to connect database
dbConnect();

app.use(session({
   secret: 'mySecret',
   saveUninitialized: false, // don't create session until something stored
   resave: false, //don't save session if unmodified
   store: MongoStore.create({
     mongoUrl: process.env.MONGODB__URI,
      ttl:12*60*60 // time period in seconds
   })
 }));

app.use(passport.initialize());
app.use(passport.session());


app.get('/',(req,res)=>{
   res.send(`<a href="http://localhost:4000/google">login With Google</a>`);
}) 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
//setting up path for user Route 
app.set('trust proxy', 1);
//if api request error come  look this
app.use('/api',rateLimiter(60*60*1000,"secounds",50,"only 50 request allow"))
app.use('/api/user',userRoute);
app.use('/',googleRoute);
app.use('/api/tutorial/category',TutorialCategoryRoute);
app.use('/api/tutorial',tutorialRoute);
app.use('/api/newsletter',newsLatterRouter);
app.use('/api/review',reviewRouter);
app.use('/api/contact',contectRouter);
app.use('/api/video',videoRouter);
app.use('/api/video/category',videoCatRouter);
app.use('/api/doc',documentationRouter);
app.use('/api/doc/category',docCatRouter);
app.use('/api/blog/category',blogCatRouter);
app.use('/api/blog',blogRouter);
app.use('/api/cource/category',CourceCatRouter);
app.use('/api/cource',courceRouter);
app.use('/api/work',workRouter);
app.use('/api/project/category',projectCatRouter);


// handle error call in index file
app.use(notFound);
app.use(handleError);
//listern the Port 
app.listen(PORT,()=>{
   console.log(`Server Is running on http://localhost:${PORT}`);
})