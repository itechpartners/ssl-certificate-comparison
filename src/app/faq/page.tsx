'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqItems = [
  {
    question: 'What is an SSL certificate?',
    answer: 'An SSL certificate is a digital certificate that authenticates a website\'s identity and enables encrypted connection.',
    category: 'general',
  },
  {
    question: 'What\'s the difference between DV, OV, and EV certificates?',
    answer: 'DV is the fastest and cheapest - only verifies domain. OV verifies business details. EV requires extensive verification and shows green address bar.',
    category: 'technical',
  },
  {
    question: 'How much does an SSL certificate cost?',
    answer: 'SSL costs range from free (Let\'s Encrypt) to $500+/year depending on validation level.',
    category: 'billing',
  },
  {
    question: 'Does SSL protect against all cyber attacks?',
    answer: 'SSL encrypts data in transit but doesn\'t protect against phishing or malware. Use it with other security measures.',
    category: 'security',
  },
]

export default function FAQPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-900">FAQ</h1>
          <p className="mt-2 text-lg text-gray-600">Frequently asked questions about SSL certificates</p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-4">
          {faqItems.map((item, idx) => (
            <div key={idx} className="rounded-lg border border-gray-200 bg-white">
              <button
                onClick={() => setExpandedId(expandedId === idx ? null : idx)}
                className="flex w-full items-center justify-between px-6 py-4 hover:bg-gray-50"
              >
                <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                <ChevronDown
                  size={24}
                  className={`transition ${expandedId === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {expandedId === idx && (
                <div className="border-t border-gray-200 px-6 py-4 text-gray-700">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
