import { Fragment, type JSX } from 'react'
import { MapPin, Phone, Globe } from 'lucide-react'
import { v4 as uuid } from 'uuid'

export function Footer() {
  return (
    <footer className='bg-primary min-h-80 w-full text-white'>
      <main className='container grid grid-cols-3 gap-20 py-6'>
        {sections.map((section) => (
          <section key={uuid()}>
            <h3 className='pb-4 text-2xl font-bold'>{section.sectionHeader}</h3>
            <main className={section.sectionBody.className}>
              {section.sectionBody.contents.map((row) => (
                <div className='flex items-center gap-3' key={uuid()}>
                  {row.map((child) => (
                    <Fragment key={uuid()}>{child}</Fragment>
                  ))}
                </div>
              ))}
            </main>
          </section>
        ))}
      </main>
    </footer>
  )
}

const sections: FooterSection[] = [
  // Basic Info Section
  {
    sectionHeader: 'CÔNG TY TNHH MEU SOLUTIONS',
    sectionBody: {
      className: 'flex flex-col gap-3',
      contents: [
        [<MapPin />, 'Số 03 Sông Thao, Phường 2, Quận Tân Bình, TP. HCM'],
        [<Phone />, '(+84) 2871099879'],
        [
          <Globe />,
          <a href='https://meu-solutions.com/' target='_blank' rel='noreferrer'>
            https://meu-solutions.com/
          </a>
        ]
      ]
    }
  },
  {
    sectionHeader: 'CHĂM SÓC KHÁCH HÀNG',
    sectionBody: {
      className: '',
      contents: [[<a href='/'>Link</a>], [<a href='/'>Link</a>], [<a href='/'>Link</a>], [<a href='/'>Link</a>]]
    }
  }
]

export type FooterSection = {
  sectionHeader: Content
  sectionBody: {
    className: string
    contents: Array<Content[]>
  }
}

type Content = JSX.Element | string
