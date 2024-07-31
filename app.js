//jshint esversion:6
require ("dotenv").config();      //créer des variables d'environnement
const express = require("express");
const bodyParser = require("body-parser");  //permet ensuite d'utiliser req.body pour accéder aux data des formulaires
const ejs = require("ejs");
const mongoose=require("mongoose");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const MongoStore = require('connect-mongo');

const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;


const homeStartingContent = "You are asked to answer the tests below. You have the possibility to answer each task independently. Whenever a task is finished, you no longer have the possibility to do it again. You will be asked to open the camera while answering the different test. You are suggested to complete the different games using chrome navigator, it has the best compatibility";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const app = express();

app.set('view engine', 'ejs');

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


app.use(bodyParser.urlencoded({extended: true}));   //encoder les résultats
app.use(express.static("public"));

app.use(session({
  secret: "Test1", //peut etre remplacé par n'importe quel char
  name: "test111",
  resave: false,
  store: MongoStore.create({mongoUrl : "mongodb+srv://name"}),
  cookie: {saveUninitialized: false,
    httpOnly: false,
    maxAge: 1000*1000*100000 //durée du cookie, à changer selon l'utilisation, cette durée peut faire l'affaire
    }
}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb+srv://name", {useNewUrlParser: true, useUnifiedTopology: true});
console.log('Connexion à MongoDB réussie !')


const userSchema = new mongoose.Schema ({
  firstName: "",
  lastName: "",
  birth: "",
  gender: "",
  email: String,
  password: String
});

const storiesSchema = new mongoose.Schema ({
  email:"",
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  answer5: "",
  test: "",
  pictureUrl:[]
});

const filmsSchema=new mongoose.Schema ({
  email:"",
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  answer5: "",
  answer6: "",
  test:"",
  pictureUrl:[],
  fishR:"",
  fishC:"",
  imageC:"",
  fishRT:"",
  fishRC:"",
  imageCT:""
});

const fishsSchema=new mongoose.Schema ({
  email:"",
  trainingAnswers:[],
  answers: [],
  test:"",
  pictureUrl:[],
  nb:"",
  nbTrain:""
});

const heartsSchema=new mongoose.Schema ({
  email:"",
  trainingAnswers:[],
  answers: [],
  test:"",
  pictureUrl:[],
  nb2:"",
  nbTrainH:"",
  imageHeart:"",
  imageHeartT:""
});

const flowersSchema=new mongoose.Schema ({
  email:"",
  trainingAnswers:[],
  answers: [],
  test:"",
  pictureUrl:[],
  nb3:"",
  nbTrainF:"",
  imageFlower:"",
  imageFlowerT:""
});

const emotionsSchema=new mongoose.Schema ({
  email:"",
  trainingAnswers:[],
  answers: [],
  test:"",
  pictureUrl:[],
  nb4:"",
  nbTrainE:"",
  pictureUrlS:"",
  pictureUrlT:""
});

const numbersSchema=new mongoose.Schema ({
  email:"",
  trainingAnswers:[],
  answers: [],
  test:"",
  pictureUrl:[],
  nb5:"",
  nbTrainN:""
});

const wordsSchema=new mongoose.Schema ({
  email:"",
  answers: [],
  score:[],
  test:"",
  pictureUrl:[],
  nb6:""
});


userSchema.plugin(passportLocalMongoose); //hash and salt passwords


const User = new mongoose.model("User", userSchema);

const Story = new mongoose.model("Story", storiesSchema);

const Film =new mongoose.model("Film", filmsSchema);

const Fish =new mongoose.model("Fish", fishsSchema);

const Heart =new mongoose.model("Heart", heartsSchema);

const Flower =new mongoose.model("Flower", flowersSchema);

const Emotion =new mongoose.model("Emotion", emotionsSchema);

const Number =new mongoose.model("Number", numbersSchema);

const Word =new mongoose.model("Word", wordsSchema);


passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


app.get("/", function(req,res){
  res.sendFile(__dirname+'/views/index.html');
})

app.get("/login", function(req, res){
  res.render("login");
});

app.get("/register", function(req, res){
  res.render("register");
});


app.get("/home", function(req,res){

  Story.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        console.log("Story test is", foundUser.test);
        if (foundUser.test!=="done"){
          foundUser.delete()
        }
      }
      else{
        console.log("didn't answer the Story test");
      }
    }
  });

  Film.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        console.log("Film test is", foundUser.test);
        if (foundUser.test!=="done"){
          foundUser.delete()
        }
      }
      else {
        console.log("didn't answer the Film test");
      }
    }
  });

  Fish.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        console.log("Fish Game is", foundUser.test);
        if (foundUser.test!=="done"){
          foundUser.delete()
        }
      }
      else{
        console.log("didn't answer the Fish Game test");
      }
    }
  });

  Heart.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        console.log("Heart Game is", foundUser.test);
        if (foundUser.test!=="done"){
          foundUser.delete()
        }
      }
      else{
        console.log("didn't answer the Heart Game test");
      }
    }
  });

  Flower.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        console.log("Flower Game is", foundUser.test);
        if (foundUser.test!=="done"){
          foundUser.delete()
        }
      }
      else{
        console.log("didn't answer the Flower Game test");
      }
    }
  });

  Number.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        console.log("Numbers Game is", foundUser.test);
        if (foundUser.test!=="done"){
          foundUser.delete()
        }
      }
      else{
        console.log("didn't answer the Numbers Game test");
      }
    }
  });

  Word.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        console.log("Vocabulary Game is", foundUser.test);
        if (foundUser.test!=="done"){
          foundUser.delete()
        }
      }
      else{
        console.log("didn't answer the Vocabulary Game test");
      }
    }
  });

  Emotion.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        console.log("Emotion test is", foundUser.test);
        if (foundUser.test!=="done"){
          foundUser.delete()
        }
      }
      else {
        console.log("didn't answer the Emotion test");
      }
    }
  });

  User.findOne({username:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      res.render("home", {startingContent: homeStartingContent, firstName:foundUser.firstName, text:""});
    }
  });
});


