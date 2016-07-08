var React=require('react');

var List = require("./List.jsx");


var ListManager=React.createClass({

    currentComment: [],
    getInitialState: function(){
        return {items:[], name:"", text:""};
    },

    handlerOnChangeText:function(e){
            this.setState({text: e.target.value});
    },

    handlerOnChangeInput:function(e){
            this.setState({name: e.target.value});
    },

    handlerOnBtnClick:function(e){
        e.preventDefault();
        if(this.state.text !=='' && this.state.name !=='') {
            this.currentComment.push([this.state.name, this.state.text,new Date().toLocaleString()]);
            var messages=this.saveToLocalStorage();
            this.setState({items: messages, text: '', name: ''});
            this.currentComment=[];
        }
    },

    saveToLocalStorage:function(){
        if(localStorage.length!==0){
        var oldcomms=JSON.parse(localStorage.getItem('comments'));
            var allComments=oldcomms.concat(this.currentComment[0]);
            var comments=JSON.stringify(allComments);
            localStorage.setItem('comments',comments);

            return allComments;
        }
        else {
            localStorage.setItem('comments', JSON.stringify(this.currentComment[0]));
            return this.currentComment[0];
        }

    },

    componentDidMount:function(){
        var localNotes = JSON.parse(localStorage.getItem('comments'));
        // если там что-то есть то обновляем состояние компонента
        if (localNotes) {
            this.setState({ items: localNotes });
        }
    },

    render: function () {
        return (
            <div>
                <List items={this.state.items}/>
                <form>
                    <span>Введите свое имя</span>
                    <input type="text" value={this.state.name} onChange={this.handlerOnChangeInput}/>
                    <br/>
                    <textarea placeholder="Введите свой комментарий" cols='70' rows="10"
                              value={this.state.text} onChange={this.handlerOnChangeText}/>
                    <button className='btn' onClick={this.handlerOnBtnClick}>Добавить</button>
                </form>
            </div>
        )
    }
});

module.exports=ListManager;