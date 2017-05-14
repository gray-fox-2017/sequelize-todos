'use strict'

class Model {
  constructor(){
    this.db = require('./models')
  }

  list(callback) {
    this.db.Todo.findAll()
    .then((todos)=> {
      return callback(todos)
    })
  }

  add(input, callback) {
    this.db.Todo.create({
      task: input,
      status: false
    })
    .then ((task)=> {
      return callback(task.task, task.id)
    })
  }

  delete(id, callback){
    this.db.Todo.findOne({
      where: {
        id: id
      }
    })
    .then((todoTask)=> {
      return callback(todoTask.task)
      this.db.Todo.destroy({
        where: {
          id: id
        }
      })
    })
  }

  complete(id, callback){
    this.db.Todo.update({
        status: true
      }, {
        where: {
          id: id
        }
      })
    .then((data)=> {
      this.db.Todo.findOne({
        where: {
          id: id
        }
      })
      .then((task)=> {
        return callback(task.task)
      })
    })
  }

  uncomplete(id, callback){
    this.db.Todo.update({
      status: false
    }, {
      where: {
        id: id
      }
    })
    .then((data)=> {
      this.db.Todo.findOne({
        where: {
          id: id
        }
      })
      .then((task)=> {
        return callback(task.task)
      })
    })
  }

  taskList(id, callback){
    this.db.Todo.findOne({
      where: {
        id: id
      }
    })
    .then((task)=> {
      return callback(task)
    })
  }

  listOutstanding(callback){
    this.db.Todo.findAll({
      where: {
        status: false
      }
    })
    .then((task)=> {
      return callback(task)
    })
  }

  listComplete(callback){
    this.db.Todo.findAll({
      where: {
        status: true
      }
    })
    .then((task)=> {
      return callback(task)
    })
  }

  tagingTask(id, tag1, tag2, callback){
    if(!tag2){
      this.db.Todo.update({
        tag: tag1
      }, {
        where: {
          id: id
        }
      })
      .then((task)=> {
        this.db.Todo.findOne({
          where: {
            id: id
          }
        })
        .then((task)=> {
          return callback(tag1, task.task)
        })
      })
    } else {
      this.db.Todo.update({
        tag: tag1+", "+tag2
      }, {
        where: {
          id: id
        }
      })
      .then((task)=> {
        this.db.Todo.findOne({
          where: {
            id: id
          }
        })
        .then((task)=> {
          return callback(tag1, tag2, task.task)
        })
      })
    }
  }

  filter(tag, callback){
    this.db.Todo.findAll({
      where: {
        tag: {
          $like: `%${tag}%`
        }
      }
    })
    .then((task)=> {
      return callback(task)
    })
  }
}

export default Model; 
