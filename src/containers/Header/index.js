import React, { Component } from "react";
import styled from 'styled-components'
import logo from '../../img/logo.png'
import { push, goBack } from 'connected-react-router'
import { connect } from 'react-redux'
import { routes } from '../Router'
import { Button } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {toRenderSignUp} from '../../actions/login'

class Header extends Component {

  toLogout = () => {
    localStorage.clear()
    this.props.goToLoginPage()
    window.location.reload(true)
    }

  render() {
    const isLogged = localStorage.getItem("token") !== null

    const theme = createMuiTheme({
      overrides: {
        MuiButton: {
          text: {
            background: '#ed7f61',
            borderRadius: 3,
            border: 0,
            color: 'white',
            height: "45px",
            width: "100px",
            padding: '0 30px',
            fontFamily: "serif",
            fontSize: "16px",
            textTransform: "lowercase", 
            fontWeight: 900,
            '&:hover': {
              backgroundColor: "#F4A384",
              borderColor: '#0062cc',
              boxShadow: 'none',
            },
          },
        },
      },
    });
    

    return (
      <HeaderWrapper>
        <ImgContainer>
          <Img src={logo}
          onClick={this.props.goToLoginPage}
          />
        </ImgContainer>
        {isLogged ?                 
        <ButtonWrapper>
          <ThemeProvider theme={theme}>
            <Button
            onClick={this.toLogout}
            >
            Logout
            </Button>
          </ThemeProvider>
        </ButtonWrapper>
        :
        <ButtonWrapper>
          <SignUp
          onClick={this.props.toRenderSignUp}
          >Cadastre-se
          </SignUp>
        </ButtonWrapper>
        }
      </HeaderWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
      goToLoginPage: () => dispatch(push(routes.root)),
      toRenderSignUp: () => dispatch(toRenderSignUp(true))
    }
  }
  

  export default connect (null, mapDispatchToProps) (Header);


const HeaderWrapper = styled.div`
width:100%;
min-height: 40px;
display: flex;
justify-content: space-around;
align-items: center;
box-shadow: 0 0.1vw 1vw;
background: rgb(217, 217, 217);
background: linear-gradient(
90deg,
#ffffff 30%,
#D9D9D9 50%,
#ffffff 70%
);
`

const ImgContainer = styled.div`
  height: auto;
  padding-top: 4px;
`

const Img = styled.img`
  width: 100px;
  border-radius: 3px;
  height: 45px;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`
const SignUp = styled.div`
  text-align: center;
  font-size: 16px;
  color: #EC7D62;
  font-weight: 700;
  height: 70%;
  cursor: pointer;
  `

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #EC7D62;
  font-weight: 700;
  height: 70%;
  width: 100px;
  cursor: pointer;
  `

