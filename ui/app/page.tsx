"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { motion, useScroll, useTransform } from "framer-motion"
import { Activity, Heart, Shield, Zap, Award, Users, BarChart3, Clock } from "lucide-react"

function ClientOnly({ children, fallback = null }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  return isClient ? <>{children}</> : <>{fallback}</>
}

function AnimatedCounter({ value, duration = 2000 }: { value: string | number; duration?: number }) {
  const [count, setCount] = useState(0)
  const countRef = useRef(null)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView) {
      let start = 0
      const end = Number.parseInt(value as string)
      const increment = end / 100
      const timer = setInterval(() => {
        start += increment
        setCount(Math.floor(start))
        if (start >= end) {
          clearInterval(timer)
          setCount(end)
        }
      }, duration / 100)
      return () => clearInterval(timer)
    }
  }, [inView, value, duration])

  return (
    <div ref={ref}>
      <span ref={countRef} className="text-4xl font-bold text-white">
        {count.toLocaleString()}
      </span>
    </div>
  )
}

function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-75 md:opacity-100">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-80"></div>

      <ClientOnly>
        {Array.from({ length: 15 }).map((_, i) => {
          const size = Math.random() * 100 + 50
          const xPos = Math.random() * 100
          const yPos = Math.random() * 100
          const duration = Math.random() * 20 + 15
          const delay = Math.random() * 5

          return (
            <motion.div
              key={i}
              className="absolute rounded-full opacity-10"
              style={{
                width: size,
                height: size,
                left: `${xPos}%`,
                top: `${yPos}%`,
                background:
                  i % 2 === 0
                    ? "linear-gradient(to right, #3b82f6, #8b5cf6)"
                    : "linear-gradient(to right, #8b5cf6, #ec4899)",
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, Math.random() + 0.5, 1],
                rotate: [0, Math.random() * 360],
              }}
              transition={{
                duration: duration,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay,
              }}
            />
          )
        })}

        <div className="absolute inset-0" style={{ mixBlendMode: "overlay" }}>
          {Array.from({ length: 50 }).map((_, i) => {
            const size = Math.random() * 4 + 1
            const xPos = Math.random() * 100
            const yPos = Math.random() * 100
            const duration = Math.random() * 60 + 30
            const delay = Math.random() * 10

            return (
              <motion.div
                key={`particle-${i}`}
                className="absolute rounded-full bg-white"
                style={{
                  width: size,
                  height: size,
                  left: `${xPos}%`,
                  top: `${yPos}%`,
                  boxShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
                }}
                animate={{
                  y: [0, -Math.random() * 100 - 50],
                  opacity: [0, 0.8, 0],
                }}
                transition={{
                  duration: duration,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "linear",
                  delay: delay,
                }}
              />
            )
          })}
        </div>
      </ClientOnly>
    </div>
  )
}