app.get("/about", function(req,res){
  res.render("about", {aboutContent:aboutContent});
});

app.get("/contact", function(req,res){
  res.render("contact", {contactContent:contactContent});
});


app.get("/strangestory", function(req,res){
  Story.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else if(foundUser){
      if (foundUser.test==="done"){
        res.render("home", {startingContent: homeStartingContent, firstName:req.session.passport.user.firstName, text:"You have already done the strange stories test"});
      }
      else{
        res.render("strangestory");
      }
    }
    else{
      const answerstory = new Story;
      answerstory.email = req.session.passport.user.username;
      answerstory.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("new Story created");
        }
      })
      res.render("strangestory");
    }
  });
})

app.get("/strangestory1", function(req,res){
  res.render("strangestory1");
})

app.get("/strangestory2", function(req,res){
  res.render("strangestory2");
})

app.get("/strangestory3", function(req,res){
  res.render("strangestory3");
})

app.get("/strangestory4", function(req,res){
  res.render("strangestory4");
})

app.get("/strangestory5", function(req,res){
  res.render("strangestory5");
})


app.get("/fishstart", function(req,res){
  Fish.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else if(foundUser){
      if (foundUser.test==="done"){
        res.render("home", {startingContent: homeStartingContent, firstName:foundUser.firstName, text:"You have already done the Fish Game test"});
      }
      else{
        res.render("fishstart");
      }
    }
    else{
      const answerFish = new Fish;
      answerFish.email = req.session.passport.user.username;
      answerFish.nb=0;
      answerFish.nbTrain=0;
      answerFish.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("new Fish created");
        }
      }); 
      res.render("fishstart");
    }
  })
})


app.get("/fishtraining",function(req,res){
  res.render("fishtraining", {fishR:"droite.PNG", fishC:"gauche.PNG", imageC:"0"});
})

app.get("/fishgamestart",function(req,res){
  res.render("fishgamestart");
})


app.get("/jeu1",function(req,res){
  res.render("jeu1", {fishRT:"gauche.PNG", fishCT:"gauche.PNG", imageCT:"0"});
})


app.get("/heartstart", function(req,res){
  Heart.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else if(foundUser){
      if (foundUser.test==="done"){
        res.render("home", {startingContent: homeStartingContent, firstName:foundUser.firstName, text:"You have already done the Heart Game test"});
      }
      else{
        res.render("heartstart");
      }
    }
    else{
      const answerHeart = new Heart;
      answerHeart.email = req.session.passport.user.username;
      answerHeart.nb2=0;
      answerHeart.nbTrainH=0;
      answerHeart.imageHeart="R";
      answerHeart.imageHeartT="R";
      answerHeart.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("new Heart created");
        }
      }); 
      res.render("heartstart");
    }
  })
})

app.get("/hearttraining",function(req,res){
  res.render("hearttraining", {imageHeart:"R"});   
})

app.get("/heartgamestart",function(req,res){
  res.render("heartgamestart");
})

app.get("/jeu2",function(req,res){
  res.render("jeu2", {imageHeartT:"R"});
})


app.get("/flowerstart", function(req,res){
  Flower.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else if(foundUser){
      if (foundUser.test==="done"){
        res.render("home", {startingContent: homeStartingContent, firstName:foundUser.firstName, text:"You have already done the Flower test"});
      }
      else{
        res.render("flowerstart");
      }
    }
    else{
      const answerFlower = new Flower;
      answerFlower.email = req.session.passport.user.username;
      answerFlower.nb3=0;
      answerFlower.nbTrainF=0;
      answerFlower.imageFlower="L";
      answerFlower.imageFlowerT="R";
      answerFlower.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("new Flower created");
        }
      })
    res.render("flowerstart");
    }
  });
})
  
app.get("/flowergamestart",function(req,res){
  res.render("flowergamestart");
})

app.get("/flowertraining",function(req,res){
  res.render("flowertraining", {imageFlower:"L"});
})


app.get("/jeu3",function(req,res){
  res.render("jeu3", {imageFlowerT:"R"});
})


