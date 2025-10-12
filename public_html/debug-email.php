<?php
// Debug email functionality with detailed logging
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: text/plain');

$logFile = 'debug-email.log';
$timestamp = date('Y-m-d H:i:s');

// Function to log messages
function logMessage($message) {
    global $logFile, $timestamp;
    $logEntry = "[$timestamp] $message\n";
    file_put_contents($logFile, $logEntry, FILE_APPEND | LOCK_EX);
    echo $logEntry;
}

logMessage("=== EMAIL DEBUG SESSION STARTED ===");

// Test 1: Check PHP configuration
logMessage("PHP Version: " . phpversion());
logMessage("Mail function available: " . (function_exists('mail') ? 'YES' : 'NO'));
logMessage("OpenSSL available: " . (extension_loaded('openssl') ? 'YES' : 'NO'));
logMessage("Socket functions available: " . (function_exists('fsockopen') ? 'YES' : 'NO'));

// Test 2: Check SMTP connection
$smtp_host = 'smtp.hostinger.com';
$smtp_port = 587;

logMessage("Testing SMTP connection to $smtp_host:$smtp_port...");

$socket = fsockopen($smtp_host, $smtp_port, $errno, $errstr, 10);
if ($socket) {
    logMessage("✅ SMTP connection successful!");
    
    // Read initial response
    $response = fgets($socket, 515);
    logMessage("Initial response: " . trim($response));
    
    fclose($socket);
} else {
    logMessage("❌ SMTP connection failed: $errstr ($errno)");
}

// Test 3: Test form data processing
logMessage("Testing form data processing...");

$testData = [
    'fullName' => 'Debug Test User',
    'email' => 'debug@example.com',
    'phone' => '1234567890',
    'company' => 'Debug Company',
    'service' => 'Web Development',
    'budget' => '$5000-10000',
    'message' => 'This is a debug test message'
];

logMessage("Test data: " . json_encode($testData));

// Test 4: Test send-email.php script
logMessage("Testing send-email.php script...");

// Simulate POST request
$_SERVER['REQUEST_METHOD'] = 'POST';
$_SERVER['HTTP_HOST'] = 'localhost:8000';

// Capture output
ob_start();
$jsonData = json_encode($testData);
$GLOBALS['mock_input'] = $jsonData;

// Override php://input for testing
function mock_input() {
    return $GLOBALS['mock_input'];
}

// Include the send-email.php script
include 'send-email.php';
$output = ob_get_clean();

logMessage("send-email.php output: " . $output);

// Test 5: Check file permissions
logMessage("Checking file permissions...");
logMessage("send-email.php exists: " . (file_exists('send-email.php') ? 'YES' : 'NO'));
logMessage("send-email.php readable: " . (is_readable('send-email.php') ? 'YES' : 'NO'));
logMessage("Current directory: " . getcwd());
logMessage("Directory writable: " . (is_writable('.') ? 'YES' : 'NO'));

// Test 6: Test basic mail function
logMessage("Testing basic mail() function...");

$to = "aavi10111@gmail.com";
$subject = "Debug Test Email";
$message = "This is a debug test email from localhost.";
$headers = "From: n0_reply@digitalxbrand.com\r\n";
$headers .= "Reply-To: n0_reply@digitalxbrand.com\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($to, $subject, $message, $headers)) {
    logMessage("✅ Basic mail() function works!");
} else {
    logMessage("❌ Basic mail() function failed!");
    $lastError = error_get_last();
    if ($lastError) {
        logMessage("Last error: " . $lastError['message']);
    }
}

logMessage("=== EMAIL DEBUG SESSION COMPLETED ===");
logMessage("Debug log saved to: $logFile");
?>
