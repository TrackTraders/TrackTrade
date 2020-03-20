import React, { Component } from 'react'
import actions from '../../services/index'

export default class Messages extends Component {
    
    constructor(props){
        super(props)
            this.input=React.createRef()
            this.state = {}
    }

    async componentDidMount() {
        let allTraders = await actions.getAllTraders();
        this.setState({allTraders: allTraders.data})

        let allMessages = await actions.getAllMessages();
        this.setState({allMessages: allMessages.data})

        
        let user = await actions.isLoggedIn()
        this.setState({userData: user.data})
        
        let actualMessages = this.state.allMessages.filter(eachMessage =>{
            return eachMessage.sender === this.state.userData._id || eachMessage.receiver === this.state.userData._id
        })
        this.setState({actualMessages})

        console.log(this.state)
    }

    // updateMessages = async () => {
    //     if(this.state.userData){
    //         setInterval(async ()=>{
    //             let allMessages = await actions.getAllMessages();
    //             this.setState({allMessages: allMessages.data})
        
    //             let actualMessages = this.state.allMessages.filter(eachMessage =>{
    //                 return eachMessage.sender === this.state.userData._id || eachMessage.receiver === this.state.userData._id
    //             })
    //             this.setState({actualMessages})
    
    //         }, 500)

    //     }

    // }

    formatTime = (time) => String(new Date(time)).substring(0,24)

    handleChange = (e) =>{
        this.setState({
          [e.target.name] : e.target.value
        })
    }

    sendMessage = async (e) => {
        e.preventDefault()
        console.log(this.state)
        this.input.current.value = '';
        try {
            await actions.sendMessage({message: this.state.message, otherProfile: this.state.selectedProfile._id});
        }
        catch(err) {console.log(err)}
        if(this.state.userData){
            let allMessages = await actions.getAllMessages();
            this.setState({allMessages: allMessages.data})
    
            let actualMessages = this.state.allMessages.filter(eachMessage =>{
                return eachMessage.sender === this.state.userData._id || eachMessage.receiver === this.state.userData._id
            })
            this.setState({actualMessages})
        }
    }

    selectProfile = () => {
        if(this.state.allTraders && this.state.userData){
            let copyTraders = [...this.state.allTraders]
            let filteredTraders = copyTraders.filter(eachTrader => {
                return this.state.userData.connections.includes(eachTrader._id)
                //loop through this.props.user to get connections and
                //only return those that match you know
            })
            return filteredTraders.map(eachOne=>{
                if(this.state.selectedProfile === eachOne){
                    return (
                        <a className="connections-container-each-active" href="#chatbox" onClick={() => {
                            this.setState({selectedProfile: eachOne})
                            console.log(this.state.selectedProfile)
                        }}>{eachOne.username}</a>
                    )
                }
                else {
                    return (
                        <a className="connections-container-each" href="#chatbox" onClick={() => {
                            this.setState({selectedProfile: eachOne})
                            console.log(this.state.selectedProfile)
                        }}>{eachOne.username}</a>
                    )

                }

            })
            
        }
    }

    imageLoad = () => {
        if(this.state.selectedProfile){
            return this.state.selectedProfile.avatar ?
            <img className="profile-nav__user-avatar__image" src={this.state.selectedProfile.avatar} alt="Avatar"/>
            :
            <div className="profile-nav__user-avatar__image-default"></div>
        }
               
    }

    showMessages = () => {
        if(this.state.selectedProfile){
        
            return (
                    <div className="chatbox" id="chatbox">
                        <div className="chatbox__content" id="content">
                            <div className="chatbox__top">
                                <div className="chatbox__top-avatar profile-nav__user-avatar">
                                {this.imageLoad()}
                                <div className="profile-nav__user-avatar__image-default"></div>
                            </div>
                            <h1 className="profile-nav__user-username">{this.state.selectedProfile.username}</h1>
                            </div>
                            <div className="chatbox__middle">
                                <div className="chatbox__middle-content">
                                <a href="#main" onClick={()=>this.setState({selectedProfile: null})} className="chatbox__close">&times;</a>

                                    {this.state.actualMessages.map(eachMessage => {
                                        if(eachMessage.sender === this.state.userData._id && eachMessage.receiver === this.state.selectedProfile._id){
                                            return (
                                                <div className="chatbox__middle-bubble chatbox__middle-bubble-sender">
                                                    {eachMessage.content}
                                                </div>
                                            )
                                        }
                                        else if(eachMessage.receiver === this.state.userData._id && eachMessage.sender === this.state.selectedProfile._id){
                                            return (
                                                <div className="chatbox__middle-bubble chatbox__middle-bubble-receiver">
                                                    {eachMessage.content}
                                                </div>
                                            )
                                        }
                                    })}
                                    
                                    
                                </div>
                            </div>
                            <div className="chatbox__bottom">
                                <form onSubmit={this.sendMessage} className="chatbox__bottom-form">
                                    <textarea onChange={this.handleChange} ref={this.input} type="text" name="message" className="chatbox__bottom-form-message" placeholder="Type your message" required />
                                    <button className="chatbox__bottom-form-submit" type="submit">Send</button>
                                </form>
                            </div>
                        </div>
                        
                    </div>
                )

        }
    }

    render() {
        // this.updateMessages()
        return (
            <div className="connections">
                <div className="connections-container">
                    {this.selectProfile()}
                </div>
                <div className="connections-card">
                    <div className="trade-ideas">
                        {this.showMessages()}            
                    </div>
                </div>
            </div>
        )
    }
}
