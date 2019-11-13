import React from "react"
import PropTypes from "prop-types"

import Typography from "@material-ui/core/Typography"
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

const NewBlog = ({ author, title, url, addBlog, newBlogRef }) => {
  const classes = useStyles()

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        {" "}
        Create New Blog{" "}
      </Typography>

      <form onSubmit={addBlog} ref={newBlogRef}>
        <Typography gutterBottom>
          <div>
            Title:
            <input {...title} />
          </div>
          <div>
            Author:
            <input {...author} />
          </div>
          <div>
            URL:
            <input {...url} />
          </div>
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            type="submit"
          >
            Create
          </Button>
        </Typography>
      </form>
    </div>
  )
}

NewBlog.propTypes = {
  NewBlogRef: PropTypes.object.isRequired,
  addBlog: PropTypes.func.isRequired,
}

export default NewBlog