export default function Home() {
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.2])
  const heroScale = useTransform(scrollY, [0, 300], [1, 0.95])

  const { ref: heroRef, inView: heroInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 md:py-32 overflow-hidden z-10">
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-12"
            style={{ opacity: heroOpacity, scale: heroScale }}
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="md:w-1/2 space-y-6 text-center md:text-left">
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Protect Your Heart,
                </span>
                <br />
                <span>Predict Your Risk</span>
              </motion.h1>
              <motion.p
                className="text-xl text-muted-foreground max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                CardioGuard helps you understand your heart health with advanced risk prediction and personalized
                insights.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Link
                  href="/predict"
                  className="px-8 py-3 text-white font-medium bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </Link>
                <Link
                  href="/analysis"
                  className="px-8 py-3 text-blue-600 font-medium bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>

            <motion.div
              className="md:w-1/2 relative w-full px-4 md:px-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
            >
              <div className="relative aspect-square max-w-[320px] md:max-w-[450px] mx-auto">
                {/* Card background with gradient and responsive shadow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl transform rotate-3 scale-95 opacity-70 shadow-lg"
                  animate={{ rotate: [3, -3, 3] }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                ></motion.div>

                {/* Heart container with hover effects */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {/* Permanent floating particles with increased visibility on hover */}
                  <div className="absolute inset-0 opacity-30 group-hover:opacity-100 transition-opacity duration-500">
                    <ClientOnly>
                      {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                          key={`heart-particle-${i}`}
                          className="absolute rounded-full bg-white"
                          style={{
                            width: Math.random() * 6 + 2,
                            height: Math.random() * 6 + 2,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
                          }}
                          animate={{
                            y: [0, -Math.random() * 50 - 20],
                            x: [0, (Math.random() - 0.5) * 30],
                            opacity: [0, 0.8, 0],
                            scale: [1, Math.random() + 0.5],
                          }}
                          transition={{
                            duration: Math.random() * 2 + 1,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "loop",
                            ease: "easeOut",
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </ClientOnly>
                  </div>

                  {/* Enhanced heart animation container */}
                  <div className="relative w-3/4 h-3/4 z-10">
                    {/* Pulsating glow effect */}
                    <motion.div
                      className="absolute inset-0 rounded-full bg-red-400/20 blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.4, 0.7, 0.4],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    />

                    {/* Heart icon with realistic beating animation */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{
                        scale: [1, 1.15, 0.95, 1.05, 1],
                      }}
                      transition={{
                        duration: 1.2,
                        times: [0, 0.2, 0.35, 0.5, 0.8],
                        repeat: Number.POSITIVE_INFINITY,
                        ease: [0.32, 0.72, 0.29, 1.04],
                      }}
                    >
                      <Heart
                        className="h-full w-full"
                        strokeWidth={1.5}
                        fill="rgba(239, 68, 68, 0.6)"
                        stroke="rgba(220, 38, 38, 0.8)"
                      />
                    </motion.div>

                    {/* Animated blood flow effect */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center opacity-70"
                      animate={{
                        opacity: [0.7, 0.9, 0.7],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/10 to-transparent rounded-full blur-md" />
                    </motion.div>

                    {/* ECG line animation with improved visibility */}
                    <motion.div
                      className="absolute inset-x-0 top-1/2 flex items-center justify-center"
                      animate={{
                        y: [0, -5, 10, -8, 0],
                        opacity: [0.7, 1, 1, 0.9, 0.7],
                      }}
                      transition={{
                        duration: 1.2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                    >
                      <Activity
                        className="h-1/2 w-1/2 text-blue-600 filter drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                        strokeWidth={2.5}
                      />
                    </motion.div>

                    {/* Enhanced glowing effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      animate={{
                        boxShadow: [
                          "0 0 15px 5px rgba(239, 68, 68, 0.3)",
                          "0 0 20px 8px rgba(239, 68, 68, 0.5)",
                          "0 0 15px 5px rgba(239, 68, 68, 0.3)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                    />
                  </div>
                </motion.div>

                {/* Responsive pulse rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[1, 2, 3].map((i) => (
                    <motion.div
                      key={`pulse-ring-${i}`}
                      className="absolute rounded-full border border-red-400/30"
                      initial={{ width: "60%", height: "60%", opacity: 0.8 }}
                      animate={{
                        width: ["60%", "90%"],
                        height: ["60%", "90%"],
                        opacity: [0.8, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.6,
                        ease: "easeOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white/70 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose CardioGuard?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive approach to heart health combines medical expertise with advanced technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10 text-blue-600" />,
                title: "Accurate Prediction",
                description: "Our algorithm is based on extensive medical research and validated clinical data.",
              },
              {
                icon: <Zap className="h-10 w-10 text-purple-600" />,
                title: "Instant Results",
                description: "Get your heart attack risk assessment in seconds, not days or weeks.",
              },
              {
                icon: <Heart className="h-10 w-10 text-red-500" />,
                title: "Personalized Insights",
                description: "Receive tailored recommendations based on your unique health profile.",
              },
              {
                icon: <Award className="h-10 w-10 text-yellow-500" />,
                title: "Expert Backed",
                description: "Developed in collaboration with cardiologists and health researchers.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
              >
                <div className="bg-white p-3 rounded-full w-16 h-16 flex items-center justify-center mb-4 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-gradient-to-br from-blue-600 to-purple-600 text-white relative z-10">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <ClientOnly>
            {Array.from({ length: 20 }).map((_, i) => {
              const size = Math.random() * 10 + 5
              const xPos = Math.random() * 100
              const yPos = Math.random() * 100

              return (
                <motion.div
                  key={`stat-particle-${i}`}
                  className="absolute rounded-full bg-white"
                  style={{
                    width: size,
                    height: size,
                    left: `${xPos}%`,
                    top: `${yPos}%`,
                  }}
                  animate={{
                    y: [0, -100],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 10 + 10,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "linear",
                    delay: Math.random() * 5,
                  }}
                />
              )
            })}
          </ClientOnly>
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Making a Difference</h2>
            <p className="text-xl max-w-2xl mx-auto opacity-90">
              Join thousands of users who are taking control of their heart health with CardioGuard.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: <Users className="h-10 w-10 text-white opacity-80" />,
                value: "25000",
                label: "Active Users",
              },
              {
                icon: <BarChart3 className="h-10 w-10 text-white opacity-80" />,
                value: "150000",
                label: "Predictions Made",
              },
              {
                icon: <Heart className="h-10 w-10 text-white opacity-80" />,
                value: "85",
                label: "Accuracy Rate (%)",
              },
              {
                icon: <Clock className="h-10 w-10 text-white opacity-80" />,
                value: "12",
                label: "Months of Research",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <AnimatedCounter value={stat.value} />
                <p className="text-lg mt-2 text-white">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-20 bg-gray-50 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What People Are Saying</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hear from healthcare professionals and users who trust CardioGuard.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote:
                  "CardioGuard has transformed how I discuss heart health with my patients. It's an invaluable tool for risk awareness.",
                author: "Dr. Sarah Johnson",
                title: "Cardiologist",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                quote:
                  "After using CardioGuard, I made lifestyle changes that significantly improved my heart health metrics. It was the wake-up call I needed.",
                author: "Michael Chen",
                title: "User",
                image: "https://plus.unsplash.com/premium_photo-1661578535048-7a30e3a71d25?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                quote:
                  "The detailed analysis provided by CardioGuard helps us create more targeted prevention programs for at-risk communities.",
                author: "Lisa Rodriguez",
                title: "Public Health Specialist",
                image: "https://images.unsplash.com/photo-1659353888906-adb3e0041693?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <div className="mb-4">
                  <svg className="h-8 w-8 text-blue-400" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-muted-foreground mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.author}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white/70 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 shadow-xl overflow-hidden relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
              <ClientOnly>
                {Array.from({ length: 5 }).map((_, i) => {
                  const size = Math.random() * 200 + 100
                  const xPos = Math.random() * 100
                  const yPos = Math.random() * 100

                  return (
                    <motion.div
                      key={`cta-shape-${i}`}
                      className="absolute rounded-full bg-white opacity-10"
                      style={{
                        width: size,
                        height: size,
                        left: `${xPos}%`,
                        top: `${yPos}%`,
                      }}
                      animate={{
                        x: [0, Math.random() * 100 - 50],
                        y: [0, Math.random() * 100 - 50],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: Math.random() * 20 + 20,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                        ease: "easeInOut",
                      }}
                    />
                  )
                })}
              </ClientOnly>
            </div>

            <div className="max-w-3xl mx-auto text-center text-white relative">
              <motion.h2
                className="text-3xl md:text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Ready to Take Control of Your Heart Health?
              </motion.h2>
              <motion.p
                className="text-xl opacity-90 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Get your personalized heart attack risk assessment in minutes.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <Link
                  href="/predict"
                  className="inline-block px-8 py-3 bg-white text-blue-600 font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Start Your Assessment
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
