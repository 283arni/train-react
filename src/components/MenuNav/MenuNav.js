import classes from './MenuNav.module.css';
import {NavLink} from "react-router-dom";



const MenuNav = (props) => {
  let links = [
    {
      path: '/auth',
      content: 'Авторизация'
    },
    {
      path: '/',
      content: 'Список вопросов'
    }
  ]

  if (props.isAuth) {
    links = [
      {
        path: '/',
        content: 'Список вопросов'
      },
      {
        path: '/quiz-creator',
        content: 'Создать вопрос'
      },
      {
        path: '/logout',
        content: 'Выйти'
      }
    ]
  }

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