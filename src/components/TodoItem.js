import React from 'react';
import Card from 'react-bootstrap/Card';

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bgColor: "light"
        }

        this.handleDeleteFromList = this.handleDeleteFromList.bind(this);
        this.toggleBg = this.toggleBg.bind(this);
    }

    handleDeleteFromList() {
        this.props.handleDelete(this.props.value);
    }

    toggleBg() {
        let bg;
        if (this.props.completed) {
            bg = "light";
        } else {
            bg = "secondary"
        }

        this.props.toggleCompleted(this.props.title);
        this.setState({
            bgColor: bg
        });
    }

    render() {
        return (
            <Card onClick={this.toggleBg} bg={this.state.bgColor} border="dark" style={{ width: '18rem', marginLeft: 'auto', marginRight: 'auto' }}>
                <Card.Header>{this.props.due}</Card.Header>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Text>
                        {this.props.tags.map((tag) => (
                            "#" + tag + " "
                        ))}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}
