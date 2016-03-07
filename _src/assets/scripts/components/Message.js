import React from 'react'
import cn from 'classnames'

class Message extends React.Component {
    constructor ( props ) {
        super( props )
        this.state = {
            mouseMoved: false
        }
    }

    handleMouseMove ( e ) {
        this.setState({ mouseMoved: true })
        let x = e.pageX / 50
        let y = e.pageY / 50
        const _this = e.currentTarget
        _this.style.backgroundPosition = `${ x }px ${ y }px`
    }

    render () {
        return (
            <div
                className="Message" onMouseMove={ this.handleMouseMove.bind( this ) } >
                <MessageInner />
            </div>
        )
    }

}

class MessageInner extends React.Component {
    constructor ( props ) {
        super ( props )

        this.state = {
            isHoverd: false
        }
    }

    handleMouseOver () {
        this.setState({ isHovered: true })
    }

    handleMouseOut () {
        this.setState({ isHovered: false })
    }

    render () {
        let msgClass = cn({
            'Message-inner': true,
            '__is-hovered': this.state.isHovered
        })
        return (
            <div
                className={ msgClass }
                onMouseOver={ this.handleMouseOver.bind( this ) }
                onMouseOut={ this.handleMouseOut.bind( this ) } >
                <h1>ECMA6imize</h1>
                <p>This is a site generator</p>
            </div>
        )
    }
}

export default Message
