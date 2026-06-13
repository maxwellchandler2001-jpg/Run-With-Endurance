import { useState } from 'react'
import { brand, valueProps, devotionals, seriesData } from './content'

function App() {
  const [email, setEmail] = useState('')
  const [subStatus, setSubStatus] = useState('idle') // idle | loading | success | error
  const [subMsg, setSubMsg] = useState('')

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return
    setSubStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setSubStatus('success')
        setSubMsg(data.message || 'Welcome! Check your inbox.')
        setEmail('')
      } else {
        setSubStatus('error')
        setSubMsg(data.error || 'Something went wrong. Try again.')
      }
    } catch {
      setSubStatus('error')
      setSubMsg('Network error. Please try again.')
    }
  }

  const featured = devotionals[0] // "The Wall and the Way"
  const moreDevos = devotionals.slice(1)

  return (
    <div className="min-h-screen bg-earth-50 text-earth-800 font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-earth-50/90 backdrop-blur-sm border-b border-earth-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 no-underline">
            <span className="text-2xl">🏃</span>
            <span className="font-display text-xl font-bold text-pine-700 tracking-tight">
              {brand.name}
            </span>
          </a>
          <div className="hidden sm:flex items-center gap-8 text-sm font-medium text-earth-600">
            <a href="#about" className="hover:text-pine-600 transition-colors">About</a>
            <a href="#today" className="hover:text-pine-600 transition-colors">Today&rsquo;s Devotional</a>
            <a href="#collection" className="hover:text-pine-600 transition-colors">Collection</a>
            <a href="#series" className="hover:text-pine-600 transition-colors">Series</a>
            <a href="#subscribe" className="hover:text-pine-600 transition-colors">Subscribe</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pine-100 via-earth-100 to-sky-100 opacity-60" />
        <div className="relative max-w-6xl mx-auto px-6 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pine-100 text-pine-700 text-sm font-medium mb-8">
              <span>✝️</span>
              <span>Faith &amp; Fitness United</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-earth-900 leading-tight tracking-tight mb-6">
              Run the Race
              <br />
              <span className="text-pine-600">Set Before Us</span>
            </h1>
            <p className="text-lg sm:text-xl text-earth-600 max-w-2xl mx-auto leading-relaxed mb-10">
              {brand.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#today"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-pine-600 text-white font-semibold hover:bg-pine-700 transition-all shadow-lg shadow-pine-200"
              >
                Read Today&rsquo;s Devotional
                <span>→</span>
              </a>
              <a
                href="#subscribe"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border-2 border-earth-200 text-earth-700 font-semibold hover:border-pine-400 hover:text-pine-600 transition-all"
              >
                Get the Free Newsletter
              </a>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-earth-50 to-transparent" />
      </section>

      {/* What is Run with Endurance - Value Prop */}
      <section id="about" className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-earth-900 mb-4">
              What Is Run with Endurance?
            </h2>
            <p className="text-lg text-earth-500 max-w-2xl mx-auto">
              We&rsquo;re a community of Christian runners who believe every stride
              can be a step toward God. Short, scripture-centered devotionals
              designed to meet you before, during, and after your run.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {valueProps.map((item, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-earth-50 border border-earth-100 hover:border-pine-200 hover:shadow-lg hover:shadow-pine-50 transition-all"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-display text-xl font-semibold text-earth-800 mb-3">
                  {item.title}
                </h3>
                <p className="text-earth-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Core Scripture */}
          <div className="mt-16 text-center p-8 rounded-2xl bg-pine-50 border border-pine-100">
            <p className="font-display text-2xl text-pine-800 italic leading-relaxed">
              {brand.coreScripture.text}
            </p>
            <p className="mt-4 text-pine-600 font-medium">— {brand.coreScripture.ref}</p>
          </div>
        </div>
      </section>

      {/* Today's Devotional */}
      <section id="today" className="py-20 sm:py-28 bg-earth-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-pine-600 uppercase tracking-widest">
              Today&rsquo;s Devotional
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-earth-900 mt-2 mb-4">
              {featured.title}
            </h2>
            <p className="text-earth-500 max-w-xl mx-auto">
              From our series on the spiritual disciplines of running.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-earth-100 shadow-xl shadow-earth-100/50 overflow-hidden">
            <div className="p-8 sm:p-12">
              <div className="flex items-center gap-3 text-sm text-earth-400 mb-8 flex-wrap">
                <span>🏃 {featured.category}</span>
                <span className="w-1 h-1 rounded-full bg-earth-300" />
                <span>⏱ {featured.readTime}</span>
                <span className="w-1 h-1 rounded-full bg-earth-300" />
                <span>📖 {featured.scripture.split('—')[1]?.trim() || 'Hebrews 12:1'}</span>
              </div>

              {/* Scripture block */}
              <div className="border-l-4 border-pine-300 bg-pine-50 rounded-r-xl px-6 py-4 mb-8">
                <p className="text-pine-800 italic font-medium text-lg leading-relaxed">
                  {featured.scripture}
                </p>
              </div>

              {/* Devotional body */}
              <div className="prose prose-earth max-w-none space-y-5">
                {featured.body.split('\n\n').map((para, i) => (
                  <p key={i} className="text-earth-600 leading-relaxed text-lg">
                    {para}
                  </p>
                ))}
              </div>

              {/* Prayer or Reflection */}
              {(featured.prayer || featured.reflection) && (
                <div className={`rounded-xl p-6 mt-8 ${featured.prayer ? 'bg-sky-50' : 'bg-earth-50'}`}>
                  <h4 className="font-semibold text-earth-800 mb-3">
                    {featured.prayer ? '🙏 Prayer' : '💭 Reflection Question'}
                  </h4>
                  <p className="text-earth-600 italic text-lg">
                    {featured.prayer || featured.reflection}
                  </p>
                </div>
              )}

              {/* Mile Marker */}
              <div className="mt-8 pt-6 border-t border-earth-100">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pine-100 text-pine-700 text-sm font-medium">
                  <span>📍</span>
                  <span>Mile Marker: {featured.mileMarker}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Browse the Collection */}
      <section id="collection" className="py-20 sm:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-pine-600 uppercase tracking-widest">
              Browse the Collection
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-earth-900 mt-2 mb-4">
              All Devotionals
            </h2>
            <p className="text-earth-500 max-w-xl mx-auto">
              Every devotional connects the physical discipline of running with spiritual growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {devotionals.map((dev) => (
              <div
                key={dev.id}
                className="group p-6 rounded-2xl border border-earth-100 bg-earth-50 hover:bg-white hover:border-pine-200 hover:shadow-lg hover:shadow-pine-50 transition-all"
              >
                <div className="flex items-center gap-2 text-xs text-earth-400 mb-3">
                  <span>🏃 {dev.category}</span>
                  <span className="w-1 h-1 rounded-full bg-earth-300" />
                  <span>⏱ {dev.readTime}</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-earth-800 mb-2 group-hover:text-pine-700 transition-colors">
                  {dev.title}
                </h3>
                <p className="text-earth-500 text-sm leading-relaxed mb-4 line-clamp-2">
                  {dev.body.split('\n\n')[0]}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pine-50 text-pine-600 text-xs font-medium">
                  <span>📍</span>
                  <span>{dev.mileMarker}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Race Set Before Us - Series */}
      <section id="series" className="py-20 sm:py-28 bg-earth-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-pine-600 uppercase tracking-widest">
              Featured Series
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-earth-900 mt-2 mb-4">
              {seriesData.title}
            </h2>
            <p className="text-earth-500 max-w-2xl mx-auto">
              {seriesData.description}
            </p>
            <div className="mt-4 text-sm text-pine-600 font-medium">
              📖 {seriesData.scripture}
            </div>
          </div>

          {/* Series timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-pine-200 hidden sm:block" />

            <div className="space-y-6">
              {seriesData.devotionals.map((d, i) => (
                <div key={i} className="relative flex items-start gap-6 sm:pl-16">
                  {/* Number badge */}
                  <div className="hidden sm:flex absolute left-0 w-12 h-12 rounded-full bg-pine-600 text-white items-center justify-center font-bold text-sm shadow-md z-10">
                    {String(d.number).padStart(2, '0')}
                  </div>

                  {/* Mobile number */}
                  <div className="sm:hidden flex-shrink-0 w-10 h-10 rounded-full bg-pine-600 text-white flex items-center justify-center font-bold text-xs z-10">
                    {String(d.number).padStart(2, '0')}
                  </div>

                  <div className="flex-1 bg-white rounded-xl border border-earth-100 p-5 hover:border-pine-200 hover:shadow-md transition-all">
                    <p className="text-sm text-pine-500 italic mb-1">{d.phrase}</p>
                    <h3 className="font-display text-lg font-semibold text-earth-800 mb-2">
                      {d.title}
                    </h3>
                    <p className="text-earth-500 text-sm leading-relaxed">
                      {d.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scripture anchor */}
          <div className="mt-12 text-center p-6 rounded-2xl bg-white border border-earth-100">
            <p className="font-display text-lg text-pine-700 italic">
              "{brand.coreScripture.text}"
            </p>
            <p className="mt-2 text-pine-600 font-medium text-sm">— {brand.coreScripture.ref}</p>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section id="subscribe" className="py-20 sm:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-medium mb-8">
            <span>✉️</span>
            <span>Free Weekly Newsletter</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-earth-900 mb-4">
            Get Devotionals in Your Inbox
          </h2>
          <p className="text-lg text-earth-500 mb-10 max-w-xl mx-auto">
            Join fellow Christian runners. One short devotional every week —
            designed to be read before a run, during cooldown, or over your
            morning coffee.
          </p>

          <form
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            onSubmit={handleSubscribe}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3.5 rounded-xl border-2 border-earth-200 bg-earth-50 text-earth-800 placeholder:text-earth-400 focus:outline-none focus:border-pine-400 focus:bg-white transition-all"
              required
              disabled={subStatus === 'loading' || subStatus === 'success'}
            />
            <button
              type="submit"
              disabled={subStatus === 'loading' || subStatus === 'success'}
              className="px-8 py-3.5 rounded-xl bg-pine-600 text-white font-semibold hover:bg-pine-700 transition-all shadow-lg shadow-pine-200 whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {subStatus === 'loading' ? 'Subscribing...' : subStatus === 'success' ? '✓ Subscribed' : 'Subscribe Free'}
            </button>
          </form>

          {/* Status message */}
          {subStatus === 'success' && (
            <div className="mt-4 p-4 rounded-xl bg-green-50 border border-green-100 text-green-700 text-sm">
              {subMsg}
            </div>
          )}
          {subStatus === 'error' && (
            <div className="mt-4 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {subMsg}
            </div>
          )}

          <p className="text-sm text-earth-400 mt-4">
            No spam. Unsubscribe anytime. Read before your next run.
          </p>

          {/* Premium tier tease */}
          <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-earth-50 border border-earth-100">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:text-left">
              <div className="text-3xl">⭐</div>
              <div className="flex-1">
                <h3 className="font-semibold text-earth-800">Premium Membership</h3>
                <p className="text-earth-500 text-sm mt-1">
                  Full devotional library, audio versions, printable journals,
                  and exclusive training logs — coming soon.
                </p>
              </div>
              <span className="px-4 py-2 rounded-lg bg-earth-200 text-earth-600 text-sm font-medium whitespace-nowrap">
                🔒 Details TBD
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-earth-800 text-earth-300 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🏃</span>
                <span className="font-display text-lg font-bold text-white">
                  {brand.name}
                </span>
              </div>
              <p className="text-earth-400 text-sm leading-relaxed">
                {brand.description}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#today" className="hover:text-white transition-colors">Today&rsquo;s Devotional</a></li>
                <li><a href="#collection" className="hover:text-white transition-colors">Collection</a></li>
                <li><a href="#series" className="hover:text-white transition-colors">Series</a></li>
                <li><a href="#subscribe" className="hover:text-white transition-colors">Newsletter</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Connect</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="hover:text-white transition-colors cursor-pointer">Instagram</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Strava Club</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">YouTube</span></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Partnerships</h4>
              <ul className="space-y-2 text-sm">
                <li><span className="hover:text-white transition-colors cursor-pointer">Church Groups</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Running Clubs</span></li>
                <li><span className="hover:text-white transition-colors cursor-pointer">Faith-based Events</span></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-earth-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
            <p>© {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
            <p className="text-earth-500">
              "Run with endurance the race set before us" — Hebrews 12:1
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App