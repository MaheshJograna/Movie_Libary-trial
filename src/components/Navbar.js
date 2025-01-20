import { Link } from 'react-router-dom';
import { FilmIcon } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-gray-300 p-3">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 text-xl font-semibold">
          <FilmIcon className="h-6 w-6" />
          <span>Movie Library</span>
        </Link>
        <div className="space-x-4 text-sm">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/spotlight" className="hover:text-white transition-colors">
            Spotlight
          </Link>
        </div>
      </div>
    </nav>
  )
}

