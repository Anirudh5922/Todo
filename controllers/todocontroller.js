var bodyParser=require('body-parser');
var mongoose=require('mongoose');

//create the database
mongoose.connect('mongodb+srv://Anirudh_88:mnit@123@todo-pp6h4.mongodb.net/test?retryWrites=true&w=majority',{ useNewUrlParser: true , useFindAndModify: true, useCreateIndex: true, useUnifiedTopology: true});

var todoSchema=new mongoose.Schema({
  item:String
});

var Todo=mongoose.model('Todo',todoSchema);
//var itemOne=Todo({item:'Buy flower'}).save(function(err){
//  if(err)throw err;
//  console.log('item saved');
//});

//var data=[{item:'get milk'},{item:'walk dog'},{item:'kick some codding ass'}];
var urlencodedParser=bodyParser.urlencoded({extended:false});

module.exports=function(app){

app.get('/todo',function(req,res){
//get data from mongodb and pass it to view
Todo.find({},function(err,data){
if(err)throw err;
res.render('todo',{todos:data});
});
});

app.post('/todo',urlencodedParser,function(req,res){
//get data from the view and it to the mongodb
var newTodo=Todo(req.body).save(function(err,data){
 res.json(data);
});
});

app.delete('/todo/:item',function(req,res){
// delete the data from mongodb
Todo.find({item:req.params.item.replace(/\-/g," ")}).deleteOne(function(err,data){
  if(err) throw err;
  res.json(data);
});

});
};
