import React from "react"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
// import { makeStyles } from "@material-ui/core/styles"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

const UserList = props => {
  console.log("userlist's props.users: ", props.users)
  const displayUsers = () => {
    return props.users.map(user => (
      <TableRow key={user.id}>
        <TableCell>
          <Link to={`users/${user.id}`}>{user.name}</Link>
        </TableCell>
        <TableCell>{user.blogs.length}</TableCell>
      </TableRow>
    ))
  }
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Registered Users
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>User</strong>
              </TableCell>
              <TableCell>
                <strong>Blogs Created</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{displayUsers()}</TableBody>
        </Table>
      </Paper>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    users: state.users,
  }
}

export default connect(mapStateToProps)(UserList)
