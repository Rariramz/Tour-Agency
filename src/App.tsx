import cls from './styles.module.scss'
import globe from './globe.svg'

export const App = () => {
  return <h1 className={cls.h1} >APP<img src={globe} width={50} /></h1>
}
