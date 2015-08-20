var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');
var Project = require('./project.jsx');
var ProjectAction = require('../../actions/projectsAction');
var ProjectStore = require('../../stores/projectsStore');
var Router = require('react-router');
var Row = ReactBootstrap.Row;
var Button = ReactBootstrap.Button;
var Panel = ReactBootstrap.Panel;
var ListGroup = ReactBootstrap.ListGroup;
var List = React.createClass({
    mixins:[Reflux.ListenerMixin,Router.Navigation],
    getInitialState(){
        return {
            nameOfProjects:[]
        }
    },
    componentWillMount(){
        this.listenTo(ProjectStore,this.onLoad);
        ProjectAction.load();
    },
    onLoad(data){
        this.setState({nameOfProjects:data.names});
    },
    onCreate(e){
        e.preventDefault();
        this.transitionTo('addProject');
    },
    render() {
        var projects = this.state.nameOfProjects.map(function(name){
                return (
                    <Project
                        nameOfProject = {name}
                    />
                );
        });
        return (
            <Row className='show-grid'>
                <Panel collapsible defaultExpanded header='Projects'>
                    <ListGroup fill>
                        {projects}
                    </ListGroup>
                    <Button bsStyle='primary' bsSize="small" onClick={this.onCreate}>Add Project</Button>
                </Panel>
            </Row>
        );
    }
});
module.exports = List;