app.get("/emotionstart", function(req,res){
  Emotion.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else if(foundUser){
      if (foundUser.test==="done"){
        res.render("home", {startingContent: homeStartingContent, firstName:foundUser.firstName, text:"You have already done the Emotion test"});
      }
      else{
        res.render("emotionstart");
      }
    }
    else{
      const answerEmotion = new Emotion;
      answerEmotion.email = req.session.passport.user.username;
      answerEmotion.nb4=0;
      answerEmotion.nbTrainE=0;
      answerEmotion.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("new Emotion created");
        }
      })
    res.render("emotionstart");
    }
  });
})

app.get("/emotiontraining",function(req,res){
  res.render("emotiontraining", {pictureUrl:"train1.png"});
})

app.get("/emotiongamestart", function(req,res){
  res.render("emotiongamestart");
})

app.get("/jeu4",function(req,res){
  res.render("jeu4", {pictureUrlT:"test1.png"});
})


app.get("/numberstart", function(req,res){
  Number.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else if(foundUser){
      if (foundUser.test==="done"){
        res.render("home", {startingContent: homeStartingContent, firstName:foundUser.firstName, text:"You have already done the Number test"});
      }
      else{
        res.render("numberstart");
      }
    }
    else{
      const answerNumber = new Number;
      answerNumber.email = req.session.passport.user.username;
      answerNumber.nb5=0;
      answerNumber.nbTrainN=0;
      answerNumber.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("new Number created");
        }
      })
    res.render("numberstart");
    }
  });
})

app.get("/numbertraining",function(req,res){
  res.render("numbertraining", {number1:"8", number2:"2", message:""});
})

app.get("/numbergamestart", function(req,res){
  res.render("numbergamestart");
})

app.get("/jeu5",function(req,res){
  res.render("jeu5", {number1T:"3", number2T:"1", number3T:"", number4T:"", number5T:""});
})


app.get("/wordstart", function(req,res){
  Word.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else if(foundUser){
      if (foundUser.test==="done"){
        res.render("home", {startingContent: homeStartingContent, firstName:foundUser.firstName, text:"You have already done the Word test"});
      }
      else{
        res.render("wordstart");
      }
    }
    else{
      const answerWord = new Word;
      answerWord.email = req.session.passport.user.username;
      answerWord.nb6=0;
      answerWord.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("new Word created");
        }
      })
    res.render("wordstart");
    }
  });
})

let word="Tomato";
let option1="Fly";
let option2="Crack";
let option3="Wood";
let option4="Dunce";
let option5="Fruit";
let option6="Step";
let correctAnswer="Fruit";

app.get("/wordtraining",function(req,res){
  res.render("wordtraining", {word:word, option1:option1, option2:option2, option3:option3, option4:option4, option5:option5, option6:option6});
})

let wordMessage="";

app.get("/wordgamestart",function(req,res){
  res.render("wordgamestart", {wordMessage:wordMessage});
})

let wordT="Toss";
let option1T="Throw";
let option2T="Catch";
let option3T="Hide";
let option4T="Roll";
let option5T="Dive";
let option6T="Pull";
let correctAnswerT="Throw";

app.get("/jeu6",function(req,res){
  res.render("jeu6",{wordT:wordT, option1T:option1T, option2T:option2T, option3T:option3T, option4T:option4T, option5T:option5T, option6T:option6T});
})


app.get("/silentfilm", function(req,res){
  Film.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else if(foundUser){
      if (foundUser.test==="done"){
        res.render("home", {startingContent: homeStartingContent, firstName:foundUser.firstName, text:"You have already done the Film test"});
      }
      else{
        res.render("silentfilm");
      }
    }
    else{
      const answerFilm = new Film;
      answerFilm.email = req.session.passport.user.username;
      answerFilm.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("new Film created");
        }
    })
  res.render("silentfilm");
  }
  });
})

app.get("/silentfilm1", function(req,res){
  res.render("silentfilm1");
});

app.get("/silentfilm2", function(req,res){
  res.render("silentfilm2");
});

app.get("/silentfilm3", function(req,res){
  res.render("silentfilm3");
});

app.get("/silentfilm4", function(req,res){
  res.render("silentfilm4");
});

app.get("/silentfilm5", function(req,res){
  res.render("silentfilm5");
});


app.get("/final", function(req,res){
  res.render("final");
});


app.get("/logout", function(req, res){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect("/");
  }); 
});


app.post("/register", function(req, res){

  User.register({username: req.body.username, firstName:req.body.firstName, lastName: req.body.lastName, gender:req.body.gender}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/home");
      });
    }
  });
});


app.post("/login", function(req, res){
  
  User.findOne()

  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, function(err){
    if (err) {
      console.log(err);
      res.redirect("/login");
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/home");
      });
    }
  });
});


app.post("/home", function(req,res){
});


// Getting strange stories answers

app.post("/strangestory1", function(req,res){
  Story.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else if (foundUser){
      foundUser.answer1= req.body.answer1;
      foundUser.pictureUrl.push(req.body.photoURL);
      foundUser.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("successfully added Stories answer1");
        }
      }); 
    }
    else {
      res.redirect("home")
    }
    res.redirect("strangestory2");
  });
});

