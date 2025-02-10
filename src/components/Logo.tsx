import androidChrome from '/android-chrome-192x192.png'

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src={androidChrome}
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