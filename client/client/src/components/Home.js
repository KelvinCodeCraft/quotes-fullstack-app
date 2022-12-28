import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {

  constructor(){
    super();
    //define state
    this.state = {
      quotes: [],
      downloaded: false
    }
  }
  //Is called when the component successfully loads
  componentDidMount(){
    //GET request to our server
    axios({
      method: 'GET',
      url: '/api/quotes'
    })
    //saves the data to state. Only way to change the state is with setState
    .then(data =>{
      this.setState({
        quotes: data.data.data,
        dataLoaded: true
      });
    })
    //logs an error
    .catch(err =>{
      console.log(err);
    });
  }

  renderQuotes(){
    if(this.state.dataLoaded){
      return this.state.quotes.map(quote =>{
        return(
          <div key = {quote.id}>
            <Link to={'/${quote.id}'}>"{quote.quote}"</Link>
            <p>{quote.quote}</p>
            <p className="author">{quote.author}</p>
          </div>
        )
      })
    }
    else{
      <p>Loading...</p>
    }
  }
     
  render() {
    return (
      <div className="Home">
        <h1>These are my fvourite quotes</h1>
        {this.renderQuotes()}
        <Link to="/">Back to quotes</Link>
      </div>
    )
  }
};
export default Home;