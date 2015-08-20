var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Router = require('react-router');
var ProjectAction = require('../../actions/projectsAction');
var addProjectForm = React.createClass({
    mixins:[Router.Navigation],
    getInitialState(){
        return{
            name:"",
            descr:"",
            errorText:""
        }
    },
    nameChange(){
        this.setState({name:this.refs.name.getValue()});
    },
    descrChange(){
        this.setState({descr:this.refs.descr.getValue()})
    },
    onClose(){
        this.transitionTo('manager');
    },
    onCreate(e){
        e.preventDefault();
        if(this.state.name.length == 0){
            this.setState({errorText:"Name input is empty"});
            return;
        }
        if(this.state.descr.length == 0){
            this.setState({errorText:"Description input is empty"});
            return;
        }
        ProjectAction.create({name:this.state.name,descr:this.state.descr});
        this.transitionTo('manager');
    },
    render(){
        return(
            <Row>
                <Col md={4} xsOffset={1}>
                    <form>
                        <h4>{this.state.errorText}</h4>
                        <Input type="text"
                            value = {this.state.name}
                            label="Name of Project"
                            placeholder="Enter name"
                            ref="name"
                            onChange={this.nameChange}/>
                        <Input type="textarea"
                            value = {this.state.descr}
                            label = "Description"
                            placeholder="Enter description"
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