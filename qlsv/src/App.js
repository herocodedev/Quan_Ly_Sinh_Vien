// import logo from './logo.svg';
import './App.css';
import React from 'react';
import MyAppBar from './MyAppBar';
import MyClass from './MyClass';


class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {selectedCountry: ''}
  }

  handleClassChange = (selectedClass) => {
    console.log('App chọn: ',selectedClass)
    this.setState({selectedClass:selectedClass})
  }

  render(){
    return (
      <div>
        <MyAppBar 
          classes ={[{id:1, value:'Haha'}]}
          students={[]}
          handleClassChange={this.handleClassChange}
        />
        <br />
        <MyClass 
          key='1'
          students={[
            {
              id:1,
              title:'Mr',
              first:'Christopher',
              last:'Edwards'
            }
          ]}
        
        />
      </div>

    )
  }

}

export default App;
