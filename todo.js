'use strict';

var db = require('./models');
var functions = require('./function.js');

class Controller {
  constructor() {
    this.view = new View();
  }

  inputProcessor(option) {
    let value = cli[3];
    let tagValue = cli[4];
    switch(option) {
      case "help":
        this.view.help();
        break;
      case "list":
        this.view.list()
        functions.list()
        break;
      case "task":
        this.view.task(value)
        functions.find(value);
        break;
      case "add":
        let status = false;
        let detail = value;
        let idn = cli[4] || null;
        this.view.added(value)
        functions.add({'id': idn, 'task': detail, 'completed': false})
        break;
      case "delete":
        this.view.deletes(value)
        functions.deletes(value)
        break;
      case "complete":
        this.view.completed(value)
        functions.update(value, {completed: true})
        break;
      case "uncomplete":
        this.view.uncompleted(value)
        functions.update(value, {completed: false})
        break;
      case "list:completed":
        this.view.sortedComplete(value)
        functions.completed(value);
        break;
      case "list:outstanding":
        this.view.sortedOutstanding(value);
        functions.uncompleted(value);
        break;
      case "tag":
        this.view.addedTag(value, tagValue)
        functions.addTag(value, tagValue);
        break;
      case "filter":
        this.view.filtered(value)
        functions.filter(value);
        break;
      }
  }
}

class View {
  constructor() {
  }

  help() {
    console.log("=====================HELP MENU=====================")
    console.log("Use <list> to view your current list")
    console.log("Use <add> to add a task to your list")
    console.log("Use <task> with a specific task id to view the task")
    console.log("Use <delete> with a specific task id to delete the task")
    console.log("Use <complete> with a specific task id to mark it done")
    console.log("Use <uncomplete> with a specific task id to mark it undone")
    console.log("Use <list:completed asc|desc(default)> to show your completed tasks")
    console.log("Use <list:outstanding asc|desc(default)> to show your incomplete tasks based on its creation time")
    console.log("Use <tag> with a specific task id and tag name to tag your task")
    console.log("Use <filter> with a specific tag name to filter your task")
  }

  list() {
    console.log("Your to do lists:")
  }
  task(option) {
    if(option !== undefined) {
      console.log(`Task number ${option} is:`)
    }
  }
  //
  added(option) {
    if(option !== undefined) {
      console.log(`Added "${option}" to your TODO list...`)
    }
  }
  //
  deleted(option) {
    if(option !== undefined && option < this.tasks.length) {
      console.log(this.tasks)
      console.log(`Deleted task ${option} from your TODO list...`)
    } else if(option >= this.tasks.length) {
      console.log(`Task number ${option} is not yet created`)
    } else {
      console.log("Specify your deleted task! (delete 'task ID')");
    }
  }

  completed(option) {
    if(option !== undefined) {
      console.log(`Task ${option} has been marked completed from your TODO list...`);
    } else console.log("Specify your completed task! (complete 'task ID')")
  }

  uncompleted(option) {
    if(option !== undefined) {
      console.log(`Task ${option} has been marked uncomplete from your TODO list...`);
    } else console.log("Specify your uncompleted task! (complete 'task ID')")
  }

  sortedComplete(option) {
    console.log(`Your completed tasks are...`)
  }
  //
  sortedOutstanding(option) {
    console.log(`Your incomplete tasks are...`)
  }
  //
  addedTag(option, tag) {
    if(option !== undefined) {
      console.log(`"${tag}" tag has been added to task number ${option}`);
    } else console.log("Specify your tagged task! (tag 'task ID' 'tag name')")
  }

  filtered(option) {
    console.log(`Your lists based on "${option}" tag(s)`)
  }
}

let cli = process.argv;
let ctrl = new Controller();

ctrl.inputProcessor(cli[2])
// add({task: "coba", completed: false})
// list()
// update(1, {completed: false})