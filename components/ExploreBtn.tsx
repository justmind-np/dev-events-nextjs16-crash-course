'use client'
import Image from 'next/image'
import posthog from 'posthog-js'

const ExploreBtn = () => {
    const handleClick = () => {
        console.log('clicked')
        posthog.capture('explore_events_clicked', {
            href: '#events',
        })
    }

    return (
        <button type="button" id="explore-btn" onClick={handleClick}>
           <a href="#events">
               Explore Events
               <Image src="/icons/arrow-down.svg" alt="arrow-down" width={24} height={24}/>
           </a>
        </button>
    )
}
export default ExploreBtn
