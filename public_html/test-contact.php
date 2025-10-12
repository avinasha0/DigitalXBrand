<?php
// Test the contact form email functionality
$testData = [
    'fullName' => 'Test User',
    'email' => 'test@example.com',
    'phone' => '1234567890',
    'company' => 'Test Company',
    'service' => 'Web Development',
    'budget' => '$5000-10000',
    'message' => 'This is a test message from localhost'
];

echo "<h2>Testing Contact Form Email</h2>";
echo "<p>Sending test data...</p>";

// Simulate the POST request
$_SERVER['REQUEST_METHOD'] = 'POST';
$_SERVER['CONTENT_TYPE'] = 'application/json';

// Mock the input stream
$jsonData = json_encode($testData);
$tempFile = tmpfile();
fwrite($tempFile, $jsonData);
rewind($tempFile);

// Override php://input
$originalInput = 'php://input';
$GLOBALS['mock_input'] = $jsonData;

// Include the send-email.php script
ob_start();
include 'send-email.php';
$output = ob_get_clean();

echo "<h3>Email Script Output:</h3>";
echo "<pre>" . htmlspecialchars($output) . "</pre>";

// Clean up
fclose($tempFile);
?>
