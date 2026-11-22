import { useMount } from '../useMount'
import { learning } from '../data/learning'
import { mountLearning } from './learning-player.mount'
import './learning-player.css'

export default function LearningPlayer() {
  return <section className="home-learning" ref={useMount(mountLearning, learning)} />
}
