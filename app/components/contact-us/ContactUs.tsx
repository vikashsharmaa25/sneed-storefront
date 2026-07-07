import React from 'react'
import { ContactHero } from './ContactHero'
import { WhyReachToUs } from './WhyReachToUs'
import { ContactSection } from './ContactSection'
import { Certifications } from './Certifications'

function ContactUs() {
    return (
        <>
            <ContactHero />
            <WhyReachToUs />
            <ContactSection />
            <Certifications />
        </>
    )
}

export default ContactUs