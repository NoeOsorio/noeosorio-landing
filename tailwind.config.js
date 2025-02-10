module.exports = {
  // ... resto de la configuración
  extend: {
    keyframes: {
      'fade-in': {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      'fade-in-up': {
        '0%': {
          opacity: '0',
          transform: 'translateY(20px)'
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)'
        },
      },
      scroll: {
        '0%': { transform: 'translateY(0)' },
        '100%': { transform: 'translateY(8px)' }
      }
    },
    animation: {
      'fade-in': 'fade-in 0.5s ease-out',
      'fade-in-up': 'fade-in-up 0.5s ease-out',
      'scroll': 'scroll 1s ease-in-out infinite alternate'
    }
  }
} 