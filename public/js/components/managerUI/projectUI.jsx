var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');
var ReactRouterBootstrap = require('react-router-bootstrap');
var ProjectUIAction = require('../../actions/projectUIAction');
var ProjectUIStore = require('../../stores/projectUIStore');
var ListGroupItemLink = ReactRouterBootstrap.ListGroupItemLink;
var Router = require('react-router');
var TaskItem = require('./projectItem');
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var RouteHandler = Router.RouteHandler;
var Panel = ReactBootstrap.Panel;
var ListGroup = ReactBootstrap.ListGroup;
var ListGroupLink = ReactRouterBootstrap.ListGroupItemLink;
var Button = ReactBootstrap.Button;


var UI = React.createClass({
    mixins:[Router.Navigation,Reflux.ListenerMixin],
    getInitialState(){
        return{
            nameOfTasks:[],
            nameOfDevelopers:[],
            description:"",
            name:""
        }
    },
    componentWillMount(){
        this.listenTo(ProjectUIStore,this.onLoad);
        ProjectUIAction.load(this.props.params.name);
    },
    componentWillReceiveProps(nextProps){
        ProjectUIAction.load(nextProps.params.name);
    },
    onLoad(data){
        this.setState({nameOfTasks:data.tasks,
            nameOfDevelopers:data.developers,
            description:data.description,
            name:data.name
        });

    },
    onCreateDeveloper(){
        this.transitionTo('developer');

    },
    onCreateTask(){
        this.transitionTo('task');
    },
    render(){
        if(this.state.nameOfTasks.length) {
            var tasks = this.state.nameOfTasks.map(function (name) {
                return (
                    <ListGroupItemLink bsStyle="success" params={{taskName:name, name:this.state.name}}  to ={"task"}>
                        {name}
                    </ListGroupItemLink>
                );
            }.bind(this));
        }
        if(this.state.nameOfDevelopers.length) {
            var developers = this.state.nameOfDevelopers.map(function (name) {
                return (
                    <ListGroupItemLink bsStyle="success" params={{devName:name, name:this.state.name}} to ={"developer"}>
                        {name}
                    </ListGroupItemLink>
                );
            }.bind(this));
        }

        return(
            <Row>
                <Col md={6}>
                    <Panel header={<h2><strong>Project:   </strong> {this.state.name}</h2>} bsStyle='info'>
                        <strong>Description:   </strong> {this.state.description}
                    </Panel>
                    <RouteHandler/>
                </Col>
                <Col md={3}>
                    <Panel collapsible defaultExpanded bsStyle='info' header='Tasks'>
                        <ListGroup fill>
                            {tasks}
                        </ListGroup>
                        <Button  bsSize="small" onClick={this.onCreateTask}>add Task</Button>
                    </Panel>
                </Col>
                <Col md={3}>
                    <Panel collapsible defaultExpanded  bsStyle='info' header='Developers'>
                        <ListGroup fill>
                            {developers}
                        </ListGroup>
                        <Button  bsSize="small" onClick={this.onCreateDeveloper}>add Developer</Button>
                    </Panel>
                </Col>
            </Row>
        )
    }
});
module.exports = UI;