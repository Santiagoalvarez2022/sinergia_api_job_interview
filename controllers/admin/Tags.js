const {  Tag} = require('../../db/index');

const createTags = async(req,res) =>{
    try {
        const {name} = req.body;
        const newTag = await Tag.create({name})
        res.status(201).json(newTag)
    } catch (error) {
        res.status(400).json(error)
    }

}

const getTags = async(req,res) =>{
    try {
        const allTags = await Tag.findAll()
        res.status(200).jsxon(allTags) 
    } catch (error) {
        res.status(400).json(error)
        
    }
}

module.exports = {
    createTags,
    getTags
}