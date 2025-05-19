exports.errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  
  // Handle specific error types
  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ 
      success: false, 
      message: 'Duplicate entry' 
    });
  }
  
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      success: false, 
      message: err.message 
    });
  }
  
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ 
      success: false, 
		message: 'Unauthorized'
    });
  }

  // Default error handling
  res.status(500).json({ 
    success: false, 
    message: process.env.NODE_ENV === 'development' ? err.message : 'Server error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};