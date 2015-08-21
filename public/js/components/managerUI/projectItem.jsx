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
        var bsStyle = "primary";
        if(this.props.style == "success"){
            bsStyle = "success";
        }

        return (
            <ListGroupItemLink to={this.props.to} params={{name:this.state.name}}>{this.state.name}</ListGroupItemLink>
        );
    }
});
module.exports = Project;
