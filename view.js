'use strict'

class View {
  constructor(){

  }

  clean() {
     console.log("\x1B[2J");
  }

  help(){
    this.clean()
    console.log(`=========== Sequelize Todo Command List ===========`);
    console.log(`\nHelp command\nbabel-node todo.js help`);
    console.log(`\nTodo List\nbabel-node todo.js list`);
    console.log(`\nList all uncomplete todos\nbabel-node todo.js list:outstanding`);
    console.log(`\nList all completed todos\nbabel-node todo.js list:completed`);
    console.log(`\nCreate new todo task\nbabel-node todo.js add <task>`);
    console.log(`\nDelete your todo task\nbabel-node todo.js delete <task_id>`);
    console.log(`\nSee your todo Details\nbabel-node todo.js task <task_id>`);
    console.log(`\nMark COMPLETE your todo\nbabel-node todo.js complete <task_id>`);
    console.log(`\nMark UNCOMPLETE your todo\nbabel-node todo.js uncomplete <task_id>`);
  //  console.log(`\nList all completed todos\nbabel-node todo.js list:completed`);
    console.log(`\nAdd Tag to your todo\nbabel-node todo.js tag <task_id> <tag_1>\nOR\nbabel-node todo.js tag <task_id> <tag_1> <tag_2>`);
    console.log(`\nList all todos by tag name\nbabel-node todo.js filter <tag_name>`);
  }

  list(task){
    this.clean()
    task.forEach((data)=> {
      if(data.status === true){
        console.log(`${data.id}. [X] ${data.task}`);
      } else {
        console.log(`${data.id}. [ ] ${data.task}`);
      }
    })
  }

  add(task, id){
    this.clean()
    console.log(`${task} Added into Todo where ID : ${id}`)
  }

  delete(task){
    this.clean()
    console.log(`${task} deleted`);
  }

  complete(task){
    this.clean()
    console.log(`${task} is completed`);
  }

  uncompleted(task){
    this.clean()
    console.log(`${task} is uncomplete`);
  }

  task(task){
    this.clean()
    //tasks.forEach((task)=> {
      if(task.status === true){
        console.log(`ID : ${task.id} | task : ${task.task} | status : is completed! | Tag : ${task.tag}`);
      } else {
        console.log(`ID : ${task.id} | task : ${task.task} | status : is completed! | Tag : ${task.tag}`);
      }
    //})
  }

  tag(tag1, tag2, task){
    this.clean()
    if(!tag2){
      console.log(`Tagging task : ${task.task} with tag : ${tag1}`);
    } else {
      console.log(`Tagging task : ${task.task} wth tag : ${tag1}, ${tag2}`);
    }
  }

  filter(task, tag){
    this.clean()
    task.forEach((data)=> {
      console.log(`${data.task} [${data.tag}]`);
    })
  }

}

export default View
