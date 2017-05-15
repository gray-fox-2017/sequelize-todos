'use strict'


class View{
  constructor(){

  }

  helpView(){
    console.log(`+++++++++++++ Rules Todo Command ++++++++++++`);
    console.log(`babel-node todo.js help\n`);
    console.log(`babel-node todo.js list\n`);
    console.log(`babel-node todo.js list:outstanding\n`);
    console.log(`babel-node todo.js list:completed\n`);
    console.log(`babel-node todo.js add <task>\n`);
    console.log(`babel-node todo.js delete <task_id>\n`);
    console.log(`babel-node todo.js task <task_id>\n`);
    console.log(`babel-node todo.js complete <task_id>\n`);
    console.log(`babel-node todo.js uncomplete <task_id>\n`);
    console.log(`babel-node todo.js list:completed\n`);
    console.log(`babel-node todo.js tag <task_id> <task_1> || babel-node todo.js tag <task_id> <task_1> <task_2>\n`);
    console.log(`babel-node todo.js filter <tag_name>\n`);
  }

  addView(task, id){
    console.log(`${task} Added! Todo ID: ${id}`);
  }

  deleteView(task){
    console.log(`${task} deleted`);
  }

  completeView(task){
    console.log(`${task} completed`);
  }

  uncompleteView(task){
    console.log(`${task} uncompleted`);
  }

  listView(tasks){
    tasks.forEach((task)=>{
      if(task.iscomplete === true){
        console.log(`${task.id}, [x] ${task.task}`);
      } else {
        console.log(`${task.id}, [ ] ${task.task}`);
      }
    })
  }

  taskView(task){
    // console.log(task);
    if(task.iscomplete === true){
      console.log(`ID '${task.id}' with task: ${task.task} Completed Tag: ${task.tag}`);
    }
    else {
      console.log(`ID '${task.id}' with task: ${task.task} Uncompleted Tag: ${task.tag}`);
    }
  }

  tagView(tag1, tag2, task){
    if(!tag2){
      console.log(`task '${task}' with tag: ${tag1} tagged`);
    }
    else {
      console.log(`task '${task}' with tag: ${tag1}, ${tag2} tagged`);
    }
  }

  filterView(tasks, tag){
    tasks.forEach(task=>{
      console.log(`${task.task} <${tag}>`);
    })
  }

}


export default View
