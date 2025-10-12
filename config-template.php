<?php
// DigitalXBrand Configuration File Template
// Copy this file to config.php and update with your actual credentials

// reCAPTCHA Configuration
$config = [
    'recaptcha' => [
        'site_key' => 'YOUR_RECAPTCHA_SITE_KEY_HERE',
        'secret_key' => 'YOUR_RECAPTCHA_SECRET_KEY_HERE'
    ],
    'smtp' => [
        'host' => 'smtp.hostinger.com',
        'port' => 587,
        'username' => 'n0_reply@digitalxbrand.com',
        'password' => 'Avinash!08!08',
        'from_email' => 'n0_reply@digitalxbrand.com',
        'from_name' => 'DigitalXBrand Contact Form'
    ],
    'email' => [
        'recipient' => 'aavi10111@gmail.com'
    ]
];

// Helper function to get config values
function getConfig($section, $key = null) {
    global $config;
    if ($key === null) {
        return $config[$section] ?? null;
    }
    return $config[$section][$key] ?? null;
}
?>
