/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC } from 'react'

interface HeadProps {
  title: string
  description: string
  keyWord: string
}

const Heading: FC<HeadProps> = ({ title, description, keyWord }) => {
  return (
    <>
      <title>{title}</title>
      <meta name='viewPort' content="width=device-width initial-scale=1" />
      <meta name='description' content={description} />
      <meta name='keyWord' content={keyWord} />
    </>
  )
}

export default Heading
