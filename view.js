
class View {
  constructor() {

  }

  displayTask(input,i){
    input.is_completed ? console.log(`${i}. [X] ${input.task}`) : console.log(`${i}. [ ] ${input.task}`);
  }

  displayAddSuccess(input){
    console.log(`${input.task} has been added`);
  }
  displayAddTags(input){
    console.log(`${input} has been added`);
  }

  displayDeleteSuccess(input){
    console.log(`${input} has been deleted`);
  }

  displayUpdateSuccess(input){
    console.log(`${input} has been updated`);
  }

  displayFiltered(tag,data,i){
    console.log(`${i}. ${data.task} [${tag}]`);
  }

  displayError(err){
    console.log(err);
  }

  displayHelp(){
    console.log('$ todo.js add <task>');
    console.log('$ todo.js list');
    console.log('$ todo.js delete <task_name>');
    console.log('$ todo.js complete <task_name>');
    console.log('$ todo.js list:outstanding');
    console.log('$ todo.js list:completed');
    console.log('$ todo.js tag <task_name> <task_tag_1> <task_tag_2> ...');
    console.log('$ todo.js filter <tag>');
  }

}

module.exports = View;
