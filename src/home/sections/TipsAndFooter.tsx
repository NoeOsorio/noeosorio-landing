import { useMount } from '../useMount'
import { tips } from '../data/tips'
import { mountClose } from './tips-footer.mount'
import './tips-footer.css'

export default function TipsAndFooter() {
  return <div className="home-close" ref={useMount(mountClose, tips)} />
}
