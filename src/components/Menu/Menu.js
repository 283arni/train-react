import classes from './Menu.module.css'

const Menu = ({onOpenMenuClick, isOpen}) => {
  const classIcon = isOpen ? 'fas fa-times '  + classes.open : 'fas fa-bars'

  return (
    <i
      className={`${classes.Menu} ${classIcon}`}
      onClick={() => onOpenMenuClick()}
    />
  )
}

export  default Menu;