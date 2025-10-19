import React from 'react'
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react'

const Alert = ({ display=false , heading , subheading , meassage , onOkay , onCancel, type = 'warning'}) => {
  
    if(!display) return null;

    // Icon mapping based on alert type
    const getIcon = () => {
        switch(type) {
            case 'success':
                return <CheckCircle className="w-12 h-12 text-green-500" />;
            case 'error':
                return <XCircle className="w-12 h-12 text-red-500" />;
            case 'info':
                return <Info className="w-12 h-12 text-blue-500" />;
            case 'warning':
            default:
                return <AlertTriangle className="w-12 h-12 text-yellow-500" />;
        }
    };

    const getButtonColor = () => {
        switch(type) {
            case 'success':
                return 'bg-green-500 hover:bg-green-600';
            case 'error':
                return 'bg-red-500 hover:bg-red-600';
        }
    }
  
    return (
    <div className='fixed bg-foreground/20 backdrop-blur-sm h-full w-full top-0 left-0 flex items-center justify-center z-50'>
        <div className='bg-card p-6 px-4 rounded-lg shadow-lg w-96'>
            <div className='flex flex-col items-center mb-2'>
                {getIcon()}
            </div>
            <h2 className='text-lg font-semibold mb-2 text-center'>{heading}</h2>
            <p className='text-sm text-muted-foreground mb-4 text'>{subheading}</p>
            <p className='text-sm text-muted-foreground mb-6 text'>{meassage}</p>
            <div className='flex justify-end gap-4'>
                <button
                  onClick={onCancel}
                  className='px-4 py-2 border text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-smooth'
                >
                  Cancel
                </button>
                <button
                  onClick={onOkay}
                  className={`px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary-hover transition-smooth ${getButtonColor()}`}
                >
                  Okay
                </button>
            </div>
        </div>
    </div>
  )
}

export default Alert