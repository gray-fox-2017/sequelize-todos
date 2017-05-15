const fs = require('fs');
const rgx_outstanding = /outstanding/;
const rgx_completed = /completed/;
const rgx_uncomplete = /uncomplete/;
const rgx_digit = /\d+/gi;
const rgx_asc = /asc/i;
const rgx_desc = /desc/i;
const db = require('./models');
class Model {
  constructor(filename) {
    // this._filename = filename;
    // this.readFile();
  }
  // readFile() {
  //   this._tasks = JSON.parse(fs.readFileSync(this._filename,'utf8').toString());
  // }
  //
  // writeFile() {
  //   fs.writeFileSync(this._filename,JSON.stringify(this._tasks));
  // }
  // cekIdExist(id=-1,callback) {
  //   db.Todo
  //   .find({where: {'id':id}})
  //   .then( (todo) =>
  //     {console.log(todo.id);callback();}
  //   )
  //   .catch((err)=>{ callback();});
  // }
  // generateID() {
  //   let len = this._tasks.length;
  //   return (len !== 0? (parseInt(this._tasks[len-1].id)+1).toString() : '1');
  // }
  updateTask(id,status = '',task = {},printl) {
    if (status === ''){
      db.Todo.create(task).then(
        () => { return task.task}
      )
      .catch((err)=>console.log(err));
    } else {
      db.Todo
      .find({where: {'id':id}})
      .then( (todo) =>
        {
          todo.update({status:status, completedDate: (status === 0 ? null : new Date()) });
          if (printl) console.log(printl.replace('_',todo.task));
          // return todo.task;
        }
      )
      .catch((err)=>{
        if (printl) console.log('Invalid ID');
      });
    }

      // if (status === '') this._tasks[idx] = task;
      // else {
      //   this._tasks[idx].status = status;
      //   this._tasks[idx].completed_date = (status === 0 ? '' : new Date());
      // }
      // this.writeFile();
      // return this._tasks[idx].task;

  }

  addTags(id,tag) {

      db.Todo.find({where: {'id':id}})
      .then(todo => {
        let tags = (todo.tag+','+tag.join(',')).split(',');
        tags = tags.filter( (v,i,a) => a.indexOf(v) === i);
        todo.update({tag:tags.join(',')})
        .then(()=>{
          console.log(`[SUCCESS][TAG] Set ${tags.join(',')} tag to ${todo.task}`);
        })

      })
      .catch((err)=> {
        console.log('[FAILED][TAG] Invalid ID')
      })
      // tags.forEach((x)=> this._tasks[idx].tag.push(x));
      // this._tasks[idx].tag = this._tasks[idx].tag.filter((v,i,a)=>a.indexOf(v) === i);
      // this.writeFile();
      // return this._tasks[idx].task;
  }

  filterTags(tag,callback) {

    let filtered;
    db.Todo.findAll()
    .then((todos)=>{
      filtered = todos.filter((todo)=>{
        let tags = todo.tag.split(',');
        if (tags.findIndex((y)=> y === tag) !== -1) return todo;
      });

      callback(filtered);
    })
    .catch((err)=> {
      console.log(err);
      callback([]);
    });
    // let filtered;
    // filtered = this._tasks.filter((x)=>{
    //   if (x.tag.findIndex((y)=> y === tag) !== -1) return x;
    // });
    // return filtered;
  }

  addTask(task) {
    task["created_date"] = new Date();
    task["completedDate"] = null;
    task["tag"] = '';
    task["status"] = 0;

    db.Todo.create(task)
    .then(todo=> {})
    .catch((err)=>console.log(err));
      // tags.forEach((x)=> this._tasks[idx].tag.push(x));
      // this._tasks[idx].tag = this._tasks[idx].tag.filter((v,i,a)=>a.indexOf(v) === i);
      // this.writeFile();
      // return this._tasks[idx].task;


    // task["id"] = this.generateID();
    // this._tasks.push(task);
    // this.writeFile();
    return task.task;
  }

  viewTask(id,callback) {
    // let idx = this.cekIdExist(id);
    // if (idx !== -1) {
      // return false;
    // } else {
      db.Todo.find({where:{'id':id}})
      .then((todo)=> {callback(todo)});
    // }
    // return (idx !== -1 ? this._tasks[idx] : false);
  }

  removeTask(id) {
    db.Todo.destroy({where:{'id':id}})
    .then(()=>{return true;})
    .catch((err)=>{ return false;});

    // if( idx !== -1) {
    //   task = this._tasks[idx].task;
    //   this._tasks.splice(idx,1);
    //   this.writeFile();
    //   return task;
    // }
    // return false;
  }

  filterTask(criteria,sort,callback) {

    // let filtered;
    console.log(`${criteria} ${sort} sort`);
    switch (criteria) {
      case 'outstanding' :
        if (sort === 'asc' ||sort ==='desc')
         db.Todo.findAll({where: {status: 0},order: [['createdAt', `${sort}`]]})
         .then((todos)=> {callback(todos)});
        else db.Todo.findAll({where: {status: 0}}).then((todos)=> {callback(todos)});
        // filtered = db.Todo.findAll({where: {status: 0}});//this._tasks.filter((x)=> x.status === 0);
        //if (sort === 'asc') filtered.sort((a,b) => a.created_date > b.created_date);
        // else if (sort === 'desc') filtered =filtered.sort((a,b) => a.created_date < b.created_date);
      break;
      case 'completed' :
        if (sort === 'asc' ||sort ==='desc') db.Todo.findAll({where: {status: 1},order: [['completedDate', `${sort}`]]}).then((todos)=> {callback(todos)});
        else filtered = db.Todo.findAll({where: {status: 1}}).then((todos)=> {callback(todos)});
        // filtered = this._tasks.filter((x)=> x.status === 1);
        // if (sort === 'asc') filtered = filtered.sort((a,b) => a.completed_date > b.completed_date);
        // else if (sort === 'desc') filtered = filtered.sort((a,b) => a.completed_date < b.completed_date);
      break;
      default :
        console.log('deff');
        db.Todo.findAll()
        .then((todos)=> {callback(todos)})
        .catch((err)=>{console.log(err)});
      break;
    }

    // console.log(filtered);
    // return filtered;
  }
}

