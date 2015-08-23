var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');
var Project = require('./projectItem');
var ProjectAction = require('../../actions/projectsListAction');
var ProjectStore = require('../../stores/projectsListStore');
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
            var mas = this.state.nameOfProjects;
            if(typeof data.names == "string"){
                mas.push(data.names);
                this.setState({nameOfProjects: mas});
            }
            else
                this.setState({nameOfProjects: data.names});
    },
    onCreate(e){
        e.preventDefault();
        this.transitionTo('addProject');
    },
    render() {
        if(this.state.nameOfProjects.length) {
            var projects = this.state.nameOfProjects.map(function (name) {
                return (
                    <Project
                        nameOfProject={name}
                        to ={"project"}
                        />
                );
            });
        }
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