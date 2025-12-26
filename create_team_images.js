// This script creates placeholder images for team members
// It uses the canvas API to generate simple placeholder images
// Run this with Node.js after installing canvas: npm install canvas

// To run this script:
// 1. Install canvas: npm install canvas
// 2. Run: node create_team_images.js

const { createCanvas } = require('canvas');
const fs = require('fs');

function createPlaceholderImage(name, color, filename) {
  const canvas = createCanvas(200, 200);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 200, 200);
  
  // Add text
  ctx.fillStyle = 'white';
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(name, 100, 100);
  
  // Save as PNG
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filename, buffer);
  console.log(`Created ${filename}`);
}

// Create team member images
createPlaceholderImage('Alex Johnson', '#2E86AB', 'assets/images/team-1.jpg');
createPlaceholderImage('Alex Johnson Back', '#A23B72', 'assets/images/team-1-back.jpg');
createPlaceholderImage('Sarah Williams', '#F18F01', 'assets/images/team-2.jpg');
createPlaceholderImage('Sarah Williams Back', '#C73E1D', 'assets/images/team-2-back.jpg');
createPlaceholderImage('Michael Chen', '#6A994E', 'assets/images/team-3.jpg');
createPlaceholderImage('Michael Chen Back', '#F2E8CF', 'assets/images/team-3-back.jpg');
createPlaceholderImage('Emma Rodriguez', '#BC6C25', 'assets/images/team-4.jpg');
createPlaceholderImage('Emma Rodriguez Back', '#606C38', 'assets/images/team-4-back.jpg');