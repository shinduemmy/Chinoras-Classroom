import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import TrialModal from "./components/TrialModal";
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Clock, 
  ArrowRight, 
  CheckCircle2,
  Menu,
  X,
  ChevronRight,
  Star,
  Mail,
  Instagram,
  Twitter,
  Linkedin,
  Phone,
  MessageSquare,
  Play,
  Calendar,
  Heart,
  Lightbulb,
  Camera,
  MapPin
} from "lucide-react";

// --- Constants & Data ---

const subjects = [
  {
    name: "Mathematics",
    description: "Mastering numbers, logic, and problem-solving through fun puzzles.",
    level: "Primary & Secondary",
    duration: "45-60 mins",
    icon: "1+2"
  },
  {
    name: "English Language",
    description: "Developing strong communication, reading, and creative writing skills.",
    level: "All Ages",
    duration: "45 mins",
    icon: "ABC"
  },
  {
    name: "Biology",
    description: "Exploring the wonders of life, from tiny cells to giant ecosystems.",
    level: "Secondary",
    duration: "60 mins",
    icon: "🧬"
  },
  {
    name: "Chemistry",
    description: "Understanding the building blocks of our world through experiments.",
    level: "Secondary",
    duration: "60 mins",
    icon: "🧪"
  },
  {
    name: "Basic Education",
    description: "Foundational learning for early years to spark lifelong curiosity.",
    level: "Early Years",
    duration: "30-45 mins",
    icon: "🎨"
  },
  {
    name: "Quantitative Reasoning",
    description: "Sharpening analytical thinking and mathematical logic.",
    level: "Primary",
    duration: "45 mins",
    icon: "💡"
  }
];

const steps = [
  { title: "Register your child", desc: "Fill out our simple enrollment form to get started.", icon: <Users /> },
  { title: "Receive class schedule", desc: "We'll send a personalized timetable that fits your needs.", icon: <Calendar /> },
  { title: "Join the live classroom", desc: "Access interactive lessons via our secure online platform.", icon: <Camera /> },
  { title: "Learn, interact, and grow", desc: "Watch your child thrive with expert guidance.", icon: <Star /> }
];

const testimonials = [
  { text: "My child’s math improved greatly! The interactive approach really works.", author: "Mrs. Adebayo", role: "Parent" },
  { text: "The lessons are engaging and easy to understand. Aunty Nora is amazing!", author: "David O.", role: "Student" },
  { text: "Finally, an online class that keeps my daughter focused and excited to learn.", author: "Sarah J.", role: "Parent" }
];

const pricing = [
  { name: "Starter Pack", price: "₦15,000", period: "per month", features: ["2 Subjects", "Live Classes", "Weekly Homework", "Email Support"], cta: "Enroll Now" },
  { name: "Standard Pack", price: "₦25,000", period: "per month", features: ["4 Subjects", "Live Classes", "Recorded Lessons", "WhatsApp Support", "Progress Reports"], cta: "Enroll Now", popular: true },
  { name: "Premium Pack", price: "₦40,000", period: "per month", features: ["All Subjects", "1-on-1 Mentorship", "Exam Prep", "Priority Support", "Certificate"], cta: "Enroll Now" }
];

const blogPosts = [
  { title: "5 Tips for Effective Home Study", category: "Study Tips", date: "March 10, 2026" },
  { title: "Why Interactive Learning Beats Passive Reading", category: "Education", date: "March 5, 2026" },
  { title: "Supporting Your Child's Mental Health", category: "Parenting", date: "Feb 28, 2026" }
];

