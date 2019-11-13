import React, { useState, useImperativeHandle } from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: "none",
  },
}))

const Togglable = React.forwardRef((props, ref) => {
  const classes = useStyles()
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? "none" : "" }
  const showWhenVisible = { display: visible ? "" : "none" }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          color="secondary"
          size="small"
          className={classes.button}
          onClick={toggleVisibility}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
})

export default Togglable
