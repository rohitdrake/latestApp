let {User}=require('../models/user');

let authenticate = (req, res, next)=>{
  let token = req.header('x-auth');

  User.findByToken(token).then((user)=>{
    if(!user){
      res.stauts(401).send("User not found!");
    }

    req.user=user;
    req.token=token;
    next();
  }).catch((e)=>{
    res.status(401).send("Access denied");
  });
};

module.exports = {authenticate};