app.post("/strangestory2", function(req,res){
  Story.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      foundUser.answer2= req.body.answer2;;
      foundUser.pictureUrl.push(req.body.photoURL2);
      foundUser.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("successfully added Stories answer2");
        }
      }); 
    }
    res.redirect("strangestory3");
  });
});

app.post("/strangestory3", function(req,res){
  Story.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      foundUser.answer3= req.body.answer3;
      foundUser.pictureUrl.push(req.body.photoURL3);
      foundUser.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("successfully added Stories answer3");
        }
      }); 
    }
    res.redirect("strangestory4");
  });
});

app.post("/strangestory4", function(req,res){
  Story.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      foundUser.answer4= req.body.answer4;
      foundUser.pictureUrl.push(req.body.photoURL4);
      foundUser.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("successfully added Stories answer4");
        }
      }); 
    }
    res.redirect("strangestory5");
  });
});

app.post("/strangestory5", function(req,res){
  Story.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      foundUser.answer5= req.body.answer5;
      foundUser.pictureUrl.push(req.body.photoURL5);
      foundUser.test="done";
      foundUser.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("successfully added Stories answers");
        }
      }); 
    }
    res.redirect("home");
  });
});


// Getting silent films answers

app.post("/silentfilm1", function(req,res){
  Film.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else if (foundUser){
      foundUser.answer1= req.body.answerF11;
      foundUser.answer2= req.body.answerF12;
      foundUser.pictureUrl.push(req.body.photoURL);
      foundUser.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("successfully added Films answers");
        }
      }); 
    }
    else {
    const answerfilm = new Film;
    answerfilm.email = req.session.passport.user.username;
    answerfilm.answer1= req.body.answerF11;
    answerfilm.answer2= req.body.answerF12;
    answerfilm.pictureUrl.push(req.body.photoURL1);
    answerfilm.save(function(err){
      if(err){
        print(err);
      }
      else{
        console.log("successfully added Stories answers");
      }
    }); 
    }
    res.redirect("silentfilm2");
  });
});

app.post("/silentfilm2", function(req,res){
  Film.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      foundUser.answer3= req.body.answerF2;
      foundUser.pictureUrl.push(req.body.photoURL2);
      foundUser.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("successfully added films answers");
        }
      }); 
    }
    res.redirect("silentfilm3");
  });
});

app.post("/silentfilm3", function(req,res){
  Film.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      foundUser.answer4= req.body.answerF3;
      foundUser.pictureUrl.push(req.body.photoURL3);
      foundUser.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("successfully added films answers");
        }
      }); 
    }
    res.redirect("silentfilm4");
  });
});

app.post("/silentfilm4", function(req,res){
  Film.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      foundUser.answer5= req.body.answerF4;
      foundUser.pictureUrl.push(req.body.photoURL4);
      foundUser.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("successfully added films answers");
        }
      }); 
    }
    res.redirect("silentfilm5");
  });
});

app.post("/silentfilm5", function(req,res){
  Film.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      foundUser.answer6= req.body.answerF5;
      foundUser.pictureUrl.push(req.body.photoURL5);
      foundUser.test="done";
      foundUser.save(function(err){
        if(err){
          print(err);
        }
        else{
          console.log("successfully added films answers");
        }
      }); 
    }
    res.redirect("home");
  });
});

//"10" : tête à droite au centre et têtes à gauche sur les côtés
let fish=[ "11", "10", "01", "00", "11", "01"];

app.post("/fishtraining", function(req,res){
  console.log("game1 Training");
  Fish.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if(foundUser.nbTrain<6){
          if(fish[foundUser.nbTrain][0]==="0"){
            foundUser.fishC="gauche.PNG";
            foundUser.imageC="0";
          }
          else if(fish[foundUser.nbTrain][0]==="1"){
            foundUser.fishC="droite.PNG";
            foundUser.imageC="1";
          }
      
          if(fish[foundUser.nbTrain][1]==="0"){
            foundUser.fishR="gauche.PNG";
          }
          else if(fish[foundUser.nbTrain][1]==="1"){
            foundUser.fishR="droite.PNG";
          }
      
          if(req.body.leftTrue==="leftTrue"){
            foundUser.trainingAnswers.push(req.body.leftTrue);
          }
          else if(req.body.leftFalse==="leftFalse"){
            foundUser.trainingAnswers.push(req.body.leftFalse);
          }
          else if(req.body.rightTrue==="rightTrue"){
            foundUser.trainingAnswers.push(req.body.rightTrue);
          }
          else if(req.body.rightFalse==="rightFalse"){
            foundUser.trainingAnswers.push(req.body.rightFalse);
          }
          else{
            foundUser.trainingAnswers.push("no answer");
          }
          console.log(foundUser.nbTrain);
          console.log(foundUser.trainingAnswers[foundUser.trainingAnswers.length-1])
          foundUser.nbTrain=foundUser.nbTrain+1;
          foundUser.save(function(err){
            if(err){
              print(err);
            }
            else{
              console.log("successfully added Fish answers");
            }
          }); 
          setTimeout(delay, 1000);
          function delay()
            {res.render("fishtraining", {fishR: foundUser.fishR, fishC:foundUser.fishC, imageC:foundUser.imageC});}
        }
        else {
          res.redirect("fishgamestart");
        }
    }
  });
})


