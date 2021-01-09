import classes from './MenuNav.module.css';
import {NavLink} from "react-router-dom";

const links = [
  {
    path: '/auth',
    content: 'Авторизация'
  },
  {
    path: '/',
    content: 'Список вопросов'
  },
  {
    path: '/quiz-creator',
    content: 'Создать вопрос'
  }
]

const MenuNav = (props) => {
  return (
    <nav className={`${classes.MenuNav} ${!props.isOpen ? classes.close : ''}`}>
      <ul>
        {
          links.map((link,index) => {
            return (
              <li key={`index-${link.path}`}>
                <NavLink
                  to={link.path}
                  activeClassName={classes.active}
                  onClick={() => props.onOpenMenuClick()}
                  exact
                >
                  {link.content}
                </NavLink>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}

export default  MenuNav;