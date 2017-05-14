'use strict'

class Model{
  constructor(){
    this.db = require('./models')
  }

list(callback){
  let list = ''
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
  this.db.todo.destroy({
    where:{
      id:id
    }
  })
  .then(taskID=>{
    callback(taskID)
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
    callback(id)
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
    callback(id)
    })
  }
  
  listTasks(callback){
    this.db.todo.findAll()
    .then(tasks=>{
      callback(tasks)
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
        callback(tag1,tag2)
      })
    }
    else{
      this.db.todo.update({
        tag:tag1 + " , " + tag2 
      },{
       where:{
          id:id
        }
      })
      .then(task=>{
        callback(tag1,tag2)
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
      callback(tasks[0].task)
      })
    }    
}  

class Controller{
  constructor(input){
    this.input = input
    this.model = new Model()
    this.view = new View()
  }
  
  run(){
    switch (this.input[2]) {
      case 'help': this.view.helpView();break 
      
      case 'add': this.model.add(this.input.slice(3,this.input.length).join(' '),(task,id)=>{
        this.view.addView(task,id);
      });break
      
      case 'delete': this.model.deleteTask(this.input[3],(taskID=>{
        this.view.deleteView(taskID)
      }));break
      
      case 'complete': this.model.completeTask(this.input[3],(taskID=>{
        this.view.completeView(taskID)
      }));break
      
      case 'uncomplete': this.model.uncompleteTask(this.input[3],(taskID=>{
        this.view.uncompleteView(taskID)
      }));break
       
      case 'list': this.model.listTasks(tasks=>{
        this.view.listView(tasks)
      });break
      
      case 'task': this.model.task(this.input[3],(task=>{
        this.view.taskView(task)
      }));break
      
      case 'list:outstanding': this.model.listOutstanding(tasks=>{
        this.view.listView(tasks)
      });break
      
      case 'list:completed': this.model.listCompleted(tasks=>{
        this.view.listView(tasks)
      });break 
      
      case 'tag': this.model.tagTask(this.input[3],this.input[4],this.input[5],(tag1,tag2)=>{
        this.view.tagView(tag1,tag2,this.input[3])
      });break
      
      case 'filter': this.model.filterTag(this.input[3],(task=>{
        this.view.filterView(task,this.input[3])
      }));break
    }
  }

}
// case 'help' : this.view.help();break
// case 'list' : this.list(this.model.data);break
// case 'add'  : this.add(this.input.slice(3,this.input.length).join(' '));break
// case 'task' : this.task(this.input[3],this.model.data);break
// case 'delete': this.delete(this.input[3],this.model.data);break
// case 'complete': this.complete(this.input[3],this.model.data);break
// case 'uncomplete': this.uncomplete(this.input[3],this.model.data);break
// case 'list:outstanding':this.listoutstanding(this.input[3],this.model.data);break
// case 'list:completed': this.listcompleted(this.input[3],this.model.data);break
// case 'tag': this.tag(this.input[3],this.input[4],this.input[5],this.model.data);break
// case 'filter': this.filter(this.input[3],this.model.data);break
// 
 class View{
  constructor(){
    
  }
  
helpView(){
  this.clean()
  console.log();
}
  
addView(task,id){
  this.clean()
  console.log(`${task} Added! Todo ID: ${id}`);
  }


deleteView(taskID){
  this.clean()
  console.log(`Todo with ID:${taskID} Deleted!`);
  }
  
completeView(taskID){
  this.clean()
  console.log(`Todo with ID:${taskID} completed!`);
  }
  
uncompleteView(taskID){
  this.clean()
  console.log(`Todo with ID ${taskID} uncompleted!`);
  }    

listView(tasks){
  this.clean()
  tasks.forEach((task)=>{
    if(task.iscomplete === true){
    console.log(`${task.id} [X] ${task.task}`);
    }
    else{
      console.log(`${task.id} [ ] ${task.task}`);
    }
    })
  }
  
taskView(task){
  this.clean()
  if(task.iscomplete === true){
    console.log(`ID: ${task.id}\nTask: ${task.task}\nStatus: Completed\nTag: ${task.tag}`);
  }
  else{
    console.log(`ID: ${task.id}\nTask: ${task.task}\nStatus: Uncomplete\nTag: ${task.tag}`);
    }
  }
  
  tagView(tag1,tag2,id){
    if(!tag2){
      console.log(`${tag1} Added! to Todo with ID: ${id}`);
    }
    else{
      console.log(`${tag1} and ${tag2} Added! to Todo with ID: ${id}`);
    }
  }
  
  filterView(task,tag){
    console.log(`${task} [${tag}]`);
  }
  
  clean(){
    console.log("\x1B[2J");
  }
  
}

let argv = process.argv
let start = new Controller(argv)
start.run()

