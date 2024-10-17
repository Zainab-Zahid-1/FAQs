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
    question: "This is frequently asked question 1",
    answer: "Our app is designed to simulate real interview scenarios, so practicing with a friend can enhance your experience. Simply switch to the \"Practice with a Friend\" mode, where you can take turns interviewing each other. It's a great way to get constructive feedback and build confidence together!",
    category: "Platform"
  },
  {
    question: "This is frequently asked question 2",
    answer: "Answer to question 2",
    category: "Pricing"
  },
  {
    question: "This is frequently asked question 3",
    answer: "Answer to question 3",
    category: "Subscription"
  },
  {
    question: "This is frequently asked question 4",
    answer: "Answer to question 4",
    category: "Platform"
  },
  {
    question: "This is frequently asked question 5",
    answer: "Answer to question 5",
    category: "Pricing"
  },
  {
    question: "This is frequently asked question 6",
    answer: "Answer to question 6",
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
    <div className="max-w-3xl mx-auto px-4 py-12">
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