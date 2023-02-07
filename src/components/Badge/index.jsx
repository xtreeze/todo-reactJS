import React from 'react'
import classsNames from 'classnames'

import './Badge.scss'

const Badge = ({ color, onClick, className }) => (
  <i
    onClick={onClick}
    className={classsNames('badge', { [`badge--${color}`]: color }, className)}
  ></i>
)

export default Badge
