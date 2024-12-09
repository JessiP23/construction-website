import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send } from 'lucide-react'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'
import emailjs from '@emailjs/browser'

export const CTAModal = ({ isOpen, onClose, theme }) => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { width, height } = useWindowSize()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Configure EmailJS with your service details
      await emailjs.send(
        'titino-home-improvement',     // Replace with your EmailJS service ID
        'template_oamt5bk',    // Replace with your EmailJS template ID
        {
          from_email: email,
          message: message,
          reply_to: email
        },
        'nQhnYhzEyRIz91h0I'      // Replace with your EmailJS public key
      )

      setIsSubmitted(true)
      setIsLoading(false)
      
      // Reset form after some time
      setTimeout(() => {
        setIsSubmitted(false)
        setEmail('')
        setMessage('')
        onClose()
      }, 3000)
    } catch (error) {
      console.error('Email send failed:', error)
      setIsLoading(false)
      // Optionally, you could add an error state to show a message to the user
    }
  }

  if (!isOpen) return null

  return (
    <>
      {isSubmitted && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
        />
      )}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 z-[100] flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className={`
            w-full max-w-md 
            ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
            rounded-2xl 
            shadow-2xl 
            p-8 
            relative
          `}
        >
          <button 
            onClick={onClose} 
            className={`
              absolute top-4 right-4 
              ${theme === 'dark' ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
              transition-colors duration-300
            `}
          >
            <X className="w-6 h-6" />
          </button>

          <AnimatePresence>
            {!isSubmitted ? (
              <motion.form 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Contact Us
                </h2>

                <div className="space-y-2">
                  <label 
                    htmlFor="email" 
                    className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Your Email
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`
                      w-full px-4 py-2 rounded-lg 
                      ${theme === 'dark' 
                        ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500'}
                      border focus:outline-none focus:ring-2
                    `}
                    placeholder="you@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label 
                    htmlFor="message" 
                    className={`block ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Your Message
                  </label>
                  <textarea 
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={4}
                    className={`
                      w-full px-4 py-2 rounded-lg 
                      ${theme === 'dark' 
                        ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500' 
                        : 'bg-gray-100 text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500'}
                      border focus:outline-none focus:ring-2
                    `}
                    placeholder="Tell us about your home improvement project..."
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="
                    w-full py-3 
                    bg-[#3f3def] text-white 
                    rounded-full 
                    hover:bg-[#2c1810] 
                    transition-colors 
                    flex items-center justify-center 
                    space-x-2
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  {isLoading ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-4"
              >
                <h2 className="text-2xl font-bold">Thank You!</h2>
                <p>Your inquiry has been sent. We will get back to you soon!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  )
}