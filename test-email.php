<?php
// Simple email test for Hostinger
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h2>Hostinger Email Test</h2>";

// Test basic mail function
$to = "aavi10111@gmail.com";
$subject = "Test Email from Hostinger";
$message = "This is a test email to check if mail() function works on Hostinger.";
$headers = "From: n0_reply@digitalxbrand.com\r\n";
$headers .= "Reply-To: n0_reply@digitalxbrand.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

echo "<p>Testing mail() function...</p>";

if (mail($to, $subject, $message, $headers)) {
    echo "<p style='color: green;'>✅ Email sent successfully!</p>";
} else {
    echo "<p style='color: red;'>❌ Email failed to send.</p>";
    echo "<p>Error: " . error_get_last()['message'] . "</p>";
}

// Test server info
echo "<h3>Server Information:</h3>";
echo "<p>PHP Version: " . phpversion() . "</p>";
echo "<p>Server: " . $_SERVER['SERVER_SOFTWARE'] . "</p>";
echo "<p>Host: " . $_SERVER['HTTP_HOST'] . "</p>";

// Check if mail function exists
if (function_exists('mail')) {
    echo "<p style='color: green;'>✅ mail() function is available</p>";
} else {
    echo "<p style='color: red;'>❌ mail() function is NOT available</p>";
}
?>
