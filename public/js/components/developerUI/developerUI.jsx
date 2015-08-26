var React = require('react');
var ReactRouter = require('react-router');
var ReactBootstrap = require('react-bootstrap');
var RouteHandler = ReactRouter.RouteHandler;

var ProjectList = require("./devProjList");
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var UI = React.createClass({
    render(){
        return(
            <Row>
                <Col md={1} ></Col>
                <Col md={3}><ProjectList username = {this.props.params.devName}/></Col>
                <Col md={8} ><RouteHandler target = 'addProject' devName = {this.props.params.devName}/></Col>
            </Row>
        )
    }
});

module.exports = UI;