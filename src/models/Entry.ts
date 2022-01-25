import  mongoose,{Schema, Document} from "mongoose"
import { Category } from "./Categories";
//import { Entry } from "./Entry";


export interface Entry extends Document{
    name:String;
    benefits:String;
    img:String;
    category:Category["_id"]
}
const schema = new Schema(
    {
        name:String,
        benefits:String,
        img:String,
        category: { type: Schema.Types.ObjectId, ref: "Category" },
       
    },{
        timestamps:true
});



export const Entry = mongoose.model<Entry>("Entry", schema)