// 0 left   1 right
let fishT=["11","10","00","00","10","01","00","01","11","00","10","11","01","11","01","11","00","00","11","10","00","00","10","01","00","01","11","11","10","11","01","11","11","00"];


app.post("/jeu1", function(req,res){
  console.log("game1");

  Fish.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if(foundUser.nb<34){
        if(fishT[foundUser.nb][0]==="0"){
          foundUser.fishCT="gauche.PNG";
          foundUser.imageCT="0";
        }
        else if(fishT[foundUser.nb][0]==="1"){
          foundUser.fishCT="droite.PNG";
          foundUser.imageCT="1";
        }
        if(fishT[foundUser.nb][1]==="0"){
          foundUser.fishRT="gauche.PNG";
        }
        else if(fishT[foundUser.nb][1]==="1"){
          foundUser.fishRT="droite.PNG";
        }

        if(req.body.leftTrue==="leftTrue"){
          foundUser.answers.push(req.body.leftTrue);
        }
        else if(req.body.leftFalse==="leftFalse"){
          foundUser.answers.push(req.body.leftFalse);
        }
        else if(req.body.rightTrue==="rightTrue"){
          foundUser.answers.push(req.body.rightTrue);
        }
        else if(req.body.rightFalse==="rightFalse"){
          foundUser.answers.push(req.body.rightFalse);
        }
        else{
          foundUser.answers.push("no answer");
        }
        foundUser.pictureUrl.push(req.body.photoURL);
        console.log(foundUser.nb);
        console.log(foundUser.answers[foundUser.answers.length-1]);
        foundUser.nb=foundUser.nb+1;
        foundUser.save(function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Successfully added Fish answers")
          }
        });
        setTimeout(delay, 1000);
        function delay()
          {res.render("jeu1", {fishRT: foundUser.fishRT, fishCT:foundUser.fishCT, imageCT: foundUser.imageCT});}
      }
      else {
        console.log("Successfully finished");
        foundUser.test="done";
        foundUser.save(function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Successfully added Fish answers")
          }
        });
        res.redirect('home');
      }
    }
  });
})

// L : Left   R : Right
let heart=["L","L","R","L","R","R","L","R"];


app.post("/hearttraining", function(req,res){
  console.log("game2 Training");
  Heart.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
        if(foundUser.nbTrainH<9){
          if(heart[foundUser.nbTrainH]==="R"){
            foundUser.imageHeart="R";
          }
          else if(heart[foundUser.nbTrainH]==="L"){
            foundUser.imageHeart="L";
          }

          if(req.body.leftTrue==="leftTrue"){
            foundUser.trainingAnswers.push(req.body.leftTrue);
          }
          else if(req.body.leftFalse==="leftFalse"){
            foundUser.trainingAnswers.push(req.body.leftFalse);
          }
          else if(req.body.rightTrue==="rightTrue"){
            foundUser.trainingAnswers.push(req.body.rightTrue);
          }
          else if(req.body.rightFalse==="rightFalse"){
            foundUser.trainingAnswers.push(req.body.rightFalse);
          }
          else{
            foundUser.trainingAnswers.push("no answer");
          }
          console.log(foundUser.nbTrainH);
          console.log(foundUser.trainingAnswers[foundUser.trainingAnswers.length-1])
          foundUser.nbTrainH=foundUser.nbTrainH+1;
          foundUser.save(function(err){
            if(err){
              print(err);
            }
            else{
              console.log("successfully added Heart answers");
            }
          }); 
          setTimeout(delay, 1000);
          function delay()
            {res.render("hearttraining", {imageHeart:foundUser.imageHeart});}
        }
        else {
          res.redirect("heartgamestart");
        }
    }
  });
})


let heartT=["L","L","R","R","L","R","R","L","L","L","R","L"];

app.post("/jeu2", function(req,res){
  console.log("game2");

  Heart.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if(foundUser.nb2<12){
        if(heartT[foundUser.nb2]==="R"){
          foundUser.imageHeartT="R";
        }
        else if(heartT[foundUser.nb2]==="L"){
          foundUser.imageHeartT="L";
        }

        if(req.body.leftTrue==="leftTrue"){
          foundUser.answers.push(req.body.leftTrue);
        }
        else if(req.body.leftFalse==="leftFalse"){
          foundUser.answers.push(req.body.leftFalse);
        }
        else if(req.body.rightTrue==="rightTrue"){
          foundUser.answers.push(req.body.rightTrue);
        }
        else if(req.body.rightFalse==="rightFalse"){
          foundUser.answers.push(req.body.rightFalse);
        }
        else{
          foundUser.answers.push("no answer");
        }
        foundUser.pictureUrl.push(req.body.photoURL);
        console.log(foundUser.nb2);
        console.log(foundUser.answers[foundUser.answers.length-1])
        foundUser.nb2=foundUser.nb2+1;
        foundUser.save(function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Successfully added Heart answers")
          }
        });
        setTimeout(delay, 1000);
        function delay()
          {res.render("jeu2", {imageHeartT:foundUser.imageHeartT});}
      }
      else {
        console.log("Successfully finished");
        foundUser.test="done";
        foundUser.save(function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Done")
          }
        });
        res.redirect('home');
      }
    }
  });
})


