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
        functions.list()
        break;
      case "task":
        functions.find(value);
        break;
      case "add":
        let status = false;
        let detail = value;
        let idn = cli[4];
        functions.add({'id': idn, 'task': detail, 'completed': false})
        this.view.added(value)
        break;
      case "delete":
        functions.deletes(value)
        this.view.deletes(value)
        break;
      case "complete":
        functions.update(value, {completed: true})
        break;
      case "uncomplete":
        functions.update(value, {completed: false})
        break;
      case "list:completed":
        functions.completed();
        break;
      case "list:outstanding":
        functions.uncompleted();
        break;
      case "tag":
        functions.addTag(value, tagValue);
        break;
      case "filter":
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

  // list() {
  //   console.log("Your to do lists:")
  //   for(let i = 0; i < this.tasks.length; i++) {
  //     console.log(`${i+1}. [${this.tasks[i].completed}] ${this.tasks[i].task}`)
  //   }
  // }
  //
  // task(option) {
  //   if(option !== undefined) {
  //     console.log(`Task number ${option} is:`)
  //     console.log(`[${this.tasks[option-1].completed}] ${this.tasks[option-1].task}`)
  //   }
  // }
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
      console.log(`Deleted "${this.tasks[option-1].task}" from your TODO list...`)
    } else if(option >= this.tasks.length) {
      console.log(`Task no ${option} is not yet created`)
    } else {

      console.log("Specify your deleted task! (delete 'task ID')");
    }
  }
  //
  // completed(option) {
  //   if(option !== undefined) {
  //     console.log(`"${this.tasks[option-1].task}" has been marked completed from your TODO list...`);
  //   } else console.log("Specify your completed task! (complete 'task ID')")
  // }
  //
  // uncompleted(option) {
  //   if(option !== undefined) {
  //     console.log(`"${this.tasks[option-1].task}" has been marked uncomplete from your TODO list...`);
  //   } else console.log("Specify your uncompleted task! (complete 'task ID')")
  // }
  //
  // sortedComplete(option) {
  //   console.log(`Your completed tasks are...`)
  //   let arrCompleted = this.model.sortedComplete(option);
  //   for(let i = 0; i < arrCompleted.length; i++) {
  //     console.log(`${i+1}. [${arrCompleted[i].completed}] ${arrCompleted[i].task}`)
  //   }
  // }
  //
  // sortedOutstanding(option) {
  //   let arrUncomplete = this.model.sortedOutstanding(option);
  //   console.log(`Your incomplete tasks are...`)
  //   for(let i = 0; i < arrUncomplete.length; i++) {
  //     console.log(`${i+1}. [${arrUncomplete[i].completed}] ${arrUncomplete[i].task}`)
  //   }
  // }
  //
  // addedTag(option, array) {
  //   if(option !== undefined) {
  //     console.log(`"${array}" tag has been added to "${this.tasks[option-1].task}"`);
  //   } else console.log("Specify your tagged task! (tag 'task ID' 'tag name')")
  // }
  //
  // filtered(option) {
  //   console.log(`Your lists based on "${option}" tag(s)`)
  //   let arrFiltered = this.model.filtered(option);
  //   for(let i = 0; i < arrFiltered.length; i++) {
  //     console.log(`${i+1}. [${arrFiltered[i].completed}] ${arrFiltered[i].task} [${arrFiltered[i].tag}]`)
  //   }
  // }
}

let cli = process.argv;
let ctrl = new Controller();

ctrl.inputProcessor(cli[2])
// add({task: "coba", completed: false})
// list()
// update(1, {completed: false})