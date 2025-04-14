import React, { ReactElement } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram, FaTiktok } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

interface SocialLink {
  name: string;
  url: string;
  icon: ReactElement;
  color: string;
}

const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/noeosorioh/',
    icon: <FaLinkedin className="text-2xl" />,
    color: 'hover:bg-[#0077B5]'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/NoeOsorio',
    icon: <FaGithub className="text-2xl" />,
    color: 'hover:bg-[#333]'
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/noeosorio.dev',
    icon: <FaInstagram className="text-2xl" />,
    color: 'hover:bg-[#E4405F]'
  },
  {
    name: 'TikTok',
    url: 'https://www.tiktok.com/@noeosorio.dev',
    icon: <FaTiktok className="text-2xl" />,
    color: 'hover:bg-[#000000]'
  },
  {
    name: 'Email',
    url: 'mailto:business@noeosorio.com',
    icon: <MdEmail className="text-2xl" />,
    color: 'hover:bg-[#EA4335]'
  }
];

const Social = () => {
  return (
    <div className="min-h-screen py-20 px-4 flex flex-col items-center justify-center bg-zinc-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Profile Section */}
        <div className="text-center mb-8">
          <motion.img
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            src="/logo.png"
            alt="Noe Osorio Logo"
            className="w-32 h-32 mx-auto mb-4"
          />
          <h1 className="text-2xl font-bold text-white mb-2">Noe Osorio</h1>
          <p className="text-zinc-400 mb-4">Full Stack Developer & Tech Entrepreneur</p>
        </div>

        {/* Links Section */}
        <div className="space-y-4">
          {socialLinks.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex items-center justify-center gap-3 w-full p-4 rounded-lg 
                bg-zinc-800 text-white transition-all duration-300 
                ${link.color} hover:scale-105 transform`}
            >
              {link.icon}
              <span>{link.name}</span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Social; 