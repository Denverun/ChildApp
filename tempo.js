//inutile pour l'instant
var cookieParser = require('cookie-parser')

//ID unique
   console.log(Math.floor((1 + Math.random()) * 0x10000)) 

   /*app.get('/home', function (req, res, next) {
  // Cookies that have not been signed
  User.findOne({__v:req.session.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        console.log(foundUser.firstName);
      }
      else{
        console.log("didn't succeed");
      }
    }
  });
  console.log(req.cookies.test.substring(2))
 next();

})*/

//mettre des cookies
/*
app.post('/login', function(req,res,next) {
  res.cookie('UID', req.body.username, {maxAge: 10800000});
  next();
})
*/

/*
function logCookie(cookie) {
  if (cookie) {
    console.log(cookie.value);
  }
}
function getCookie(tabs) {
  let getting = browser.cookies.get({
    url: tabs[0].url,
    name: "connect.sid"
  });
  getting.then(logCookie);
}

let getActive = browser.tabs.query({
  active: true,
  currentWindow: true
});
getActive.then(getCookie);
*/

/*
app.get('/home', function (req, res, next) {
  req.session.views = (req.session.views || 0) + 1
  res.end(req.session.views + ' views')
})
*/


//test
const schema1 = new mongoose.Schema ({
  firstName: "",
  lastName: "",
  birth: "",
  gender: "",
  answertest: "",
  email: String,
  password: String
});

let testSchema1="";

const schema2 = new mongoose.model("schema2", schema1);

const schema3= new schema2();
//


/*schema2.findOne({'birth' : 'in order to beat you'},'birth __v ',function (err, person) {
  if (err) console.log(err) ;
  person.__v=3;
  person.save();
});*/
//test
/*
app.post("/strangestory5", function(req,res){
  const birth= req.body.birth;
  schema3.birth=birth;
  console.log(birth);
  //answer.email="done";
  //storyTest=true;
  res.redirect("home");
  schema3.save(function(err){
    if(err){
      print(err);
    }
    else{
      console.log("successfully added test answers");
    }
  });
}); */

const storiesSchema = new mongoose.Schema ({
  email:firstName,
  answer1: "",
  answer2: "",
  answer3: "",
  answer4: "",
  answer5: "",
  test: "",
  pictureUrl:[]
});

318 enlever


Story.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        console.log("Story test is", foundUser.test);
      }
      else{
        console.log("didn't answer the story test");
      }
    }
  });

  22supprimer


  console.log(req.headers.cookie)

  app.get("/strangestory", function(req,res){
  Story.findOne({email:req.session.passport.user.username},function(err, foundUser){
    if (err) {
      console.log(err);
    } else if(foundUser){
      if (foundUser.test==="done"){
        res.render("home", {startingContent: homeStartingContent, firstName:firstName, text:"You have already done the strange stories test"});
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
          console.log("successfully added new Story");
        }
      })
    res.render("strangestory");
    }
  });
})

correctAnswerT


mots clés :
aquoicasert
quoiquoiquoi
quequoi


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
      res.redirect("home")}
    res.redirect("strangestory2");
  });
});

app.post("/fishtraining", function(req,res){
    console.log("game1 Training");
    Fish.findOne({email:req.session.passport.user.username},function(err, foundUser){
      if (err) {
        console.log(err);
      } else {
          if(foundUser.nbTrain<6){
            if(fish[foundUser.nbTrain][0]==="0"){
              fishC="gauche.PNG";
              imageC="0";
            }
            else if(fish[foundUser.nbTrain][0]==="1"){
              fishC="droite.PNG";
              imageC="1";
            }
        
            if(fish[foundUser.nbTrain][1]==="0"){
              fishR="gauche.PNG";
            }
            else if(fish[foundUser.nbTrain][1]==="1"){
              fishR="droite.PNG";
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
            console.log(foundUser.trainingAnswers[-1])
            foundUser.nbTrain=foundUser.nbTrain+1;
            foundUser.save(function(err){
              if(err){
                print(err);
              }
              else{
                console.log("successfully added Stories answers");
              }
            }); 
            setTimeout(delay, 2000);
            function delay()
              {res.redirect("fishtraining");}
          }
          else {
            res.redirect("fishgamestart");
          }
      }   
    });
  })


fautilchanger


  app.post("/jeu1", function(req,res){
    console.log("game1");
  
    Fish.findOne({email:req.session.passport.user.username},function(err, foundUser){
      if (err) {
        console.log(err);
      } else {
        if(foundUser.nb<34){
          if(fishT[foundUser.nb][0]==="0"){
            fishCT="gauche.PNG";
            imageCT="0";
          }
          else if(fishT[foundUser.nb][0]==="1"){
            fishCT="droite.PNG";
            imageCT="1";
          }
          if(fishT[foundUser.nb][1]==="0"){
            fishRT="gauche.PNG";
          }
          else if(fishT[foundUser.nb][1]==="1"){
            fishRT="droite.PNG";
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
          console.log(foundUser.answers[-1]);
          foundUser.nb=foundUser.nb+1;
          foundUser.save(function(err){
            if(err){
              console.log(err);
            }
            else{
              console.log("Successfully added Fish answers")
            }
          });
          setTimeout(delay, 2000);
          function delay()
            {res.redirect("jeu1");}
        }
        else {
          console.log("Successfully finished");
          foundUser.test="done";
          res.redirect('home');
        }
      }
    });
  })