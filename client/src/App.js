// 메인 자바스크립트 관리 (HTML문서에서 BOdy태그에 해당하는 내용)
import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, CircularProgress } from '@material-ui/core'
import { withStyles} from '@material-ui/core/styles';

/*
  리액트 라이브러리가 처음 component를 실행하는 순서
  1) constructor()
  2) componentWillMount()
  3) render() : 실제로 component를 화면에 그림
  4) componentDidMount()

  props or state 변경 시 => shouldComponentUpdate()
      - 다시 render()를 호출해 view를 갱신
*/

const styles = theme => ({
  root : {
    width : '100%',
    marginTop : theme.spacing.unit * 3,
    overflowX : "auto"
  }, 
  table : {
    minWidth : 1080
  },
  progress : {
    margin : theme.spacing.unit * 2
  }
})

// 하나의 component안에 여러 개의 component 가능
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customer : '',
      completed : 0
    }
  }

stateRefresh = () => {
  this.setState({
    customers : '',
    completed : 0
  });
  this.callApi()
    .then(res => this.setState({customers:res}))
    .catch(err => console.log(err));
}

  componentDidMount() { 
    this.timer = setInterval(this.progress, 20);
    this.callApi()
    .then(res => this.setState({customers:res}))
    .catch(err => console.log(err));
  }

  callApi = async () => { // API를 비동기적으로 호출
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({completed : completed >= 100 ? 0 : completed +1})
  }

  render() {
    const {classes} = this.props;
    return (
      <div>
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
            }) : 
              <TableRow>
                <TableCell colspan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}/>
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
      <CustomerAdd stateRefresh={this.stateRefresh}/> {/* stateRefresh 함수를 전달*/}
      </div>
    );
  }
}

export default withStyles(styles)(App);
