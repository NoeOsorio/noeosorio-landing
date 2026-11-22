import { useMount } from '../useMount'
import { mountStarField } from './star-field.mount'
import './star-field.css'

export default function StarField() {
  return <div className="home-stars" aria-hidden="true" ref={useMount(mountStarField, null)} />
}
