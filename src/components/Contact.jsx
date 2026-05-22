import { CONTACT_INFO } from '../assets/contact';

export default function Contact() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-green-400">Contact</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom duration-700">
          <div className="flex flex-col gap-1">
            <span className="text-blue-300 font-mono text-sm uppercase tracking-wider">Location</span>
            <p className="text-gray-300">{CONTACT_INFO.location}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-blue-300 font-mono text-sm uppercase tracking-wider">Phone</span>
            <p className="text-gray-300">{CONTACT_INFO.phone}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-blue-300 font-mono text-sm uppercase tracking-wider">Email</span>
            <a href={`mailto:${CONTACT_INFO.email}`} className="text-green-300 hover:underline">
              {CONTACT_INFO.email}
            </a>
          </div>
        </div>

        <div className="bg-gray-800/40 p-6 rounded-xl border border-gray-700 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom duration-700 delay-150">
          <h3 className="text-xl font-semibold text-white">Socials</h3>
          <div className="flex flex-col gap-4">
            <a 
              href={CONTACT_INFO.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-green-300 transition-colors"
            >
              <span className="font-mono">LinkedIn</span>
              <span className="text-xs text-gray-500">↗</span>
            </a>
            <a 
              href={CONTACT_INFO.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-gray-300 hover:text-green-300 transition-colors"
            >
              <span className="font-mono">GitHub</span>
              <span className="text-xs text-gray-500">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