class Controller {
  constructor(filename) {
    this._model = new Model(filename);
    this._view = new View();
    this.doCommand();
  }

  filterTags(tag) {
    this._model.filterTags(tag,this._view.printTask);
  }

  showHelp() {
    this._view.showHelp();
  }

  showCertainTask(id) {
    this._model.viewTask(id,this._view.printSingleTask);
  }


  showList(tipe = 'all',sort = 'not') {
    this._model.filterTask(tipe,sort,this._view.printTask);
    // console.log(tasks);
    // this._view.printTask(tasks,this._view.printTask);
  }

  printRespond(msg) {
    this._view.printRespond(msg);
  }

  cls() {
    console.log("\x1B[2J")
  }

  doCommand() {
    this.cls();
    let commands = process.argv.filter((x) => x.startsWith('/') === false);
    let clen = commands.length;
    let command0;
    let msg = '';
    let res = false;

    if (clen > 0) {
      let command0 = commands[0].toLowerCase().trim();
      if (command0 === 'help') {
        this.showHelp();
      } else if (command0.startsWith('list')) {
        let tipe = 'all';
        let sort = 'not';
        if (rgx_outstanding.test(command0)) tipe = 'outstanding';
        else if (rgx_completed.test(command0)) tipe = 'completed';
        if (rgx_asc.test(commands.join(' '))) sort = 'asc';
        else if (rgx_desc.test(commands.join(' '))) sort = 'desc';
        this.showList(tipe,sort);
      } else if (command0.startsWith('add')) {
        let taskname = commands.filter((v,i,a)=> i > 0 ).join(' ');
        msg = `[SUCCESS][ADD] Added `+this._model.addTask({task:taskname})+` to your tasks`;
      }  else if (command0.startsWith('filter')) {
        if(commands.length > 1) {
          let tag = commands[1];
          this.filterTags(tag);
        } else msg = '[FAILED][FILTER] Invalid Tag';

      } else if (command0.startsWith('task')) {
          let id = commands.join('').match(/\d+/gi);
          if (id !== null) {
            // res = this._model.viewTask(id);
            // if (res === false) msg  = '[FAILED][DETAIL] Invalid ID';
            // else
            this.showCertainTask(id);
          } else msg  = '[FAILED][DETAIL] Invalid ID';
          if (msg !== false) this.printRespond(msg);
      } else {
        let id = commands.join('').match(/\d+/gi);
        if (command0.startsWith('delete')) {
          if (id !== null) res = this._model.removeTask(id);
          msg = (res === false ? '[FAILED][DELETE] Invalid ID' : `[SUCCESS][DELETE] Delete ${res} from your list`);
        } else if (command0.startsWith('complete')) {
          if (id !== null) this._model.updateTask(id,1,{},`[SUCCESS][UNCOMPLETE] Set _ as complete task`);
        } else if (command0.startsWith('uncomplete')) {
          if (id !== null) this._model.updateTask(id,0,{},`[SUCCESS][UNCOMPLETE] Set _ as uncomplete task`);
        } else if (command0.startsWith('tag') ) {
          if (id !== null) {
              let tagss = commands.filter((v,i,a)=> i > 1);
              if (tagss.length === 0) msg = '[FAILED][TAG] Invalid Tags';
              else {
                this._model.addTags(id,tagss);

              }
            }
          else msg = '[FAILED][TAG] Invalid ID';
        }

        if (res !== false && res!== undefined) this.showList();
        if (msg !== '') this.printRespond(msg);
      }

    }
  }
}

class View {
  constructor() {}

  showHelp() {
    console.log('Menu');
    console.log('=====================================');
    console.log('help');
    console.log('list');
    console.log('list:outstanding asc|desc');
    console.log('list:completed asc|desc');
    console.log('add');
    console.log('task task_id');
    console.log('delete task_id');
    console.log('complete task_id');
    console.log('uncomplete task_id');
    console.log('filter tag_name');
    console.log('tag task_id tag_name1 .. tag_namen');
  }

  printTask(tasks) {
    let i = 0;
    let status = '';
    // console.log('List Tasks');
    // console.log(tasks);
    if(tasks.length === 0 ) console.log('NO TASK FOUND');
    tasks.forEach((x)=>{
      status = (x.status === 1 ? 'X' : ' ');
      let tag = (x.tag.length >0? `[${x.tag}]`:'' );
      console.log(`${x.id} [${status}] ${x.task} ${tag}`);
    });
  }

  printSingleTask(task) {
    if (task!== undefined && task!== null ){
      let status = task.status === 1 ? 'X' : ' ';
        let tag = (task.tag.length >0? `[${task.tag}]`:'' );
        console.log(`${task.id} [${status}] ${task.task} ${tag}`);

    } else { console.log('INVALID ID')}

  }

  printRespond(msg) {
    console.log(msg);
  }
}

const start = new Controller('data.json');