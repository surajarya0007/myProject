import { FOOTER_CONTACT_INFO, FOOTER_LINKS, SOCIALS } from '../constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flexCenter pt-10 pb-2 bg-red-50">
      <div className="flex w-full flex-col gap-14 px-10">
        <div className="flex flex-col items-start justify-center gap-[10%] md:flex-row">
          <Link href="/" className="mb-10">
            <Image src="/you-and-me-logo.png" alt="logo" width={300} height={400}/>
          </Link>

          <div className='flex flex-wrap gap-10 sm:justify-between md:flex-1'>
            {FOOTER_LINKS.map((columns, index) => (
              <FooterColumn title={columns.title} key={index}>
                <ul className="flex flex-col gap-4 text-gray-500 text-sm">
                  {columns.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="hover:text-pink-600 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            ))}

            <div className="flex flex-col gap-5">
              <FooterColumn title={FOOTER_CONTACT_INFO.title}>
                {FOOTER_CONTACT_INFO.links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.label}
                    className="flex flex-col gap-1 hover:text-pink-600 transition-colors"
                  >
                    <p className="text-xs uppercase tracking-wider text-gray-400 whitespace-nowrap">
                      {link.label}
                    </p>
                    <p className="text-sm text-gray-600 whitespace-nowrap">
                      {link.value}
                    </p>
                  </Link>
                ))}
              </FooterColumn>
            </div>

            <div className="flex flex-col gap-5">
              <FooterColumn title={SOCIALS.title}>
                <ul className="flex gap-4">
                  {SOCIALS.links.map((social) => (
                    <li key={social.label}>
                      <Link
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="opacity-70 hover:opacity-100 transition-opacity"
                      >
                        <Image src={social.icon} alt={social.label} width={24} height={24} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </FooterColumn>
            </div>
          </div>
        </div>

        <div className="border border-pink-100" />
        <p className="font-body text-sm w-full text-center text-gray-400 pb-2">
          You and Me | All rights reserved 2024
        </p>
      </div>
    </footer>
  )
}

type FooterColumnProps = {
  title: string;
  children: React.ReactNode;
}

const FooterColumn = ({ title, children }: FooterColumnProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h4 className="font-heading text-lg font-semibold whitespace-nowrap text-gray-700">{title}</h4>
      {children}
    </div>
  )
}

export default Footer
