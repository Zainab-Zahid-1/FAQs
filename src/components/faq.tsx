'use client'

import React, { useState, useEffect } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

interface FAQItem {
  question: string
  answer: string
}

interface FAQData {
  title: string
  description: string
  tabs: string[]
  faqs: {
    [key: string]: FAQItem[]
  }
}

export default function FAQComponent() {
  const [faqData, setFaqData] = useState<FAQData | null>(null)
  const [activeTab, setActiveTab] = useState<string>("All")
  const [openItem, setOpenItem] = useState<number | null>(null)

  // Fetch FAQ data from the JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/test_data.json')  // Fetching from the JSON file
        const data = await response.json()
        setFaqData(data)
      } catch (error) {
        console.error("Error fetching FAQ data:", error)
      }
    }
    
    fetchData()
  }, [])

  if (!faqData) {
    return <div>Loading FAQs...</div>
  }

  // Filter FAQs based on the selected category
  const filteredFAQs = activeTab === "All" ? faqData.faqs["All"] : faqData.faqs[activeTab]

  return (
    <div className="max-w-2xl mx-auto px-4 py-12"> {/* Decreased width from max-w-3xl to max-w-2xl */}
      <h2 className="text-3xl font-bold text-center mb-2">{faqData.title}</h2>
      <p className="text-center text-gray-600 mb-8">{faqData.description}</p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex justify-center rounded-full bg-gray-200 p-1 mb-8 max-w-md mx-auto transition-all duration-200 ease-in-out border-2 border-gray-300">
          {faqData.tabs.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="flex-1 px-4 py-2 rounded-full transition-all duration-200 ease-in-out data-[state=active]:bg-gray-100 data-[state=active]:shadow-md hover:bg-gray-50 text-sm whitespace-nowrap"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-4 space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="bg-white rounded-md shadow-sm p-4"> {/* Removed border and reduced roundness */}
              <button
                onClick={() => setOpenItem(openItem === index ? null : index)}
                className="flex justify-between items-center w-full text-left"
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
                <div className="pt-2 text-gray-600">
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
