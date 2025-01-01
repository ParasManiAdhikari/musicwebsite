'use client'

import { useState } from 'react'
import { Heart, Music, GamepadIcon, BookOpen, Link2, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import Window from '@/components/Window'
import tracks from './tracksData'

export default function RetroWebsite() {
  const [visitorCount, setVisitorCount] = useState(1337)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOption, setSortOption] = useState('newest')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedBestFor, setSelectedBestFor] = useState('All')

  // Filter and Sort Tracks
  const filteredTracks = tracks
    .filter(track => {
      if (selectedBestFor !== 'All' && track.bestFor !== selectedBestFor) return false
      if (selectedCategory !== 'All' && track.category !== selectedCategory) return false
      if (!track.title.toLowerCase().includes(searchTerm.toLowerCase())) return false
      return true
    })
    .sort((a, b) => {
      if (sortOption === 'newest') return b.id - a.id
      if (sortOption === 'longest') return parseDuration(b.length) - parseDuration(a.length)
      return 0
    })

  // Pagination logic
  const tracksPerPage = 12
  const totalPages = Math.ceil(filteredTracks.length / tracksPerPage)
  const currentTracks = filteredTracks.slice((currentPage - 1) * tracksPerPage, currentPage * tracksPerPage)

  function parseDuration(duration: string) {
    const [minutes, seconds] = duration.split(':').map(Number)
    return minutes * 60 + seconds
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="min-h-screen bg-pink-50" style={{
      backgroundImage: `
        radial-gradient(#ff69b440 1px, transparent 1px),
        radial-gradient(#ff69b440 1px, transparent 1px)
      `,
      backgroundSize: '20px 20px',
      backgroundPosition: '0 0, 10px 10px'
    }}>
      <div className="mx-auto max-w-7xl px-4 py-8">
  
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="mb-4 animate-pulse font-pixel text-4xl font-bold tracking-wide text-green-600">
            ⋆｡°✩  L O V E K I N E S I S . C O M ✩°｡⋆
          </h1>
        </header>

        {/* Currently Playing */}
          <div className="space-y-2 p-4 text-center">
            <div className="rounded-lg bg-pink-100 p-3">
              <h3 className="font-pixel text-green-600">Fire Emblem</h3>
              <p className="text-sm text-pink-600">Chapter 7: The Sealed Forest</p>
            </div>
          </div>
  
        {/* Body */}
        <div className="flex flex-col md:flex-row justify-center gap-6 mt-6">
  
          {/* Main Content */}
          <div className="space-y-6 flex-grow max-w-4xl">
            <Window title="♡ for you ♡">
              <div className="space-y-4 p-6">
  
                {/* Filters and Search */}
                <div className="space-y-4 bg-pink-200 border border-pink-400 p-4 rounded-md shadow-inner" style={{
                  fontFamily: '"Lucida Console", Monaco, monospace',
                  boxShadow: 'inset 4px 4px 8px rgba(0, 0, 0, 0.3)',
                  backgroundImage: 'linear-gradient(to bottom, #ffe4e6, #fbcfe8)'
                }}>
                  <input
                    type="text"
                    className="w-full rounded border border-pink-500 px-3 py-2 bg-pink-100 text-pink-800 focus:outline-none focus:ring focus:ring-pink-400"
                    placeholder="🔍 Search tracks..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.2)',
                      fontFamily: '"Lucida Console", Monaco, monospace'
                    }}
                  />
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <select
                      className="rounded border border-pink-500 px-3 py-2 bg-pink-100 text-pink-800 focus:outline-none focus:ring focus:ring-pink-400"
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                      style={{
                        boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.2)',
                        fontFamily: '"Lucida Console", Monaco, monospace'
                      }}
                    >
                      <option value="newest">🆕 Sort by Newest</option>
                      <option value="longest">⏳ Sort by Longest</option>
                    </select>
                    <select
                      className="rounded border border-pink-500 px-3 py-2 bg-pink-100 text-pink-800 focus:outline-none focus:ring focus:ring-pink-400"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      style={{
                        boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.2)',
                        fontFamily: '"Lucida Console", Monaco, monospace'
                      }}
                    >
                      <option value="All">🌐 All Categories</option>
                      <option value="Electronic">🎵 Electronic</option>
                      <option value="Synthwave">🌌 Synthwave</option>
                      <option value="Chiptune">🎮 Chiptune</option>
                      <option value="Ambient">🎧 Ambient</option>
                    </select>

                    <select
                      className="rounded border border-pink-500 px-3 py-2 bg-pink-100 text-pink-800 focus:outline-none focus:ring focus:ring-pink-400"
                      value={selectedBestFor}
                      onChange={(e) => setSelectedBestFor(e.target.value)}
                      style={{
                        boxShadow: 'inset 2px 2px 4px rgba(0, 0, 0, 0.2)',
                        fontFamily: '"Lucida Console", Monaco, monospace'
                      }}
                    >
                      <option value="All">🌍 best for all</option>
                      <option value="Couples">💖 couples</option>
                      <option value="Men">👨 men</option>
                      <option value="Women">👩 women</option>
                      <option value="Nonbinary">⚧ nonbinary</option>
                    </select>
                  </div>
                </div>
  
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                  {currentTracks.map((track) => (
                    <div key={track.id} className="rounded-lg bg-pink-200/50 p-2">
                      <Link
                        href={`/track`} // Link to the track detail page
                        className="font-pixel text-pink-900 hover:underline"
                      >
                        <div>{track.title} - {track.artist}</div>
                        <div className="text-sm text-pink-400">
                          {track.length}  •  {track.category}  •  {track.bestFor}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </Window>
  
            {/* Page Number */}
            <div className="mt-8 text-center">
              <div className="inline-flex gap-4">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handlePageChange(i + 1)}
                    className={`h-8 w-8 rounded ${i + 1 === currentPage ? 'bg-green-600 text-white' : 'bg-gray-200'} transition-colors`}
                    title={`Page ${i + 1}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
  
          {/* Right Sidebar */}
          <div className="space-y-4">
            <Window title="profile ♡">
              <nav className="space-y-2 p-4">
                {[{
                  icon: Heart,
                  text: 'about'
                }, {
                  icon: Music,
                  text: 'music + lyrics'
                }, {
                  icon: GamepadIcon,
                  text: 'games'
                }, {
                  icon: BookOpen,
                  text: 'blog'
                }, {
                  icon: Link2,
                  text: 'links'
                }, {
                  icon: MessageSquare,
                  text: 'guestbook'
                }].map((item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-pink-700 transition-colors hover:bg-pink-100"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="font-pixel">{item.text}</span>
                  </a>
                ))}
              </nav>
            </Window>
  
            <Window title="♡ updates ♡">
              <div className="space-y-2 p-4 font-pixel text-pink-700">
                <p>→ new song released! check my music page</p>
                <p>→ updated my gaming collection</p>
                <p>→ added new pixel art to gallery</p>
                <p>→ added new pixel art to gallery</p>
              </div>
            </Window>
  
            <Window title="visitor count ♡">
              <div className="p-4 text-pink-700">
                {visitorCount.toString().padStart(6, '0')}
              </div>
            </Window>
          </div>
        </div>
  
      </div>
    </div>
  )
}  