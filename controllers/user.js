
const User=require('../models/User');
const jwt=require('jsonwebtoken');
const { promisify }=require('util');
const asyncSign=promisify(jwt.sign);
const create=(user)=>User.create(user);
const login = async ({ username, password }) => {
    // get user from DB
    const user = await User.findOne({ username }).exec();
    if (!user) {
      throw Error('UN_AUTHENTICATED');
    }
    const isVaildPass = user.validatePassword(password);
    if (!isVaildPass) {
      throw Error('UN_AUTHENTICATED');
    }
    const token=await asyncSign({
        username:user.username,
        id:user.id,
    }, 'secret',{expiresIn:'1d'});
    
return { ...user.toJSON(),token };
};

const getAll=()=>User.find({}).exec();

const editOne=(id,data)=>User.findByIdAndUpdate(id,data,{new:true}).exec();

const finduserbyId=(id)=>User.findOne(id).exec();
const addfollow = (id, trgetid)=> User.updateOne(
    { "_id": id },
    {
        $push: {
            folowers: trgetid
        }
    }
  );
  const removefollow = (id, trgetid)=> User.updateOne(
    { "_id": id },
    {
        $pull: {
          folowers: trgetid
        }
    }
  );
module.exports={
    create,
    login,
    getAll,
    editOne,
    finduserbyId,
    addfollow,
    removefollow,
};