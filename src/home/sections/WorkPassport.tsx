import { passport } from '../data/passport'
import { useMount } from '../useMount'
import { mountPassport } from './work-passport.mount'
import './work-passport.css'

export default function WorkPassport() {
  return <section className="home-passport" ref={useMount(mountPassport, passport)} />
}
