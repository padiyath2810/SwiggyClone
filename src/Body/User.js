import React from "react";

export default class User extends React.Component {
  constructor(props) {
    super(props);
  

    this.state = {
      count: 0,
    
    };
  }

  render() {
    const { name, location } = this.props;
    const { count } = this.state;
    return (
      <div className="user-card">
        <h1>Counter1:{count}</h1>
        <button onClick={()=>{
            this.setState({
                count: this.state.count + 1
            })
        }}>Incremnt</button>
        
        <h2>Name:{name}</h2>
        <h3>Location:{location}</h3>
        <h4>Contact: @rahulpadiyath</h4>
      </div>
    );
  }
}
