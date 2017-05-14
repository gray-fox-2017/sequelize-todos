'use strict';

const db = require('./models');


class Controller {
  constructor() {
    this.view = new View();
  }

  inputArgv(option) {
    var content = cli[3];

    switch(option) {
      case "list":
        this.view.list();
        db.Todo.findAll()
          .then (todos => {
            todos.forEach(todo => {
              let checkList = " ";
              if(todo.completed) checkList = "X";
              console.log(`\n${todo.id}. [${checkList}] ${todo.task}`);
            });
          })
          .catch(err => console.log(err.message));
        break;
      case "delete":
        this.view.delete(content);
        db.Todo.destroy({where:{'id': content}})
          .then (() => {
            console.log(`\nDeleted task with id ${content} from your TODO list...`);
          })
          .catch (err => console.log(err.message));
        break;
      case "add":
        this.view.add(content);
        db.Todo.create({'task': content, 'completed': false})
          .then(() => {
            console.log(`\nTask is added to the list.`);
          })
          .catch (err => console.log(err.message));
        break;
      case "complete":
        db.Todo.find({where:{'id': content}})
          .then (todo => {
            todo.update({'completed': true})
              .then (() => {
                this.view.complete(todo.task);
              });
          })
          .catch (err => console.log(err.message));
        break;
      default:
        this.view.help();
    }
  }
}

class View {
  constructor() {
  }

  help() {
    console.log(`=== DOCUMENTATION ===\nlist -> Show all todo list.\nadd 'task' -> Add a task to the to do list.\ncomplete id -> Assign complete to a certain task.\ndelete id -> Delete a task`);
  }

  list() {
    console.log("\nYour to do lists:");
  }
  delete(id) {
    console.log(`\nTask ${id} is going to be deleted.`);
  }
  add(content) {
    console.log(`\nTask ${content} is going to be added.`);
  }
  complete(task) {
    console.log(`\n${task} has been completed.`);
  }

}

var cli = process.argv;
var controller = new Controller();

controller.inputArgv(cli[2]);
