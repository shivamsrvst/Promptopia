import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
//GET For Read

export const GET=async(request,{params})=>{
    try {
        await connectToDB();      
        
        const prompt=await Prompt.findById(params.id).populate("creator"); 
        if(!prompt) return new Response("Prompt Not Found..",{status:404});
        return new Response(JSON.stringify(prompt),{
            status:200
        })

    } catch (error) {
        return new Response("failed to fetch all prompts",{status:500})
        
    }

}
//PATCH for Update

export const PATCH=async(request,{params})=>{
    const {prompt ,tag}=await request.json();
    try {
        await connectToDB();
        const existingPrompt=await Prompt.findById(params.id);

        if(!existingPrompt) {return new Response("Prompt not Found..",{status:404})
    }
        existingPrompt.prompt=prompt;
        existingPrompt.tag=tag;

        await existingPrompt.save();
        
        return new Response("Successfully updated the prompts",{status:200})


    } catch (error) {
        return new Response("Failed to update prompt",{status:500})
        
    }
}

//DELETE for deletion
export const DELETE=async (request,{params})=>{
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id);

        return new Response("Prompt deleted succesfully",{status:200})
    } catch (error) {

        return new Response("Failed to delete prompt",{status:300})

        
    }

}
