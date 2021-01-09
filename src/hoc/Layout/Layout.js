import {Component} from 'react';
import classes from './Layout.module.css'
import Menu from "../../components/Menu/Menu";
import MenuNav from "../../components/MenuNav/MenuNav";

class Layout extends Component {

  state = {
    isOpen: false
  }

  handleOpenMenuClick = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    return (
      <div className={classes.Layout}>
        <MenuNav
          isOpen={this.state.isOpen}
          onOpenMenuClick={this.handleOpenMenuClick}
        />
        <div className={classes.nav}>
          <Menu
            onOpenMenuClick={this.handleOpenMenuClick}
            isOpen={this.state.isOpen}
          />
        </div>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}

export default Layout;
