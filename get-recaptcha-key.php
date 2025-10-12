<?php
// Secure reCAPTCHA key endpoint
header('Content-Type: application/json');

// Load configuration securely
if (file_exists('config.php')) {
    require_once 'config.php';
    $site_key = getConfig('recaptcha', 'site_key');
} else {
    // Fallback - load from template
    require_once 'config-template.php';
    $site_key = getConfig('recaptcha', 'site_key');
}

echo json_encode(['site_key' => $site_key]);
?>
