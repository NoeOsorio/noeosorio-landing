import { galaxy } from '../data/galaxy'
import { useMount } from '../useMount'
import { mountGalaxy } from './idea-galaxy.mount'
import './idea-galaxy.css'

export default function IdeaGalaxy() {
  return <section className="home-galaxy" aria-labelledby="home-galaxy-title" ref={useMount(mountGalaxy, galaxy)} />
}
