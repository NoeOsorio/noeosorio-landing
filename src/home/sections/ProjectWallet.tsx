import { wallet } from '../data/wallet'
import { useMount } from '../useMount'
import { mountWallet } from './project-wallet.mount'
import './project-wallet.css'

export default function ProjectWallet() {
  return <section className="home-wallet" ref={useMount(mountWallet, wallet)} />
}
