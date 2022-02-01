import  mongoose,{Schema, Document} from "mongoose"
import { Entry } from "./models/Entry"
import { DB_URL } from "./config"
import { Category } from "./models/Categories"
import {UserModel}  from "./models/User.model"



const createCategory = async(creator_name:string)=>{
    const category = await Category.create({
        name:'Beginner',
        benefits:`Yoga for beginners that will help you discover the first benefits of a discipline that is thousands of years old`,
        creator:`${creator_name}`
    })

    await Entry.create({
        name:`Tadasana`,
        benefits:`Develop balance, sretches the spine and decongests the spinal nerves, tones muscles and stretches the rectus abdominis,improves circulation,boost concentration`,
        img:`tadasana.jpg`,
        category:category._id
    })

    await Entry.create({
        name:`Bhujangasana`,
        benefits:`Seeks to exercise the upper part of the body, although over time you may notice that you also begin to notice how your glutes and hamstrings work`,
        img:`bhujangasana.jpg`,
        category:category._id
    })
   
}

(async()=>{
    await mongoose.connect(DB_URL).then(() => console.log(`Conected to ${DB_URL}`))
    try{
        await Entry.collection.drop();
        await Category.collection.drop();
       
    }catch(error){
        console.log("There are no items to drop from db")
    }
 
    
    await createCategory("Patricia");
    

    await mongoose.disconnect().then(()=>{
        console.log("bye")
    })


    
})();