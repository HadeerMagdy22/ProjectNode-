const Blog=require('../models/Blog');
const create = (todo) => Blog.create(todo);
const getAll=(query)=>Blog.find(query).exec();
const getById=(id)=>Blog.findById(id).exec();
const editOne=(id,body)=>Blog.findByIdAndUpdate(id,body,{new:true});
const findByTage = (tag)=>Blog.find({tags: tag}).exec();
const findByTitle = (t)=>Blog.find({title: t}).exec();

module.exports={
    create,
    getAll,
    getById,
    editOne,
    findByTage,
    findByTitle,
}