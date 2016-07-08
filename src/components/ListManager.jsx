var React=require('react');

var List = require("./List.jsx");


var ListManager=React.createClass({

    currentComment: [],//хранятся данные текущего(последнего) коммента

    getInitialState: function(){
        return {items:[], name:"", text:""};
    },

    //то что ввели в input и textarea
    handlerOnChangeText:function(e){
            this.setState({text: e.target.value});
    },

    handlerOnChangeInput:function(e){
            this.setState({name: e.target.value});
    },

    //при нажатии на кнопку добавить
    handlerOnBtnClick:function(e){
        e.preventDefault();
        if(this.state.text !=='' && this.state.name !=='') {
            //формирует текущий коммент
            this.currentComment.push([this.state.name, this.state.text,new Date().toLocaleString()]);
            //сохраняет все комменты в localStorage и возвращает все комменты в messages
            var messages=this.saveToLocalStorage();
            //меняем state массив items записывая туда все комменты, обнуляем text и name
            this.setState({items: messages, text: '', name: ''});
            this.currentComment=[];
        }
    },

    //сохраняю все комменты в localStorage
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

    //беру все comment'ы из localStorage(если они есть) и записываю в this.state.items
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
                <List items={this.state.items}/> {/*передаю массив items компоненту List*/}
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