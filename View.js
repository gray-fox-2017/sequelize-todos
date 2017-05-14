
 class View{
  constructor(){
    
  }
  
helpView(){
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
  console.log(`\nList all completed todos\nbabel-node todo.js list:completed`);
  console.log(`\nAdd Tag to your todo\nbabel-node todo.js tag <task_id> <tag_1>\nOR\nbabel-node todo.js tag <task_id> <tag_1> <tag_2>`);
  console.log(`\nList all todos by tag name\nbabel-node todo.js filter <tag_name>`);  
}
  
addView(task,id){
  this.clean()
  console.log(`${task} Added! Todo ID: ${id}`);
  }


deleteView(task){
  this.clean()
  console.log(`${task} Deleted!`);
  }
  
completeView(task){
  this.clean()
  console.log(`${task} Completed!`);
  }
  
uncompleteView(task){
  this.clean()
  console.log(`${task} Uncompleted!`);
  }    

listView(tasks){
  this.clean()
  tasks.forEach((task)=>{
    if(task.iscomplete === true){
    console.log(`${task.id}. [X] ${task.task}`);
    }
    else{
      console.log(`${task.id}. [ ] ${task.task}`);
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
  
  tagView(tag1,tag2,task){
    this.clean()
    if(!tag2){
      console.log(`'Tagging task '${task}' with tag: ${tag1}`);
    }
    else{
      console.log(`'Tagging task '${task}' with tags: ${tag1}, ${tag2}`);
    }
  }
  
  filterView(tasks,tag){
    this.clean()
    tasks.forEach(task=>{
      console.log(`${task.task} [${tag}]`);
    })
  
  }
  
  clean(){
    console.log("\x1B[2J");
  }
    
}

export default View
