 let express= require('express');
 let mongodb=require('mongodb');
 let app = express();
 let db= null ;
 app.use(express.static('scripts'))
  const MongoClient=mongodb.MongoClient;

  let dbString=`mongodb+srv://appUser:appUser@cluster0.8voopqk.mongodb.net/myApp?retryWrites=true&w=majority`;
  let dbName='myApp';
  mongodb.connect(dbString,{useNewUrlParser:true,useUnifiedTopology: true},function(err,client){
    if(err){
    throw err;
    }
    db = client.db(dbName)
   app.listen(3000)
  })
app.use(express.json())
 app.use(express.urlencoded({extended:false}))
 
function passProcted(req,res,next){
res.set('WWW-Authenticate','Basic realm="simple App"')
if(req.headers.authorization ==' Basic aWQ6cGFzcw=='){
  next()
}else{
  res.status(401).send('please prove id password');
}
  }
app.use(passProcted)

  app.get('/',passProcted,(req,res)=>{
 
  })
  app.get('/',passProcted,function(req,res){
    db.collection('items').find().toArray(function(err,items){
       res.send(`
       <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Document</title>
       <style>
           *{
             margin:0;
              padding;0;
              box-siziing
           }
               body{
                 height:100vh;
                 width:100vw;
                 scroll-behavior: none;
               }
          .container{
           display: flex;
           flex-direction: column;
           align-items: center;
           background-color: black;
           color: aqua;
           font-size: 12px;
          background-position: center;
           background-size: cover;
           }
          h1{
           text-align: center;
           font-size: 40px;
           margin-top:53px;
           width: 400px;
           margin-bottom: 60px; 
           padding: 10px 20px;
          }
      .form input {
        height: 30px;
        width: 400px;
        border-radius: 10px;
        margin: 10px;
        border:1px solid aqua;
        color: aqua;
        background-color: transparent;
        padding: 0px 15px;
        font-size: 18px;
      }
    .form button{
   
       height: 30px;
       width: 100px;
       border-radius: 5px;
       background-color: transparent;
       color: aqua;
       font-size: 13px;
       border: 1px solid aqua;
       transition: ease-in-out 0.6s;
    }
    .form button:hover{
       color: black;
       background-color: aqua;
       border:1px solid black;
       opacity: 0.9;
       font-weight: 400;
    }
    ul{
     margin-top: 28px;
    }
    li{
       list-style: none;
       width: 600px;
       display: flex;
       justify-content: space-between;
       margin-bottom: 10px;
    }
    .edit,.delete{
     padding: 3px;
     width: 60px;
     margin-right: 10px;
     background-color: transparent;
     color: aqua;
     border: 1px solid aqua;
     border-radius: 5px;
     cursor: pointer;
     transition: ease-in .6s;
    }
     .edit:hover,.delete:hover{
     color: black;
       background-color: aqua;
       border:2px solid white;
       opacity: 0.9;
       font-weight: 400;
    }
   
      </style>
   </head>
   <body>
       <div class="container">
       <h1>To-Do App </h1>
     <form action="/create-item" method="POST" class="form">
       <input name="item" autofocus autocomplete="off">
       <button>Add New Item</button>
     </form>  
     <ul>
   ${items.map(function(items){
     return `<li><span class="item-text">${items.text}</span>
     <div class="btn-grp"><button data-id=${items._id} class="edit">Edit</button>
     <button data-id=${items._id} class="delete">Delete</button></div></li>`
   }).join('')} 
     </ul>
    <script src="https://unpkg.com/axios@1.1.2/dist/axios.min.js"></script>
     <script src="/script.js">  </script>
   </body>
   </html>`)
     })})
   
 app.post('/create-item',function(req,res){
db.collection('items').insertOne({text:req.body.item},function(){
  res.redirect('/')
})
 
 })
 app.post('/update-item',(req,res)=>{
  db.collection('items').findOneAndUpdate({_id:new mongodb.ObjectId(req.body.id)},{$set:{text:req.body.text}},()=>{
    res.send("Updated Successfully");
  })
 })

 app.post('/delete-item',(req,res)=>{
  db.collection('items').deleteOne({_id:new mongodb.ObjectId(req.body.id)},function(){
    res.send("item deleted");
  })
 })