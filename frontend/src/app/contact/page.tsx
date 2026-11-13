'use client';

import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Send, CheckCircle2, 
  Sparkles, Clock, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { GlobalHeader } from '@/components/navigation/GlobalHeader';
import { INDUSTRIES_LIST } from '@/components/IndustrySelector';
import { appleAudio } from '@/lib/audio';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    industry: 'IIOT',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    appleAudio.playClick();
    setSubmitted(true);
    appleAudio.playRestore();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-slate-900">
      <GlobalHeader />

      {/* Hero */}
      <section className="relative overflow-hidden pt-12 pb-16 px-6 border-b border-slate-200/80 bg-gradient-to-b from-white to-slate-50/50">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold">
            <Mail className="w-3.5 h-3.5 text-blue-500" />
            <span>Qualimatrix Technologies Enterprise Advisory</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto">
            Get in Touch with our Systems Engineering Team
          </h1>

          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
            Schedule an enterprise architecture briefing, request a proof-of-concept (POC) sandbox, 
            or consult with our Lead Systems Architect.
          </p>
        </div>
      </section>

      {/* Main Content Form & Contact Info */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-3xl apple-glassdoor border border-white/90 shadow-xl space-y-6">
              <h2 className="text-xl font-bold text-slate-900">Request Enterprise Demonstration & Architecture Review</h2>
              
              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-2 font-bold text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Inquiry Transmitted Successfully</span>
                  </div>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    Thank you. Our enterprise solutions lead and Systems Architect Saumya Gupta will review your submission and connect within 4 business hours with custom sandbox access credentials.
                  </p>
                  <button
                    onClick={() => { appleAudio.playClick(); setSubmitted(false); }}
                    className="mt-2 text-xs font-bold text-emerald-800 underline"
                  >
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Full Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Satya Nadella"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 shadow-2xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Corporate Email</label>
                      <input
                        type="email"
                        required
                        placeholder="name@enterprise.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Enterprise / Organization</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Siemens Energy"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 shadow-2xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Industry Vertical</label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 shadow-2xs cursor-pointer"
                      >
                        {INDUSTRIES_LIST.map((ind) => (
                          <option key={ind.id} value={ind.id}>
                            {ind.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Operational Focus / Challenge</label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Describe your current production challenges: e.g. broken API schema releases, sensor line severances, FinOps waste..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 shadow-2xs resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-2xl bg-slate-900 text-white font-bold text-xs shadow-md hover:bg-slate-800 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-cyan-400" />
                    <span>Submit Architecture Review Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Direct Contacts & SRE Desk */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl apple-glass border border-slate-200/90 shadow-xs space-y-4">
              <h3 className="text-sm font-bold text-slate-900">Direct Engineering Inquiries</h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>architect@aethernexus.ai</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <span>+1 (888) AETHER-OS / 24/7 SRE Desk</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Guaranteed SLA Response: &lt; 4 Hours</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3 shadow-xl">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero-Trust Security Sandbox</span>
              </div>
              <h4 className="text-sm font-bold">Confidentiality Assured</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                All client architectural audits and diagnostic scans are executed under strict mutual NDAs with end-to-end Row-Level Security encryption.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

