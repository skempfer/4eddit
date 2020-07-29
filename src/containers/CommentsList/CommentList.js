import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { green } from '@material-ui/core/colors';
import CardActions from '@material-ui/core/CardActions';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import UpVote from "@material-ui/icons/ThumbUp";
import UpVoteOutlined from "@material-ui/icons/ThumbUpOutlined";
import DownVote from "@material-ui/icons/ThumbDown";
import DownVoteOutlined from "@material-ui/icons/ThumbDownOutlined";
import { getPostVoteComment } from '../../actions/postDetails'
import LoadingRing from "../../components/LoadingRing";

class CommentsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      posts: [],
      postDetails:{},
    };
  }

  clickVoteComment = (postId, commentId, direction) => {
    this.props.getPostVoteComment(postId, commentId, direction);
  }

  render() {
    const { postDetails } = this.props

    const useStyles = makeStyles((theme) => ({
      root: {
        maxWidth: 345,
      },      
      avatar: {
        backgroundColor: green[500],
      },
    }));

    const theme = createMuiTheme({
      overrides: {
        MuiCard: {
          root: {
            margin: "2vw",
            boxShadow: "0.1vw -0.1vw 0.5vw",
            width: '100%',
          },
        },
      },
    });

    return (
          <CommentsListWrapper>
            {postDetails.comments ? postDetails.comments
            .sort((commentA, commentB) => commentB.votesCount - commentA.votesCount)
            .map(comment =>(
            <ThemeProvider theme={theme}>
              <Card 
                key={comment.id}
              >
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={useStyles.avatar}></Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={comment.username}   
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                    {comment.text} 
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing >
                    <IconButton 
                        aria-label="DisLiked comment"                    
                      >                             
                        {comment.userVoteDirection === 1 ? (
                          <UpVote
                          onClick = {() => this.clickVoteComment(postDetails.id, comment.id, 0)}
                          /> 
                          ):( 
                          <UpVoteOutlined
                          onClick = {() => this.clickVoteComment(postDetails.id, comment.id, 1)}
                          />
                          )}          
                      </IconButton>
                      <IconButton 
                        aria-label="DisLiked comment"                    
                      >
                        {comment.userVoteDirection === -1 ? (
                          <DownVote 
                          onClick = {() => this.clickVoteComment(postDetails.id, comment.id, 0)}
                          />
                          ):(
                          <DownVoteOutlined 
                          onClick = {() => this.clickVoteComment(postDetails.id, comment.id, -1)}
                          />
                          )}
                      </IconButton> 
                      <Typography>{comment.votesCount}</Typography> 
                      <Typography>Likes</Typography>                    
                  </CardActions>
                </Card>
                </ThemeProvider>
                )) : 
                <LoadingRing/>}
          </CommentsListWrapper>
    );
  }
}

const mapStateToProps = state => ({
  postDetails: state.posts.postDetails,
});

const mapDispatchToProps = (dispatch) => ({
  getPostVoteComment: (postId, commentId, direction) => dispatch(getPostVoteComment(postId, commentId, direction)),
})

export default connect (mapStateToProps, mapDispatchToProps) (CommentsList);

const CommentsListWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 10vw;
  padding: 3vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
