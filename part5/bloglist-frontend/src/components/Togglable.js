import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = forwardRef((props, ref) => {
    const [contentVisiblility, setContentVisibility] = useState(false)

    const toggleButton = { display: contentVisiblility ? 'none' : '' }
    const content = { display: contentVisiblility ? '' : 'none' }

    const toggle = () => setContentVisibility(!contentVisiblility)

    useImperativeHandle(ref, () => {
        return {toggle}
    })

    return (
        <div>
            <div style={toggleButton}>
                <button onClick={toggle}>{props.buttonLabel}</button>
            </div>
            <div style={content}>
                {props.children}
                <button onClick={toggle}>Cancel</button>
            </div>
        </div>
    )
})

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
}

export default Togglable