<?php
// Secure reCAPTCHA key endpoint
header('Content-Type: application/json');

// Load configuration securely
if (file_exists('config.php')) {
    require_once 'config.php';
    $site_key = getConfig('recaptcha', 'site_key');
} else {
    // Fallback - you need to create config.php with your keys
    $site_key = '6LcnaucrAAAAAJelfH2z7Q3ZIwsy9psji9PVcMiS';
}

echo json_encode(['site_key' => $site_key]);
?>
