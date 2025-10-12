// Script to update all HTML files with centralized components
const fs = require('fs');
const path = require('path');

const htmlFiles = ['contact.html', 'services.html', 'portfolio.html'];

// Function to replace navigation section
function replaceNavigation(content) {
    const navStartPattern = /<!-- Navigation -->[\s\S]*?<\/nav>/;
    return content.replace(navStartPattern, '    <!-- Header Component Container -->\n    <div id="header"></div>');
}

// Function to replace footer section
function replaceFooter(content) {
    const footerPattern = /<!-- Footer -->[\s\S]*?<\/footer>[\s\S]*?<!-- Scroll to Top Button -->[\s\S]*?<\/button>/;
    return content.replace(footerPattern, '    <!-- Footer Component Container -->\n    <div id="footer"></div>');
}

// Function to add component script
function addComponentScript(content) {
    const scriptPattern = /<script src="js\/main\.js"><\/script>/;
    return content.replace(scriptPattern, '    <script src="js/components.js"></script>\n    <script src="js/main.js"></script>');
}

// Process each file
htmlFiles.forEach(file => {
    try {
        let content = fs.readFileSync(file, 'utf8');
        
        // Replace navigation
        content = replaceNavigation(content);
        
        // Replace footer
        content = replaceFooter(content);
        
        // Add component script
        content = addComponentScript(content);
        
        // Write back to file
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    } catch (error) {
        console.error(`Error updating ${file}:`, error.message);
    }
});

console.log('All files updated successfully!');
