// import logo from './logo.svg';
import "./App.css";
import React from "react";
import MyAppBar from "./MyAppBar";
import MyClass from "./MyClass";
import moment from "moment";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedClass: "" ,newStudent:[],className:'',totalStudent:0 };
  }

  handleClassChange = (selectedClass) => {
    console.log("App chọn: ", selectedClass);
    this.setState({ selectedClass: selectedClass,newStudent:[],className:selectedClass});
  };

  addNewStudent = () => {
    if(this.state.selectedClass)
      this.getData()
  }

  handleTotalStudent = (total) => {
    console.log('App total student',total)
    this.setState({totalStudent:total,newStudent:[]})
  }

  getData = () => {
    fetch("https://randomuser.me/api/?results=1")
      .then((res) => res.json())
      .then((data) => {
        const dataNew = data.results.map((child, index) => {
          return {
            id: index++,
            firstName: child.name.first,
            lastName: child.name.last,
            phone: child.phone,
            dob: moment(child.dob.date).format("DD/MM/YY"),
            country: child.location.country,
            picture: child.picture.medium,
          };
        });
        this.setState({ newStudent: dataNew, className: this.state.selectedClass });
      })
      .catch((err) => console.log(err));
  };
  render() {
    return (
      <div>
        <MyAppBar handleSelectedClassChange={this.handleClassChange} addNewStudent = {this.addNewStudent} totalStudent = {this.state.totalStudent} />
        <br />
        <MyClass className={this.state.className} handleTotalStudent = {this.handleTotalStudent} selectedClass = {this.state.selectedClass} newStudent = {this.state.newStudent}/>
      </div>
    );
  }
}

export default App;
