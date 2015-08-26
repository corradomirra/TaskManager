var React = require("react");
var Router = require('react-router');
var Reflux = require('reflux');
var LoginAction = require('../../actions/loginAction');
var LoginStore = require('../../stores/loginStore');
var ReactBootstrap = require('react-bootstrap');
var Input = ReactBootstrap.Input;
var Button = ReactBootstrap.Button;
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;

var Login = React.createClass({
    mixins: [Reflux.ListenerMixin,Router.Navigation],
    getInitialState(){
        return{
            login:'',
            password:'',
            errorText:''
        }
    },
    componentDidMount() {
        this.listenTo(LoginStore,this.onResponse)
    },
    passChange(){
        this.setState({
            password: this.refs.password.getValue()
        });
    },
    loginChange(){
        this.setState({
            login:this.refs.login.getValue()
        });
    },
    onResponse(data){
        if(data.text == 'manager'){
            this.transitionTo('manager');
        } else if(data.text == 'developer' && data.name!= ''){
                    this.transitionTo('dev',{devName:data.name});
                } else this.setState({errorText:data.text});
    },
    onLogin(e){
        if(this.state.login.length == 0){
            this.setState({errorText:"Login input is empty"});
            return;
        }
        if(this.state.password.length == 0){
            this.setState({errorText:"Password input is empty"});
            return;
        }
        LoginAction.login({user:this.state.login,password:this.state.password});

    },
    render(){
        return(
        <Row className='show-grid'>
            <Col md={5} ></Col>
            <Col md={2}>
            <form>
                <h4>{this.state.errorText}</h4>
                <Input type="text"
                    value = {this.state.login}
                    label="login"
                    placeholder="Enter login"
                    ref="login"
                    onChange={this.loginChange}/>
                <Input type="password"
                    value = {this.state.password}
                    label = "password"
                    placeholder="Enter password"
                    ref="password"
                    onChange={this.passChange}/>
                <Button bsStyle='primary' onClick={this.onLogin}>Login</Button>
            </form></Col>
            <Col md={5}></Col>
        </Row>
        )
    }
});
module.exports = Login;