//
//////////////////////////////////////////////////////////////////////////////
//DEPENDENCIES
//////////////////////////////////////////////////////////////////////////////
//

var express = require("express");
var path = require('path');
var app = express();
var passport = require('passport');
var db = require("../models");

var router = express.Router();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
        extended: false,
     parameterLimit: 1000000,
     limit: 1024 * 1024 * 10
}));
app.use(bodyParser.json({
        extended: false,
     parameterLimit: 1000000,
     limit: 1024 * 1024 * 10
}));

var moment = require('moment');

var nodemailer = require('nodemailer');

//node mailer config
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'serverappbeta@gmail.com',
        pass: 'websterdog'
    }
});

var bcrypt = require("bcrypt-nodejs");

//
//////////////////////////////////////////////////////////////////////////////
//SITE NAVIGATION
//////////////////////////////////////////////////////////////////////////////
//

router.get("/", function(req, res) {
   res.render("home", req);
});

router.get("/login", function(req, res) {
    res.render("login", req);
});

router.get("/feedback", function(req, res) {
    res.render("feedback", req);
});

router.post("/login", passport.authenticate('local', {
    failureRedirect: '/loginFailure',
    successRedirect: '/dashboard'
}))

router.get("/loginFailure", function(req, res) {
    res.render("loginFailure", req);
});

router.get("/signup", function(req, res) {
    res.render("signup", req);
});

router.get("/passwordReset", function(req, res) {
    res.render("passwordReset", req);
});

router.get("/updateAccount", loggedIn, function(req, res, next) {
    res.render("updateAccount", req);
});

router.get("/menuBuilder", loggedIn, function(req, res, next) {
    db.Job.findAll({where: {UserId: req.user.id}}).then(function(dbUser) {
      var dataObject = {
          jobs: dbUser
        };
       res.render("menuBuilder", dataObject);
     });
});

router.get("/shift", loggedIn, function(req, res, next) {
    db.Job.findAll({where: {UserId: req.user.id}}).then(function(dbUser) {
      var dataObject = {
          jobs: dbUser
        };
       res.render("shift", dataObject);
     });
});

router.get("/job", loggedIn, function(req, res, next) {
    res.render("job", req);
});

router.get("/goal", loggedIn, function(req, res, next) {
    res.render("goal", req);
});

//Testing out a shifts table.
//Added a raw:true option to cut down the garbage.
router.get("/shiftsTable", loggedIn, function(req, res, next) {
    db.Shift.findAll({ where: {UserId: req.user.id},
        include: [ db.Job ],
        raw: false, // Will order by shiftDate on an associated User
        order: [['shiftDate', 'DESC']]}).then(function(dbUser) {
        var dataObject = {
            allShifts: dbUser
        };

        //Hideous loop that converts the UTC time in the DB to a more readable format.
        for (var i = 0; i < dataObject.allShifts.length; i++) {
            dataObject.allShifts[i].shiftDate = moment.utc(dataObject.allShifts[i].shiftDate).add(18, 'hours').format('ll')
            dataObject.allShifts[i].timeIn = moment(dataObject.allShifts[i].timeIn, 'hh:mm:ss').format('h:mm A')
        }

        // moment().format('MMMM Do YYYY, h:mm:ss a');

        console.log(dataObject.allShifts[0])
       res.render("shiftsTable", dataObject);
     });
 });

router.get("/jobsTable", loggedIn, function(req, res, next) {
    db.Job.findAll({ where: {UserId: req.user.id}}).then(function(dbUser) {
      var dataObject = {
          allJobs: dbUser
        };
 //Hideous loop that converts the UTC time in the DB to a more readable format.
        for (var i = 0; i < dataObject.allJobs.length; i++) {
            dataObject.allJobs[i].startDate = moment.utc(dataObject.allJobs[i].startDate).add(18, 'hours').format('ll')
        }
       res.render("jobsTable", dataObject);
     });
 });

router.get("/goalsTable", loggedIn, function(req, res, next) {
    db.Goal.findAll({ where: {UserId: req.user.id}}).then(function(dbUser) {
        var dataObject = {
            allGoals: dbUser
        };
        //Hideous loop that converts the UTC time in the DB to a more readable format.
        for (var i = 0; i < dataObject.allGoals.length; i++) {
            dataObject.allGoals[i].goalDeadline = moment.utc(dataObject.allGoals[i].goalDeadline).add(18, 'hours').format('ll')
        }
        res.render("goalsTable", dataObject);
    });
});

