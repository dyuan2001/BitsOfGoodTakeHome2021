import React from 'react'
import TagList  from './TagList';

export default class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            tags: [],
            dueDate: '',
            tagName: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.handleTagNameChange = this.handleTagNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleInputChange(event) {
        const target = event.target;

        this.setState({
            [target.name]: target.value
        });
    }

    handleTagChange(tagList) {
        this.setState({
            tags: tagList,
            tagName: ''
        })
    }

    handleTagNameChange(tagName) {
        this.setState({
            tagName: tagName
        })
    }
    
    handleSubmit(event) {
        const title = this.state.title;
        const tags = this.state.tags;
        const dueDate = this.state.dueDate;
        event.preventDefault();
        
        if (title === '') {
            alert('Please enter a title for the task.');
            return ;
        }
        if (dueDate === '') {
            alert('Please enter a due date for the task.');
            return ;
        }

        this.props.handleTodoCreation(title, tags, dueDate);
        this.setState({
            title: '',
            tags: [],
            dueDate: '',
            tagName: ''
        });
    }
    
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={this.state.title} onChange={this.handleInputChange}/>
                </label>
                <label>
                    <TagList handleTagChange={this.handleTagChange} handleTagNameChange={this.handleTagNameChange} tagList={this.state.tags} tagName={this.state.tagName} />
                </label>
                <label>
                    Due Date:
                    <input type="date" name="dueDate" value={this.state.dueDate} onChange={this.handleInputChange}/>
                </label>
                <button type="submit">Add task</button>
            </form>
        );
    }
}
