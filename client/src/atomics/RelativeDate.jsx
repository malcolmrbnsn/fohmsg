import React from 'react'
import ReactTimeAgo from 'react-time-ago'


import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)


export default function LastSeen({ date }) {
  return (
    <div>
      <ReactTimeAgo timeStyle="twitter" date={date} />
    </div>
  )
}