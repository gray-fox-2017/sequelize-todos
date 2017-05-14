import View from './View.js'
import Model from './Model.js'

class Controller{
  constructor(input){
    this.input = input
    this.model = new Model()
    this.view = new View()
  }
  
  run(){
    switch (this.input[2]) {
      case 'help': this.view.helpView();break 
      
      case 'add': this.model.add(this.input.slice(3,this.input.length).join(' '),(task,id)=>{
        this.view.addView(task,id);
      });break
      
      case 'delete': this.model.deleteTask(this.input[3],(taskID=>{
        this.view.deleteView(taskID)
      }));break
      
      case 'complete': this.model.completeTask(this.input[3],(taskID=>{
        this.view.completeView(taskID)
      }));break
      
      case 'uncomplete': this.model.uncompleteTask(this.input[3],(taskID=>{
        this.view.uncompleteView(taskID)
      }));break
       
      case 'list': this.model.listTasks(tasks=>{
        this.view.listView(tasks)
      });break
      
      case 'task': this.model.task(this.input[3],(task=>{
        this.view.taskView(task)
      }));break
      
      case 'list:outstanding': this.model.listOutstanding(tasks=>{
        this.view.listView(tasks)
      });break
      
      case 'list:completed': this.model.listCompleted(tasks=>{
        this.view.listView(tasks)
      });break 
      
      case 'tag': this.model.tagTask(this.input[3],this.input[4],this.input[5],(tag1,tag2)=>{
        this.view.tagView(tag1,tag2,this.input[3])
      });break
      
      case 'filter': this.model.filterTag(this.input[3],(tasks=>{
        this.view.filterView(tasks,this.input[3])
      }));break
      
      default: this.view.helpView();break
    }
  }
}

export default Controller