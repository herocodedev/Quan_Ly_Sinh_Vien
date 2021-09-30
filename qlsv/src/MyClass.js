import "./App.css";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
class MyClass extends React.Component {
  constructor(props) {
    super(props);
    const columns = [
      {
        field: "firstName",
        headerName: "Tên",
        width: 150,
      },
      {
        field: "lastName",
        headerName: "Họ",
        width: 150,
      },
      {
        field: "phone",
        headerName: "Số điện thoại",
        width: 150,
      },
      {
        field: "dob",
        headerName: "Ngày Sinh",
        width: 150,
      },
      {
        field: "country",
        headerName: "Quốc gia",
        width: 150,
      },
      {
        field: "picture",
        headerName: "Avatar",
        width: 150,
      },
    ];

    this.state = {
      columns: columns,
      students: [],
      displayStudents: [],
      newStudent:props.newStudent,
      selectedClass: props.selectedClass,
      className:props.className
    };
  }

  handleClassChange = (selectedClass) => {
    console.log("MyClass chọn: ", selectedClass);
    this.setState({ selectedClass: selectedClass });
  };
  static getDerivedStateFromProps(props,state){
    let totalStudent = 0
    if(!props.className || props.selectedClass==='')
      totalStudent = state.students.length
    else{
      let displayStudent = [...state.students]
      displayStudent = displayStudent.filter(data => data.className === props.selectedClass)
      totalStudent = displayStudent.length
    }
    if(props.newStudent.length>0 && props.className ){
      let students = [...state.students]  
      let newStudent = props.newStudent[0]
      newStudent.id = students.length + 1
      newStudent.className = props.className
      students.push(newStudent)
      totalStudent++
      props.handleTotalStudent(totalStudent)
      return {newStudent:props.newStudent,students:students}
    }
    else{
      if(props.className !== state.selectedClass){
        props.handleTotalStudent(totalStudent)
      }
      return {selectedClass:props.className}
    }
  }
  
  render() {
    let displayStudents = [...this.state.students];
    displayStudents = displayStudents.filter((data) => data.className === this.props.selectedClass)
    return (
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={displayStudents} columns={this.state.columns} />
      </div>
    );
  }
}

export default MyClass;
