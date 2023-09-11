import Blog from '../models/Blog.js';


export const  GetBlogs = async (req,res) =>{
    const getposts = await Blog.find();

    res.render('blog' , {Posts: getposts})
}

export const GetBlogId = async (req,res)=>{
    const getonepost = await Blog.findById(req.params.id)
    res.render('Ablog',{Ablog:getonepost})
}

export const AddBlog = (req,res) =>{
    res.render('addblog')
}

export const EditBlogId = async (req,res) =>{
    const getonepost = await Blog.findById(req.params.id)
    res.render('editblog',{Ablog:getonepost})
}

export const PostBlogPostAdd = async (req,res) =>{
    const {title, description }= req.body;

    console.log('title : ',title , " description : ", description)

    const newBlog = new Blog ({    // res.render('addblog')

        title : title,
        description : description
    })
    
    console.log(newBlog)

     try {
        const saveBlog = await newBlog.save()

   // res.status(200).json(saveBlog)  
    res.redirect('/blog/Blog')
    } catch (error) {
        res.status(404).json(error)
    }
   
}

export const PutEditBlogId = async (req,res)=>{
    try {
        const getonepost = await Blog.findById(req.params.id);
        const updatedblog = await Blog.findByIdAndUpdate(req.params.id,{
            $set:req.body,
        },{new:true})
    
        //res.status(200).json(updatedblog)
        res.redirect(`/blog/Blog/${getonepost._id}`)
    
    
        } catch (error) {
            res.status(404).json(error)
        }
    
}

export const DeleteDelBlogId = async (req,res)=>{
    try {
        await Blog.findByIdAndDelete(req.params.id)
       // res.status(200).json('del !!')
       res.redirect('/blog/Blog')
    } catch (error) {
        res.status(404).json(error)
    }
}