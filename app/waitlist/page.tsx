"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check, User, Users, Search, Award, Activity, Brain, Dumbbell, HeartPulse, PenTool, ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"

type Step = 0 | 1 | 2 | 3 | 4
type Role = "player" | "fan" | "club" | "agent" | "scout" | "coach" | "analyst" | "psychologist" | "trainer" | "physio" | "media"

interface RoleData {
  icon: React.ReactNode
  label: string
  hook: string
  isPrimary?: boolean
}

interface Question {
  text: string
  options: string[]
}

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", 
  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", 
  "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil",
  "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
  "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
  "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
  "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India",
  "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan",
  "Kazakhstan", "Kenya", "Kiribati", "Korea", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon",
  "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar",
  "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia",
  "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru",
  "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia",
  "Solomon Islands", "Somalia", "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname",
  "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste",
  "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda",
  "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu",
  "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
]

const roleQuestions: Record<Role, Question> = {
  player: {
    text: "What level do you currently play at?",
    options: ["Amateur", "Semi-Pro", "Professional", "Academy"]
  },
  fan: {
    text: "Which region's football do you follow most?",
    options: ["West Africa", "East Africa", "North Africa", "South America", "Southeast Asia"]
  },
  club: {
    text: "How many players are in your current setup?",
    options: ["Under 20", "20–50", "50–200", "200+"]
  },
  agent: {
    text: "How many players are currently on your books?",
    options: ["1–5", "6–15", "16–50", "50+"]
  },
  scout: {
    text: "Which regions do you scout?",
    options: ["West Africa", "East Africa", "North Africa", "South America", "Europe", "Global"]
  },
  coach: {
    text: "What level do you currently coach?",
    options: ["Youth", "Amateur", "Semi-Pro", "Professional"]
  },
  analyst: {
    text: "What's your primary specialization?",
    options: ["Match Analysis", "Player Performance", "Tactical Analysis", "Data Science"]
  },
  psychologist: {
    text: "What's your focus area?",
    options: ["Performance Psychology", "Mental Health", "Team Dynamics", "Career Transition"]
  },
  trainer: {
    text: "What's your specialty?",
    options: ["Strength & Conditioning", "Speed & Agility", "Recovery", "Nutrition"]
  },
  physio: {
    text: "What's your primary setting?",
    options: ["Club Team", "Private Practice", "Academy", "National Team"]
  },
  media: {
    text: "What type of content do you create?",
    options: ["Video", "Writing", "Podcasts", "Social Media", "Mixed"]
  }
}

const roles: Record<Role, RoleData> = {
  player: {
    icon: <User className="w-6 h-6" />,
    label: "Player",
    hook: "Get funded. Get seen. Get to the next level.",
    isPrimary: true
  },
  fan: {
    icon: <Users className="w-6 h-6" />,
    label: "Fan",
    hook: "Back the players who'll make history.",
    isPrimary: true
  },
  club: {
    icon: <Award className="w-6 h-6" />,
    label: "Club / Academy",
    hook: "Find, develop, and retain elite talent.",
    isPrimary: true
  },
  agent: {
    icon: <Activity className="w-6 h-6" />,
    label: "Agent",
    hook: "Manage your players' rise — all in one place.",
    isPrimary: true
  },
  scout: {
    icon: <Search className="w-6 h-6" />,
    label: "Scout",
    hook: "Discover verified talent before anyone else.",
    isPrimary: true
  },
  coach: {
    icon: <Award className="w-6 h-6" />,
    label: "Coach",
    hook: "Build your coaching profile. Attract the right clubs.",
    isPrimary: true
  },
  analyst: {
    icon: <Activity className="w-6 h-6" />,
    label: "Analyst",
    hook: "Turn match data into career-defining insights.",
    isPrimary: false
  },
  psychologist: {
    icon: <Brain className="w-6 h-6" />,
    label: "Psychologist",
    hook: "Mental performance is the next frontier.",
    isPrimary: false
  },
  trainer: {
    icon: <Dumbbell className="w-6 h-6" />,
    label: "Personal Trainer",
    hook: "The best players have the best support teams.",
    isPrimary: false
  },
  physio: {
    icon: <HeartPulse className="w-6 h-6" />,
    label: "Physio / Medical",
    hook: "Keep athletes performing at their peak.",
    isPrimary: false
  },
  media: {
    icon: <PenTool className="w-6 h-6" />,
    label: "Media / Content Creator",
    hook: "Tell the stories that make careers.",
    isPrimary: false
  }
}

