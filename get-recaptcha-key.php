<?php
// Secure reCAPTCHA key endpoint
header('Content-Type: application/json');

// Load configuration from template (works in production without manual setup)
require_once 'config-template.php';

// Override with actual working keys
$config['recaptcha']['site_key'] = '6LcnaucrAAAAAJelfH2z7Q3ZIwsy9psji9PVcMiS';
$config['recaptcha']['secret_key'] = '6LcnaucrAAAAANS8al7Ku-77eopvubk8s9OBG9ek';

$site_key = getConfig('recaptcha', 'site_key');

echo json_encode(['site_key' => $site_key]);
?>
