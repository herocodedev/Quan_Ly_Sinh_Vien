import './App.css';
import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
class MyClass extends React.Component{
  constructor(props){
    super(props)
    const columns = [{
        field:'first',
        headerName:'First Name',
        width:150,
    }]

    this.state = {
        columns:columns,
        students:props.students,
        selectedClass:props.selectedClass
    }
    console.log('Props.students',props.students)
}

  handleClassChange = (selectedClass) => {
    console.log('MyClass chọn: ',selectedClass)
    this.setState({selectedClass:selectedClass})
  }

  render(){
    return (
        <div style={{ height: 300, width: '100%' }}>
            <DataGrid rows={this.state.students} columns={this.state.columns} />
      </div>

    )
  }

}

export default MyClass;