router.get("/goals", loggedIn, function(req, res, next) {
    db.Goal.findAll({ where: {UserId: req.user.id}, order: '"goalDeadline" DESC'}).then(function(dbUser) {
        var dataObject = {
            allGoals: dbUser
        };
        //Hideous loop that converts the UTC time in the DB to a more readable format.
        for (var i = 0; i < dataObject.allGoals.length; i++) {
            dataObject.allGoals[i].goalDeadline = moment.utc(dataObject.allGoals[i].goalDeadline).add(18, 'hours').format('ll')
        }
        console.log(dataObject.allGoals[0]);
        res.json(dataObject);
    });
});

router.get("/goalsAndShifts", loggedIn, function(req, res, next) {
    db.Goal.findAll({ where: {UserId: req.user.id}, order: '"goalDeadline" DESC'}).then(function(dbUser) {
        var dataObject = {
            allGoals: dbUser
        };
        //Hideous loop that converts the UTC time in the DB to a more readable format.
        for (var i = 0; i < dataObject.allGoals.length; i++) {
            dataObject.allGoals[i].goalDeadline = moment.utc(dataObject.allGoals[i].goalDeadline).add(18, 'hours').format('ll')
        }

        db.Shift.findAll({ where: {UserId: req.user.id}, order: '"shiftDate" DESC'}).then(function(dbUser2) {
            dataObject.allShifts = dbUser2;
            //Hideous loop that converts the UTC time in the DB to a more readable format.
            for (var i = 0; i < dataObject.allShifts.length; i++) {
                dataObject.allShifts[i].shiftDate = moment.utc(dataObject.allShifts[i].shiftDate).add(18, 'hours').format('ll')
            }

            res.json(dataObject);
        });
    });
});

router.get("/dashboard", loggedIn, function(req, res, next) {
    res.render("dashboard", req);
});

router.get("/financialSummaryTest", loggedIn, function(req, res, next) {
    res.render("financialSummaryTest", req);
});

router.get("/timeline", loggedIn, function(req, res, next) {
    res.render("timeline", req);
});

router.get("/menuJSONCreator", loggedIn, function(req, res, next) {
    res.render("menuJSONCreator", req);
})

//Logs user out and returns to homepage.
router.get('/logout', loggedIn, function(req, res, next) {
    req.logout();
    res.redirect('/');
});

//
//////////////////////////////////////////////////////////////////////////////
//LOGIN/EMAIL STUFF
//////////////////////////////////////////////////////////////////////////////
//

//Creates a new user.
//They are then redirected to the login page.
router.post("/newUser", function(req, res, next) {
    db.User.findOne({
        where: {
            user_email: req.body.user_email
        }
    }).then(function(user) {
        if (!user) {
            db.User.create({
                user_email: req.body.user_email,
                user_name: req.body.user_name,
                user_password: bcrypt.hashSync(req.body.user_password),
                user_level: 1,
                restaurant_name: 'default',
                isReal: false
            }).then(function(err, user, info) {
                res.redirect('/login');
            })
        } else {
            res.send("user exists")
        }
    })
});

//User types in their old password, and can then update any of thier login credintials.
//It then logs them out and asks relog in. This prevents potentional conflicts/exploits.
router.post("/updateAccount", loggedIn, function(req, res, next) {
    console.log(bcrypt.compareSync(req.body.old_password, req.user.user_password))
    if (bcrypt.compareSync(req.body.old_password, req.user.user_password)) {
        var updateUser = {
            user_email: req.body.user_email,
            user_name: req.body.user_name,
            user_password: bcrypt.hashSync(req.body.new_password)
        };
        db.User.update(updateUser, {
            where: {
                id: req.user.id
            }
        }).then(function() {
            req.logout();
            res.redirect('/login');
        });
    } else {
         req.message = 'Invalid Password'
         res.render("updateAccount", req);
    }
});

