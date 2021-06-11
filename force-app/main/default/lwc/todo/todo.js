import { LightningElement ,wire ,track} from 'lwc';
//import getTasks from '@salesforce/apex/ToDoListController.getTasks';
import getAccList from '@salesforce/apex/accountList.getAccList';
export default class Todo extends LightningElement {


    // * Array to store all the todo tasks
    @track
    todoTasks = [];

    // * Variable tlo store the new task that you want to add to the list
    newTask = '';

    /*
    *   This method is used to update new task variable
    *   with the value specified in the input field
    */
    updateNewTask(event) {
        this.newTask = event.target.value;
    }

    /*
    *   This method is used to add the value of new task variable
    *   to the list of todo tasks. It'll also clear the input field
    *   by clearing the value of newTask variable after it has been added to list
    */
    addTaskToList(event) {

        /*
        *   Unshift function - used to add element at the beginning of the array
        *   Uncomment this to use the unshift function and comment the below push function
        */
        /*
        this.todoTasks.unshift({
            id: this.todoTasks.length + 1,
            name: this.newTask
        });
        */

        // * Push function - used to add element at the end of the array
        /*
        this.todoTasks.push({
            id: this.todoTasks.length + 1,
            name: this.newTask
        });
        */
        // * This code is used with apex wire linked with todoTasks property
       //c/inputProgressBar for(let i=0; i<this.todoTasks.data.length; i++) {
           // console.log(todoTasks[i])
           // }


       this.todoTasks.data.push({
           Id: this.todoTasks.data.length + 1,
          Name: this.newTask
       });
        // * Updation above is not allowed
        //this.newTask = '';
    }

    /*
    *   This method is used to delete the task from todo list
    *   based on the task id
    */
    deleteTaskFromList(event) {

        let idToDelete = event.target.name;
        let todoTasks = this.todoTasks;
        let todoTaskIndex;

        /*
        *   Method 1 - Finding the index of the task to be deleted
        *   and deleting it using the below command
        */
        for(let i=0; i<todoTasks.length; i++) {
            if(idToDelete === todoTasks[i].id) {
                todoTaskIndex = i;
            }
        }

        // * Comment the below line if you're using one of the two approaches given below
        todoTasks.splice(todoTaskIndex, 1);

        /*
        *   Un-Comment any one of the two below methods
        *   which are used to directly splice or delete
        *   the element from the array based on the index.
        *   We're finding the index by using the findIndex()
        *   function available in JavaScript
        */

        // * Method 2
        /*
        todoTasks.splice(
            todoTasks.findIndex(function(todoTask) {
                return todoTask.id === idToDelete;
            })
            , 1
        );
        */

        // * Method 3
        // todoTasks.splice(todoTasks.findIndex(todoTask => todoTask.id === idToDelete), 1);
    }

    /*
    *   Use case:- If you want to display the data in lwc component
    *   and there is no need to update that data in js, bind your property with
    *   wire service in lwc.
    */
    @wire(getAccList)
    todoTasks; // * This is immutable and cannot be changed

    /*
    *
        todoTasks = {
            data: [list of tasks],
            error: 'consist of error message'
        };
    *
    */

    
}