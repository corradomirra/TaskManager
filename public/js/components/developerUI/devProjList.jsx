var React = require('react');
var Reflux = require('reflux');
var ReactBootstrap = require('react-bootstrap');
var Project = require('../managerUI/projectItem');
var DevAction = require('../../actions/developerAction');
var DevStore = require('../../stores/developerStore');
var Router = require('react-router');
var ListGroupItemLink = require('react-router-bootstrap').ListGroupItemLink;
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
        this.listenTo(DevStore,this.onLoad);
        DevAction.load({username:this.props.username});
    },
    onLoad(data){
        this.setState({nameOfProjects: data.projects});
    },
    render() {
        if(this.state.nameOfProjects.length) {
            var projects = this.state.nameOfProjects.map(function (project) {
                return (
                    <ListGroupItemLink params={{devName:this.props.username, name:project.name}}  to ={"devProject"}>
                        {project.name}
                    </ListGroupItemLink>
                );
            }.bind(this));
        }
        return (
            <Row className='show-grid'>
                <Panel collapsible defaultExpanded header='Projects'>
                    <ListGroup fill>
                        {projects}
                    </ListGroup>
                </Panel>
            </Row>
        );
    }
});
module.exports = List;