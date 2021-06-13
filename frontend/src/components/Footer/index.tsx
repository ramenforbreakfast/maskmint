import React from 'react'

export default function Footer() {
    return (
        <div className="flex flex-row bg-cyan-600 h-12 justify-center items-center font-FredokaOne text-m p-2 text-gray-50 space-x-8">
            <p>Built/Maintained by <span><a className="text-gray-300" href="https://twitter.com/itsinthebroth">ramenforbreakfast</a></span></p>
            <p>Seed planted by <span><a className="text-gray-300" href="https://twitter.com/smallbraincat">smallbraincatpital</a></span></p>
            <div>Icons made by <a href="https://www.flaticon.com/authors/wanicon" title="wanicon">wanicon</a> from <a className="text-gray-300" href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        </div>
    )
}