let flower=["L","R","L","L","R","R","L","R"];

app.post("/flowertraining", function(req,res){
  console.log("game3 Training");
  Flower.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if(foundUser.nbTrainF<8){    
        if(flower[foundUser.nbTrainF]==="R"){
          foundUser.imageFlower="R";
        }
        else if(flower[foundUser.nbTrainF]==="L"){
          foundUser.imageFlower="L";
        }
  
        if(req.body.leftTrue==="leftTrue"){
          foundUser.trainingAnswers.push(req.body.leftTrue);
        }
        else if(req.body.leftFalse==="leftFalse"){
          foundUser.trainingAnswers.push(req.body.leftFalse);
        }
        else if(req.body.rightTrue==="rightTrue"){
          foundUser.trainingAnswers.push(req.body.rightTrue);
        }
        else if(req.body.rightFalse==="rightFalse"){
          foundUser.trainingAnswers.push(req.body.rightFalse);
        }
        else{
          foundUser.trainingAnswers.push("no answer");
        }        
        console.log(foundUser.nbTrainF);
        console.log(foundUser.trainingAnswers[foundUser.trainingAnswers.length-1])
        foundUser.nbTrainF=foundUser.nbTrainF+1;
        foundUser.save(function(err){
          if(err){
            print(err);
          }
          else{
            console.log("successfully added Flower answers");
          }
        }); 
        setTimeout(delay, 1000);
        function delay()
          {res.render("flowertraining",{imageFlower:foundUser.imageFlower});}
      }
      else {
        res.redirect("flowergamestart");
      }
    }
  });
})


let flowerT=["L","L","R","R","L","R","R","L","L","R","L","R"];

app.post("/jeu3", function(req,res){
  console.log("game3");
  Flower.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if(foundUser.nb3<12){
        if(flowerT[foundUser.nb3]==="R"){
          foundUser.imageFlowerT="R";
        }
        else if(flowerT[foundUser.nb3]==="L"){
          foundUser.imageFlowerT="L";
        }

        if(req.body.leftTrue==="leftTrue"){
          foundUser.answers.push(req.body.leftTrue);
        }
        else if(req.body.leftFalse==="leftFalse"){
          foundUser.answers.push(req.body.leftFalse);
        }
        else if(req.body.rightTrue==="rightTrue"){
          foundUser.answers.push(req.body.rightTrue);
        }
        else if(req.body.rightFalse==="rightFalse"){
          foundUser.answers.push(req.body.rightFalse);
        }
        else{
          foundUser.answers.push("no answer");
        }
        foundUser.pictureUrl.push(req.body.photoURL);
        console.log(foundUser.nb3);
        console.log(foundUser.answers[foundUser.answers.length-1])
        foundUser.nb3=foundUser.nb3+1;
        foundUser.save(function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Successfully added Flower answers")
          }
        });
        setTimeout(delay, 1000);
        function delay()
          {res.render("jeu3",{imageFlowerT:foundUser.imageFlowerT});}
      }
      else {
        console.log("Successfully finished");
        foundUser.test="done";
        foundUser.save(function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Done")
          }
        });
        res.redirect('home');
      }
    }
  });
})


var images=["train2.png", "train3.png", "train4.png", "train5.png", "train1.png"];

app.post("/emotiontraining", function(req,res){
  console.log("game4 Training");
    Emotion.findOne({email:req.session.passport.user.username},function(err, foundUser){
      if (err) {
        console.log(err);
      } else {
          if(req.body.happy==="happy"){
            foundUser.trainingAnswers.push(req.body.happy);
          }
          else if(req.body.sad==="sad"){
            foundUser.trainingAnswers.push(req.body.sad);
          }
          else if(req.body.fearful==="fearful"){
            foundUser.trainingAnswers.push(req.body.fearful);
          }
          else if(req.body.angry==="angry"){
            foundUser.trainingAnswers.push(req.body.angry);
          }
          else if(req.body.neutral==="neutral"){
            foundUser.trainingAnswers.push(req.body.neutral);
          }
          else{
            foundUser.trainingAnswers.push("no answer");
          }
          console.log(foundUser.nbTrainE);
          console.log(foundUser.trainingAnswers[foundUser.trainingAnswers.length-1])
          foundUser.pictureUrlS=images[foundUser.nbTrainE]; 
          foundUser.nbTrainE=foundUser.nbTrainE+1;
          foundUser.save(function(err){
            if(err){
             print(err);
             }
             else{
              console.log("successfully added Emotion answers");
            }
          });
        if(foundUser.nbTrainE<5){
          //setTimeout(delay, 1000);
          //function delay()
          //  {res.render("emotiontraining",{pictureUrl:foundUser.pictureUrlS});}
          res.render("emotiontraining",{pictureUrl:foundUser.pictureUrlS})
        }
        else{
          res.redirect("emotiongamestart");
        }
      }
    });
  })


