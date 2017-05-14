'use strict';

const db = require('./models')
//write your code here


class Model {
  constructor() {

  }


}
class View {
  constructor() {

  }
  help() {
    console.log("========================================");
    console.log("                    HELP                ");
    console.log("========================================");
    console.log("type :");
    console.log("      <add>       :         add new task");
    console.log("      <list>      :             see task");
    console.log("      <complete>  :     to complete task");
    console.log("      <uncomplete>:     to complete task");
    console.log("      <delete>    :     to complete task");
    console.log("      <update>    :  to update task name");

  }

  list() {
    db.tasks.findAll({
      order: [['createdAt', 'ASC']]
    })
    .then(tasks => {
      tasks.forEach(tasks => {
        if(tasks.complete === true) {
          console.log(`[v] ${tasks.id} ${tasks.name}`);
        } else {
          console.log(`[ ] ${tasks.id} ${tasks.name}`);
        }
      })
    })
    .catch(err => {console.log(err)})
  }

  add(name) {
    db.tasks.create({
      name : name,
      complete : false,
      createdAt : new Date(),
      updatedAt : new Date()
    })
    .then(tasks => {
      console.log('success');
    })
    .catch(err => {
      console.log("failed : "+err);
    })
  }

  update(id, name) {
    db.tasks.update({
      name : name
    },{
      where : {
        id : id
      }
    })
    .then((value) => {
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    })
  }


  mark(id, status) {
    let mark;
    if(status === true) {
      mark = "completed"
    } else {
      mark = "uncomplete"
    }

    console.log('\n');

    db.tasks.update({
      complete : status
    },{
      where : {
        id : id
      }
    })
    .then((value) => {
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    })
  }

  deletes(id) {
    db.tasks.destroy({
      where : {
        id : id
      }
    })
    .then(()=> {
      console.log("success");
    })
    .catch((err) => {
      console.log(err);
    })
  }
}


class Controller {
  constructor() {
    this.view = new View()
  }
  main(opt, value, value2) {
    //let value = argv[3]
    if(opt == "undefined" || opt == "help") {
      this.view.help()
    } else if (opt == "add") {
      this.view.add(value)
    } else if (opt == "list") {
      this.view.list()
    } else if (opt == "complete") {
      let status = true
      this.view.mark(value, status)
    } else if (opt == "uncomplete") {
      let status = false
      this.view.mark(value, status)
    } else if (opt == "deletes") {
      this.view.deletes(value)
    } else if (opt == "update") {
      this.view.update(value, value2)
    }
  }
}


let opt = process.argv[2];
let value = process.argv[3];
let value2 = process.argv[4];
let cont = new Controller();
cont.main(opt, value, value2);