import classes from './MenuNav.module.css';

const links = [1, 2, 3]

const MenuNav = (props) => {
  return (
    <nav className={`${classes.MenuNav} ${!props.isOpen ? classes.close : ''}`}>
      <ul>
        {
          links.map((link) => {
            return (
              <li key={link}>
                <a href="/">link to {link}</a>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}

export default  MenuNav;