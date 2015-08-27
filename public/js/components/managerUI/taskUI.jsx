var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Panel = ReactBootstrap.Panel;
var Input = ReactBootstrap.Input;
var Router = require('react-router');
var Reflux = require('reflux');
var Radio = require('react-btn-checkbox').Radio;
var Accordion = ReactBootstrap.Accordion;
var Button = ReactBootstrap.Button;
var TaskUIAction = require('../../actions/taskUIAction');
var TaskUIStore = require('../../stores/taskUiStore');

var taskUI = React.createClass({
    mixins:[Reflux.ListenerMixin,Router.Navigation],
    getInitialState(){
        return{
            name:'',
            description:'',
            comments:[],
            status:{
                inProgress: true,
                Finished: false
            },
            currComment:"",
            addedTask:{}

        }
    },
    componentWillMount(){
        this.listenTo(TaskUIStore,this.onLoad);

        //TaskUIAction.load({project:this.props.params.name,task:this.props.params.taskName});

    },
    componentWillReceiveProps(nextProp){
        TaskUIAction.load({project:nextProp.params.name,task:nextProp.params.taskName});
    },
    onLoad(task){
        var status = {
            inProgress: false,
            Finished: false
        };
        var mas = this.state.comments;
        if(task.hasOwnProperty('newStatus')){
            return;
        }
        if(!Array.isArray(task.comments)){
            mas.push(task.comments);
            this.setState({comments: mas});
            return;
        }
        else {
            if(task.status){
                status.Finished= true;
            } else status.inProgress = true;
            this.setState({
                name:task.name,
                description:task.description,
                comments:task.comments,
                status:status
            });
        }
        if(!this.props.hasOwnProperty('devName')){
            this.setState({addedTask:<h2><strong>Task:   </strong> {this.state.name}</h2>});
        } else this.setState({addedTask:<Row><Col md={10}><strong>Task:   </strong> {this.state.name}</Col><Col md={2}><Button bsSize='small'>+</Button></Col></Row>});
    },
    onCheck(status){
        if (status.Finished) {
            this.setState({status: {inProgress: false, Finished: true}});
        } else this.setState({status: {inProgress: true, Finished: false}});
        TaskUIAction.update({
            project:this.props.params.name,
            task:this.props.params.taskName,
            data:{
                status:status.Finished
            }
        });
    },
    onChangeComment(){
        this.setState({
            currComment: this.refs.comment.getValue()
        });

    },
    onComment(){
        if(this.state.currComment == "") return;
        var today = new Date();
        var date = today.getHours() + ":" + today.getMinutes() +
            "       " +today.getDay() + '.' +today.getMonth() + '.' +today.getFullYear();
        this.setState({currComment:""});
        TaskUIAction.createComment({date:date,
            text:this.state.currComment,
            project:this.props.params.name,
            task:this.props.params.taskName
        });
    },
    render(){
        if(this.state.comments.length){
            var comments = this.state.comments.map(function (comment,index) {
                return (
                    <Panel header={comment.date + ' ' +comment.author } >
                        {comment.text}
                    </Panel>
                );
            });
        }
        return(
            <Row>
                <Col md={12}>
                    <Panel header={this.state.addedTask}
                           footer={<Radio onChange={this.onCheck}  options={this.state.status} bootstrap />}>
                        {this.state.description}
                    </Panel>
                    <Accordion>
                        {comments}
                    </Accordion>
                    <Input type="textarea" ref="comment" value={this.state.currComment} onChange={this.onChangeComment} label="comment" placeholder="Enter comment"/>
                    <Button onClick={this.onComment}>Add comment</Button>
                </Col>
            </Row>
        )
    }

});
module.exports = taskUI;
//<h2><strong>Task:   </strong> {this.state.name}</h2>
