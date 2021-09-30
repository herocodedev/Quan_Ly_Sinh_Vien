import './App.css';
import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
class CompoClasses extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      selectedClass: '',
      data :[
        { name: 'Lớp 12A1', year: 2021 },
        { name: 'Lớp 12A2', year: 2021 },
      ]
    }
  }

  handleChange = (event,value) => {
    console.log('ComboClasses chọn: ',value)
    this.setState({selectedClass:value? value.name : ''})
    this.props.handleChange(value? value.name : '')
  }
  render(){
    return (
      <div>
         <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={this.state.data}
            getOptionLabel={(option) => option.name}
            onChange = {(event,value) => this.handleChange(event,value)}
            sx={{ width: 200 }}
            style={{background:'aqua'}}
            renderInput={(params) => <TextField {...params} label="Chọn Lớp" />}
          />
      </div>

    )
  }

}

export default CompoClasses;
