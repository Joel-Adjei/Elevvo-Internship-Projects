import React from 'react'

const Input = ({onChange, type, placeholder , name, label , value}) => {
  return (
    <div>
    <label className="block text-sm font-medium mb-2">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full px-4 py-2.5 bg-green-50/50 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
      placeholder={placeholder}
    />
  </div>
  )
}

export default Input