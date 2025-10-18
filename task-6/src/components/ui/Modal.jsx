import { X } from 'lucide-react'
import React from 'react'

const Modal = ({title , children , handleclose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="relative bg-white rounded-lg shadow-lg w-11/12 max-w-lg p-6">
            <button
              onClick={handleclose}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
            >
                <X className="cursor-pointer" size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div>
                {children}
            </div>
        </div>
    </div>
  )
}

export default Modal