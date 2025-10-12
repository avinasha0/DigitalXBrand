<?php
// Simple test script to check email functionality
echo "<h2>Email Test Script</h2>";

// Test basic mail function
$to = "aavi10111@gmail.com";
$subject = "Test Email from DigitalXBrand";
$message = "This is a test email to verify email functionality.";
$headers = "From: n0_reply@digitalxbrand.com\r\n";
$headers .= "Reply-To: n0_reply@digitalxbrand.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

echo "<p>Testing basic mail() function...</p>";

if (mail($to, $subject, $message, $headers)) {
    echo "<p style='color: green;'>✅ Basic mail() function works!</p>";
} else {
    echo "<p style='color: red;'>❌ Basic mail() function failed!</p>";
}

// Test SMTP connection
echo "<p>Testing SMTP connection...</p>";

$smtp_host = 'smtp.hostinger.com';
$smtp_port = 587;

$socket = fsockopen($smtp_host, $smtp_port, $errno, $errstr, 10);
if ($socket) {
    echo "<p style='color: green;'>✅ SMTP connection successful!</p>";
    fclose($socket);
} else {
    echo "<p style='color: red;'>❌ SMTP connection failed: $errstr ($errno)</p>";
}

// Check PHP configuration
echo "<h3>PHP Configuration:</h3>";
echo "<p>PHP Version: " . phpversion() . "</p>";
echo "<p>Mail function available: " . (function_exists('mail') ? 'Yes' : 'No') . "</p>";
echo "<p>OpenSSL available: " . (extension_loaded('openssl') ? 'Yes' : 'No') . "</p>";
echo "<p>Socket functions available: " . (function_exists('fsockopen') ? 'Yes' : 'No') . "</p>";

// Check if we can read the send-email.php file
echo "<h3>File Check:</h3>";
if (file_exists('send-email.php')) {
    echo "<p style='color: green;'>✅ send-email.php exists</p>";
} else {
    echo "<p style='color: red;'>❌ send-email.php not found</p>";
}
?>
