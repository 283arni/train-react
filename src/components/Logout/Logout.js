import {Component} from 'react'
import {connect} from "react-redux";
import {logout} from "../../redux/actions/auth";
import {Redirect} from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    this.props.logout()
  }

  render() {
    return (
      <Redirect to="/"/>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout())
})

export default connect(null, mapDispatchToProps)(Logout)