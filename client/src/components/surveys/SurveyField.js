import React from 'react'

export default function SurveyField({ label, input, meta: { error, touched } }) {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{marginBottom: '5px'}}/>
      <div className="red-text" style={{marginBottom:'20px'}}>
        {error && touched ? error : ''}
      </div>
    </div>
  )
}
