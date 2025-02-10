import favicon from '../assets/favicon.ico'

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src={favicon} 
        alt="Logo" 
        className="w-8 h-8 object-contain"
      />
      <span className="font-bold text-white text-xl">
        Noé Osorio
      </span>
    </div>
  )
}

export default Logo 