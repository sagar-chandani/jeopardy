import React, { Component } from 'react';
import axios from 'axios';
import {ScaleLoader} from 'react-spinners';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { browserHistory } from 'react-router'

//var domainUrl = 'http://127.0.0.1:5000';
//var domainUrl = ' http://c3f7f0a8.ngrok.io:5000'
var domainUrl = 'http://sagarchandani.pythonanywhere.com'
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
            qcSpinner: true,width: 0, height: 0 
        };
    }
    componentWillMount() {
        if (this.state.query) {
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
                        qcSpinner: false
                    })
                    console.log("state spinner :", this.state.qcSpinner)
                })
                .catch(error => error.response)

        }

        window.removeEventListener("resize", this.updateWindowDimensions);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);
    }


    updateWindowDimensions = () => {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    };
    renderAlbums() {
        return this.state.posts.map(data =>
            <ProductList key={data.Question} data={data} />);
    }


    handleSearchAnotherQueston(){
        browserHistory.push("/")
    }
    handleQcSpinner() {
        if (this.state.qcSpinner) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center',backgroundColor: '#00A1FE',height:this.state.height }}>
                    <ScaleLoader
                        sizeUnit={"px"}
                        size={150}
                        color={'#0e364b'}
                        loading={this.state.qcSpinner}
                    />
                </div>
            );
        } else {

            return (
                <div  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00A1FE' }}>
                    <p style={{fontSize:'20px'}}>
                        Search Results :
                     </p>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 2fr)', gridGap: '20px 60px', gridAutoRows: 'minMax(200px, auto)' }}>

                        {this.state.posts.map(data =>
                            <div>
                                {/*<li>{data.Question}</li>*/}
                                <ProductList data={data} />
                            </div>)}
                    </div>
                    <div onClick={this.handleSearchAnotherQueston} style={{ display: 'flex', flexDirection: 'column', border: '1px solid #000', borderRadius: '10px', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#5ff495', padding: '10px' }}>
                        Search another Question
                    </div>
                </div>
            );
        }
    }



    render() {

        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: '#00A1FE', height:this.state.height }}>
            {this.handleQcSpinner()}
            </div>

        );
    }
}

export default SearchResults;


// Products Starts
class ProductList extends React.Component {


    render() {
        const { Question, Answer } = this.props.data;

        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
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
                            display: 'flex', flexDirection: 'column', border: '1px solid #000', borderRadius: '10px', justifyContent: 'space-evenly', alignItems: 'center',
                            backgroundColor: '#f46c50',
                        }} >
                        <div style={{ fontSize: '20px' }}>Question:
                    </div>
                        <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid #000', borderRadius: '10px', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#5ff495', padding: '5px' }}>

                            <div style={{display:'flex',fontSize: '15px',padding:'3px'}}>
                                {Question}
                            </div>
                            <br />
                        </div>
                        <div style={{ fontSize: '12px' }}>
                            Flip to see the Answer
                        </div>
                    </FrontSide>
                    <BackSide
                        style={{
                            backgroundColor: '#f46c50',
                            display: 'flex', flexDirection: 'column', border: '1px solid #000', borderRadius: '10px', justifyContent: 'space-evenly', alignItems: 'center'
                        }}>
                        <div style={{ fontSize: '20px' }}>Answer:
                            </div>
                        <div style={{ display: 'flex', padding: '5px', flexDirection: 'column', border: '1px solid #000', borderRadius: '10px', justifyContent: 'space-evenly', alignItems: 'center', backgroundColor: '#5ff495' }}>

                            <div style={{ fontSize: '15px' }}>
                                {Answer}
                            </div>
                        </div>
                    </BackSide>
                </Flippy>
            </div>
        )
    }
}
// Products Ends