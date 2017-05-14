
class Model{
  constructor(){
    this.db = require('./models')
  }

list(callback){
  this.db.todo.findAll()
  .then(todos=>{
    return callback(todos)
  })
}  

add(input,callback){
  this.db.todo.create({
    task:input,
    iscomplete: false
  })
  .then(task=>{
    callback(task.task,task.id)
  })
}

deleteTask(id,callback){
  this.db.todo.findOne({
    where:{
      id:id
    }
  })
  .then(task=>{
    callback(task.task)
    this.db.todo.destroy({
      where:{
        id:id
      }
    })
  })
}

completeTask(id,callback){
  this.db.todo.update({
    iscomplete:true
  },{
    where:{
      id:id
    }
  })
  .then(data=>{
    this.db.todo.findOne({
      where:{
        id:id
      }
      })
      .then(task=>{
        callback(task.task)
      })
    })
  } 
  
uncompleteTask(id,callback) {
  this.db.todo.update({
    iscomplete:false
  },{
    where:{
      id:id
    }
  })
  .then(data=>{
    this.db.todo.findOne({
      where:{
        id:id
      }
      })
      .then(task=>{
        callback(task.task)
      })
    })
  }
  
  task(id,callback){
    this.db.todo.findOne({
      where:{
        id:id
      }
    })
    .then(task=>{
      callback(task)
    })
  }
  
  listOutstanding(callback){
    this.db.todo.findAll({
      where:{
        iscomplete:false
      }
    })
    .then(tasks=>{
      callback(tasks)
    })
  }
  
  listCompleted(callback){
    this.db.todo.findAll({
      where:{
        iscomplete:true
      }
    })
    .then(tasks=>{
      callback(tasks)
    })
  }
  
  tagTask(id,tag1,tag2,callback){
    if(!tag2){
      this.db.todo.update({
        tag:tag1
      },{
      where:{
        id:id
      }
      })
      .then(task=>{
        this.db.todo.findOne({
          where:{
            id:id
          }
        })
        .then(task=>{
              callback(tag1,tag2,task.task)
        })    
      })
    }
    else{
      this.db.todo.update({
        tag:tag1 + ", " + tag2 
      },{
       where:{
          id:id
        }
      })
      .then(task=>{
        this.db.todo.findOne({
          where:{
            id:id
          }
        })
        .then(task=>{
          callback(tag1,tag2,task.task)
        })      
      })
    }
  }
  
  filterTag(tag,callback){
    this.db.todo.findAll({
      where:{
      tag:{
        $like:`%${tag}%`
        }
      }
    })
    .then(tasks=>{
      callback(tasks)
      })
    }    
}

export default Model  