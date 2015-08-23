var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Router = require('react-router');
var ProjectAction = require('../../actions/projectsListAction');
var addProjectForm = React.createClass({
    mixins:[Router.Navigation],
    getInitialState(){
        return{
            name:"",
            descr:"",
            errorText:"",
            field1:"",
            filed2:'',
            action: {}
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

        switch(this.props.target){
            case "addProject":
            {
                this.setState({action: ProjectAction,
                    target:'manager',
                    field1:'Name of project',
                    field2:'Description'
                });
                break;
            }
            default:
                return;
        }


    },
    onCreate(e){
        e.preventDefault();
        if(this.state.name.length == 0 || this.state.descr.length == 0){
            this.setState({errorText:"Some input is empty"});
            return;
        }
        this.state.action.create({name:this.state.name,description:this.state.descr});
        this.transitionTo(this.state.target);
    },
    render(){

        return(
            <Row>
                <Col md={4} xsOffset={1}>
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