'use strict'

import Model from './model.js'
import View from './view.js'

class Controller {
  constructor(input){
    this.model = new Model
    this.view = new View
    this.input = input
  }

  start() {
    switch (this.input[2]) {
      case 'help' : this.view.help();break

      case 'add' : this.model.add(this.input.slice(3, this.input.length).join(' '), (task, id)=> {
          this.view.add(task, id)
      }); break

      case 'list' : this.model.list((task)=> {
        this.view.list(task)
      }); break

      case 'delete' : this.model.delete(this.input[3], (task)=>{
        this.view.delete(task)
      }); break

      case 'list:outstanding' : this.model.listOutstanding((task)=> {
        this.view.list(task)
      }); break

      case 'list:completed' : this.model.listComplete((task)=> {
        this.view.list(task)
      })

      case 'task' : this.model.task((data)=> {
        this.view.task(data)
      }); break

      case 'complete' : this.model.complete(this.input[3], (data)=> {
        this.view.complete(data)
      }); break

      case 'uncomplete' : this.model.uncomplete(this.input[3], (data=> {
        this.view.uncomplete(data)
      })); break

      case 'tag' : this.model.tagingTask(this.input[3], this.input[5], this.input[6], (tag1, tag2, task)=> {
        this.view.tag(tag1, tag2, task)
      }); break

      case 'filter' : this.model.filter(this.input[3], (task, tag)=> {
        this.view.filter(task, tag)
      })
      default: this.view.help()

    }
  }
}

export default Controller
