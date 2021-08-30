const express=require('express');
const mongoose=require('mongoose');
const app=express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/pokeapi",{useNewUrlParser:true},()=>{
    console.log("mongo server connected");
})


const pokemonSchema=new mongoose.Schema({
    name:String,
    type:String,
    imageUrl:String
})

 
const pokemonModel= new mongoose.model('pokemons',pokemonSchema);


app.get("/pokemons",async (req,res)=>{

    let pokemons=await pokemonModel.find();
    res.send(pokemons);

})




app.get("/pokemon/:id",async (req,res)=>{

    let id=req.params.id;
    let pokemon=await pokemonModel.find({_id:id});
    res.send(pokemon);
})


app.get("/pokemon/type/:type",async (req,res)=>{

    let type=req.params.type;
    let pokemon=await pokemonModel.find({type:type});
    res.send(pokemon);
})

app.post("/pokemon",(req,res)=>{

    let pokemon=req.body;

    let pokemonObj=new pokemonModel(pokemon);

    pokemonObj.save((err,data)=>{
        if(err===null){
            res.send({message:"Pokmon Created"});
        }
    });
    
  


})


app.delete("/pokemon/:id",(req,res)=>{

    let id=req.params.id;

    pokemonModel.deleteOne({_id:id},(err,data)=>{

        if(err===null){
            res.send({message:"Pokemon Deleted"});
        }

    })

   

})

app.put("/pokemon/:id",(req,res)=>{

    let id=req.params.id;
    let pokemon=req.body;

    pokemonModel.updateOne({_id:id},pokemon,(err,data)=>{

        if(err===null)
        {
            res.send("Pokemon Updated");
        }
            
    })

    

})

app.listen(8000,()=>{
    console.log("server is running");
})
