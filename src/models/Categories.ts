
import  mongoose,{Schema, Document} from "mongoose"
import { Entry } from "./Entry";


export interface Category extends Document{
    name:String;
    benefits:String;
    creator:String;
}
const schema = new Schema(
    {
        name:String,
        benefits:String,
        creator:String
    },{
        timestamps:true
});

export const getEntry = async (idCategory: string) => {
    const entries = await Entry.find({ category: idCategory }).lean();
    console.log("Dentro de detEntry",entries)
    return entries
};

export const Category = mongoose.model<Category>("Category", schema)