import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Coffee, ArrowLeft } from 'lucide-react'

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-coffee-100/30 via-cream-100/20 to-coffee-200/30 dark:from-coffee-900/30 dark:via-coffee-800/20 dark:to-coffee-700/30" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-coffee-300/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-cream-300/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-2xl mx-auto"
      >
        <div className="glass rounded-3xl p-12">
          {/* Animated 404 */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-8xl md:text-9xl font-bold gradient-text mb-4">
              404
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Coffee className="h-16 w-16 text-coffee-500" />
            </motion.div>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-coffee-800 dark:text-cream-100 mb-4">
            Oops! Page Not Found
          </h1>
          
          <p className="text-lg text-coffee-600 dark:text-coffee-300 mb-8 leading-relaxed">
            Looks like this page went for a coffee break and never came back. 
            Don't worry, we'll help you find your way back to brewing amazing resumes!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center space-x-2"
              >
                <Home className="h-5 w-5" />
                <span>Go Home</span>
              </motion.button>
            </Link>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              className="btn-secondary flex items-center space-x-2"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Go Back</span>
            </motion.button>
          </div>

          {/* Fun Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-12 text-coffee-500 dark:text-coffee-400"
          >
            <div className="flex items-center justify-center space-x-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                  className="w-2 h-2 bg-coffee-400 rounded-full"
                />
              ))}
            </div>
            <p className="text-sm mt-4">
              Meanwhile, why not create an amazing resume?
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound