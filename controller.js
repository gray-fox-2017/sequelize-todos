const Model = require('./model');
const View = require('./view');

class Controller {
  constructor() {
    this.model = new Model();
    this.view = new View();

  }

  init() {
    var operasi = process.argv[2];
    var input = process.argv[3];
    var arr=[]
    var tag=''
    for(let i=0; i<process.argv.length;i++){
      if(i>3){
          arr.push(process.argv[i])
      }
    }

    tag=arr.join(' ')

    switch (operasi) {
      case 'add':
        this.insertTask(input)
        break;

      case 'list':
        this.getAllData();
        break;

      case 'list:outstanding': this.getAllDataOustanding();
        break;

      case 'list:completed': this.getAllDataCompleted();
        break;

      case 'delete': this.deleteTask(input)
        break;

      case 'complete': this.complete(input);
        break;

      case 'tag': this.insertTag(input,tag);
        break;

      case 'filter': this.getAllFiltered(input)

      case 'help': this.view.displayHelp()
        break;

      default: this.view.displayHelp()

    }
  }

  insertTask(task) {
    this.model.createData(task,(err,data) => {
      err ? this.view.displayError(err):this.view.displayAddSuccess(data);
    });
  }

  getAllData() {
    this.model.showData(tasks => {
      tasks.forEach((task,i) => {
        this.view.displayTask(task,i+1);
      })
    })
  }

  getAllDataOustanding() {
    this.model.showDataOutstanding(tasks => {
      tasks.forEach((task,i) => {
        this.view.displayTask(task,i+1);
      })
    })
  }

  getAllDataCompleted() {
    this.model.showDataCompleted(tasks => {
      tasks.forEach((task,i) => {
        this.view.displayTask(task,i+1);
      })
    })
  }

  deleteTask(task) {
    this.model.deleteData(task,(err,data) => {
      err ? this.view.displayError(err): this.view.displayDeleteSuccess(task)
    })
  }

  complete(task) {
    this.model.updateData(task,(err,data) => {
      err? this.view.displayError(err):this.view.displayUpdateSuccess(task)
    })
  }

  insertTag(task,tag) {
    this.model.createTag(task,tag,(err,data) => {
      err ? this.view.displayError(err):this.view.displayAddTags(tag);
    });
  }

  getAllFiltered(tag){

    this.model.showTags(tag,tasks => {
      tasks.forEach((task,i)=>{
          this.view.displayFiltered(tag,task,i+1)
      });
    });

  }

}



module.exports = Controller;
