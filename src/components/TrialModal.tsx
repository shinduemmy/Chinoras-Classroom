import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, Calendar, Clock, BookOpen, User, Mail, Phone } from 'lucide-react';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  subjects: { name: string; icon?: React.ReactNode | string }[];
}

export default function TrialModal({ isOpen, onClose, subjects }: TrialModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    subject: '',
    date: '',
    time: '',
    parentName: '',
    email: '',
    phone: ''
  });

  const handleClose = () => {
    setStep(1);
    setFormData({ subject: '', date: '', time: '', parentName: '', email: '', phone: '' });
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Simulate API call
      setStep(3);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white rounded-[40px] shadow-2xl z-[101] overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="flex justify-between items-center p-8 border-b border-stone-100">
              <h2 className="text-2xl font-serif font-bold">Book a Free Trial</h2>
              <button onClick={handleClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-stone-500" />
              </button>
            </div>

            <div className="p-8 overflow-y-auto">
              {step === 1 && (
                <form id="trial-form-1" onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Select Subject
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {subjects.map(s => (
                        <button
                          key={s.name}
                          type="button"
                          onClick={() => setFormData({ ...formData, subject: s.name })}
                          className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                            formData.subject === s.name 
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600' 
                              : 'border-stone-200 hover:border-stone-300'
                          }`}
                        >
                          {s.icon && (
                            <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-lg ${
                              formData.subject === s.name 
                                ? 'bg-emerald-100 text-emerald-700' 
                                : 'bg-stone-100 text-stone-600'
                            }`}>
                              {s.icon}
                            </div>
                          )}
                          <span className="text-sm font-medium">{s.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
                        <Calendar className="w-4 h-4" /> Preferred Date
                      </label>
                      <input 
                        type="date" 
                        required
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
                        <Clock className="w-4 h-4" /> Preferred Time
                      </label>
                      <select 
                        required
                        value={formData.time}
                        onChange={e => setFormData({ ...formData, time: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                      >
                        <option value="">Select time</option>
                        <option value="Morning (9AM - 12PM)">Morning (9AM - 12PM)</option>
                        <option value="Afternoon (12PM - 4PM)">Afternoon (12PM - 4PM)</option>
                        <option value="Evening (4PM - 7PM)">Evening (4PM - 7PM)</option>
                      </select>
                    </div>
                  </div>
                </form>
              )}

              {step === 2 && (
                <form id="trial-form-2" onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
                      <User className="w-4 h-4" /> Parent/Guardian Name
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Full Name"
                      value={formData.parentName}
                      onChange={e => setFormData({ ...formData, parentName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
                      <Mail className="w-4 h-4" /> Email Address
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs font-bold uppercase tracking-widest text-stone-400 flex items-center gap-2">
                      <Phone className="w-4 h-4" /> Phone Number
                    </label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+234 XXX XXXX"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                    />
                  </div>
                </form>
              )}

              {step === 3 && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold mb-2">Request Sent!</h3>
                  <p className="text-stone-500 mb-8">
                    Thank you, {formData.parentName}. We've received your trial request for {formData.subject} and will contact you shortly to confirm your slot.
                  </p>
                  <button 
                    onClick={handleClose}
                    className="px-8 py-4 bg-stone-900 text-white rounded-full font-bold hover:bg-stone-800 transition-all"
                  >
                    Back to Home
                  </button>
                </div>
              )}
            </div>

            {step < 3 && (
              <div className="p-8 border-t border-stone-100 bg-stone-50 flex justify-between items-center">
                <div className="flex gap-2">
                  <div className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-emerald-600' : 'bg-stone-300'}`} />
                  <div className={`w-2 h-2 rounded-full ${step === 2 ? 'bg-emerald-600' : 'bg-stone-300'}`} />
                </div>
                <div className="flex gap-3">
                  {step === 2 && (
                    <button 
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-6 py-3 rounded-full font-bold text-stone-600 hover:bg-stone-200 transition-all"
                    >
                      Back
                    </button>
                  )}
                  <button 
                    type="submit"
                    form={`trial-form-${step}`}
                    disabled={step === 1 && !formData.subject}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {step === 1 ? 'Next Step' : 'Confirm Booking'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
