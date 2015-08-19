var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Project = require('./project.jsx');
var Row = ReactBootstrap.Row;
var Button = ReactBootstrap.Button;

var App = React.createClass({
    getInitialState(){
        return {
            nameOfProjects:[]
        }
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
                <h3>Projects</h3>
                <ul>
                    {projects}
                </ul>
                <Button bsStyle='primary'>Add Project</Button>
            </Row>
        );
    }
});