const express=require('express');
const auth = require('../middlewares/auth');

const app = express();

app.use(auth);
const {create,getAll,getById,editOne,findByTage,findByTitle}=require('../controllers/blog');


//to regist routes
const router = express.Router();

router.post('/', async (req, res, next) => {
  const { body,user:{ id } } = req;
  try {
    const blog = await create({...body,userId:id});
    res.json(blog);
  } catch (e) {
    next(e);
  }
});
router.get('/',async(req,res,next)=>{
  const { user: {id} }=req;
  try{
    const blogs=await getAll({userId:id});
    res.json(blogs)
  } catch(e) {
    next(e);
  }
  
})
router.get('/:id',async(req,res,next)=>{
  const {params:{id}}=req;
  try{
    const blogs=await getById(id);
    res.json(blogs)
  } catch(e) {
    next(e);
  }
  
})

router.get('/tag/:tag',async(req,res,next)=>{
  const {params:{tag}}=req;
  try{
    const blogs=await findByTage(tag);
    res.json(blogs)
  } catch(e) {
    next(e);
  }
  
})
router.get('/title/:title',async(req,res,next)=>{
  const {params:{title}}=req;
  try{
    const blogs=await findByTitle(title);
    res.json(blogs)
  } catch(e) {
    next(e);
  }
  
})

router.patch('/:id',async(req,res,next)=>{
  const {params:{id},body}=req;
  try{
    const blogs=await editOne(id,body);
    res.json(blogs)
  } catch(e) {
    next(e);
  }
  
})


module.exports=router;