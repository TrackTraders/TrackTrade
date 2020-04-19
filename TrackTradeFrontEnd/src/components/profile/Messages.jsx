import React, { Component } from "react";
import actions from "../../services/index";

// redux imports
import { connect } from "react-redux";
import { fetchAllTraders, fetchAllMessages, sendMessage } from "../../actions";
import { checkLogin } from "../../actions/auth";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
    this.state = {};
  }

  async componentDidMount() {
    await this.props.fetchAllTraders();
    await this.props.fetchAllMessages();

    await this.props.checkLogin();

    let actualMessages = this.props.allMessages.data.filter((eachMessage) => {
      return (
        eachMessage.sender === this.props.user.data._id ||
        eachMessage.receiver === this.props.user.data._id
      );
    });
    this.setState({ actualMessages });


  }

  formatTime = (time) => String(new Date(time)).substring(0, 24);

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  sendMessage = async (e) => {
    e.preventDefault();
    console.log(this.state);
    this.input.current.value = "";
    try {
      await this.props.sendMessage({
        message: this.state.message,
        otherProfile: this.state.selectedProfile._id,
      });
      await this.props.fetchAllMessages();
      await this.props.checkLogin();
      console.log("props", this.props)
    } catch (err) {
      console.log(err);
    }
    if (this.props.user.data) {
      let actualMessages = this.props.allMessages.data.filter((eachMessage) => {
        return (
          eachMessage.sender === this.props.user.data._id ||
          eachMessage.receiver === this.props.user.data._id
        );
      });
      this.setState({ actualMessages });
    }
  };

  selectProfile = () => {
    if (this.props.allTraders && this.props.user.data) {
      let copyTraders = [...this.props.allTraders.data];
      let filteredTraders = copyTraders.filter((eachTrader) => {
        return this.props.user.data.connections.includes(eachTrader._id);
        //loop through this.props.user to get connections and
        //only return those that match you know
      });
      return filteredTraders.map((eachOne) => {
        if (this.state.selectedProfile === eachOne) {
          return (
            <a
              className="connections-container-each-active"
              href="#chatbox"
              onClick={() => {
                this.setState({ selectedProfile: eachOne });
                console.log(this.state.selectedProfile);
              }}
            >
              {this.imageMessagesLoad(eachOne)}
              {eachOne.username}
            </a>
          );
        } else {
          return (
            <a
              className="connections-container-each"
              href="#chatbox"
              onClick={() => {
                this.setState({ selectedProfile: eachOne });
                console.log(this.state.selectedProfile);
              }}
            >
              {this.imageMessagesLoad(eachOne)}
              <span>{eachOne.username}</span>
            </a>
          );
        }
      });
    }
  };

  imageMessagesLoad = (profile) => {
    if (profile) {
      return profile.avatar ? (
        <img
          className="connections-container-each-avatar"
          src={profile.avatar}
          alt="Avatar"
        />
      ) : (
        <div className="connections-container-each-avatar-default"></div>
      );
    }
  };

  imageLoad = () => {
    if (this.state.selectedProfile) {
      return this.state.selectedProfile.avatar ? (
        <img
          className="profile-nav__user-avatar__image"
          src={this.state.selectedProfile.avatar}
          alt="Avatar"
        />
      ) : (
        <div className="profile-nav__user-avatar__image-default"></div>
      );
    }
  };

  showMessages = () => {
    if (this.state.selectedProfile) {
      return (
        <div className="chatbox" id="chatbox">
          <div className="chatbox__content" id="content">
            <div className="chatbox__top">
              <div className="chatbox__top-avatar profile-nav__user-avatar">
                {this.imageLoad()}
                <div className="profile-nav__user-avatar__image-default"></div>
              </div>
              <h1 className="profile-nav__user-username">
                {this.state.selectedProfile.username}
              </h1>
            </div>
            <div className="chatbox__middle">
              <div className="chatbox__middle-content">
                <a
                  href="#main"
                  onClick={() => this.setState({ selectedProfile: null })}
                  className="chatbox__close"
                >
                  &times;
                </a>

                {this.props.allMessages.data.map((eachMessage) => {
                  if (
                    eachMessage.sender === this.props.user.data._id &&
                    eachMessage.receiver === this.state.selectedProfile._id
                  ) {
                    return (
                      <div className="chatbox__middle-bubble chatbox__middle-bubble-sender">
                        {eachMessage.content}
                      </div>
                    );
                  } else if (
                    eachMessage.receiver === this.props.user.data._id &&
                    eachMessage.sender === this.state.selectedProfile._id
                  ) {
                    return (
                      <div className="chatbox__middle-bubble chatbox__middle-bubble-receiver">
                        {eachMessage.content}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
            <div className="chatbox__bottom">
              <form
                onSubmit={this.sendMessage}
                className="chatbox__bottom-form"
              >
                <textarea
                  onChange={this.handleChange}
                  ref={this.input}
                  type="text"
                  name="message"
                  className="chatbox__bottom-form-message"
                  placeholder="Type your message"
                  required
                />
                <button className="chatbox__bottom-form-submit" type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  };

  render() {
    // this.updateMessages()
    return (
      <div className="connections">
        <div className="connections-container">{this.selectProfile()}</div>
        <div className="connections-card">
          <div className="trade-ideas">{this.showMessages()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allTraders: state.allTraders,
    allMessages: state.allMessages,
    user: state.checkLogin,
    sendMessage: state.sendMessage
  };
};

export default connect(mapStateToProps, {
  fetchAllTraders,
  fetchAllMessages,
  checkLogin,
  sendMessage
})(Messages);
