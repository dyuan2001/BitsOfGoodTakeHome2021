import React from 'react'

export default class TagItem extends React.Component {
    constructor(props) {
        super(props);

        this.handleDeleteFromList = this.handleDeleteFromList.bind(this);
    }

    handleDeleteFromList() {
        this.props.handleDelete(this.props.value);
    }

    render() {
        return (
            <div>
                <span>{this.props.value}</span>
                <button type="button" onClick={this.handleDeleteFromList}>X</button>
            </div>
        );
    }
}
