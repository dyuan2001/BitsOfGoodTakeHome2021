import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import TodoForm from './TodoForm.js';
import TodoItem from './TodoItem.js';
/**
 * Thank you for applying to Bits of Good. You are free to add/delete/modify any 
 * parts of this project. That includes changing the types.ts, creating css files, 
 * modifying import statements, using contexts, etc. We do recommend to keep it simple. 
 * You will not be judged based on complexity. We also recommend using 
 * multiple components instead of coding everything on this file :)
 * 
 * Have fun! Please reach out to hello@bitsofgood.org or wkim330@gatech.edu if you
 * have any questions!
 * 
 * Bits of Good Engineering Team
 * 
 */
// TODO: Start coding from here

// let testItems = [
//   {
//     title: "hi",
//     tags: ['hello'],
//     dueDate: '2021-09-14',
//     completed: false,
//     created: 1630405236673
//   },
//   {
//     title: "monkey",
//     tags: ['zoo', 'ape'],
//     dueDate: '2021-04-13',
//     completed: false,
//     created: 1630405442673
//   },
//   {
//     title: "amogus",
//     tags: ['sopace', 'manm', 'sus'],
//     dueDate: '1999-02-13',
//     completed: false,
//     created: 1630205442673
//   }
// ]

// Here's a baseline todo item type. 
// Feel free to extend or create your own interface!
// export type TodoItem = {
//   title: string,
//   dueDate: Date,
//   tagList: string[],
//   completed: boolean,
// }

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      sortDate: false,
      sortDateBg: 'light',
      sortCompleted: false,
      sortCompletedBg: 'light'
    }

    this.handleTodoCreation = this.handleTodoCreation.bind(this);
    this.sortByDate = this.sortByDate.bind(this);
    this.sortByBoth = this.sortByBoth.bind(this);
    this.sortByCompleted = this.sortByCompleted.bind(this);
    this.sortByCreated = this.sortByCreated.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
    this.toggleSortByDate = this.toggleSortByDate.bind(this);
    this.toggleSortByCompleted = this.toggleSortByCompleted.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleTodoCreation(title, tags, dueDate) {
    let newItems = this.state.items.concat({
      title: title,
      tags: tags,
      dueDate: dueDate,
      completed: false,
      created: Date.now()
    });

    if (this.state.sortDate && this.state.sortCompleted) {
      this.sortByBoth();
    } else if (this.state.sortDate) {
      this.sortByDate();
    } else if (this.state.sortCompleted) {
      this.sortByCompleted();
    } else {
      this.setState({
        items: newItems
      });
    }
  }

  handleSort() {
    if (this.state.sortDate && this.state.sortCompleted) {
      this.sortByBoth();
    } else if (this.state.sortDate) {
      this.sortByDate();
    } else if (this.state.sortCompleted) {
      this.sortByCompleted();
    } else {
      this.sortByCreated();
    }
  }

  toggleSortByDate() {
    let bg;
    if (this.state.sortDate) {
      bg = 'light';
    } else {
      bg = 'secondary';
    }

    this.setState({
      sortDate: !this.state.sortDate,
      sortDateBg: bg
    })

    this.handleSort();
  }

  toggleSortByCompleted() {
    let bg;
    if (this.state.sortCompleted) {
      bg = 'light';
    } else {
      bg = 'secondary';
    }

    this.setState({
      sortCompleted: !this.state.sortCompleted,
      sortCompletedBg: bg
    })

    this.handleSort();
  }

  sortByDate() {
    let sortedItems = this.state.items.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    this.setState({
      items: sortedItems
    });
  }

  sortByCompleted() {
    let sortedItems = this.state.items.sort((a, b) => {
      if ((a.completed && b.completed) || (!a.completed && !b.completed)) { // equal
        return 0;
      } else if (!a.completed && b.completed) { // a is not completed
        return -1;
      } else if (a.completed && !b.completed) { // a is completed
        return 1;
      }
    })
    this.setState({
      items: sortedItems
    })
  }

  sortByBoth() {
    let incomplete = [];
    let complete = [];

    for (let i = 0; i < this.state.items.length; i++) {
      if (this.state.items[i].completed) {
        complete.push(this.state.items[i]);
      } else {
        incomplete.push(this.state.items[i]);
      }
    }

    let sortedIncomplete = incomplete.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    let sortedComplete = complete.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

    let sortedItems = sortedIncomplete.concat(sortedComplete);

    this.setState({
      items: sortedItems
    })
  }

  sortByCreated() {
    let sortedItems = this.state.items.sort((a, b) => b.created - a.created);
    this.setState({
      items: sortedItems
    });
  }

  toggleCompleted(title) {
    let newItems = this.state.items;

    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i].title === title) {
        newItems[i].completed = !newItems[i].completed;
      }
    }

    this.setState({
      items: newItems
    })
  }

  render() {
    return (
      <div>
        <h3>Todo List!</h3>
        <TodoForm handleTodoCreation={this.handleTodoCreation} />
        <Card>
          <Button variant={this.state.sortDateBg} onClick={this.toggleSortByDate}>Sort By Date</Button>
          <Button variant={this.state.sortCompletedBg} onClick={this.toggleSortByCompleted} >Sort By Completed</Button>
        </Card>
        {this.state.items.map((item) => (
          <TodoItem toggleCompleted={this.toggleCompleted} title={item.title} tags={item.tags} due={item.dueDate} completed={item.completed} />
        ))}
      </div>
    )
  }
}