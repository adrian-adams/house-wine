import React from 'react'
// Links
import { quickLinks, forProfessionals, moreInformation, legal } from './Footer-Links'
// Components
import LinkList from './LinkList'
import Instagram from '../svgs/Instagram'
import LinkedIn from '../svgs/LinkedIn'
import SocialLinks from './SocialLinks'
import HouseWineLogo from '../brand-logo/HouseWineLogo'

export default function Footer() {
    const currentYear = Temporal.Now.plainDateISO().year;

    return (
        <footer className="flex flex-col items-center justify-between gap-8 h-full md:h-[calc(100vh-30%)] p-4 md:py-10 md:px-20 bg-hw-dead-sea-mud text-hw-coastal-fog">
            <section className="flex flex-col lg:flex-row gap-8 items-start px-4">
                <div className="flex flex-col gap-4">
                    <HouseWineLogo width={100} height={100} />
                    <p>Manage your wine collection with AI-powered intelligence. Organize, catalog, and showcase your wines with ease.</p>
                    <ul className="flex flex-row gap-4 items-center">
                        <SocialLinks link="#" target="_blank">
                            <Instagram width="1.5em" height="1.5em" />
                        </SocialLinks>
                        <SocialLinks link="#" target="_blank">
                            <LinkedIn width="1.5em" height="1.5em" />
                        </SocialLinks>
                    </ul>

                </div>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    <LinkList title="Quick Links" data={quickLinks} />
                    <LinkList title="For Professionals" data={forProfessionals} />
                    <LinkList title="More Information" data={moreInformation} />
                    <LinkList title="Legal" data={legal} />
                </div>
            </section>
            <section className="w-full flex flex-col md:flex-row justify-between items-center pt-10 text-xs border-t border-hw-foggy-dew">
                <p>
                    © {currentYear} House Wine. All rights reserved.
                </p>
                <p>
                    This site is an initiative of Webroots.nl · Delistraat 8, 1094CV, Amsterdam · Webroots B.V.
                </p>
            </section>
        </footer>
    )
}
