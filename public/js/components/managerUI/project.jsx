var React = require('react');
var ReactRouterBootstrap = require('react-router-bootstrap');
var Link = require('react-router').Link;
var ListGroupItemLink = ReactRouterBootstrap.ListGroupItemLink;
var Project = React.createClass({
    getInitialState() {
        return {
            name: ""
        };
    },
    componentWillMount(){
        this.setState({name:this.props.nameOfProject});
    },
    render() {
        return (
            <ListGroupItemLink to="project" params={{name:this.state.name}}>{this.state.name}</ListGroupItemLink>
        );
    }
});
module.exports = Project;
