'use strict';

var db = require('./models')
//write your code here

function add(object) {
  db.Todo.create(object)
  .then(() => {
    console.log("Data created")
  })
  .catch(err => {
    console.log(err.message);
  })
}

function list() {
  db.Todo.findAll()
  .then(todos => {
    todos.forEach(todo => {
      let mark = " ";
      if(todo.completed) mark = "V"
      console.log(`${todo.id}. [${mark}] ${todo.task}`)
    })
  })
  .catch(err => {console.log(err)})
}

function find(val) {
  db.Todo.find({where: {id: val}})
  .then(todo => {
      let mark = " ";
      if(todo.completed) mark = "V"
      console.log(`${todo.id}. [${mark}] ${todo.task}`)
  })
  .catch(err => {console.log(err)})
}

function completed() {
  db.Todo.findAll({where: {completed: true}})
  .then(todos => {
    if(todos) {
      todos.forEach(todo => {
        let mark = " ";
        if(todo.completed) mark = "V"
        console.log(`${todo.id}. [${mark}] ${todo.task}`)
      })
    } else {
      console.log('tetot')
    }
  })
  .catch(err => {console.log(err)})
}

function uncompleted() {
  db.Todo.findAll({where: {completed: false}})
  .then(todos => {
    if(todos) {
      todos.forEach(todo => {
        let mark = " ";
        if(todo.completed) mark = "V"
        console.log(`${todo.id}. [${mark}] ${todo.task}`)
      })
    } else {
      console.log('tetot')
    }
  })
  .catch(err => {console.log(err)})
}


function update(id, obj) {
  db.Todo.find({where: {'id': id}})
  .then(todo => {
    todo.update(obj)
  })
}

function deletes(id) {
  db.Todo.destroy({where: {'id': id}})
}

function addTag(id, value) {
  db.Todo.find({where: {'id': id}})
  .then(todo => {
    if(todo.tag == undefined) {
      todo.update({tag: value})
    } else if(todo.tag !== undefined) {
      let there = todo.tag
      todo.update({tag: `${there}, ${value}`})
    }
  })
}

function filter(value) {
  db.Todo.findAll({where: {'tag': {$like: `%${value}%`}}})
  .then(todos => {
    todos.forEach(todo => {
      let mark = " ";
      if(todo.completed) mark = "V"
      console.log(`${todo.id}. [${mark}] ${todo.task} (${todo.tag})`)
    })
  })
  .catch(err => {console.log(err)})
}

module.exports = {
  add, list, update, deletes, find, completed, uncompleted, addTag, filter
}
// add({task: "coba", completed: false})
// list()
// update(1, {completed: false})