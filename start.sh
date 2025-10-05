#!/bin/bash

# Urban Transit Card System - Startup Script
echo "🚀 Starting Urban Transit Card Management System"
echo "================================================="

# Check if Python is available
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if Node.js is available
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        return 0  # Port is in use
    else
        return 1  # Port is free
    fi
}

# Check if ports are available
if check_port 5000; then
    echo "⚠️  Port 5000 (API) is already in use"
fi

if check_port 5173; then
    echo "⚠️  Port 5173 (Frontend) is already in use"
fi

echo ""
echo "📋 To start the application:"
echo ""
echo "1. Terminal 1 - Start the API server:"
echo "   python app.py"
echo ""
echo "2. Terminal 2 - Start the frontend:"
echo "   npm run dev"
echo ""
echo "🌐 Access the application:"
echo "   • API: http://localhost:5000"
echo "   • Frontend: http://localhost:5173"
echo ""
echo "🔑 Default login credentials:"
echo "   • Admin: admin / admin"
echo "   • Passengers: Use card numbers like SNJ1001, PRI2002, etc."
echo ""
echo "📖 For more information, see README.md"
echo ""
echo "Happy coding! 🚀"
