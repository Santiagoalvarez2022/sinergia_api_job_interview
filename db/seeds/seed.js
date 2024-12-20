const {arrayBlog,addAuthors} = require('./blogsArray')

const seeds = async(Author,Blog,Tag) =>{

    //creo los registro en la base de datos y luego los relaciono
    const newAuthor = await Author.create({nickname:'Sinergia',image:'https://res.cloudinary.com/dvtys5yi8/image/upload/v1734640846/sinergialogo_2_1_qptsap.png'})

   
    const tag_life_skills = await Tag.create({name : 'Habilidades para la vida'}) 
    const tag_job_search = await Tag.create({name : 'Búsqueda de empleo'}) 
    const tag_for_recruiters = await Tag.create({name : 'Para reclutadores'}) 

    const resultBlogs = addAuthors(newAuthor.dataValues.id)


    //le añado una prop al array de [tag1,tag2] recorro y dependiendo de donde este presente lo añado
    const createBlogs = () =>{
        resultBlogs.forEach(async(blog)=>{
            //creo blog
            const newBlog = await Blog.create(blog);
            //anado 
            if (blog.tags.includes(1)) {
                await newBlog.addTags(tag_life_skills)
            }

            if (blog.tags.includes(2)) {
                await newBlog.addTags(tag_job_search)
            }

            if (blog.tags.includes(3)) {
                await newBlog.addTags(tag_for_recruiters)
            }
        })

    }


    createBlogs()
    

    console.log('end of creation seeds');
    
  
    
}


module.exports = {
    seeds
}