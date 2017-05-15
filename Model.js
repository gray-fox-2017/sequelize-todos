'use strict'


class Model{
  constructor(){
    this.db = require('./models')
  }

  list(callback){
    this.db.Todo.findAll()
    .then(Todos=>{
      return callback(Todos)
    })
  }

  add(input, callback){
    this.db.Todo.create({
      task: input,
      iscomplete: false
    })
    .then(task=>{
      callback(task.task, task.id)
    })
  }

  deleteTask(id, callback){
    this.db.Todo.findOne({
      where:{
        id: id
      }
    })
    .then(task=>{
      callback(task.task)
      this.db.Todo.destroy({
        where:{
          id: id
        }
      })
    })
  }

  completeTask(id, callback){
    this.db.Todo.update({
      iscomplete:true
    },{
      where:{
        id: id
      }
    })
    .then(data=>{
      this.db.Todo.findOne({
        where:{
          id:id
        }
      })
      .then(task=>{
        callback(task.task)
      })
    })
  }

  uncompleteTask(id, callback){
    this.db.Todo.update({
      iscomplete:false
    },{
      where:{
        id: id
      }
    })
    .then(data=>{
      this.db.Todo.findOne({
        where:{
          id:id
        }
      })
    .then(task=>{
      callback(task.task)
    })//kurang ga
  })
  }

  task(id, callback){
    this.db.Todo.findOne({
      where:{
        id: id
      }
    })
    .then(task=>{
      callback(task)
      // console.log(task[]);
    })
  }

  listOutstanding(callback){
    this.db.Todo.findAll({
      where:{
        iscomplete:false
      }
    })
    .then(tasks=>{
      callback(tasks)
    })
  }

  listCompleted(callback){
    this.db.Todo.findAll({
      where:{
        iscomplete: true
      }
    })
    .then(task=>{
      callback(task)
    })
  }

  tagTask(id, tag1, tag2, callback){
    if(!tag2){
      this.db.Todo.update({
        tag:tag1
      },{
        where:{
          id: id
        }
      })
      .then(task=>{
        this.db.Todo.findOne({
          where:{
            id: id
          }
        })
        .then(task=>{
          callback(tag1, tag2, task.task)
        })
      })
    }
    else{
      this.db.Todo.update({
        tag:tag1+", "+tag2
      },{
        where:{
          id: id
        }
      })
      .then(task=>{
        this.db.Todo.findOne({
          where:{
            id:id
          }
        })
        .then(task=>{
          callback(tag1, tag2, task.task)
        })
      })
    }
  }

  filterTag(tag, callback ){
    this.db.Todo.findAll({
      where:{
        tag:{
          $like:`#${tag}#`
        }
      }
    })
    .then(tasks=>{
      callback(tasks)
    })
  }
}


export default Model
