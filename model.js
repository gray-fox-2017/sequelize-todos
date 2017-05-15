const conn = require('./models')


class Model {
  constructor() {

  this.connection = conn;

  }

  showData(callback){
    this.connection.Todo.findAll()
    .then (tasks =>{
       callback(tasks)
    })
  }

  showDataOutstanding(callback){
    this.connection.Todo.getOutstading(tasks =>{
      callback(tasks)
    })
  }

  showDataCompleted(callback){
    this.connection.Todo.getCompleted(tasks =>{
      callback(tasks)
    })
  }

  createData(task,callback){
    this.connection.Todo.create({
        'task': task,
        'is_complete': false
      })
    .then (task => {
      callback(null,task)
    })
    .catch (err => {
      callback(err,null)
    });
  }

  deleteData(task,callback){
    this.connection.Todo.destroy({
        where: {
          'task': task
        }
      })
      .then(res => {
        callback(null,res)
      })
      .catch(err => {
        callback(err,null)
      });
  }

  updateData(task,callback){
    this.connection.Todo.update({
        'is_completed': true,
      }, {
        where: {
          'task': task
        }
      })
      .then(task => {
        callback(null,task)
      })
      .catch(err => {
        callback(err,null)
      });
  }

  createTag(task,tag,callback){
    this.connection.Todo.update({
        'tag':tag,
      }, {
        where: {
          'task': task
        }
      })
      .then(tags => {
        callback(null,tags)
      })
      .catch(tags => {
        callback(err,null)
      });
  }

  showTags(tag,callback){
    this.connection.Todo.filterTag(tag,tasks => {
      callback(tasks);
    })
  }




}



module.exports = Model;
