import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer>
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]" />
      <br />
      <div className="w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">About</h3>
            <ul className="space-y-4">
              {[
                { href: '/about', label: 'Our Story' },
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/faq', label: 'FAQ' },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { href: '/courses', label: 'Courses' },
                { href: '/profile', label: 'My Account' },
                { href: '/course-dashboard', label: 'Course Dashboard' },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">Social Links</h3>
            <ul className="space-y-4">
              {[
                {
                  href: 'https://www.youtube.com/channel/UCHz6Sne9splmvm-q2w1_HWQ',
                  label: 'Youtube',
                },
                { href: 'https://www.instagram.com/shahriar_sajeeb_/', label: 'Instagram' },
                { href: 'https://www.github.com/shahriarsajeeb', label: 'GitHub' },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">
              Contact Info
            </h3>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              Call Us: 1-885-665-2022
            </p>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              Address: +7011 Vermont Ave, Los Angeles, CA 90044
            </p>
            <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
              Mail Us: admin@furrisic.com
            </p>
          </div>
        </div>
        <br />
        <p className="text-center text-black dark:text-white">
          Copyright © 2023 furrisic infotech | All Rights Reserved
        </p>
      </div>
      <br />
    </footer>
  )
}

export default Footer
