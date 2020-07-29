import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { routes } from "../Router";
import { createPost, getAllPosts } from "../../actions/post";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import LoadingRing from "../../components/LoadingRing";
import PostList from "../PostList/PostList";
import { blue } from "@material-ui/core/colors";

class FeedPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      title: "",
      searchInput: "",
    };
  }

  componentDidMount() {
    const token = window.localStorage.getItem("token");
    if (!token) {
      this.props.goToLoginPage();
    }
    this.props.getAllPosts();
  }

  handleFieldChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCreatePost = () => {
    this.props.createPost(this.state.text, this.state.text);
    this.setState({ text: "" });
    this.setState({ title: "" });
  };

  render() {
    const { text } = this.state;
    const { allPosts } = this.props;

    const theme = createMuiTheme({
      overrides: {
        MuiTextField: {
          root: {
            width: "60%",
            margin: "2vw 0 1vw 0",
            padding: "2vw 1vw",
            color: "#F4A384",
            borderRadius: "4px",
            alignSelf: "center",
          },
        },
        MuiButton:{
          contained:{
            color: "white",
            backgroundColor: "#79a3eb",
            borderRadius: "4px",
            alignSelf: "center",
          }
        }
      },

    });

    return (
      <FeedPageWrapper>
        <PostWrapper>
          <ThemeProvider theme={theme}>
            <TextField
              onChange={this.handleFieldChange}
              name="text"
              type="text"
              label="O que você está pensando?"
              value={text}
              multiline
              rowsMax={10}
            />
            <Button
              variant="contained"
              size="medium"
              onClick={this.handleCreatePost}
            >
              Postar
            </Button>
          </ThemeProvider>
        </PostWrapper>
        {allPosts ? (
          <PostListWrapper>
            <PostList />
          </PostListWrapper>
        ) : (
          <PostListWrapper>
            <LoadingRing />
            <p>Aguarda um Cadim!</p>
          </PostListWrapper>
        )}
      </FeedPageWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  allPosts: state.posts.allPosts.posts,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: (text, tittle) => dispatch(createPost(text, tittle)),
    goToLoginPage: () => dispatch(push(routes.root)),
    goToPostDetailsPage: () => dispatch(push(routes.postDetails)),
    getAllPosts: () => dispatch(getAllPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedPage);

const FeedPageWrapper = styled.div`
  gap: 10px;
  place-content: start center;
  display: grid;
  width: 100vw;
  height: auto;
  min-height: 75vh;
`;

const PostWrapper = styled.div`
  min-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 40vw;
  height: auto;
  box-shadow: 1px 1px 5px #F4A384;
  margin: 30px 0 0 0;
  padding: 10px;
`;

const PostListWrapper = styled.div`
  min-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 40vw;
  height: auto;
`;