const roleHeadlines: Record<Role, string> = {
  player: "Where should we send your Genesis access?",
  fan: "You're about to back the next generation.",
  club: "Reserve your early access to the talent pipeline.",
  agent: "Your roster starts here.",
  scout: "First look privileges. Enter your email.",
  coach: "Your profile, your platform. Let's build it.",
  analyst: "The ecosystem needs people like you.",
  psychologist: "The ecosystem needs people like you.",
  trainer: "The ecosystem needs people like you.",
  physio: "The ecosystem needs people like you.",
  media: "The ecosystem needs people like you."
}

export default function WaitlistPage() {
  const [step, setStep] = useState<Step>(0)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [showProfessionalRoles, setShowProfessionalRoles] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [waitlistNumber, setWaitlistNumber] = useState(Math.floor(Math.random() * 500) + 1)
  const [showCountrySearch, setShowCountrySearch] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")
  const [filteredCountries, setFilteredCountries] = useState<string[]>(countries)

  const primaryRoles: Role[] = ["player", "fan", "club", "agent", "scout", "coach"]
  const professionalRoles: Role[] = ["analyst", "psychologist", "trainer", "physio", "media"]

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1 as Step)
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1 as Step)
    }
  }

  useEffect(() => {
    if (countrySearch) {
      const filtered = countries.filter(country => 
        country.toLowerCase().includes(countrySearch.toLowerCase())
      )
      setFilteredCountries(filtered)
    } else {
      setFilteredCountries(countries)
    }
  }, [countrySearch])

  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-hidden relative selection:bg-[#b8ff56] selection:text-[#001220]">
      {/* Animated particle background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(184, 255, 86, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184, 255, 86, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Stadium glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#008efa] rounded-full opacity-[0.06] blur-[120px]" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6">
        {/* Step 0: Hero Entry - Enhanced Design */}
        {step === 0 && (
          <div className="text-center max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Wordmark */}
            <div className="flex items-center justify-center gap-3 sm:gap-5 mb-8 sm:mb-12">
              <div className="relative">
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-[0.25em] uppercase">
                  STRATOS
                </h1>
              </div>
              <div className="relative">
                <span className="inline-flex items-center justify-center bg-[#b8ff56] text-[#001220] px-3 sm:px-4 py-1.5 sm:py-2 rounded-none text-xs sm:text-sm font-extrabold tracking-[0.15em] uppercase">
                  GENESIS
                </span>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 sm:mb-8 leading-[1.1] tracking-tight">
              The Platform Built For The Ones <br className="hidden sm:block" />
              The World Hasn't Discovered Yet.
            </h2>

            {/* Subtext */}
            <p className="text-[#8899aa] text-base sm:text-lg md:text-xl mb-10 sm:mb-16 max-w-2xl mx-auto font-light leading-relaxed">
              Join Genesis. Be first. Shape what comes next.
            </p>

            {/* CTA Button */}
            <Button
              onClick={handleNext}
              className="group relative bg-[#b8ff56] text-[#001220] hover:bg-[#b8ff56] px-10 sm:px-16 py-5 sm:py-7 text-base sm:text-lg md:text-xl font-extrabold rounded-none tracking-[0.1em] uppercase transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(184,255,86,0.3)]"
            >
              <span className="flex items-center gap-2 sm:gap-3">
                GET MY SPOT
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
          </div>
        )}

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="w-full max-w-5xl mx-auto animate-in fade-in slide-in-from-right duration-500">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
                Who are you in football?
              </h2>
            </div>

            {/* Primary roles grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6">
              {primaryRoles.map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`relative p-4 sm:p-6 text-left border-2 transition-all duration-200 ${
                    selectedRole === role
                      ? 'border-[#b8ff56] bg-[#0d1a0d]'
                      : 'border-[#1a2332] hover:border-[#b8ff56]/50 hover:bg-[#0a0f14]'
                  }`}
                >
                  {selectedRole === role && (
                    <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                      <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#b8ff56]" />
                    </div>
                  )}
                  <div className="text-white mb-2 sm:mb-3">
                    {roles[role].icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2">
                    {roles[role].label}
                  </h3>
                  <p className="text-[#8899aa] text-xs sm:text-sm">
                    {roles[role].hook}
                  </p>
                </button>
              ))}
            </div>

            {/* Professional roles toggle */}
            <div className="mb-8">
              <button
                onClick={() => setShowProfessionalRoles(!showProfessionalRoles)}
                className="flex items-center justify-center gap-2 w-full py-4 text-[#8899aa] hover:text-white transition-colors"
              >
                {showProfessionalRoles ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
                <span className="font-medium">
                  {showProfessionalRoles ? 'Hide' : '+ Show'} Football Professional
                </span>
              </button>

              {showProfessionalRoles && (
                <div className="animate-in slide-in-from-top-4 duration-300">
                  <p className="text-center text-[#008efa] text-sm mb-4 tracking-wider uppercase">
                    Part of the Stratos Network
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {professionalRoles.map((role) => (
                      <button
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={`relative p-4 text-left border-2 transition-all duration-200 ${
                          selectedRole === role
                            ? 'border-[#008efa] bg-[#0d1a0d]'
                            : 'border-[#1a2332] hover:border-[#008efa]/50 hover:bg-[#0a0f14]'
                        }`}
                      >
                        {selectedRole === role && (
                          <div className="absolute top-2 right-2">
                            <Check className="w-4 h-4 text-[#008efa]" />
                          </div>
                        )}
                        <div className="text-white mb-2">
                          {roles[role].icon}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">
                          {roles[role].label}
                        </h3>
                        <p className="text-[#8899aa] text-xs">
                          {roles[role].hook}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Continue button */}
            {selectedRole && (
              <div className="text-center">
                <Button
                  onClick={handleNext}
                  className="bg-[#b8ff56] text-[#001220] hover:bg-[#b8ff56]/90 px-10 py-5 text-base font-bold rounded-none"
                >
                  CONTINUE
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Email Capture */}
        {step === 2 && selectedRole && (
          <div className="w-full max-w-xl mx-auto animate-in fade-in slide-in-from-right duration-500">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {roleHeadlines[selectedRole]}
              </h2>
            </div>

            <div className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent border-b-2 border-t-0 border-l-0 border-r-0 border-[#1a2332] focus:border-[#b8ff56] rounded-none text-xl py-4 h-auto placeholder:text-[#8899aa]/50"
                />
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-b-2 border-t-0 border-l-0 border-r-0 border-[#1a2332] focus:border-[#b8ff56] rounded-none text-xl py-4 h-auto placeholder:text-[#8899aa]/50"
                />
              </div>

              <p className="text-[#8899aa] text-sm text-center">
                No spam. Just Genesis updates, feature previews, and your position number.
              </p>

              <div className="text-center pt-4">
                <Button
                  onClick={handleNext}
                  disabled={!email}
                  className="bg-[#b8ff56] text-[#001220] hover:bg-[#b8ff56]/90 disabled:opacity-50 disabled:cursor-not-allowed px-10 py-5 text-base font-bold rounded-none"
                >
                  CLAIM MY SPOT
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Role-Specific Question (Typeform-style) */}
        {step === 3 && selectedRole && (
          <div className="w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-right duration-500">
            <div className="text-left">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-12 leading-tight">
                {roleQuestions[selectedRole].text}
              </h2>
              
              {selectedRole === 'fan' ? (
                <div className="space-y-3">
                  {/* Region options */}
                  {roleQuestions[selectedRole].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedAnswer(option)
                        setStep(4)
                      }}
                      className={`w-full text-left p-4 md:p-6 border-2 transition-all duration-200 ${
                        selectedAnswer === option
                          ? 'border-[#b8ff56] bg-[#0d1a0d] text-white'
                          : 'border-[#1a2332] hover:border-[#b8ff56]/50 hover:bg-[#0a0f14] text-[#8899aa]'
                      }`}
                    >
                      <span className="text-lg md:text-xl font-medium">
                        {option}
                      </span>
                    </button>
                  ))}
                  
                  {/* Search country option */}
                  <div>
                    <button
                      onClick={() => setShowCountrySearch(!showCountrySearch)}
                      className={`w-full text-left p-4 md:p-6 border-2 transition-all duration-200 ${
                        showCountrySearch
                          ? 'border-[#008efa] bg-[#0d1a0d] text-white'
                          : 'border-[#1a2332] hover:border-[#008efa]/50 hover:bg-[#0a0f14] text-[#8899aa]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-lg md:text-xl font-medium">
                          Search country...
                        </span>
                        {showCountrySearch ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </div>
                    </button>
                    
                    {showCountrySearch && (
                      <div className="mt-3 animate-in slide-in-from-top-2 duration-300">
                        <div className="relative">
                          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8899aa]" />
                          <Input
                            type="text"
                            placeholder="Type to search country..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="pl-12 bg-[#0a0f14] border border-[#1a2332] text-white placeholder:text-[#8899aa]/50 py-4"
                            autoFocus
                          />
                        </div>
                        
                        <div className="mt-3 max-h-60 overflow-y-auto border border-[#1a2332] bg-[#0a0f14]">
                          {filteredCountries.length > 0 ? (
                            filteredCountries.map((country, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setSelectedAnswer(country)
                                  setStep(4)
                                }}
                                className="w-full text-left p-3 hover:bg-[#b8ff56]/10 transition-colors border-b border-[#1a2332]/50 last:border-0"
                              >
                                <span className="text-[#8899aa] hover:text-white">
                                  {country}
                                </span>
                              </button>
                            ))
                          ) : (
                            <div className="p-4 text-center text-[#8899aa]">
                              No countries found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {roleQuestions[selectedRole].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedAnswer(option)
                        setStep(4)
                      }}
                      className={`w-full text-left p-4 md:p-6 border-2 transition-all duration-200 ${
                        selectedAnswer === option
                          ? 'border-[#b8ff56] bg-[#0d1a0d] text-white'
                          : 'border-[#1a2332] hover:border-[#b8ff56]/50 hover:bg-[#0a0f14] text-[#8899aa]'
                      }`}
                    >
                      <span className="text-lg md:text-xl font-medium">
                        {option}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-10 text-center">
                <button
                  onClick={() => setStep(4)}
                  className="text-[#8899aa] hover:text-white transition-colors"
                >
                  Skip for now →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Post-Submit - Genesis Card */}
        {step === 4 && (
          <div className="w-full max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-700">
            {/* Checkmark */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#b8ff56] rounded-full">
                <Check className="w-8 h-8 text-[#001220]" />
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              {name ? `You're In, ${name}.` : "Genesis Confirmed."}
            </h2>

            {/* Genesis Badge */}
            <div className="relative bg-[#0a0f14] border-2 border-[#1a2332] p-8 mb-8 overflow-hidden">
              {/* Holographic shimmer */}
              <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite]" />
              </div>

              <div className="relative z-10">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold tracking-[0.2em] uppercase text-[#8899aa]">
                    STRATOS GENESIS MEMBER
                  </h3>
                </div>

                <div className="text-center mb-6">
                  <span className="text-6xl md:text-8xl font-bold text-[#b8ff56] tracking-wider">
                    #{waitlistNumber.toString().padStart(4, '0')}
                  </span>
                </div>

                {selectedRole && (
                  <div className="text-center">
                    <span className="inline-block bg-[#008efa] text-white px-4 py-2 rounded-full text-sm font-bold tracking-wider uppercase">
                      {roles[selectedRole].label}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Waitlist position */}
            <div className="mb-8">
              <p className="text-center text-[#8899aa] mb-4">
                You're #{waitlistNumber} on the Genesis list. Genesis 1 opens at 500.
              </p>
              <div className="h-2 bg-[#1a2332] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#b8ff56] transition-all duration-1000"
                  style={{ width: `${(waitlistNumber / 500) * 100}%` }}
                />
              </div>
            </div>

            {/* Referral block */}
            <div className="bg-[#0a0f14] p-6 border border-[#1a2332] mb-8">
              <p className="text-center text-white font-bold mb-4">
                Refer 5 players to skip the line.
              </p>
              <div className="bg-[#000000] p-4 text-center text-[#8899aa] text-sm font-mono">
                stratos.fyi/genesis/{waitlistNumber}
              </div>
            </div>

            {/* Footer micro-copy */}
            <p className="text-center text-[#8899aa] text-sm">
              Genesis 1 opens to the first 500 members. Genesis 2 follows. Every wave is intentional.
            </p>

            {/* Back home button */}
            <div className="text-center mt-8">
              <Link href="/">
                <Button variant="secondary" className="bg-transparent border border-[#1a2332] text-white hover:bg-[#0a0f14]">
                  Go Back Home
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Back button (for steps 1-3) */}
        {step > 0 && step < 4 && (
          <button
            onClick={handleBack}
            className="absolute top-6 left-6 text-[#8899aa] hover:text-white transition-colors flex items-center gap-2"
          >
            <ArrowRight className="w-5 h-5 rotate-180" />
            <span>Back</span>
          </button>
        )}
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  )
}
