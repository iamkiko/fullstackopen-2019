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
        <div>
          <Typography gutterBottom>
            Title:
            <input id="title" {...title} reset={null} />
          </Typography>
        </div>
        <div>
          <Typography gutterBottom>
            Author:
            <input id="author" {...author} reset={null} />
          </Typography>
        </div>
        <div>
          <Typography gutterBottom>
            URL:
            <input id="url" {...url} reset={null} />
          </Typography>
        </div>
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          type="submit"
          data-cy="createblog"
        >
          Create
        </Button>
      </form>
    </div>
  )
}

NewBlog.propTypes = {
  addBlog: PropTypes.func.isRequired,
}

export default NewBlog
