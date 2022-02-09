import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

const testData = [
  {
    name: "Bob Marley", avatar_url: "https://avatars0.githubusercontent.com/u/810438?v=4",
    company: "Google"
  },
  {
    name: "Disha Patani", avatar_url: "https://avatars2.githubusercontent.com/u/6820?v=4",
    company: "Microsoft"
  },
  {
    name: "Hanu man", avatar_url: "https://avatars2.githubusercontent.com/u/63648?v=4",
    company: "Amazon"
  }
];
//User names in api - gaearon, TJ, sophiebits, sebmarkbage, bvaughn

const CardList = (props) => (
  <div>
    {/* //Instead of separate cards, map can be used to iterate over data array
    <Card {...testData[0]}/>
    <Card {...testData[1]}/>
    <Card {...testData[2]}/> 
    */}
    {//{testData.map(profile => <Card {...profile}/>)} 
    }
    {props.profiles.map(profile => <Card key={profile.id} {...profile} />)}
  </div>
);

//const handleInputChange = (event) => this.setState({ userName: event.target.value });

class Form extends Component {
  /*const userNameRef = React.createRef();
   const handleSubmit = (event) =>{
     event.preventDefault();
     console.log(this.userNameRef.current.value);
   };
   render(){
     return (
     <form action="" onSubmit={this.handleSubmit}>
       <input 
         type='text' 
         placeholder='GitHub Username' 
         required
         ref={this.userNameRef}
         />
       <button>Add Card</button>
     </form>
       );
   }*/// Above piece of code can be simplified
  state = { userName: '' };

  handleSubmit = async (event) => {
    event.preventDefault();
    //console.log(this.state.userName);
    const resp = await axios.get(`https://api.github.com/users/${this.state.userName}`);
    this.props.onSubmit(resp.data);
    this.setState({ userName: '' });
  };

  handleInputChange = (event) => this.setState({ userName: event.target.value });

  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <input
          type='text'
          placeholder='GitHub Username'
          required
          value={this.state.userName}
          onChange={this.handleInputChange}
        />
        <button>Add Card</button>
      </form>
    );
  }
}

class Card extends React.Component {
  render() {
    //const profile = testData[0];
    const profile = this.props;
    return (
      <div className='github-profile' style={{ margin: '1rem' }}>
        <img src={profile.avatar_url} style={{ width: '75px' }} alt='' />
        <div className='info' style={{ display: 'inline-block', marginLeft: '12px' }}>
          <div className='name' style={{ fontSize: '125%' }}>{profile.name}</div>
          <div className='company'>{profile.company}</div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  /*constructor(props){
      super(props);
      this.state = {
        profiles:testData,
      };
    } */ //constructor code can be simplified to below

  state = {
    profiles: [] //testData
  };

  addNewProfile = (newProfile) => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, newProfile]
    }));
    console.log(this.state.profiles);
  };

  render() {
    return (
      <div>
        {/* <div className='header'>{this.props.title}</div> */}
        <div className='header'>My GitHub Cards App</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

// ReactDOM.render(
// <App title='My GitHub Cards App'/>,
//   mountNode
// );

export default App;
