<?php
// Suppress all output except JSON
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get form data
$input = json_decode(file_get_contents('php://input'), true);

$name = $input['fullName'] ?? '';
$email = $input['email'] ?? '';
$phone = $input['phone'] ?? '';
$company = $input['company'] ?? '';
$service = $input['service'] ?? '';
$budget = $input['budget'] ?? '';
$message = $input['message'] ?? '';

// Your Hostinger SMTP details
$smtp_host = 'smtp.hostinger.com';
$smtp_port = 587;
$smtp_username = 'n0_reply@digitalxbrand.com';
$smtp_password = 'Avinash!08!08';
$from_email = 'n0_reply@digitalxbrand.com';
$to_email = 'aavi10111@gmail.com';

// Email content
$subject = "New Contact Form Submission from $name";
$body = "
Name: $name
Email: $email
Phone: $phone
Company: $company
Service: $service
Budget: $budget

Message:
$message
";

// Function to send email using SMTP
function sendSMTPEmail($to, $subject, $message, $from_email, $smtp_host, $smtp_port, $smtp_username, $smtp_password) {
    // Create socket connection
    $socket = fsockopen($smtp_host, $smtp_port, $errno, $errstr, 30);
    if (!$socket) {
        return false;
    }
    
    // Read initial response
    $response = fgets($socket, 515);
    if (substr($response, 0, 3) != '220') {
        fclose($socket);
        return false;
    }
    
    // Send EHLO command
    fputs($socket, "EHLO " . $_SERVER['HTTP_HOST'] . "\r\n");
    $response = fgets($socket, 515);
    
    // Start TLS
    fputs($socket, "STARTTLS\r\n");
    $response = fgets($socket, 515);
    if (substr($response, 0, 3) != '220') {
        fclose($socket);
        return false;
    }
    
    // Enable crypto
    if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
        fclose($socket);
        return false;
    }
    
    // Send EHLO again after TLS
    fputs($socket, "EHLO " . $_SERVER['HTTP_HOST'] . "\r\n");
    $response = fgets($socket, 515);
    
    // Authenticate
    fputs($socket, "AUTH LOGIN\r\n");
    $response = fgets($socket, 515);
    if (substr($response, 0, 3) != '334') {
        fclose($socket);
        return false;
    }
    
    // Send username
    fputs($socket, base64_encode($smtp_username) . "\r\n");
    $response = fgets($socket, 515);
    if (substr($response, 0, 3) != '334') {
        fclose($socket);
        return false;
    }
    
    // Send password
    fputs($socket, base64_encode($smtp_password) . "\r\n");
    $response = fgets($socket, 515);
    if (substr($response, 0, 3) != '235') {
        fclose($socket);
        return false;
    }
    
    // Send MAIL FROM
    fputs($socket, "MAIL FROM: <$from_email>\r\n");
    $response = fgets($socket, 515);
    if (substr($response, 0, 3) != '250') {
        fclose($socket);
        return false;
    }
    
    // Send RCPT TO
    fputs($socket, "RCPT TO: <$to>\r\n");
    $response = fgets($socket, 515);
    if (substr($response, 0, 3) != '250') {
        fclose($socket);
        return false;
    }
    
    // Send DATA
    fputs($socket, "DATA\r\n");
    $response = fgets($socket, 515);
    if (substr($response, 0, 3) != '354') {
        fclose($socket);
        return false;
    }
    
    // Send email headers and body
    fputs($socket, "From: $from_email\r\n");
    fputs($socket, "To: $to\r\n");
    fputs($socket, "Subject: $subject\r\n");
    fputs($socket, "Content-Type: text/plain; charset=UTF-8\r\n");
    fputs($socket, "\r\n");
    fputs($socket, $message . "\r\n");
    fputs($socket, ".\r\n");
    
    $response = fgets($socket, 515);
    if (substr($response, 0, 3) != '250') {
        fclose($socket);
        return false;
    }
    
    // Send QUIT
    fputs($socket, "QUIT\r\n");
    fclose($socket);
    
    return true;
}

// Try to send email using SMTP
if (sendSMTPEmail($to_email, $subject, $body, $from_email, $smtp_host, $smtp_port, $smtp_username, $smtp_password)) {
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    // Fallback to basic mail() function
    $headers = "From: $from_email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    if (mail($to_email, $subject, $body, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Email sent successfully (fallback method)']);
    } else {
        // For localhost testing, return a specific message
        if (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false || strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false) {
            echo json_encode(['success' => false, 'message' => 'Email service not available on localhost. Please test on the live server.']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to send email. Please try again or contact us directly.']);
        }
    }
}
?>
