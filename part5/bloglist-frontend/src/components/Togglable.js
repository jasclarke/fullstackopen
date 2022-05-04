import { useState, forwardRef, useImperativeHandle } from 'react'

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

export default Togglable