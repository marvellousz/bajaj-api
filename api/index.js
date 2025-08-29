export default function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ 
      message: 'BFHL API is running',
      status: 'healthy'
    });
  } else {
    res.status(405).json({ 
      is_success: false,
      error: {
        code: 'METHOD_NOT_ALLOWED',
        message: 'Method not allowed'
      }
    });
  }
}
