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
  db.Todo.findAll({
    order: [['createdAt', 'ASC']]
  })
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

function completed(option) {
  if(option == undefined) {
    var ord = "ASC"
  } else {
    var ord = option.toUpperCase();
  }
  db.Todo.findAll({where: {completed: true},
      order: [['createdAt', `${ord}`]]
    }
  )
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

function uncompleted(option) {
  if(option == undefined) {
    var ord = "ASC"
  } else {
    var ord = option.toUpperCase();
  }
  db.Todo.findAll({where: {completed: false},
      order: [['createdAt', `${ord}`]]
    }
  )
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
    let count = 1;
    todos.forEach(todo => {
      let mark = " ";
      if(todo.completed) mark = "V"
      console.log(`${count}. [${mark}] ${todo.task} (${todo.tag})`)
      count++;
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