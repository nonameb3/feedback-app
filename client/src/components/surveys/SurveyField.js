import React from 'react'

export default function SurveyField(props) {
  return (
    <div>
      <label>{props.label}</label>
      <input {...props.input}/>
    </div>
  )
}
