import React from 'react'
import TagItem from './TagItem';

export default class TagList extends React.Component {
    constructor(props) {
        super(props);

        this.handleAdd = this.handleAdd.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }
    
    handleChange(event) {
        this.props.handleTagNameChange(event.target.value);
    }
    
    handleAdd() {
        let newList = this.props.tagList.concat(this.props.tagName);
        this.props.handleTagNameChange(this.props.tagName);
        this.props.handleTagChange(newList);
    }

    handleDelete(tagToDelete) {
        for (let i = 0; i < this.props.tagList.length; i++) {
            if (this.props.tagList[i] === tagToDelete) {
                let newList = this.props.tagList;
                newList.splice(i, 1);

                this.props.handleTagChange(newList);

                break; // ensures only one tag is removed
            }
        }
    }
    
    render() {
        return (
            <div>
                <input type="text" value={this.props.tagName} onChange={this.handleChange} />
                <button type="button" onClick={this.handleAdd}>Add Tag</button>
                <ul>
                    {this.props.tagList.map((tag) => (
                        <li><TagItem value={tag} handleDelete={this.handleDelete}/></li>
                    ))}
                </ul>
            </div>
        );
    }
}