var imagesT=[ "test2.png", "test3.png", "test4.png", "test5.png","test6.png", "test7.png", "test8.png", "test9.png","test10.png", "test11.png", "test12.png", "test13.png","test14.png", "test15.png", "test16.png", "test17.png","test18.png", "test19.png", "test20.png", "test21.png","test22.png", "test23.png", "test24.png", "test25.png","test26.png", "test27.png", "test28.png", "test29.png","test30.png", "test2.png"];

app.post("/jeu4", function(req,res){
  console.log("game4");
  Emotion.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
        if(req.body.happy==="happy"){
          foundUser.answers.push(req.body.happy);
        }
        else if(req.body.sad==="sad"){
          foundUser.answers.push(req.body.sad);
        }
        else if(req.body.fearful==="fearful"){
          foundUser.answers.push(req.body.fearful);
        }
        else if(req.body.angry==="angry"){
          foundUser.answers.push(req.body.angry);
        }
        else if(req.body.neutral==="neutral"){
          foundUser.answers.push(req.body.neutral);
        }
        else{
          foundUser.answers.push("no answer");
        }
        foundUser.pictureUrl.push(req.body.photoURL);
        console.log(foundUser.nb4);
        console.log(foundUser.answers[foundUser.answers.length-1]);
        foundUser.pictureUrlT=imagesT[foundUser.nb4];
        foundUser.nb4=foundUser.nb4+1;
        foundUser.save(function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Successfully added Emotion answers")
          }
        });
      if(foundUser.nb4<30){
        //setTimeout(delay, 1000);
        //function delay()
        //  {res.render("jeu4",{pictureUrlT:foundUser.pictureUrlT});}
        res.render("jeu4",{pictureUrlT:foundUser.pictureUrlT})
      }
      else {
        console.log("Successfully finished");
        foundUser.test="done";
        foundUser.save(function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Done")
          }
        });
        res.redirect('home');
      }
    }
  });
})


var numbers=["82", "56", "93", "12","23"];
var numbersInv=["28","65","39","21","32"];
let message="";

app.post("/numbertraining", function(req,res){
  console.log("game5 Training");
    Number.findOne({email:req.session.passport.user.username},function(err, foundUser){
      if(foundUser.nbTrainN<4){
        if(req.body.number===numbersInv[foundUser.nbTrainN]){
          console.log("good job!");
          message="Correct answer! good job!";
          foundUser.trainingAnswers.push("true");
        }
        else{
          console.log("wrong answer!");
          message="Answer not correct!";
          foundUser.trainingAnswers.push("false");
        }
        console.log(foundUser.nbTrainN);
        console.log(foundUser.trainingAnswers[foundUser.trainingAnswers.length-1])
        foundUser.nbTrainN=foundUser.nbTrainN+1;
        foundUser.save(function(err){
          if(err){
            print(err);
            }
          else{
          console.log("successfully added Number answers");
          }
        })
        setTimeout(delay, 1000);
        function delay()
        {res.render("numbertraining", {number1: numbers[foundUser.nbTrainN].substring(0,1),
          number2: numbers[foundUser.nbTrainN].substring(1,2), message: message});}
    }
    else{
      res.redirect("numbergamestart");
    }
  });
})


var numbersT=["53", "475", "952", "6927","3948","75314","97852","1"];
var numbersInvT=["13","35","574","259","7296","8493","41357","25879","1"];

app.post("/jeu5", function(req,res){
  console.log("game5");

  Number.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if(foundUser.nb5<7){
        if(numbersT[foundUser.nb5].length===2){
          number1T=numbersT[foundUser.nb5][0];
          number2T=numbersT[foundUser.nb5][1];
        }
        else if(numbersT[foundUser.nb5].length===3){
          number1T=numbersT[foundUser.nb5][0];
          number2T=numbersT[foundUser.nb5][1];
          number3T=numbersT[foundUser.nb5][2];
        }
        else if(numbersT[foundUser.nb5].length===4){
          number1T=numbersT[foundUser.nb5][0];
          number2T=numbersT[foundUser.nb5][1];
          number3T=numbersT[foundUser.nb5][2];
          number4T=numbersT[foundUser.nb5][3];
        }
        else if(numbersT[foundUser.nb5].length===5){
          number1T=numbersT[foundUser.nb5][0];
          number2T=numbersT[foundUser.nb5][1];
          number3T=numbersT[foundUser.nb5][2];
          number4T=numbersT[foundUser.nb5][3];
          number5T=numbersT[foundUser.nb5][4];
        }

        if(req.body.number===numbersInvT[foundUser.nb5]){
          console.log("good job!");
          foundUser.answers.push("true");
        }
        else{
          console.log("wrong answer!");
          foundUser.answers.push("false");
        }
        foundUser.pictureUrl.push(req.body.photoURL);
        console.log(foundUser.nb5);
        console.log(foundUser.answers[foundUser.answers.length-1]);
        foundUser.nb5=foundUser.nb5+1;
        foundUser.save(function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Successfully added Number answers")
          }
        });
        setTimeout(delay, 1000);
        function delay()
          {res.render("jeu5", {number1T: numbersT[foundUser.nb5].substring(0,1),
            number2T: numbersT[foundUser.nb5].substring(1,2),number3T: numbersT[foundUser.nb5].substring(2,3),
            number4T: numbersT[foundUser.nb5].substring(3,4),number5T: numbersT[foundUser.nb5].substring(4,5)});}
          
      }
      else {
        console.log("Successfully finished");
        foundUser.test="done";
        foundUser.save(function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Done")
          }
        });
        res.redirect('home');
      }
    }
  });
})


