var React=require('react');

var ListItem = require("./ListItem.jsx");

var List=React.createClass({
    
    render: function () {
        
        var createItem = function(value,index,array){
            if(index%3===0)
                return <ListItem key={index} name={value} text={array[index+1]} date={array[index+2]} />
        };

        return (
            <div className="comments">
                {/*прохожусь map по массиву items вызывая callback createItem*/}
                    {this.props.items.map(createItem)}
            </div>
        )
    }
});

module.exports=List;