const galleryImages = [
  "https://scontent.fiba2-3.fna.fbcdn.net/v/t39.30808-6/650411195_122094717350989330_1620549331597885573_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeE7SJnaNv2jXTdb_iYRmzQ2YIWHckeBAhRghYdyR4ECFHjsj4En8mO_9h4_0jRbp_r3rDCfzPgNFlkfbBIdSTMr&_nc_ohc=Xs5Qjus0-JwQ7kNvwGJwO4C&_nc_oc=Adl-p2MUlZOxTRfHY1yKZKTiKQFJrAqyIwoIAQ2czJmCfWcw7Z9y2yaVBmtw7N-d_XA&_nc_zt=23&_nc_ht=scontent.fiba2-3.fna&_nc_gid=NlO4Nt5K-XiQQ0zzPUjlAw&_nc_ss=8&oh=00_Afy2B-czqfWZ1dnlvrAIcgSsGiQgUUgz5GNd76CcbivKgA&oe=69B9AF36",
  "https://scontent.fiba2-1.fna.fbcdn.net/v/t39.30808-6/649507963_122094723734989330_5462959232602927457_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHi86YKHdK5gDBtdC7LDwrriuX24hOOLNSK5fbiE44s1Gl7ua5DzDIo8y4Oy2VyXHgk9S87sZITERy82NPSjuRe&_nc_ohc=CtUraWZfI_oQ7kNvwHAwQmu&_nc_oc=Admx6p5sJqJ2WJOY9b-54PYcItAkgoezia8zBbCJev_duv4js_vY1QCc6jww3twJzZ0&_nc_zt=23&_nc_ht=scontent.fiba2-1.fna&_nc_gid=Phu-ue5Yvpcgf2Dv65OAdw&_nc_ss=8&oh=00_Afyqqxt5J6gGEabXCD6qFZy7P_WrdrPJhHfIDJj8Fo-Bqg&oe=69B9BC01",
  "https://scontent.fiba2-3.fna.fbcdn.net/v/t39.30808-6/650568288_122094732920989330_1403802546588853017_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeGSJqAOY1AtBrDxZMHZ8-KSXsTRkz_y4klexNGTP_LiSYFvNIJhf43b2zSY-ATt8iUpyA2Zb0ZVV8jwUacyz4iC&_nc_ohc=SMyqYLXU3cwQ7kNvwEzeFcY&_nc_oc=Adnx1ZrayjntMxZzhEVc03mFC5NsP0Ff7E7BRnPk2MHZ-bhXSAyCo7qe99YT2wPg5Z8&_nc_zt=23&_nc_ht=scontent.fiba2-3.fna&_nc_gid=_OPQJHkimPdFIL7O3mtGEA&_nc_ss=8&oh=00_AfxVN0KaE7AGTdboPcRASZLjy6wjzX3w6rRxuDJLYQDv9w&oe=69B9BE34",
  "https://scontent.fiba2-3.fna.fbcdn.net/v/t39.30808-6/649507959_122094728252989330_1041941271748165473_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeHJwLyx9YTVhkjKaYgguNo58FZMtBvX8kPwVky0G9fyQzeoBfLezWC7pUS8DlMaeuaDnZm5ONBnO58tZEZkg0Da&_nc_ohc=HK5Pf0btwSAQ7kNvwFXRxsx&_nc_oc=AdlUnQHif37Xy8EIOY7UtQ5-QLWFLKNOMZjQh74ZNwKOAuJeJ0oxwYkObfZBaQzk-HE&_nc_zt=23&_nc_ht=scontent.fiba2-3.fna&_nc_gid=za0YsKnNz8g37Sub0A0nlw&_nc_ss=8&oh=00_AfzFJehoAtvQXT67VicHKES9Zh4Fk18ghzFRYQQ3IKuSOA&oe=69B9D37F"
];

// --- Components ---

const SectionTitle = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="mb-16 text-center">
    <h2 className={`text-4xl md:text-5xl font-serif font-medium mb-4 ${light ? 'text-white' : 'text-stone-900'}`}>
      {children}
    </h2>
    {subtitle && <p className={`text-lg max-w-2xl mx-auto ${light ? 'text-stone-400' : 'text-stone-500'}`}>{subtitle}</p>}
  </div>
);

