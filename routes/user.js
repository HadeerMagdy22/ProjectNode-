const express=require('express');
const {create,login,getAll,editOne,addfollow,removefollow}=require('../controllers/user');
const auth=require('../middlewares/auth');
const router = express.Router();

router.post('/', async (req, res, next) => {
    const { body } = req;
    try {
      const user = await create(body);
      res.json(user);
    } catch (e) {
      next(e);
    }
  });
  router.post('/login', async (req, res, next) => {
    const { body } = req;
    try {
      const user = await login(body);
      res.json(user);
    } catch (e) {
      next(e);
    }
  });

  router.get('/',auth,async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (e) {
      next(e);
    }
  });
  router.patch('/:id',async(req,res,next)=>{
    const {params:{id},body}=req;
    try{
      const users=await editOne(id,body);
      res.json(users)
    } catch(e) {
      next(e);
    }
    
  });
  router.post('/follow/:targetid',async (req, res, next) => {
    const { params: { targetid },body: { id }  } = req;

    try {
      if(targetid==id){
        res.send("errorr");
        return;
      }
      const users = await addfollow( targetid, id);
      res.json(users);
    } catch (e) {
      next(e);
    }
  });

  router.post('/unfollow/:targetid', async (req, res, next) => {
    const { params: { targetid },body: { id }  } = req;
    try {
      const users = await removefollow( targetid, id);
      res.json(users);
    } catch (e) {
      next(e);
    }
  });


  module.exports=router;
