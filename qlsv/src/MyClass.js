import "./App.css";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
class MyClass extends React.Component {
  constructor(props) {
    super(props);
    const columns = [
      {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (params) => (
          <strong>
            <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="inherit"
            onClick={() => this.editRow(params.value)}
          >
              <EditIcon />
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={() => this.deleteRow(params.value)}
            >
              <DeleteForeverIcon />
            </IconButton>
          </strong>
        )
      },
      {
        field: "id",
        headerName: "ID",
        width: 100,
      },
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
      className:props.className,
      actionID:null,
      openConfirmation:false,
      totalStudent:0,
      maxID:1,
      openSnackbar:false,
      openSnackbarInfo:''
    };
  }
  
  editRow = (id) => {
    console.log("editRow: ",id)
  }

  deleteRow = (id) => {
    this.setState({actionID:id,openConfirmation:true})
    console.log("deleteRow: ",id)
  }

  handleClassChange = (selectedClass) => {
    console.log("MyClass chọn: ", selectedClass);
    this.setState({ selectedClass: selectedClass });
  };

  handleConfirmation = (isDeleted) => {
    console.log('handleConfirmation',isDeleted,this.state.actionID)
    if(isDeleted){
      let students = [...this.state.students]
      students = students.filter(data => data.id !== this.state.actionID)
      let currentStudents = students.length
      this.props.handleTotalStudent(currentStudents)
      this.setState({students:students,openSnackbar:true,openSnackbarInfo:'Xóa sinh viên thành công'})
    }
    this.setState({openConfirmation:false})
  }

  handleOpenSnackbar = () => {
    this.setState({openSnackbar:false})
  }

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
      let maxId = state.maxID

      newStudent.id = maxId
      newStudent.className = props.className
      newStudent.actions = newStudent.id

      students.push(newStudent)
      totalStudent++
      props.handleTotalStudent(totalStudent)
      return {newStudent:props.newStudent
          ,students:students
          ,maxID:maxId + 1
          ,openSnackbar:true
          ,openSnackbarInfo:'Thêm sinh viên thành công'
      }
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
        <Dialog
        open={this.state.openConfirmation}
        onClose={() => this.handleConfirmation()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleConfirmation(false)}>Disagree</Button>
          <Button onClick={() => this.handleConfirmation(true)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom',horizontal: 'right' }}
        open={this.state.openSnackbar}
        onClose={() => this.handleOpenSnackbar()}
        message={this.state.openSnackbarInfo}
      key={{vertical: 'bottom',horizontal: 'right'}}
      />
      </div>
    );
  }
}

export default MyClass;
