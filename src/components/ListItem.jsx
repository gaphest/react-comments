var React=require('react');

var ListItem=React.createClass({

    handlerAnswer:function(e){
        e.preventDefault();
        //как потом получить этот whatUL в компонентах List и ListManager?
        this.whatUL=e.target.parentNode.parentNode; //ul коммента на который нужно ответить
        console.log(this.whatUL);
    },

    render: function () {
        return (
            <ul>
                <li>
                    <p className="author">{this.props.name} написал в {this.props.date}</p>
                    <h4>{this.props.text}</h4>
                    <a href="#" onClick={this.handlerAnswer}>Ответить</a>
                </li>
            </ul>
        )
    }
});


module.exports=ListItem;
