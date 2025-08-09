"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Car,
  MapPin,
  Clock,
  QrCode,
  Users,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
  Calendar,
  Smartphone,
  Activity,
  Award,
  HeartHandshake,
  Play,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  const router = useRouter();
  //const [activeFeature, setActiveFeature] = useState(0);
  // Hero statistics
  const stats = [
    {
      label: "Parking Slots",
      value: "500+",
      icon: <Car className="h-5 w-5" />,
    },
    {
      label: "Daily Users",
      value: "2,000+",
      icon: <Users className="h-5 w-5" />,
    },
    {
      label: "Success Rate",
      value: "99.9%",
      icon: <CheckCircle className="h-5 w-5" />,
    },
    {
      label: "Avg. Wait Time",
      value: "< 2min",
      icon: <Clock className="h-5 w-5" />,
    },
  ];

  // Core features
  const features = [
    {
      icon: <QrCode className="h-6 w-6" />,
      title: "QR Code Entry",
      description:
        "Instant entry with secure QR codes generated for each booking",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-Time Availability",
      description: "Live slot availability with instant booking confirmation",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Mobile Optimized",
      description: "Book and manage parking from your smartphone anywhere",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Supervisor Assignment",
      description:
        "Automated supervisor assignment for seamless parking experience",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
    },
  ];

  // How it works steps
  const steps = [
    {
      step: "01",
      title: "Select Date & Time",
      description:
        "Choose your preferred parking date and time slot using our easy calendar system",
      icon: <Calendar className="h-8 w-8" />,
    },
    {
      step: "02",
      title: "Enter Vehicle Details",
      description:
        "Provide your vehicle information for registration and security purposes",
      icon: <Car className="h-8 w-8" />,
    },
    {
      step: "03",
      title: "Get QR Code",
      description:
        "Receive your unique QR code for quick and secure parking entry",
      icon: <QrCode className="h-8 w-8" />,
    },
    {
      step: "04",
      title: "Park & Enjoy",
      description:
        "Use your QR code at the entry gate and enjoy hassle-free parking",
      icon: <CheckCircle className="h-8 w-8" />,
    },
  ];

  // Benefits
  const benefits = [
    "No more circling around looking for parking",
    "Guaranteed parking slot with advance booking",
    "24/7 customer support and assistance",
    "Secure payment gateway integration",
    "Real-time notifications and updates",
    "Digital receipt and booking history",
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Pradeep Silva",
      role: "Daily Commuter",
      comment:
        "QSmartPark has transformed my daily commute. No more stress about finding parking at MMTC!",
      rating: 5,
      avatar: "PS",
    },
    {
      name: "Madhavi Perera",
      role: "Business Traveler",
      comment:
        "The QR code system is brilliant. Quick entry, no queues, perfect for busy schedules.",
      rating: 5,
      avatar: "MP",
    },
    {
      name: "Kasun Fernando",
      role: "Transport Manager",
      comment:
        "Excellent system for managing large vehicle fleets. The admin portal is very comprehensive.",
      rating: 5,
      avatar: "KF",
    },
  ];

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hiddeninset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 ">
          {/* Background */}
          <div className="absolute max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            ></div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
              <Badge className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm">
                <MapPin className="h-3 w-3 mr-2" />
                Makumbura Multimodal Transport Center
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Smart Parking for
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Modern Sri Lanka
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Experience the future of parking at MMTC with QR code entry,
                real-time availability, and seamless booking system designed for
                Sri Lankan commuters.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Button
                  size="lg"
                  onClick={() => router.push("/booking")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
                >
                  <Car className="h-5 w-5 mr-2" />
                  Book Parking Now
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </Button>
              </div>

              {/* Hero Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                  >
                    <div className="flex items-center justify-center mb-3">
                      <div className="p-2 bg-white/20 rounded-lg text-blue-300">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-100 text-blue-600 border-blue-200">
                <Zap className="h-3 w-3 mr-2" />
                Core Features
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                Why Choose QSmartPark?
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Advanced technology meets convenience to deliver the best
                parking experience at Sri Lanka&apos;s busiest transport hub.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-emerald-100 text-emerald-600 border-emerald-200">
                <Activity className="h-3 w-3 mr-2" />
                Simple Process
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                How QSmartPark Works
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Four simple steps to secure your parking spot at MMTC and enjoy
                a stress-free experience.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="flex items-center mb-6">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-xl flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                      <div className="ml-4 flex-shrink-0 text-blue-500">
                        {step.icon}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 transform -translate-y-1/2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <Badge className="mb-4 bg-purple-100 text-purple-600 border-purple-200">
                  <Award className="h-3 w-3 mr-2" />
                  Benefits
                </Badge>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                  Transform Your Parking Experience
                </h2>
                <p className="text-xl text-slate-600 mb-8">
                  Join thousands of satisfied users who have revolutionized
                  their daily commute with our smart parking solution at MMTC.
                </p>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-slate-700 font-medium">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <Button
                    size="lg"
                    onClick={() => router.push("/booking")}
                    className="bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Start Booking Today
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-8 text-white">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">500+</div>
                      <div className="text-blue-100">Available Slots</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">24/7</div>
                      <div className="text-blue-100">Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">99.9%</div>
                      <div className="text-blue-100">Uptime</div>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-2">&lt;2min</div>
                      <div className="text-blue-100">Avg Wait</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-orange-100 text-orange-600 border-orange-200">
                <HeartHandshake className="h-3 w-3 mr-2" />
                Customer Stories
              </Badge>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
                What Our Users Say
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Real feedback from satisfied customers who trust QSmartPark for
                their daily parking needs at MMTC.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>

                  <p className="text-slate-700 mb-6 leading-relaxed italic">
                    &apos;{testimonial.comment}&apos;
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-slate-500">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

              {/* CTA Section */}
              <section className="py-20 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                  }}
                ></div>
        
                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    Ready to Experience
                    <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      Smart Parking?
                    </span>
                  </h2>
        
                  <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                    Join thousands of satisfied users and transform your parking experience at MMTC today. 
                    Book your first slot and discover the convenience of QSmartPark.
                  </p>
        
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      size="lg"
                      onClick={() => router.push('/booking')}
                      className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-semibold"
                    >
                      <Car className="h-5 w-5 mr-2" />
                      Book Your First Slot
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
        
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => router.push('/contact')}
                      className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg rounded-2xl transition-all duration-300 hover:scale-105"
                    >
                      Contact Support
                    </Button>
                  </div>
        
                  <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-1">500+</div>
                      <div className="text-sm text-blue-200">Parking Slots</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-1">2,000+</div>
                      <div className="text-sm text-blue-200">Daily Users</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-1">99.9%</div>
                      <div className="text-sm text-blue-200">Success Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold mb-1">24/7</div>
                      <div className="text-sm text-blue-200">Support</div>
                    </div>
                  </div>
                </div>
              </section>
      </div>
    </>
  );
}
