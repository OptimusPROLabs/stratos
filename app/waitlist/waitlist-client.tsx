"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Check, User, Users, Search, Award, Activity, Brain, Dumbbell, HeartPulse, PenTool, ChevronDown, ChevronUp, Plus, X, Facebook, Send, Twitter, Linkedin } from "lucide-react"

type Step = 0 | 1 | 2 | 3 | 4 | 5
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

interface Player {
  id: number
  name: string
  email: string
}

interface WaitlistSubmitOptions {
  answer?: string | null
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
    options: ["Grassroot", "Academy", "Semi-pro", "Professional"]
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
    options: ["West Africa", "East Africa", "North Africa", "South America", "Europe"]
  },
  coach: {
    text: "What level do you currently coach?",
    options: ["Youth", "Amateur", "Semi-PRO", "Professional"]
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

const talentNetworkHook = "Spot talent early. Discover the next stars. Win."

const roles: Record<Role, RoleData> = {
  player: {
    icon: <User className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Players",
    hook: "Develop. Get discovered. Go PRO.",
    isPrimary: true
  },
  fan: {
    icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Fans",
    hook: "More than spectators– be part of the journey.",
    isPrimary: true
  },
  club: {
    icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Clubs / Academies",
    hook: "See what others can't. Recruit the best.",
    isPrimary: true
  },
  agent: {
    icon: <Activity className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Agent",
    hook: talentNetworkHook,
    isPrimary: true
  },
  scout: {
    icon: <Search className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Scout",
    hook: talentNetworkHook,
    isPrimary: true
  },
  coach: {
    icon: <Award className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Coach",
    hook: talentNetworkHook,
    isPrimary: true
  },
  analyst: {
    icon: <Activity className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Analyst",
    hook: "Turn match data into career-defining insights.",
    isPrimary: false
  },
  psychologist: {
    icon: <Brain className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Psychologist",
    hook: "Mental performance is the next frontier.",
    isPrimary: false
  },
  trainer: {
    icon: <Dumbbell className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Personal Trainer",
    hook: "The best players have the best support teams.",
    isPrimary: false
  },
  physio: {
    icon: <HeartPulse className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Physio / Medical",
    hook: "Keep athletes performing at their peak.",
    isPrimary: false
  },
  media: {
    icon: <PenTool className="w-5 h-5 sm:w-6 sm:h-6" />,
    label: "Media / Content Creator",
    hook: "Tell the stories that make careers.",
    isPrimary: false
  }
}

const roleHeadlines: Record<Role, string> = {
  player: "Where should we send your Stratos access?",
  fan: "You're about to back the next generation.",
  club: "Reserve your early access to the talent pipeline.",
  agent: "Spot talent early — enter your email to stay ahead.",
  scout: "Spot talent early — enter your email to stay ahead.",
  coach: "Spot talent early — enter your email to stay ahead.",
  analyst: "The ecosystem needs people like you.",
  psychologist: "The ecosystem needs people like you.",
  trainer: "The ecosystem needs people like you.",
  physio: "The ecosystem needs people like you.",
  media: "The ecosystem needs people like you."
}

const mainWaitlistRoles: Role[] = ["player", "fan", "club"]
const forRoleLabel: Partial<Record<Role, string>> = {
  player: "For Players:",
  fan: "For Fans:",
  club: "For Clubs:",
}

export default function WaitlistClient() {
  const [step, setStep] = useState<Step>(0)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [waitlistNumber, setWaitlistNumber] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [showCountrySearch, setShowCountrySearch] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")
  const [players, setPlayers] = useState<Player[]>([{ id: 1, name: "", email: "" }])
  const [hasInitialSubmit, setHasInitialSubmit] = useState(false)

  const getFilteredCountries = () => {
    if (!countrySearch) return countries
    return countries.filter(country => 
      country.toLowerCase().includes(countrySearch.toLowerCase())
    )
  }

  const getQuestionText = () => {
    if (!selectedRole) return undefined
    return roleQuestions[selectedRole].text
  }

  const getPlayersPayload = () => {
    if (selectedRole !== "club") return undefined

    return players
      .filter((player) => player.name.trim() || player.email.trim())
      .map((player) => ({
        name: player.name.trim(),
        email: player.email.trim(),
      }))
  }

  const handleNext = () => {
    if (step < 5) {
      if (step === 3 && selectedRole === 'club') {
        setStep(4)
      } else if (step === 4 && selectedRole === 'club') {
        setStep(5)
      } else {
        setStep(step + 1 as Step)
      }
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1 as Step)
      if (step === 4) {
        setShowCountrySearch(false)
        setCountrySearch("")
      }
    }
  }

  const addPlayer = () => {
    setPlayers([...players, { id: Date.now(), name: "", email: "" }])
  }

  const removePlayer = (id: number) => {
    if (players.length > 1) {
      setPlayers(players.filter(p => p.id !== id))
    }
  }

  const updatePlayer = (id: number, field: 'name' | 'email', value: string) => {
    setPlayers(players.map(p => 
      p.id === id ? { ...p, [field]: value } : p
    ))
  };

  const submitWaitlist = async (options?: WaitlistSubmitOptions) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const method = hasInitialSubmit ? 'PUT' : 'POST';
      const answerToSubmit = options?.answer !== undefined ? options.answer : selectedAnswer;
      const playersToSubmit = getPlayersPayload();
      const questionText = getQuestionText();

      const response = await fetch('/api/waitlist', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          role: selectedRole,
          questionText,
          answer: answerToSubmit,
          players: playersToSubmit,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (!hasInitialSubmit && response.status === 409 && data.waitlistNumber) {
          setWaitlistNumber(data.waitlistNumber);
          setHasInitialSubmit(true);
        } else {
          setErrorMessage(data.error || 'Something went wrong');
          return;
        }
      } else {
        setWaitlistNumber(data.waitlistNumber);
        if (!hasInitialSubmit) {
          setHasInitialSubmit(true);
        }
      }

      if (step === 3 && selectedRole === 'club') {
        setStep(4);
      } else if (step === 4 && selectedRole === 'club') {
        setStep(5);
      } else {
        setStep(step + 1 as Step);
      }
    } catch (error) {
      console.error('Error submitting waitlist:', error);
      setErrorMessage('Error submitting. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

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

      {/* Static stadium glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] md:w-[1200px] h-[800px] md:h-[1200px] bg-[#008efa] rounded-full opacity-[0.08] blur-[100px] md:blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#b8ff56] rounded-full opacity-[0.05] blur-[60px] md:blur-[100px]" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <Link
          href="/"
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Close and return home"
        >
          <X className="h-6 w-6 sm:h-7 sm:w-7" />
        </Link>

        {/* Step 0: Intro */}
        {step === 0 && (
          <div className="text-center max-w-3xl mx-auto px-2 pt-10">
            <p className="mb-3 text-base sm:text-lg font-medium text-[#b8ff56] animate-in slide-in-from-bottom-4 duration-700">
              Rise Above Limits...
            </p>
            <div className="mb-6 sm:mb-8 animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.1s" }}>
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.08em] sm:tracking-[0.12em] uppercase text-white drop-shadow-[0_0_40px_rgba(184,255,86,0.25)]">
                Stratos
              </h1>
            </div>
            <div className="mb-4 animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.2s" }}>
              <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-white">
                Get early access to Stratos.
              </p>
            </div>
            <div className="mb-8 sm:mb-12 animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.3s" }}>
              <p className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-[#8899aa] max-w-2xl mx-auto">
                Be part of a global football network built for all - players, fans, clubs, academies, scouts, agents and more
              </p>
            </div>
            <div className="animate-in slide-in-from-bottom-4 duration-700" style={{ animationDelay: "0.4s" }}>
              <Button
                onClick={handleNext}
                className="group relative bg-[#b8ff56] text-[#001220] hover:bg-[#b8ff56] w-full sm:w-auto px-8 sm:px-16 md:px-20 py-5 sm:py-7 md:py-8 text-base sm:text-lg md:text-xl font-black rounded-none tracking-wide uppercase transition-all duration-300 hover:scale-[1.02] sm:hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(184,255,86,0.4)]"
              >
                <span className="flex items-center justify-center gap-2 sm:gap-3">
                  Join Now
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Button>
            </div>
          </div>
        )}

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="w-full max-w-4xl mx-auto px-2 animate-in fade-in slide-in-from-right duration-500">
            <div className="text-center mb-6 sm:mb-10 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
                Who are you in football?
              </h2>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-2 sm:grid-cols-3 sm:mb-10 sm:gap-3 md:gap-4">
              {mainWaitlistRoles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    setSelectedRole(role)
                  }}
                  className={`relative p-3 sm:p-4 md:p-6 text-left border-2 transition-all duration-200 ${
                    selectedRole === role
                      ? "border-[#b8ff56] bg-[#0d1a0d]"
                      : "border-[#1a2332] hover:border-[#b8ff56]/50 hover:bg-[#0a0f14]"
                  }`}
                >
                  {selectedRole === role && (
                    <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                      <Check className="h-4 w-4 text-[#b8ff56] sm:h-5 sm:w-5" />
                    </div>
                  )}
                  <p className="mb-2 text-xs font-semibold text-[#b8ff56] sm:text-sm">{forRoleLabel[role]}</p>
                  <div className="mb-2 text-white sm:mb-3">{roles[role].icon}</div>
                  <h3 className="mb-1 text-base font-bold text-white sm:mb-2 sm:text-lg md:text-xl">
                    {roles[role].label}
                  </h3>
                  <p className="text-xs text-[#8899aa] sm:text-sm">{roles[role].hook}</p>
                </button>
              ))}
            </div>

            <div className="mb-6 sm:mb-8">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole("agent")
                }}
                className={`relative w-full border-2 p-4 text-left transition-all duration-300 sm:p-6 ${
                  selectedRole === "agent"
                    ? "border-[#008efa] bg-[#0a1520]"
                    : "border-[#1a2332] hover:border-[#008efa]/50 hover:bg-[#0a0f14]"
                }`}
              >
                {selectedRole === "agent" && (
                  <div className="absolute right-3 top-3 sm:right-4 sm:top-4">
                    <Check className="h-4 w-4 text-[#008efa] sm:h-5 sm:w-5" />
                  </div>
                )}
                <p className="mb-2 text-sm font-semibold text-[#008efa]">For Others:</p>
                <p className="mb-3 text-lg font-bold text-white sm:text-xl">Others</p>
                <p className="max-w-2xl text-sm text-[#8899aa]">
                  Coaches, scouts, and agents helping discover and develop talent.
                </p>
              </button>
            </div>

            {selectedRole && (
              <div className="text-center">
                <Button
                  onClick={handleNext}
                  className="rounded-none bg-[#b8ff56] px-8 py-4 text-sm font-bold text-[#001220] hover:bg-[#b8ff56]/90 sm:px-10 sm:py-5 sm:text-base w-full sm:w-auto"
                >
                  CONTINUE
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Email Capture - FULLY RESPONSIVE */}
        {step === 2 && selectedRole && (
          <div className="w-full max-w-xl mx-auto px-2 animate-in fade-in slide-in-from-right duration-500">
            <div className="text-center mb-6 sm:mb-10">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-4">
                {roleHeadlines[selectedRole]}
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-transparent border-b-2 border-t-0 border-l-0 border-r-0 border-[#1a2332] focus:border-[#b8ff56] rounded-none text-lg sm:text-xl py-3 sm:py-4 h-auto placeholder:text-[#8899aa]/50"
                />
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-b-2 border-t-0 border-l-0 border-r-0 border-[#1a2332] focus:border-[#b8ff56] rounded-none text-lg sm:text-xl py-3 sm:py-4 h-auto placeholder:text-[#8899aa]/50"
                />
              </div>

              <p className="text-[#8899aa] text-xs sm:text-sm text-center">
                No spam. Just Stratos updates, feature previews, and your position number.
              </p>

              <div className="text-center pt-2 sm:pt-4">
                <Button
                  onClick={() => submitWaitlist()}
                  disabled={!email || !name || isSubmitting}
                  className="bg-[#b8ff56] text-[#001220] hover:bg-[#b8ff56]/90 disabled:opacity-50 disabled:cursor-not-allowed px-8 sm:px-10 py-4 sm:py-5 text-sm sm:text-base font-bold rounded-none w-full sm:w-auto"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'CLAIM MY SPOT'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                
                {/* Error Message */}
                {errorMessage && (
                  <div className="mt-4 p-4 bg-red-900/30 border border-red-500/50 rounded">
                    <p className="text-red-300 text-sm">{errorMessage}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Role-Specific Question - FULLY RESPONSIVE */}
        {step === 3 && selectedRole && (
          <div className="w-full max-w-2xl mx-auto px-2 animate-in fade-in slide-in-from-right duration-500">
            <div className="text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-6 sm:mb-12 leading-tight">
                {roleQuestions[selectedRole].text}
              </h2>
              
              {(selectedRole === 'fan' || selectedRole === 'scout') ? (
                <div className="space-y-2 sm:space-y-3">
                  {/* Region options */}
                  {roleQuestions[selectedRole].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedAnswer(option)
                        submitWaitlist({ answer: option })
                      }}
                      disabled={isSubmitting}
                      className={`w-full text-left p-3 sm:p-4 md:p-6 border-2 transition-all duration-200 ${
                        selectedAnswer === option
                          ? 'border-[#b8ff56] bg-[#0d1a0d] text-white'
                          : 'border-[#1a2332] hover:border-[#b8ff56]/50 hover:bg-[#0a0f14] text-[#8899aa]'
                      }`}
                    >
                      <span className="text-base sm:text-lg md:text-xl font-medium">
                        {option}
                      </span>
                    </button>
                  ))}
                  
                  {/* Search country option */}
                  <div>
                    <button
                      onClick={() => setShowCountrySearch(!showCountrySearch)}
                      className={`w-full text-left p-3 sm:p-4 md:p-6 border-2 transition-all duration-200 ${
                        showCountrySearch
                          ? 'border-[#008efa] bg-[#0d1a0d] text-white'
                          : 'border-[#1a2332] hover:border-[#008efa]/50 hover:bg-[#0a0f14] text-[#8899aa]'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                          <span className="shrink-0 text-base sm:text-lg" aria-hidden="true">
                            🚩
                          </span>
                          <span className="truncate text-base sm:text-lg md:text-xl font-medium">
                            Search specific country...
                          </span>
                        </div>
                        {showCountrySearch ? (
                          <ChevronUp className="w-4 h-4 shrink-0 sm:w-5 sm:h-5" />
                        ) : (
                          <ChevronDown className="w-4 h-4 shrink-0 sm:w-5 sm:h-5" />
                        )}
                      </div>
                    </button>
                    
                    {showCountrySearch && (
                      <div className="mt-3 animate-in slide-in-from-top-2 duration-300">
                        <div className="relative">
                          <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#8899aa]" />
                          <Input
                            type="text"
                            placeholder="Type to search country..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="pl-10 sm:pl-12 bg-[#0a0f14] border border-[#1a2332] text-white placeholder:text-[#8899aa]/50 py-3 sm:py-4 text-base"
                            autoFocus
                          />
                        </div>
                        
                        <div className="mt-3 max-h-48 sm:max-h-60 overflow-y-auto border border-[#1a2332] bg-[#0a0f14]">
                          {getFilteredCountries().length > 0 ? (
                            getFilteredCountries().map((country, index) => (
                              <button
                                key={index}
                                onClick={() => {
                                  setSelectedAnswer(country)
                                  submitWaitlist({ answer: country })
                                }}
                                disabled={isSubmitting}
                                className="w-full text-left p-3 hover:bg-[#b8ff56]/10 transition-colors border-b border-[#1a2332]/50 last:border-0"
                              >
                                <span className="text-[#8899aa] hover:text-white text-sm sm:text-base">
                                  {country}
                                </span>
                              </button>
                            ))
                          ) : (
                            <div className="p-4 text-center text-[#8899aa] text-sm">
                              No countries found
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-2 sm:space-y-3">
                  {roleQuestions[selectedRole].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setSelectedAnswer(option)
                        submitWaitlist({ answer: option })
                      }}
                      disabled={isSubmitting}
                      className={`w-full text-left p-3 sm:p-4 md:p-6 border-2 transition-all duration-200 ${
                        selectedAnswer === option
                          ? 'border-[#b8ff56] bg-[#0d1a0d] text-white'
                          : 'border-[#1a2332] hover:border-[#b8ff56]/50 hover:bg-[#0a0f14] text-[#8899aa]'
                      }`}
                    >
                      <span className="text-base sm:text-lg md:text-xl font-medium">
                        {option}
                      </span>
                    </button>
                  ))}
                </div>
              )}

              <div className="mt-6 sm:mt-10 text-center">
                <button
                  onClick={() => submitWaitlist({ answer: null })}
                  disabled={isSubmitting}
                  className="text-[#8899aa] hover:text-white transition-colors text-sm sm:text-base"
                >
                  Skip for now →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Club Player Info - FULLY RESPONSIVE */}
        {step === 4 && selectedRole === 'club' && (
          <div className="w-full max-w-2xl mx-auto px-2 animate-in fade-in slide-in-from-right duration-500">
            <div className="text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 leading-tight">
                Add your players (optional)
              </h2>
              <p className="text-[#8899aa] text-sm sm:text-base mb-6 sm:mb-10">
                Help us complete your profile by adding some of your players.
              </p>
              
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                {players.map((player, index) => (
                  <div key={player.id} className="space-y-2 sm:space-y-3 p-3 sm:p-4 border border-[#1a2332] bg-[#0a0f14]">
                    <div className="flex items-center justify-between mb-1 sm:mb-2">
                      <span className="text-[#8899aa] text-xs sm:text-sm">Player {index + 1}</span>
                      {players.length > 1 && (
                        <button
                          onClick={() => removePlayer(player.id)}
                          className="text-[#8899aa] hover:text-red-400 transition-colors"
                        >
                          <X className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                      <Input
                        type="text"
                        placeholder="Player name"
                        value={player.name}
                        onChange={(e) => updatePlayer(player.id, 'name', e.target.value)}
                        className="bg-[#000000] border border-[#1a2332] text-white placeholder:text-[#8899aa]/50 text-sm"
                      />
                      <Input
                        type="email"
                        placeholder="Player email"
                        value={player.email}
                        onChange={(e) => updatePlayer(player.id, 'email', e.target.value)}
                        className="bg-[#000000] border border-[#1a2332] text-white placeholder:text-[#8899aa]/50 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <button
                onClick={addPlayer}
                className="flex items-center gap-2 text-[#b8ff56] hover:text-[#b8ff56]/80 mb-6 sm:mb-8 transition-colors text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Add another player</span>
              </button>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={handleBack}
                  className="text-[#8899aa] hover:text-white transition-colors flex items-center gap-2 text-sm sm:text-base order-2 sm:order-1"
                >
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
                  <span>Back</span>
                </button>
                
                <Button
                  onClick={() => submitWaitlist()}
                  disabled={isSubmitting}
                  className="bg-[#b8ff56] text-[#001220] hover:bg-[#b8ff56]/90 disabled:opacity-50 disabled:cursor-not-allowed px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold rounded-none w-full sm:w-auto order-1 sm:order-2"
                >
                  {isSubmitting ? 'SUBMITTING...' : 'CONTINUE'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Step 4 or 5: Post-Submit confirmation */}
        {(step === 4 && selectedRole !== 'club') || (step === 5 && selectedRole === 'club') ? (
          <div className="w-full max-w-2xl mx-auto text-center px-4 py-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-4 text-2xl animate-bounce" aria-hidden="true">
              🎉
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              Congratulations!
            </h2>
            <p className="text-base sm:text-lg text-white/80">
              You have been added to our waitlist.
            </p>
            <p className="mt-3 text-sm text-[#b8ff56]">
            Kindly follow us on social media 
            </p>
           
            <div className="mt-4 flex items-center justify-center gap-4">
              <a
                href="https://www.facebook.com/share/1DSgRknkoG/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/StratosF00tball"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/stratos_football"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/showcase/stratos-football/posts/?feedView=all"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        ) : null}

        {/* Back button - FULLY RESPONSIVE */}
        {(step > 0 && (
          (selectedRole === 'club' && step < 4) || 
          (selectedRole !== 'club' && step < 4)
        )) && (
          <button
            onClick={handleBack}
            className="absolute top-4 left-4 sm:top-6 sm:left-6 text-[#8899aa] hover:text-white transition-colors flex items-center gap-1 sm:gap-2"
          >
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
            <span className="text-sm sm:text-base">Back</span>
          </button>
        )}
      </div>
    </div>
  )
}