app.post("/wordtraining", function(req,res){
  console.log(req.body.checkbox);
  if(req.body.checkbox===correctAnswer){
    console.log("good job");
    wordMessage="Correct Answer! Good job!";
  }
  else{
    wordMessage="Answer not correct! the correct answer is "+correctAnswer+" !";
  }
  res.redirect("wordgamestart");
})

let wordTable=["Damp","Rest","Cruel","Receive","Battle","Patch","Disturb","Blaze","Malaria","Fascinated","Liberty","Stubborn","Precise","Resemblance","Anonymous","Elevate","Task","Courteous","Prosper","Damp"];
let option1Table=["Light","Cry","Clean","Walk","Stroll","Mend","Transfer","Kitchen","Basement","Ill-treated","Freedom","Steady","Natural","Memory","Applicable","Raise","Horn","Dreadful","Imagine","Light"];
let option2Table=["Sing","Sing","Green","Accept","Light","Watch","Skip","Coat","Fever","Modelled","Worry","Hopeful","Exact","Fondness","Magnificent","Move","Game","Proud","Propose","Sing"];
let option3Table=["Sweet","Go Away","Pretty","Believe","Snow","Hand","Lick","Glass","Theatre","Poisoned","Rich","Obstinate","Faulty","Assemble","Insulting","Revolve","Trap","Polite","Succeed"];
let option4Table=["Taste","Taste","Found","Empty","Fight","Bang","Upset","Roof","Fruit","Charmed","Serviette","Hollow","Grand","Repose","Fictitious","Work","Jail","Short","Beseech","Taste"];
let option5Table=["Wet","Run Up","Water","Money","Bowl","Switch","Doubt","Flare","Ocean","Frightened","Forest","Orderly","Stupid","Attendance","Nameless","Waver","Problem","Curtsey","Punish","Wet"];
let option6Table=["Flag","Lie Down","Unkind","Drive","Last","Cook","Fire","Side","Tune","Copied","Cheerful","Slack","Small","Likeness","Untrue","Disperse","Job","Truthful","Trespass","Flag"];
let correctAnswerTable=["Throw","Wet","Lie Down","Unkind","Accept","Fight","Mend","Upset","Flare","Fever","Charmed","Freedom","Obstinate","Exact","Likeness","Nameless","Raise","Game","Polite","Succeed","Wet"];


app.post("/jeu6", function(req,res){
  console.log("game6");

  Word.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if(foundUser.nb6<20){
        console.log(req.body.checkbox);
        if(req.body.checkbox===correctAnswerTable[foundUser.nb6]){
          foundUser.answers.push(req.body.checkbox);
          foundUser.score.push("True");
          console.log("correctAnswer");
        }
        else{
          console.log("False answer. The correct answer is ", correctAnswerTable[foundUser.nb6]);
          foundUser.answers.push(req.body.checkbox);
          foundUser.score.push("False");
        }
        foundUser.pictureUrl.push(req.body.photoURL);
        wordT=wordTable[foundUser.nb6];
        option1T=option1Table[foundUser.nb6];
        option2T=option2Table[foundUser.nb6];
        option3T=option3Table[foundUser.nb6];
        option4T=option4Table[foundUser.nb6];
        option5T=option5Table[foundUser.nb6];
        option6T=option6Table[foundUser.nb6];
        foundUser.nb6=foundUser.nb6+1;
        foundUser.save(function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Successfully added Word answers")
          }
        });
    setTimeout(delay, 1000);
    function delay()
      {res.redirect("jeu6");}
      }
      else {
        console.log("Successfully finished");
        foundUser.test="done";
        foundUser.save(function(err){
          if(err){
            console.log(err);
          }
          else{
            console.log("Done")
          }
        });
        res.redirect('home');
      }
    }
  });
})

//Lancer serveur  https://tom-ef.herokuapp.com/

app.listen(process.env.PORT, function() {
  console.log("Server has started successfully");
});
/*
//Lancer serveur local http://localhost:3000/
app.listen(port, function() {
    console.log("Server has started successfully");
  });
*/
