const pasport= require('passport');
const {Strategy} = require('passport-local').Strategy;
const {User,Role} = require ('../models');
const md5 = require('md5');

//this function is called an authenticate to test if the users credentials is valid
async function verifyUser(username,password,done){
    //fetch user from database
    const user=await User.findOne({
        where:{
            email:username,
            password: md5(password)
        }
    });
    //if no user, or password do not match, call done with the failure message
    if (!user){
        return done (null,false,{message: 'Incorrect enail or password.'});
    }
    //password authenticate, so user passes
    return done (false,{
        id:user.id,
    });
}

passport.use(
    new Strategy(
        {
            usernameField: 'email',
            passwordField:'password'
        },
        verifyUser
    )
);

//turn user object into an object that can be passes into a cookie
passport.serializeUser(function (user,done){
    process.nextTick(function(){
        done(null,{id:user.id});
    });
});

//turn serialized object back into an object. in our casem we dont need to do anything.
passport.deserializeUser(async function (user,done){
    const userModel = await User.findByPk(user.id,{
        include:[
            'role'
        ]
    });
    process.nextTick(function (){
        return done(null,userModel);
    });
});

module.exports.passport = passport;