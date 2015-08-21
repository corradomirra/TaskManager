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
                    <TaskItem
                        nameOfProject={name}
                        to ={"task"}/>
                );
            });
        }
        if(this.state.nameOfDevelopers.length) {
            var developers = this.state.nameOfDevelopers.map(function (name) {
                return (
                    <TaskItem
                        nameOfProject={name}
                        to ={"developer"}/>
                );
            });
        }
        return(
            <Row>
                <Col md={6}>
                    <Panel header={this.state.name} bsStyle='info'>
                        {this.state.description}
                    </Panel>
                    <RouteHandler/>
                </Col>
                <Col md={3}>
                    <Panel collapsible defaultExpanded bsStyle='success' header='Tasks'>
                        <ListGroup fill>
                            {tasks}
                        </ListGroup>
                        <Button bsStyle='primary' bsSize="small" onClick={this.onCreateTask}>add Task</Button>
                    </Panel>
                </Col>
                <Col md={3}>
                    <Panel collapsible defaultExpanded  bsStyle='success' header='Developers'>
                        <ListGroup fill>
                            {developers}
                        </ListGroup>
                        <Button bsStyle='primary' bsSize="small" onClick={this.onCreateDeveloper}>add Developer</Button>
                    </Panel>
                </Col>
            </Row>
        )
    }
});
module.exports = UI;