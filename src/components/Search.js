import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

import { browserHistory } from 'react-router'


class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        browserHistory.push("/search/" + this.state.value)
      }
    
      render() {
        return (
            <div style={{backgroundColor:'#00A1FE'}}>
            <div style={{display: 'flex',flexDirection:'column',  justifyContent: 'center', alignItems:'center', height: '100vh', backgroundColor:'#00A1FE'}}>
            <div style={{padding:'5px' ,fontFamily:'sans-serif'}}>
            <p style={{fontSize:'50px'}}>
          Jeopardy
          </p>
          </div>
          <div>
          <p style={{fontSize:'40px'}}>
          Search for the Question
          </p>
          </div>
          <form  style={{ display:'contents', justifyContent: 'center',alignItems:'center'}} onSubmit={this.handleSubmit}>
            <label>
              <input style={{height:'40px', width : '400px',border:'1px solid #000',borderRadius:'10px', fontSize:'30px', padding:'4px'}} type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <br />
            <br />
            <input style={{height:'20px', width : '150px',border:'1px solid #000',borderRadius:'10px'}}  type="submit" value="Submit" />
          </form>
          </div>
          </div>);
      }
}

export default Search;
