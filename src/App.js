import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//For Material UI Button
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import FloatingActionButton from 'material-ui/lib/floating-action-button';

//For Material UI TextField
import TextField from 'material-ui/lib/text-field';

//For Material UI Checkbox
import Checkbox from 'material-ui/lib/checkbox';
import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import Toggle from 'material-ui/lib/toggle'

//For Material UI Title Bar
import AppBar from 'material-ui/lib/app-bar';

//MUI Cards
import Avatar from 'material-ui/lib/avatar';
import Card from 'material-ui/lib/card/card';
import CardActions from 'material-ui/lib/card/card-actions';
import CardHeader from 'material-ui/lib/card/card-header';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

import AppStyle from './styles/App';

var App = React.createClass({

	getInitialState() {
		return { todos: [] }
	},

	generateId() {
		return Math.floor(Math.random()*90000) + 10000
	},

	handleNodeRemoval(nodeId) {
		var todos = this.state.todos

		todos = todos.filter((el) => {
			return el.id !== nodeId
		});

		this.setState({todos})
		return;
	},

	handleSubmit(task) {
		var todos = this.state.todos
		var id = this.generateId().toString()
		var complete = 'false'
		todos = todos.concat([{id, task, complete}])
		this.setState({todos})

		this.firebaseRef.push({
			task: this.state.task
		})
		this.setState({task: ""})
	},

	handleToggleComplete(nodeId) {
		var todos = this.state.todos
		for (var i in todos) {
			if (todos[i].id === nodeId) {
				todos[i].complete = todos[i].complete === 'true' ? 'false' : 'true'
				break
			}
		}
		this.setState({todos})
		return
	},

	componentWillMount() {
		this.firebaseRef = new Firebase("https://ReactFireTodoApp.firebaseio.com/items/")
		this.firebaseRef.on("child_added", function(dataSnapShot){
			this.todos.push(dataSnapShot.val())
			this.setState({todos:this.todos})
		}.bind(this))
	},

    componentWillUnmount() {
      	this.firebaseRef.off()
    },

	render() {
		return (
			<div className="well">
				<AppBar title="YATL" iconClassNameRight="muidocs-icon-navigation-expand-more" />
				<TodoForm onTaskSubmit={this.handleSubmit} />
				<TodoList todos={this.state.todos} removeNode={this.handleNodeRemoval} toggleComplete={this.handleToggleComplete} />
			</div>
		)
	},
})

var TodoForm = React.createClass({

	handleClick(e) {
		e.preventDefault()
		this.addTodoItem()
	},

	handleKeyPress(e){
		if(e.charCode==13){
			this.addTodoItem()
		}
	},

	addTodoItem(){
		var task = this.task.getValue().trim()
		if (!task) {
			alert('Input is empty!!')
			return
		}
		this.props.onTaskSubmit(task)
		this.task.clearValue()
		return
	},

	render() {
		return (
			<div>
			   	<TextField type="text" id="task" ref={(ref) => this.task = ref} onKeyPress={this.handleKeyPress} placeholder="I need to..."  />	
				<FloatingActionButton onClick={this.handleClick} secondary={true} mini={true}>+</FloatingActionButton>
			</div>
		);
	},
})

var TodoList = React.createClass({

	removeNode(nodeId) {
		this.props.removeNode(nodeId)
		return
	},

	toggleComplete(nodeId) {
		this.props.toggleComplete(nodeId)
		return
	},

	render() {
		var listNodes = this.props.todos.map((listItem) => {
			return (
				<TodoItem key={listItem.id} nodeId={listItem.id} task={listItem.task} complete={listItem.complete} removeNode={this.removeNode} toggleComplete={this.toggleComplete} />
			)
		},this)
		return (
			<ul>
				{listNodes}
			</ul>
		)
	},
})

var TodoItem = React.createClass({

	removeNode(e) {
		e.preventDefault()
		this.props.removeNode(this.props.nodeId)
		return
	},

	toggleComplete(e) {
		e.preventDefault()
		this.props.toggleComplete(this.props.nodeId)
		return
	},
	
	render() {
		let isLineThrough = ''
		let isCheck = ''
		if (this.props.complete === 'true') {
			isLineThrough = {'text-decoration':'line-through'}
			isCheck = 'checked'
		}else{
			isLineThrough = {'text-decoration':'none'}
		}

		return (
			<div>
				<Card>
			 		<Card style={AppStyle.cardStyling}>
						<Checkbox defaultChecked={isCheck} onCheck={this.toggleComplete} labelStyle={isLineThrough} label={this.props.task} />
			 		</Card>
			 		<Card style={AppStyle.cardStyling}>
						<button type="button" onClick={this.removeNode} style={{backgroundColor:'salmon'}}>&#xff38;</button>
			 		</Card>
				</Card>
			</div>
		)
	},
})

ReactDOM.render(<App />, document.getElementById('root'));