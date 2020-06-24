import React from 'react';
import { post } from 'axios';
import { Dialog, DialogActions, DialogTitle, DialogContent, TextField, Button, withStyles } from '@material-ui/core';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CustomerAdd extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  // 데이터들 초기화
            file: null,    // 사용자의 프로필 이미지를 파일형태로 전송
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false    // 현재 dialog 창이 열려있는지 여부
        }
    }

    handleClickOpen = () => {
        console.log(this.state.open)
        this.setState({
            open: true    // 고객 추가 버튼을 눌렀다면 open 값 변경
        })
        console.log(this.state.open)
    }
    
    // = () => : 바인딩,,,?
    
    handleClose = () => {
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open: false
        })
    }

    handleFormSubmit = (e) => { // e : event 변수 전달
        e.preventDefault();     // 데이터가 서버로 전달될 때 오류가 발생하지 않도록
        this.addCustomer()  // 함수 호출
            .then((response) => {
                console.log(response.data); // 데이터가 왔을 떄 그 데이터를 콘솔창에 출력
                this.props.stateRefresh();  // 데이터 submit시 list reload
            })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            fileName: '',
            open : false    // 추가하면 모달창 닫히게 open 값 변경
        })
    }

    // 함수 구현
    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData();
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        // 파일이 포함된 데이터를 전송하려면 웹 표준에 맞는 헤더를 추가해야함
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config);
    }

    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],    // 이벤트가 발생한 input 값
            fileName: e.target.value
        })
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} fileName={this.state.fileName} onChange={this.handleFileChange}/><br/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필 이미지 선택" : this.state.fileName}
                            </Button>
                        </label> <br/>
                        <TextField label='이름' type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />
                        <TextField label='생년월일' type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br />
                        <TextField label='성별' type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />
                        <TextField label='직업' type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
            /*
            <form onSubmit={this.handleFormSubmit}> 
                <h1>고객 추가</h1>
                프로필 이미지 : <input type="file" name="file" file={this.state.file} fileName={this.state.fileName} onChange={this.handleFileChange}/><br/>
                이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
                생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                <button type="submit">추가하기</button>
            </form>
            */
        )
    }
}

export default withStyles(styles)(CustomerAdd);