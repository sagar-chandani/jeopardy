import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
import axios from 'axios';
import { RingLoader, HashLoader, PacmanLoader, FadeLoader, PulseLoader, ScaleLoader } from 'react-spinners';
import Flippy, { FrontSide, BackSide } from 'react-flippy';


var domainUrl = 'http://127.0.0.1:5000';
var token = '';
var url = '';


class SearchResults extends Component {


    constructor(props) {
        super(props);
    
        /**
         * Declaring Default states of the tools.
         */
    
         this.state = {
           query: this.props.params.query,
           post: [],
           qcSpinner: true,
       };
    }
componentWillMount() {
    if(this.state.query) {
        var _this = this;
        url = domainUrl + '/search?query=' + this.state.query
        return axios.post(url)
          .then(function (response) {
            _this.setState({
                posts: response.data
              });
            response.data.map(data =>
            console.log(data.Question));     
            console.log(response);
            _this.setState({
               qcSpinner : false
              })
              console.log("state spinner :",this.state.qcSpinner)
            })
          .catch(error => error.response)
          
      }
    }

    renderAlbums() {
        return this.state.posts.map(data =>
          <ProductList key={data.Question} data={data} />);
    }
  
    handleQcSpinner(){
        if(this.state.qcSpinner){
          return(
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <ScaleLoader
            color={'#0e364b'} 
            loading={this.state.qcSpinner} 
            />
            </div>
          );
        }else{
          return ( <div>
              hello
            {this.state.posts.map(data => 
            <div>
            {/*<li>{data.Question}</li>*/}
            <ProductList data={data} />
            </div>)}
            </div>
        );
        }
      }
  
        

  render() {
    // if (this.state.posts.length) {
    //     let renderItems = this.state.posts.map(function(item, i) {
    //       return <li key={i}>{item}</li>
    //     });
    // }
    return (

        
        //       <div className="App">
        //         <header className="App-header">
        //         <form>
        //   <label>
        // {this.state.query}
        //     <input type="text" name="name" />
        //   </label>
        //   <input type="submit" value="Search" />
        // </form>
        //         </header>
        //       </div>
        <div>{this.handleQcSpinner()}</div>
        
    );
  }
}

export default SearchResults;


// Products Starts
class ProductList extends React.Component {

   
    render() {
        const { Question, Answer } = this.props.data;

  return (
      <div style={{display: 'flex', justifyContent: 'center', padding:'10px'}}>
    {/*<li>{Question} : {Answer}</li>*/}
    <Flippy
    flipOnHover={false} // default false
    flipOnClick={true} // default false
    flipDirection="vertical" // horizontal or vertical
    ref={(r) => this.flippy = r} // to use toggle method like this.flippy.toggle()
    // if you pass isFlipped prop component will be controlled component.
    // and other props, which will go to div
    style={{ width: '200px', height: '200px' }} /// these are optional style, it is not necessary
  >
    <FrontSide
      style={{
        backgroundColor: '#41669d',
      }}
    >
      {Question}
    </FrontSide>
    <BackSide
      style={{ backgroundColor: '#175852'}}>
      {Answer}
    </BackSide>
  </Flippy>
  </div>
  )
}
}
// Products Ends