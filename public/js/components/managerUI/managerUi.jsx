var React = require('react');
var ReactRouter = require('react-router');
var ReactBootstrap = require('react-bootstrap');
var RouteHandler = ReactRouter.RouteHandler;
var ProjectList = require("./projectsList.jsx");
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var UI = React.createClass({
    render(){
        return(
            <Row>
                <Col md={1} ></Col>
                <Col md={3}><ProjectList/></Col>
                <Col md={8} ><RouteHandler/></Col>
            </Row>
        )
    }
});

module.exports = UI;