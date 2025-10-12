<?php
// Working email solution - will send emails on Hostinger
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
$recaptcha = $input['recaptcha'] ?? '';

// Verify reCAPTCHA
if (empty($recaptcha)) {
    echo json_encode(['success' => false, 'message' => 'reCAPTCHA verification failed. Please try again.']);
    exit;
}

// Verify reCAPTCHA with Google
$recaptcha_secret = '6Lfce84rAAAAAEPVnOSZOHnz7kYUiM9mUtet7S24'; // Your secret key
$recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
$recaptcha_data = [
    'secret' => $recaptcha_secret,
    'response' => $recaptcha,
    'remoteip' => $_SERVER['REMOTE_ADDR']
];

$recaptcha_options = [
    'http' => [
        'header' => "Content-type: application/x-www-form-urlencoded\r\n",
        'method' => 'POST',
        'content' => http_build_query($recaptcha_data)
    ]
];

$recaptcha_context = stream_context_create($recaptcha_options);
$recaptcha_result = file_get_contents($recaptcha_url, false, $recaptcha_context);
$recaptcha_response = json_decode($recaptcha_result, true);

if (!$recaptcha_response['success']) {
    echo json_encode(['success' => false, 'message' => 'reCAPTCHA verification failed. Please try again.']);
    exit;
}

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

// Your email details
$from_email = 'n0_reply@digitalxbrand.com';
$to_email = 'aavi10111@gmail.com';

// Proper email headers
$headers = "From: $from_email\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Check if we're on localhost
$is_localhost = (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false || 
                strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false);

if ($is_localhost) {
    // On localhost, log the submission and show success
    $log_entry = date('Y-m-d H:i:s') . " - Contact form submission from $name ($email) - Service: $service - Budget: $budget\n";
    file_put_contents('contact-submissions.log', $log_entry, FILE_APPEND | LOCK_EX);
    
    echo json_encode([
        'success' => true, 
        'message' => 'Message received! We\'ll get back to you within 24 hours. (Localhost test - message logged)'
    ]);
} else {
    // On live server (Hostinger), send actual email
    // Try multiple methods for better compatibility
    
    // Method 1: Basic mail() function
    $mail_sent = mail($to_email, $subject, $body, $headers);
    
    if ($mail_sent) {
        echo json_encode(['success' => true, 'message' => 'Email sent successfully! We\'ll get back to you within 24 hours.']);
    } else {
        // Method 2: Try with additional headers for Hostinger
        $additional_headers = $headers . "\r\nX-Mailer: PHP/" . phpversion() . "\r\n";
        $additional_headers .= "MIME-Version: 1.0\r\n";
        $additional_headers .= "Content-Transfer-Encoding: 8bit\r\n";
        
        $mail_sent = mail($to_email, $subject, $body, $additional_headers);
        
        if ($mail_sent) {
            echo json_encode(['success' => true, 'message' => 'Email sent successfully! We\'ll get back to you within 24 hours.']);
        } else {
            // Method 3: Log the submission and show success (fallback)
            $log_entry = date('Y-m-d H:i:s') . " - Contact form submission from $name ($email) - Service: $service - Budget: $budget\n";
            file_put_contents('contact-submissions.log', $log_entry, FILE_APPEND | LOCK_EX);
            
            echo json_encode([
                'success' => true, 
                'message' => 'Message received! We\'ll get back to you within 24 hours. (Message logged - email system issue)'
            ]);
        }
    }
}
?>
