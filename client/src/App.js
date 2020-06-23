// 메인 자바스크립트 관리 (HTML문서에서 BOdy태그에 해당하는 내용)
import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core'
import { withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  root : {
    width : '100%',
    marginTop : theme.spacing.unit * 3,
    overflowX : "auto"
  }, 
  table : {
    minWidth : 1080
  }
})

// 하나의 component안에 여러 개의 component 가능
class App extends Component {

  state = { // component 내에서 변경될 수 있는 것
    customers : ""
  }

  componentDidMount() { 
    this.callApi()
    .then(res => this.setState({customers:res}))
    .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  render() {
    const {classes} = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* this.state.customers에 정보가 존재한다면 출력 아니면 빈칸 */}
            {this.state.customers ? this.state.customers.map(c => {  // map : 반복문
              return (
                <Customer
                  key={c.id}  // map 사용 시 key 필수 (사용 안하면 개발자 도구 console에 오류 출력)
                  id={c.id}
                  image={c.image}
                  name={c.name}
                  birthday={c.birthday}
                  gender={c.gender}
                  job={c.job}
                />
              )
            }) : ""}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
