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
            <Row className='show-grid'>
                <Col md={4}><ProjectList/></Col>
                <Col md={8} ><RouteHandler/></Col>
            </Row>
        )
    }
});

module.exports = UI;