//Sends an email to user entered email with a new temporary password.
router.post("/reset", function(req, res, next) {
    //generate temporary password.
    var tempPass = tempPWgenerator()
    console.log(tempPass)
    var reset = {
        user_password: bcrypt.hashSync(tempPass)
    };
    db.User.update(reset, {
        where: {
            user_email: req.body.user_email
        }
    }).then(function() {
          let mailOptions = {
            from: '"Server App Beta" <serverappbeta@gmail.com>', 
            to: req.body.user_email, 
            subject: 'Server App Beta - Password Reset', // Subject line
            text: 'Your password has been reset. Your temporary password is ' + tempPass + '. Please go to http://localhost:8080/login to login and change your password', // plain text body
            html: '<b>Your password has been reset.</b><br><p>Your temporary password is <b>' + tempPass  + '</b><p>Please go to <a href="http://localhost:8080/login">Login</a> to login and create a new password.'
        };
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
        res.redirect('/login'); //Sends user to login screen for now.
    });
});

//Nodemailer function for feedback page
router.post("/sendFeedback", function(req, res) {
      let mailOptions = {
        from: '"Server App Beta" <serverappbeta@gmail.com>', 
        to: 'serverappbeta@gmail.com', 
        subject: 'Server App Beta - Feedback', // Subject line
        text: req.body.user_email + " comment: " + req.body.comment,
        html: 'From: ' + req.body.user_email  + '</br><p>' + req.body.comment + '</p>'
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    var dataObject = {
        message: "Feedback sent successfully"
    };
    res.render("dashboard", dataObject);
})

//
//////////////////////////////////////////////////////////////////////////////
//CRUD
//////////////////////////////////////////////////////////////////////////////
//

router.post("/newShift", loggedIn, function(req, res, next) {
    if (req.body.shiftType === "") {req.body.shiftType = null}
    if (req.body.largestTip === "") {req.body.largestTip = null}
    if (req.body.smallestTip === "") {req.body.smallestTip = null}
    if (req.body.stiffed === "") {req.body.stiffed = null}
    if (req.body.bwl === "") {req.body.bwl = null}
    if (req.body.tipout === "") {req.body.tipout = null}
    if (req.body.tipPercent === "") {req.body.tipPercent = null}
    if (req.body.ppa === "") {req.body.ppa = null}
    if (req.body.comments === "") {req.body.comments = null}
    if (req.body.breakthroughs === "") {req.body.breakthroughs = null}
    if (req.body.shiftDate === "") {req.body.shiftDate = "2017-01-01"}
    
    db.Shift.create({
        shiftDate: req.body.shiftDate,
        timeIn: req.body.inTime,
        timeOut: req.body.outTime,
        shiftType: req.body.shiftType,
        largestTip: req.body.largestTip,
        smallestTip: req.body.smallestTip,
        stiffed: req.body.stiffed,
        bwl: req.body.bwl,
        sales: req.body.sales,
        tipout: req.body.tipout,
        tipPercent: req.body.tipPercent,
        totalWalkedWith: req.body.totalWalkedWith,
        ppa: req.body.ppa,
        comments: req.body.comments,
        breakthroughs: req.body.breakthroughs,
        isReal: false,
        JobId: req.body.job_id,
        UserId: req.user.id
    }).then(function(dbUser) {
        console.log(dbUser);

        db.Job.findAll({where: {UserId: req.user.id}}).then(function(dbUser) {
            var dataObject = {
              jobs: dbUser
            };
            dataObject.message = 'Shift Added'
            res.render("dashboard", dataObject);
        });
    });
});

router.post("/newJob", loggedIn, function(req, res, next) {
    console.log(req.body.endDate);
    if (req.body.endDate === "") {
        console.log(req.user.id)
        db.Job.create({
            UserId: req.user.id,
            job_name: req.body.job_name,
            startDate: req.body.startDate,
            wage: req.body.wage,
            isReal: false,
            stillWorkingHere: true,
            comments: req.body.comments
        }).then(function(dbUser) {
            var dataObject = {
                message: 'Job Added'
            }
            res.render("dashboard", dataObject);     
        });
    }
    else {
        db.Job.create({
            UserId: req.user.id,
            job_name: req.body.job_name,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            wage: req.body.wage,
            isReal: false,
            stillWorkingHere: false,
            comments: req.body.comments
        }).then(function(dbUser) {
              var dataObject = {
                message: 'Job Added'
            }
            res.render("dashboard", dataObject);      
        });
    }
});

router.post("/newGoal", loggedIn, function(req, res, next) {
    //Called when you post a new goal
    var goalStatus = {
        completed: false,
        abandoned: false,
        extended: false,
        modified: false
    }
    db.Goal.create({
        UserId: req.user.id,
        goalName: req.body.goalName,
        goalDeadline: req.body.goalDeadline,
        goalStatus: goalStatus,
        goalText: req.body.goalText,
        comments: req.body.comments,
        isReal: false
    }).then(function(dbUser) {
        var dataObject = {
            message: 'Goal Added'
        }
        res.render("dashboard", dataObject);     
    });
});

router.post("/editShift", loggedIn, function(req, res, next) {
  var shiftData = req.body;
  console.log(shiftData);
  db.Shift.update(shiftData, {
    where: {id:shiftData.shiftID}
  }).then(function(dbUser) {
    var dataObject = {
        message: 'Shift Updated'
    }
    res.render("dashboard", dataObject);
    });

});

router.post("/editJob", loggedIn, function(req, res, next) {
    var jobData = req.body;
    if (jobData.endDate === "") {
        jobData.stillWorkingHere = true;
        delete jobData.endDate;
        db.Job.update(jobData, {where: {id:jobData.jobIdHidden}}).then(function(dbUser) {
             var dataObject = {
                message: 'Job Updated'
            }
            res.render("dashboard", dataObject);     
        });
    }
    else {
        jobData.stillWorkingHere = false;
        db.Job.update(jobData, {where: {id:jobData.jobIdHidden}}).then(function(dbUser) {
            console.log(dbUser);
               var dataObject = {
                message: 'Job Updated'
            }
            res.render("dashboard", dataObject);    
        });
    }
});

router.post("/editGoal", loggedIn, function(req, res, next) {
    //Called when you edit an existing goal
    var goalData = req.body;

    console.log(goalData.goalStatusNumber);

    if (goalData.goalStatusNumber === '1') {
        console.log("Setting goalStatus to completed:true");
        var goalStatus = {completed: true, abandoned: false, extended: false, modified: false}
    }
    if (goalData.goalStatusNumber === '2') {
        console.log("Setting goalStatus to abandoned:true");
        var goalStatus = {completed: false, abandoned: true, extended: false, modified: false}
    }
    if (goalData.goalStatusNumber === '3') {
        console.log("Setting goalStatus to extended:true");
        var goalStatus = {completed: false, abandoned: false, extended: true, modified: false}
    }
    if (goalData.goalStatusNumber === '4') {
        console.log("Setting goalStatus to modified:true");
        var goalStatus = {completed: false, abandoned: false, extended: false, modified: true}
    }

    console.log("goalStatus: ");
    console.log(goalStatus)

    goalData.goalStatus = goalStatus;

    db.Goal.update(goalData, {where: {id:goalData.goalIdHidden}}).then(function(dbUser) {
        var dataObject = {
            message: 'Goal Updated'
        }
        res.render("dashboard", dataObject);     
    });

    // db.Goal.update({comments: goalData.comments, goalStatus: goalData.goalStatus}, {where: {id:goalData.goalIdHidden}}).then(function(dbUser) {
    //     var dataObject = {
    //         message: 'Goal Updated'
    //     }
    //     res.render("dashboard", dataObject);     
    // });
});

router.post("/deleteShift:id", loggedIn, function(req, res, next) {
  var ShiftID = req.params.id;
  db.Shift.destroy({where: {UserId: req.user.id, id: ShiftID}}).then(function(dbUser) {
    console.log("Shift deleted");
    res.redirect('/shiftsTable')
  });
});

router.post("/deleteJob:id", loggedIn, function(req, res, next) {
  var JobID = req.params.id;
  db.Job.destroy({where: {UserId: req.user.id, id: JobID}}).then(function(dbUser) {
    console.log("Job deleted");
    res.redirect('/jobsTable');
  });
});

router.post("/deleteGoal:id", loggedIn, function(req, res, next) {
    //Called when you delete a shift with a provided ID
    var GoalID = req.params.id;
    db.Goal.destroy({where: {UserId: req.user.id, id: GoalID}}).then(function(dbUser) {
        console.log("Goal deleted");
        res.redirect('/goalsTable');
    });
});

//
//////////////////////////////////////////////////////////////////////////////
//MISCELLANEOUS
//////////////////////////////////////////////////////////////////////////////
//

//Grabs all shifts for a user, for use with financial summary
router.post("/financialSummary", loggedIn, function(req, res, next) {
  console.log(req.body);
  db.Shift.findAll({where: {UserId: req.user.id}}).then(function(dbUser) {
    res.json(dbUser);
  });
});

//Grabs all shifts of a given date, for use with edit shift button
// router.post("/shiftByDate", function(req, res) {
//   console.log(req.body);

//   db.Shift.findAll({where: {shiftDate: req.body.dateToEdit}}).then(function(dbUser) {
//     res.json(dbUser);
//   });
// });

//Grabs all jobs for a user, for use with the job selector dropdown
router.post("/allJobs", loggedIn, function(req, res, next) {
    console.log(req.body);
    db.Job.findAll({where: {UserId: req.user.id}}).then(function(dbUser) {
        res.json(dbUser);
    });
});

// Grabs a shift with a given id, for use with shift editor
router.get("/editShift:id", loggedIn, function(req, res, next) {
    db.sequelize.Promise.all([
            db.Shift.findAll({
                where: { id: req.params.id }
            }),
            db.Job.findAll({
                where: { UserId: req.user.id },
            })
        ])
        .spread(function(shift, jobs) {
            //Reformat before sending to Render
               shift[0].shiftDate = moment(shift[0].shiftDate).add(18, 'hours').format('YYYY-MM-DD')
               shift[0].timeIn = moment(shift[0].timeIn, 'hh:mm:ss').format('h:mm A')
               shift[0].timeOut = moment(shift[0].timeOut, 'hh:mm:ss').format('h:mm A')
             var dataObject = {
                shift: shift[0],
                job: jobs
            }
             
             res.render("shiftEditor", dataObject)
     });
      
});

//Grabs a job with a given id
router.get("/editJob:id", loggedIn, function(req, res, next) {
    var JobID = req.params.id;
    db.Job.findAll({ 
        where: {UserId: req.user.id, id: JobID},
        raw: true
    }).then(function(dbUser) {
        var date = moment(dbUser[0].startDate).add(18, 'hours').format('YYYY-MM-DD')
        console.log(date)
        dbUser[0].startDate = date
        var date2 = moment(dbUser[0].endDate).add(18, 'hours').format('YYYY-MM-DD')
        console.log(date2)
        dbUser[0].endDate = date2
        res.render("jobEditor", dbUser[0]);
    });
});

//Grabs a goal with a given id
router.get("/editGoal:id", loggedIn, function(req, res, next) {
    //Called when you grab a goal with a provided ID, for use with goal editor
    var GoalID = req.params.id;
    db.Goal.findAll({ 
        where: {UserId: req.user.id, id: GoalID},
        raw: true
    }).then(function(dbUser) {
        var date = moment(dbUser[0].goalDeadline).add(18, 'hours').format('YYYY-MM-DD');
        console.log(date);
        dbUser[0].goalDeadline = date;
        res.render("goalEditor", dbUser[0]);
    });
});

//Grabs all shifts for a user, for use with the timeline
router.post("/timelineCreator", loggedIn, function(req, res, next) {
    db.Shift.findAll({where: {UserId: req.user.id}}).then(function(dbUser) {
        res.json(dbUser);
  });
});

//Grabs all goals for a user, for use with the timeline
router.post("/timelineGoals", loggedIn, function(req, res, next) {
    db.Goal.findAll({where: {UserId: req.user.id}}).then(function(dbUser) {
        res.json(dbUser);
  });
});

router.get("/quizMaker", loggedIn, function(req, res, next) {
    db.Job.findAll({where: {UserId: req.user.id}}).then(function(dbUser) {
      console.log(dbUser);
      var dataObject = {
          jobs: dbUser
        };
        console.log(dataObject);
       res.render("quizMaker", dataObject);
     });
})

router.get("/flashCards", loggedIn, function(req, res, next) {
    db.Job.findAll({where: {UserId: req.user.id}}).then(function(dbUser) {
      console.log(dbUser);
      var dataObject = {
          jobs: dbUser
        };
        console.log(dataObject);
       res.render("flashCards", dataObject);
     });
})

router.post("/checkMenuJSON", loggedIn, function(req, res, next) {
    db.Menu.findOne({ where: {id: req.body.menuId} }).then(function(dbUser) {
        console.log(dbUser);
        res.json(dbUser);
    });
})

router.post("/getMenus", loggedIn, function(req, res, next) {
    db.Menu.findAll({ where: {JobID: req.body.jobId}}).then(function(dbUser) {
        console.log(dbUser);
        res.json(dbUser);
    })
})

router.post("/newMenu", loggedIn, function(req, res, next) {
    console.log(req.body)
    db.Menu.create({
        menuName: req.body.menuName,
        comments: req.body.comments,
        menuJSON: req.body.menuJSON,
        criJSON: req.body.criJSON,
        UserId: req.user.id,
        JobId: req.body.JobId
    }).then(function(dbUser) {
        res.json(dbUser.dataValues.id);
  });
});

router.post("/updateMenu", loggedIn, function(req, res, next) {
    var menuObject = {
        menuName: req.body.menuName,
        comments: req.body.comments,
        menuJSON: req.body.menuJSON,
        criJSON: req.body.criJSON,
        }

    db.Menu.update(menuObject, {
        where: {id:req.body.JobId}
    }).then(function(dbUser) {
        console.log(dbUser)
  });
});

router.post("/editShift", loggedIn, function(req, res, next) {
  var shiftData = req.body;
  console.log(shiftData);
  db.Shift.update(shiftData, {
    where: {id:shiftData.shiftID}
  }).then(function(dbUser) {
    var dataObject = {
        message: 'Shift Updated'
    }
    res.render("dashboard", dataObject);
    });

});

//Keep this at the end of the router section.
//If nothing is found this is sent.
router.get('*', function(req, res) {
    res.status(404).send('404 Page Goes Here');
});

// Export routes for server.js to use.
module.exports = router;

//
//////////////////////////////////////////////////////////////////////////////
//HELPER FUNCTIONS
//////////////////////////////////////////////////////////////////////////////
//

//function for limiting access to logged in user only.
//Sends them back to the login page if not.
function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

//This is used to create a temporary password.
function tempPWgenerator() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

//Converts a number 0-1440 to a xx:xx:xx time.  Returns the time as a string.  Only works if num is divisible by 15.
function convertToTime(num) {
    var string = "";

    if (num / 60 >= 23) {string+="23";}
    else if (num / 60 >= 22) {string+="22";}
    else if (num / 60 >= 21) {string+="21";}
    else if (num / 60 >= 20) {string+="20";}
    else if (num / 60 >= 19) {string+="19";}
    else if (num / 60 >= 18) {string+="18";}
    else if (num / 60 >= 17) {string+="17";}
    else if (num / 60 >= 16) {string+="16";}
    else if (num / 60 >= 15) {string+="15";}
    else if (num / 60 >= 14) {string+="14";}
    else if (num / 60 >= 13) {string+="13";}
    else if (num / 60 >= 12) {string+="12";}
    else if (num / 60 >= 11) {string+="11";}
    else if (num / 60 >= 10) {string+="10";}
    else if (num / 60 >= 9) {string+="09";}
    else if (num / 60 >= 8) {string+="08";}
    else if (num / 60 >= 7) {string+="07";}
    else if (num / 60 >= 6) {string+="06";}
    else if (num / 60 >= 5) {string+="05";}
    else if (num / 60 >= 4) {string+="04";}
    else if (num / 60 >= 3) {string+="03";}
    else if (num / 60 >= 2) {string+="02";}
    else if (num / 60 >= 1) {string+="01";}
    else if (num / 60 >= 0) {string+="00";}

    if (num % 60 === 0) {
        string += ":00:00";
    }
    else if (num % 60 === 15) {
        string += ":15:00";
    }
    else if (num % 60 === 30) {
        string += ":30:00";
    }
    else if (num % 60 === 45) {
        string += ":45:00";
    }

    return string;
}

// SEQUELIZE CRUD METHODS, FOR REFERENCE

//  CREATE!
//   db.Blah.create({
//   email: "HELLYEAH@myspace.com",
//   password: "superduperinsecurepassword123",
//   age: 55,
//   name: "Betty"
// }).then(function(dbUser) {
//   console.log(dbUser);
// });

//  FIND ONE!
// db.Blah.findOne({ where: {id: 1} }).then(function(dbUser) {
//     console.log(dbUser);
//   });

//  FIND ALL!
// db.Blah.findAll().then(function(dbUser) {
//   console.log(dbUser);
// });

//  UPDATE ONE!
// var newTom = {
//   age: 25,
//   email: "mark@facebook.com"
// };
// db.Blah.update(newTom, {
//   where: {
//     id: 1
//   }
// }).then(function(dbUser) {
//   console.log(dbUser);
// });

// DELETE ONE!
// db.Blah.destroy({
//   where: {id: 1}
// }).then(function(dbUser) {
//   console.log(dbUser);
// });