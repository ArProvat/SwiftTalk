import {
  MessageCircle,
  Users,
  Shield,
  Zap,
  Globe,
  Heart,
  Video,
  FileText,
  Bell,
  Smartphone,
  Cloud,
  Lock,
} from "lucide-react"
import { Link } from "react-router-dom"

export default function FeaturesPage() {
  const features = [
    {
      icon: MessageCircle,
      title: "Instant Messaging",
      description: "Send and receive messages in real-time with delivery confirmations and read receipts.",
      category: "Communication",
    },  
    {
      icon: FileText,
      title: "File Sharing",
      description: "Share documents, images, videos, and files up to 2GB in size.",
      category: "Productivity",
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Customizable notifications that adapt to your schedule and preferences.",
      category: "Productivity",
    },
    {
      icon: Smartphone,
      title: "Cross-Platform",
      description: "Access your chats from web, mobile, and desktop applications seamlessly.",
      category: "Accessibility",
    },
    {
      icon: Cloud,
      title: "Cloud Sync",
      description: "Your messages and media are automatically synced across all your devices.",
      category: "Accessibility",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized infrastructure ensures minimal latency and maximum performance.",
      category: "Performance",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with people worldwide with support for 50+ languages.",
      category: "Global",
    },
    {
      icon: Lock,
      title: "Privacy Controls",
      description: "Granular privacy settings to control who can contact you and see your information.",
      category: "Security",
    },
    {
      icon: Heart,
      title: "User Experience",
      description: "Intuitive design with dark/light themes and customizable interface options.",
      category: "Design",
    },
  ]

  const categories = [
    "All",
    "Communication",
    "Security",
    "Productivity",
    "Accessibility",
    "Performance",
    "Social",
    "Global",
    "Design",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-100 to-base-200/20">
      {/* Hero Section */}
      <section className="py-20 sm:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="badge badge-outline mb-4 px-4 py-3">
              🚀 Powerful Features
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl">
              Everything You Need for{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Modern Communication
              </span>
            </h1>
            <p className="mb-8 text-lg text-base-content/70">
              Discover all the features that make SwiftTalk the perfect choice for personal and professional
              communication needs.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-20 sm:pb-32">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="card group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-base-100 border border-base-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="card-body">
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="badge badge-primary text-xs py-2 px-3">
                      {feature.category}
                    </div>
                  </div>
                  <h2 className="card-title text-xl mb-2">{feature.title}</h2>
                  <p className="text-base-content/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-base-200/30">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Experience These Features?</h2>
            <p className="text-lg text-base-content/70 mb-8">
              Join SwiftTalk today and discover why millions of users trust us for their communication needs.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
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
    </div>
  )
}