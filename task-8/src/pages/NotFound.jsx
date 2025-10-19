import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, Search, Briefcase, ArrowLeft, FileX, AlertCircle } from 'lucide-react'
import usePageTitle from '../hooks/usePageTitle'

const NotFound = () => {
  const navigate = useNavigate()
  usePageTitle({title : '404 Not Found'})

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        <div className="relative mb-8">
          <div className="text-[120px] sm:text-[230px] font-bold text-primary/20 leading-none select-none">
            404
          </div>
          
          {/* Floating Icons Animation */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="bg-card border-4 border-primary/20 rounded-full w-24 h-24 flex items-center justify-center shadow-lg animate-pulse">
                <FileX className="w-12 h-12 text-primary" />
              </div>
              
              <div className="absolute -top-4 -right-4 bg-secondary rounded-full p-3 shadow-md animate-bounce" style={{ animationDelay: '0.5s' }}>
                <Search className="w-5 h-5 text-primary" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-full p-3 shadow-md animate-bounce" style={{ animationDelay: '1s' }}>
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              
              <div className="absolute top-8 -left-8 bg-primary/10 rounded-full p-2 animate-bounce" style={{ animationDelay: '1.5s' }}>
                <AlertCircle className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
        </div>

        <div className=" ">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-900 mb-4">
            Oops! Page Not Found
          </h1>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary-hover transition-smooth shadow-md min-w-[180px] justify-center"
            >
              <Home className="w-5 h-5" />
              Go to Dashboard
            </button>
            
            <button
              onClick={() => navigate('/jobs')}
              className="flex items-center gap-3 px-6 py-3 border-2 border-primary text-primary rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-smooth min-w-[180px] justify-center"
            >
              <Briefcase className="w-5 h-5" />
              View Jobs
            </button>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-smooth mt-6 mx-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

      </div>
    </div>
  )
}

export default NotFound