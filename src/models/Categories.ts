
import  mongoose,{Schema, Document} from "mongoose"
//import { Entry } from "./Entry";


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

// export const getIngredientes = async (idReceta: string) => {
//     const ingredientes = await Entry.find({ receta: idReceta }).lean();
//     return ingredientes
// };

export const Category = mongoose.model<Category>("Category", schema)