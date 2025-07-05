import { MessageCircle, Users, Shield, Zap, Globe, Heart } from "lucide-react"
import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
    <div className="min-h-screen gradient-to-br from-background via-background to-muted/20">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-transparent to-primary/5" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="badge badge-outline mb-4 px-4 py-3 text-base animate-fade-in">
              🚀 Welcome to the Future of Communication
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl animate-slide-up">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-primary to-blue-950 bg-clip-text text-transparent">
                SwiftTalk
              </span>
            </h1>
            <p className="mb-8 text-lg text-base-content/70 sm:text-xl animate-slide-up animation-delay-200">
              Connect instantly with friends and family. Experience seamless communication with our modern, secure, and
              lightning-fast chat platform.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center animate-slide-up animation-delay-400">
              <Link 
                to="/register" 
                className="btn btn-primary text-lg px-8 py-4 min-h-0 h-auto"
              >
                Get Started Free
              </Link>
              <Link 
                to="/login" 
                className="btn btn-outline text-lg px-8 py-4 min-h-0 h-auto bg-transparent"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why Choose SwiftTalk?</h2>
            <p className="text-lg text-base-content/70">Built for modern communication with cutting-edge features</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-base-100 border border-base-300">
              <div className="card-body p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Instant Messaging</h3>
                <p className="text-base-content/70">
                  Send messages instantly with real-time delivery and read receipts.
                </p>
              </div>
            </div>

            <div className="card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-base-100 border border-base-300">
              <div className="card-body p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Group Chats</h3>
                <p className="text-base-content/70">Create groups and chat with multiple friends simultaneously.</p>
              </div>
            </div>

            <div className="card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-base-100 border border-base-300">
              <div className="card-body p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">End-to-End Security</h3>
                <p className="text-base-content/70">
                  Your conversations are protected with military-grade encryption.
                </p>
              </div>
            </div>

            <div className="card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-base-100 border border-base-300">
              <div className="card-body p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Lightning Fast</h3>
                <p className="text-base-content/70">
                  Optimized for speed with minimal latency and maximum performance.
                </p>
              </div>
            </div>

            <div className="card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-base-100 border border-base-300">
              <div className="card-body p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Cross Platform</h3>
                <p className="text-base-content/70">Access your chats from any device, anywhere in the world.</p>
              </div>
            </div>

            <div className="card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-base-100 border border-base-300">
              <div className="card-body p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">User Friendly</h3>
                <p className="text-base-content/70">Intuitive design that makes chatting effortless and enjoyable.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-base-200/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Start Chatting?</h2>
            <p className="text-lg text-base-content/70 mb-8">
              Join thousands of users who trust SwiftTalk for their daily communication needs.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link 
                to="/register" 
                className="btn btn-primary text-lg px-8 py-4 min-h-0 h-auto"
              >
                Create Account
              </Link>
              <Link 
                to="/features" 
                className="btn btn-outline text-lg px-8 py-4 min-h-0 h-auto bg-transparent"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}