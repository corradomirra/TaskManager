var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Router = require('react-router');
var ProjectAction = require('../../actions/projectsListAction');
var ProjectUIAction = require('../../actions/projectUIAction');
var addProjectForm = React.createClass({
    mixins:[Router.Navigation],
    getInitialState(){
        return{
            name:"",
            descr:"",
            errorText:"",
            field1:"",
            filed2:'',
            action:{},
            size: 0,
            offset: 0
        }
    },
    nameChange(){
        this.setState({name:this.refs.name.getValue()});
    },
    descrChange(){
        this.setState({descr:this.refs.descr.getValue()})
    },
    onClose(){
        this.goBack();
    },
    componentWillMount(){
        this.getNewState(this.props.target,this.props.params.name);
    },
    getNewState(prop,project){
        var self = this;
        switch(prop){
            case "addProject":
            {
                var f = function(){
                    ProjectAction.create({
                        name:self.state.name,
                        description:self.state.descr
                    });
                };
                this.setState({action: f,
                    field1:'Name of project',
                    field2:'Description',
                    size: 4 ,
                    offset: 1
                });
                break;
            }
            case "addDeveloper":
            {
                var f = function(){
                    ProjectUIAction.createDeveloper({
                        name:self.state.name,
                        password:self.state.descr,
                        project: project
                    });
                };
                this.setState({
                    action:f,
                    field1:"Developer's login",
                    field2:'Password',
                    size: 12,
                    offset: 0
                });
                break;
            }
            case "addTask":
            {
                var f = function() {
                    ProjectUIAction.createTask({
                        name:self.state.name,
                        description:self.state.descr,
                        project: project
                    });
                };
                this.setState({
                    action:f,
                    field1:"Name of Task",
                    field2:'Description',
                    size: 12,
                    offset: 0
                });
                break;
            }
            default:
                return;
        }

    },
    componentWillReceiveProps(nextProp){
        this.getNewState(nextProp.target,nextProp.params.name);

    },
    onCreate(e){
        e.preventDefault();
        if(this.state.name.length == 0 || this.state.descr.length == 0){
            this.setState({errorText:"Some input is empty"});
            return;
        }
        this.state.action();
        this.goBack();
    },
    render(){
        return(
            <Row>
                <Col md={this.state.size} xsOffset={this.state.offset}>
                    <form>
                        <h4>{this.state.errorText}</h4>
                        <Input type="text"
                            value = {this.state.name}
                            label={this.state.field1}
                            placeholder={"Enter " + this.state.field1}
                            ref="name"
                            onChange={this.nameChange}/>
                        <Input type="textarea"
                            value = {this.state.descr}
                            label = {this.state.field2}
                            placeholder={"Enter " + this.state.field2}
                            ref="descr"
                            onChange={this.descrChange}/>
                        <Button bsStyle='success' onClick={this.onCreate}>save</Button>
                        <Button bsStyle='danger' onClick={this.onClose}>close</Button>
                    </form>
                </Col>
                <Col md={7}></Col>
            </Row>
        )
    }
});

module.exports = addProjectForm;