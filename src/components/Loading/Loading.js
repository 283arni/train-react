import classes from './Loading.module.css'

const Loading = () => {
  return (
    <div className={classes.align}>
      <div className={classes.snippet}>
        <div className={classes.Loading}>
          <div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading;
