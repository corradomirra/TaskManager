var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Link = require('react-router').Link;
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
            <li><Link to="project" params={{name:this.state.name}}>{this.state.name}</Link></li>
        );
    }
});