const CTAButton = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick 
}: { 
  children: React.ReactNode, 
  variant?: 'primary' | 'secondary' | 'outline', 
  className?: string,
  onClick?: () => void
}) => {
  const base = "px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 group whitespace-nowrap";
  const variants = {
    primary: "bg-stone-900 text-white hover:bg-stone-800 shadow-lg hover:shadow-xl",
    secondary: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg hover:shadow-xl",
    outline: "border-2 border-stone-900 text-stone-900 hover:bg-stone-50"
  };
  return (
    <button onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcf9] text-stone-900 selection:bg-stone-200">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo('home')}>
            <div className="w-10 h-10 bg-stone-900 rounded-xl flex items-center justify-center text-white">
              <GraduationCap className="w-6 h-6" />
            </div>
            <span className="text-xl font-serif font-bold tracking-tight">Chinora’s Classroom</span>
          </div>

          <div className="hidden lg:flex items-center gap-8 text-sm font-bold uppercase tracking-widest">
            {['About', 'Subjects', 'How it Works', 'Pricing', 'Blog', 'Contact'].map(item => (
              <button 
                key={item} 
                onClick={() => scrollTo(item.toLowerCase().replace(/\s+/g, '-'))}
                className="hover:text-stone-500 transition-colors"
              >
                {item}
              </button>
            ))}
            <CTAButton variant="primary" className="py-2.5 px-6 text-xs">Enroll Now</CTAButton>
          </div>

          <button className="lg:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-stone-100 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4 font-bold uppercase tracking-widest text-sm">
                {['About', 'Subjects', 'How it Works', 'Pricing', 'Blog', 'Contact'].map(item => (
                  <button key={item} onClick={() => scrollTo(item.toLowerCase().replace(/\s+/g, '-'))} className="text-left py-2">
                    {item}
                  </button>
                ))}
                <CTAButton variant="primary">Enroll Now</CTAButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* 1. Homepage / Hero */}
      <section id="home" className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-stone-100 text-stone-600 text-xs font-bold uppercase tracking-widest mb-6">
              Welcome to Chinora’s Classroom
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-medium leading-[1.1] mb-8">
              Inspiring Young Minds Through <span className="italic text-stone-500">Fun & Interactive</span> Online Learning.
            </h1>
            <p className="text-lg text-stone-500 mb-10 leading-relaxed max-w-xl">
              We provide a nurturing environment where children can explore, learn, and grow from anywhere in the world. Our classes are designed to be engaging, effective, and tailored to every child's unique pace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <CTAButton variant="primary" onClick={() => scrollTo('enrollment-form')}>Enroll Now <ArrowRight className="w-5 h-5" /></CTAButton>
              <CTAButton variant="outline" onClick={() => setIsTrialModalOpen(true)}>Book a Trial Class</CTAButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-video rounded-[40px] overflow-hidden shadow-2xl border-8 border-white relative group">
              <img 
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80&w=1200" 
                alt="Classroom Intro" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-stone-900 fill-current ml-1" />
                </button>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-6 rounded-3xl shadow-xl hidden md:block">
              <div className="text-3xl font-bold">100%</div>
              <div className="text-xs font-bold uppercase tracking-widest opacity-80">Online & Interactive</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. About Us */}
      <section id="about" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Learn about our story, mission, and the heart behind the classroom.">About Us</SectionTitle>
          
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-serif font-bold mb-4 flex items-center gap-3">
                  <Heart className="text-rose-500" /> Our Mission
                </h3>
                <p className="text-stone-500 leading-relaxed">
                  To provide accessible, high-quality education that sparks curiosity and builds confidence in every child, regardless of their location.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold mb-4 flex items-center gap-3">
                  <Lightbulb className="text-amber-500" /> Our Vision
                </h3>
                <p className="text-stone-500 leading-relaxed">
                  To be a global leader in online primary education, recognized for our innovative teaching methods and student-centric approach.
                </p>
              </div>
              <div className="p-8 bg-stone-50 rounded-3xl border border-stone-100">
                <h3 className="text-xl font-serif font-bold mb-4">Why we are different?</h3>
                <ul className="space-y-3">
                  {['Small class sizes for personal attention', 'Gamified learning experiences', 'Real-world application of concepts', 'Nurturing & safe online environment'].map(item => (
                    <li key={item} className="flex items-center gap-3 text-stone-600 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-xl">
                <img 
                  src="https://scontent.fiba2-1.fna.fbcdn.net/v/t39.30808-6/650231771_122094676532989330_7282064837449266453_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_eui2=AeEOy6cBAH8lAJgRgAjL9j0ZqLGBbtCaMyCosYFu0JozICA2hd6aAly52NPbQ5cztx3KTOVDHQuHK1nfIyfjKCrq&_nc_ohc=6iyr4omPR4QQ7kNvwGIel9b&_nc_oc=Adlu4Uquib1Z7OBq3afLcJdhZ2h0QtES8KqWnjhfaHbR8oFHUQAw7wqr3Wfwl2w3tQs&_nc_zt=23&_nc_ht=scontent.fiba2-1.fna&_nc_gid=jZZ2KTfHHsRcZA86ASQM1Q&_nc_ss=8&oh=00_AfyCcpCqIONPqFcK9KTmjs-m8q0JlhRo661kI8zHfxdL-A&oe=69B9BEAB" 
                  alt="Aunty Nora" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-stone-100 max-w-xs">
                <h4 className="text-2xl font-serif font-bold mb-1">Meet AUNTY NORA</h4>
                <p className="text-stone-400 text-sm font-bold uppercase tracking-widest mb-4">Lead Instructor</p>
                <p className="text-stone-500 text-sm italic">
                  "Teaching is not just about sharing knowledge; it's about inspiring a love for learning that lasts a lifetime."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Subjects Offered */}
      <section id="subjects" className="py-24 bg-[#fdfcf9] px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Explore our wide range of subjects tailored for different age groups and levels.">Subjects Offered</SectionTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {subjects.map((subject, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-[40px] border border-stone-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-2xl font-bold mb-8 group-hover:bg-stone-900 group-hover:text-white transition-colors">
                  {subject.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{subject.name}</h3>
                <p className="text-stone-500 text-sm mb-8 leading-relaxed">{subject.description}</p>
                <div className="space-y-3 pt-6 border-t border-stone-50">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-400">
                    <span>Level</span>
                    <span className="text-stone-900">{subject.level}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-stone-400">
                    <span>Duration</span>
                    <span className="text-stone-900">{subject.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <CTAButton variant="outline" className="mx-auto">View Full Curriculum</CTAButton>
          </div>
        </div>
      </section>

      {/* 4. How it Works */}
      <section id="how-it-works" className="py-24 bg-stone-900 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle light subtitle="Our simple 4-step process to get your child started on their learning journey.">How It Works</SectionTitle>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {steps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="w-16 h-16 bg-stone-800 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 transition-colors">
                  {step.icon}
                </div>
                <div className="text-emerald-500 font-bold text-sm mb-2">Step 0{idx + 1}</div>
                <h3 className="text-xl font-serif font-bold mb-4">{step.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{step.desc}</p>
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-[1px] bg-stone-800 -translate-x-8" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-20 p-10 bg-stone-800 rounded-[40px] flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex gap-8">
              <div className="flex items-center gap-3">
                <Play className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-bold uppercase tracking-widest">Live Classes</span>
              </div>
              <div className="flex items-center gap-3">
                <Camera className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-bold uppercase tracking-widest">Recorded Lessons</span>
              </div>
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-bold uppercase tracking-widest">Homework</span>
              </div>
            </div>
            <CTAButton variant="secondary">Join a Class Now</CTAButton>
          </div>
        </div>
      </section>

      {/* 5. Pricing / Enrollment */}
      <section id="pricing" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Simple, transparent pricing plans for every family.">Pricing & Enrollment</SectionTitle>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-24">
            {pricing.map((plan, idx) => (
              <div 
                key={idx} 
                className={`p-12 rounded-[40px] border flex flex-col ${plan.popular ? 'bg-stone-900 text-white border-stone-900 shadow-2xl scale-105 z-10' : 'bg-white text-stone-900 border-stone-100'}`}
              >
                {plan.popular && <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full self-start mb-6">Most Popular</span>}
                <h3 className="text-2xl font-serif font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? 'text-stone-400' : 'text-stone-500'}`}>{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-12 flex-1">
                  {plan.features.map(feat => (
                    <li key={feat} className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className={`w-4 h-4 ${plan.popular ? 'text-emerald-500' : 'text-emerald-600'}`} /> {feat}
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => scrollTo('enrollment-form')}
                  className={`px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center gap-2 group whitespace-nowrap ${plan.popular ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-stone-900 text-white hover:bg-stone-800'}`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Registration Form */}
          <div id="enrollment-form" className="max-w-4xl mx-auto bg-[#fdfcf9] rounded-[40px] p-8 md:p-16 border border-stone-100 shadow-xl">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-serif font-bold mb-4">Register Your Child</h3>
              <p className="text-stone-500">Take the first step towards a brighter future. Fill out the form below.</p>
            </div>
            <form className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Parent/Guardian Name</label>
                <input type="text" placeholder="Full Name" className="w-full px-6 py-4 rounded-2xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Email Address</label>
                <input type="email" placeholder="email@example.com" className="w-full px-6 py-4 rounded-2xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Child's Name</label>
                <input type="text" placeholder="Child's Full Name" className="w-full px-6 py-4 rounded-2xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Child's Age / Class Level</label>
                <input type="text" placeholder="e.g. 8 years / Primary 3" className="w-full px-6 py-4 rounded-2xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Select Subject(s)</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                  {subjects.map(s => (
                    <label key={s.name} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-stone-100 cursor-pointer hover:border-stone-900 transition-all">
                      <input type="checkbox" className="w-4 h-4 accent-stone-900" />
                      <span className="text-sm font-medium">{s.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 pt-4">
                <CTAButton variant="primary" className="w-full py-5 text-lg">Submit Registration</CTAButton>
                <p className="text-center text-stone-400 text-xs mt-6">
                  By clicking submit, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* 6. Gallery */}
      <section id="gallery" className="py-24 bg-[#fdfcf9] px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="A glimpse into our interactive learning environment and student achievements.">Gallery & Media</SectionTitle>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ scale: 1.02 }}
                className={`rounded-3xl overflow-hidden shadow-lg ${idx % 3 === 0 ? 'col-span-2 row-span-2' : ''}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="Class activity" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <section id="testimonials" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="What parents and students are saying about their experience with us.">Testimonials</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="p-10 bg-stone-50 rounded-[40px] border border-stone-100 relative">
                <div className="flex text-amber-400 mb-6">
                  {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-stone-600 italic mb-8 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-stone-200 rounded-full" />
                  <div>
                    <div className="font-bold text-sm">{t.author}</div>
                    <div className="text-stone-400 text-xs font-bold uppercase tracking-widest">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Blog */}
      <section id="blog" className="py-24 bg-[#fdfcf9] px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Helpful resources, study tips, and parenting education.">Learning Tips & Blog</SectionTitle>
          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post, idx) => (
              <div key={idx} className="bg-white rounded-[40px] overflow-hidden border border-stone-100 group cursor-pointer">
                <div className="aspect-video bg-stone-100 relative overflow-hidden">
                  <img src={`https://picsum.photos/seed/${idx+50}/600/400`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Blog" referrerPolicy="no-referrer" />
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-10">
                  <div className="text-stone-400 text-xs font-bold uppercase tracking-widest mb-4">{post.date}</div>
                  <h3 className="text-2xl font-serif font-bold mb-6 group-hover:text-stone-500 transition-colors">{post.title}</h3>
                  <button className="text-stone-900 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                    Read More <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Contact */}
      <section id="contact" className="py-24 bg-white px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle subtitle="Have questions? We're here to help. Reach out to us anytime.">Contact Us</SectionTitle>
          
          <div className="grid lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-stone-900 rounded-2xl flex items-center justify-center text-white shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Email Us</h4>
                  <p className="text-stone-500">hello@chinorasclassroom.com</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">WhatsApp / Call</h4>
                  <p className="text-stone-500">+234 813 308 7166</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-900 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">Location</h4>
                  <p className="text-stone-500">Online classes worldwide</p>
                </div>
              </div>
              <div className="pt-10 flex gap-4">
                {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center text-stone-400 hover:text-stone-900 hover:border-stone-900 transition-all">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            <form className="bg-[#fdfcf9] p-12 rounded-[40px] border border-stone-100 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Your Name</label>
                  <input type="text" className="w-full px-6 py-4 rounded-2xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Email Address</label>
                  <input type="email" className="w-full px-6 py-4 rounded-2xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Subject</label>
                <select className="w-full px-6 py-4 rounded-2xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all">
                  <option>General Inquiry</option>
                  <option>Enrollment</option>
                  <option>Trial Class</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-stone-400">Message</label>
                <textarea rows={4} className="w-full px-6 py-4 rounded-2xl bg-white border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-900 transition-all"></textarea>
              </div>
              <CTAButton variant="primary" className="w-full">Send Message</CTAButton>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-stone-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-20">
            <div className="max-w-sm">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-stone-900">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <span className="text-2xl font-serif font-bold tracking-tight">Chinora’s Classroom</span>
              </div>
              <p className="text-stone-400 leading-relaxed mb-8">
                Inspiring young minds through fun and interactive online learning. Join our global community today.
              </p>
              <CTAButton variant="secondary" onClick={() => setIsTrialModalOpen(true)}>Join a Free Trial</CTAButton>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-8">Quick Links</h4>
                <ul className="space-y-4 text-sm text-stone-400">
                  <li><button onClick={() => scrollTo('home')} className="hover:text-white transition-colors">Home</button></li>
                  <li><button onClick={() => scrollTo('about')} className="hover:text-white transition-colors">About Us</button></li>
                  <li><button onClick={() => scrollTo('subjects')} className="hover:text-white transition-colors">Subjects</button></li>
                  <li><button onClick={() => scrollTo('pricing')} className="hover:text-white transition-colors">Pricing</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-stone-500 mb-8">Support</h4>
                <ul className="space-y-4 text-sm text-stone-400">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="pt-10 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-6 text-stone-500 text-[10px] font-bold uppercase tracking-widest">
            <div>© 2026 Chinora’s Classroom. All rights reserved.</div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Facebook</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>
      </footer>
      <TrialModal isOpen={isTrialModalOpen} onClose={() => setIsTrialModalOpen(false)} subjects={subjects} />
    </div>
  );
}
