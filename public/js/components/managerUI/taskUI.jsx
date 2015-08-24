var React = require('react');
var ReactBootstrap = require('react-bootstrap');
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Panel = ReactBootstrap.Panel;
var Input = ReactBootstrap.Input;
var Accordion = ReactBootstrap.Accordion;
var Button = ReactBootstrap.Button;
var taskUI = React.createClass({
    getInitialState(){
        return{
            name:'Create Db',
            description:'MongoDB or SQL',
            status:false,
            comments:[{author:"Mike",data:"12.05.2014",text:"hey you!"},
                {author:"Lola",data:"13.05.2014",text:"hey yssgergerger"},
                {author:"Yorg",data:"12.01.2015",text:"Merry crhsdfsdlfkm!"}
            ]
        }
    },
    render(){
        var statusLabel = "In progress";
        if(this.state.status){
            statusLabel = "finished";
        }
        if(this.state.comments.length){
            var comments = this.state.comments.map(function (comment,index) {
                return (
                    <Panel header={comment.data + ' ' +comment.author } >
                        {comment.text}
                    </Panel>
                );
            });
        }
        return(
            <Row>
                <Col md={12}>
                    <Panel header={<h2><strong>Task:   </strong> {this.state.name}</h2>} footer={<Input type='checkbox' label={statusLabel}/>}>
                        {this.state.description}
                    </Panel>
                    <Accordion>
                        {comments}
                    </Accordion>
                    <Input type="textarea" label="comment" placeholder="Enter comment"/>
                    <Button>Add comment</Button>
                </Col>
            </Row>
        )
    }




});
module.exports = taskUI;