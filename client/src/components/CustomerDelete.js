import React from 'react';
import { Typography, Dialog, DialogActions, DialogTitle, DialogContent, Button, withStyles } from '@material-ui/core';


// 모달창을 하나로 묶고 싶다,,,,,

const styles = theme => ({
    deleteBtn : {
        marginRight : theme.spacing(1)
    }
})

class CustomerDelete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open : false   // 모달창 열려있는지 확인
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true    
        })
    }

    handleClose = () => {
        this.setState({
            open: false
        })
    }

    deleteCustomer(id) {
        const url = '/api/customers/' + id;
        fetch(url, {
            method : 'DELETE'
        });

        this.props.stateRefresh();
    }

    deleteCustomerDB(id) {
        const url = '/api/customers/delete/' + id;
        fetch(url, {
            method : 'DELETE'
        });
        this.props.stateRefresh();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button className={classes.deleteBtn} variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제 {this.state.open}</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                        <DialogTitle onClose={this.handleClose}>
                            삭제 경고
                        </DialogTitle>
                        <DialogContent>
                            <Typography gutterBottom>
                                선택한 고객 정보가 삭제됩니다
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
                            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                        </DialogActions>
                    </Dialog>
            <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>DB 삭제</Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                        <DialogTitle onClose={this.handleClose}>
                            삭제 경고
                        </DialogTitle>
                        <DialogContent>
                            <Typography gutterBottom>
                                선택한 고객 정보가 데이터베이스에서 삭제됩니다
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomerDB(this.props.id)}}>삭제</Button>
                            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                        </DialogActions>
                    </Dialog>
            </div>
        )
    }

}


export default withStyles(styles)(CustomerDelete);