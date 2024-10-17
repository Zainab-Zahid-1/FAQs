'use client'

import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface FAQItem {
  question: string
  answer: string
  category: 'Platform' | 'Pricing' | 'Subscription'
}

const faqData: FAQItem[] = [
  {
    question: "How does your platform simulate real interview scenarios?",
    answer: "Our platform uses advanced AI technology to create dynamic, realistic interview simulations. We offer a variety of industry-specific scenarios, adaptive questioning based on your responses, and real-time feedback on your performance. You can also practice with a friend in our 'Peer Interview' mode, where you take turns interviewing each other, providing a more interactive and collaborative learning experience.",
    category: "Platform"
  },
  {
    question: "Can I customize the types of questions I practice?",
    answer: "Our platform allows you to tailor your practice sessions to your specific needs. You can select from various question types (behavioral, technical, case studies), difficulty levels, and even specific skills you want to focus on. This customization ensures that you're always challenging yourself and improving in the areas that matter most to your career goals.",
    category: "Platform"
  },
  {
    question: "How does your AI provide feedback on my interview performance?",
    answer: "Our AI analyzes multiple aspects of your interview performance, including your verbal responses, tone of voice, and even facial expressions (if you opt to use video). It provides detailed feedback on your content, delivery, and body language. You'll receive insights on areas like confidence, clarity, relevance of your answers, and suggestions for improvement. This comprehensive feedback helps you refine your interview skills more effectively than traditional practice methods.",
    category: "Platform"
  },
  {
    question: "What pricing plans do you offer?",
    answer: "We offer three main pricing tiers to cater to different needs and budgets: 1) Basic Plan: Perfect for occasional users, includes limited monthly practice sessions and basic feedback. 2) Pro Plan: Our most popular option, offering unlimited practice sessions, advanced AI feedback, and access to industry-specific interview simulations. 3) Enterprise Plan: Tailored for businesses and career centers, includes all Pro features plus custom branding, analytics, and bulk user management. Visit our pricing page for current rates and special offers.",
    category: "Pricing"
  },
  {
    question: "Do you offer any discounts for students or job seekers?",
    answer: "Yes, we're committed to making our platform accessible to those who need it most. We offer a 50% discount on our Pro Plan for verified students and a 25% discount for job seekers who have been unemployed for more than 3 months. Additionally, we periodically run special promotions, especially during peak job hunting seasons. Sign up for our newsletter to stay informed about these offers.",
    category: "Pricing"
  },
  {
    question: "Is there a free trial available?",
    answer: "We offer a 7-day free trial of our Pro Plan for all new users. This gives you full access to all our features, allowing you to experience the full benefits of our platform before making a commitment. No credit card is required to start your trial, and you can cancel at any time during the trial period without any charges.",
    category: "Pricing"
  },
  {
    question: "How often can I change or cancel my subscription?",
    answer: "You have full flexibility with your subscription. You can upgrade, downgrade, or cancel your subscription at any time through your account settings. Changes to your subscription will take effect at the start of your next billing cycle. If you cancel, you'll retain access to your current plan until the end of your paid period. We do not offer refunds for partial months, but you're welcome to continue using the service until your paid period ends.",
    category: "Subscription"
  },
  {
    question: "What happens to my data if I cancel my subscription?",
    answer: "We value your privacy and data rights. If you cancel your subscription, your account will be deactivated at the end of your paid period. Your basic profile information will be retained for 30 days, during which you can reactivate your account if you change your mind. After 30 days, all your personal data, including interview recordings and feedback history, will be permanently deleted from our servers. You can also request immediate data deletion at any time through our support team.",
    category: "Subscription"
  },
  {
    question: "Can I share my subscription with others?",
    answer: "Our individual plans (Basic and Pro) are for single-user use only and should not be shared. However, we understand the need for team or family access. That's why we offer Family Plans that allow up to 5 users under one subscription at a discounted rate. For larger groups or organizations, our Enterprise Plan offers flexible user management options. If you have specific sharing needs, please contact our sales team for a customized solution.",
    category: "Subscription"
  }
]

export default function FAQComponent() {
  const [activeTab, setActiveTab] = useState<string>("all")
  const [openItem, setOpenItem] = useState<number | null>(null)

  const categories = ["All", "Platform", "Pricing", "Subscription"]

  const filteredFAQs = faqData.filter(item => 
    activeTab === "all" || item.category.toLowerCase() === activeTab.toLowerCase()
  )

  return (
    <div className="max-w-3xl mx-auto px-4 py-24">
      <h2 className="text-3xl font-bold text-center mb-2">Frequently Asked Questions</h2>
      <p className="text-center text-gray-600 mb-8">
        Get clear answers to your questions, so you can focus on what matters—
        acing your interviews with confidence.
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex justify-center rounded-full bg-gray-200 p-1 mb-8 max-w-md mx-auto transition-all duration-200 ease-in-out border-2 border-gray-300">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category.toLowerCase()}
              className="flex-1 px-4 py-2 rounded-full transition-all duration-200 ease-in-out data-[state=active]:bg-gray-100 data-[state=active]:shadow-md hover:bg-gray-50 text-sm whitespace-nowrap"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-4 space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="border rounded-lg shadow-sm">
              <button
                onClick={() => setOpenItem(openItem === index ? null : index)}
                className="flex justify-between items-center w-full p-4 text-left"
              >
                <span className="font-medium">{faq.question}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${
                    openItem === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openItem === index && (
                <div className="p-4 pt-0 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}