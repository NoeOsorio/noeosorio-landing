import { useMount } from '../useMount'
import { learning } from '../data/learning'
import { mountLearning } from './learning-slot.mount'
import './learning-slot.css'

export default function LearningSlot() {
  return <section className="home-learning" ref={useMount(mountLearning, learning)} />
}
