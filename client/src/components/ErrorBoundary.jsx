import React from 'react'
import { motion } from "motion/react"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("❌ Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className='w-full min-h-screen flex justify-center items-center bg-[#f3f3f3] px-6 py-20'>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='w-full max-w-md shadow-2xl bg-white p-8 rounded-3xl border border-red-200'
          >
            <div className='flex items-center justify-center gap-3 mb-6'>
              <div className='bg-red-100 text-red-600 p-3 rounded-full text-2xl'>
                ⚠️
              </div>
            </div>

            <h1 className='text-2xl font-semibold text-center text-red-600 mb-4'>
              Oops! Something went wrong
            </h1>

            <p className='text-gray-500 text-center text-sm leading-relaxed mb-6'>
              We encountered an unexpected error. Don't worry, we're on it. Try refreshing the page or clicking the button below.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className='bg-gray-100 rounded-lg p-4 mb-6 max-h-40 overflow-y-auto'>
                <p className='text-xs font-mono text-gray-700 break-words'>
                  {this.state.error.toString()}
                </p>
              </div>
            )}

            <div className='flex gap-4'>
              <motion.button 
                onClick={this.handleReset}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className='flex-1 bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition'
              >
                Try Again
              </motion.button>
              
              <motion.button 
                onClick={() => window.location.href = '/'}
                whileHover={{ opacity: 0.9, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className='flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-300 transition'
              >
                Go Home
              </motion.button>
            </div>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
