var React = require("react");
var ReactBootstrap = require("react-bootstrap");
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Panel = ReactBootstrap.Panel;
var Accordion = ReactBootstrap.Accordion;
var Reflux = require("reflux");
var DevAction = require('../../actions/developerAction');
var DevStore = require('../../stores/developerStore');
var Info = React.createClass({
    mixins:[Reflux.ListenerMixin],
    getInitialState(){
        return{
            username:'',
            projects:[]
        }
    },
    componentWillMount(){
        this.listenTo(DevStore,this.onLoad);
    },
    componentWillReceiveProps(nextProp){
        DevAction.load({username:nextProp.params.devName});
    },
    onLoad(developer){
        this.setState({
            username:developer.name,
            projects:developer.projects
        });
    },
    render(){
        var projects = this.state.projects.map(function (proj,index) {
            var tasks='';
            if(proj.hasOwnProperty('tasks')){
                 tasks =  proj.tasks.map(function(task) {
                        return (
                            <h3> {task.name}</h3>
                        );
                    }
                );
            }
            return (
                <Panel header={proj.name} >
                    {tasks}
                </Panel>
            );
        });
        return (
            <Row>
                <Col md={12}>
                    <Panel header={<h2><strong>Developer's login:   </strong> {this.state.username}</h2>}>
                        <Accordion>
                            <h4><strong>Projects: </strong></h4>
                            {projects}
                        </Accordion>
                    </Panel>
                </Col>
            </Row>
        )
    }
});

module.exports = Info;