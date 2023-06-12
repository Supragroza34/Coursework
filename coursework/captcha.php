<?php
session_start();

$length = 6; // Length of the CAPTCHA code

// Generate random CAPTCHA code
$captchaCode = generateCaptchaCode($length);
$_SESSION['captchaCode'] = $captchaCode;

// Create an image with CAPTCHA text
$width = 120;
$height = 40;
$image = imagecreate($width, $height);
$bgColor = imagecolorallocate($image, 255, 255, 255);
$textColor = imagecolorallocate($image, 0, 0, 0);
imagestring($image, 5, 20, 12, $captchaCode, $textColor);

// Output the image
header('Content-Type: image/png');
imagepng($image);
imagedestroy($image);

function generateCaptchaCode($length) {
  $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  $charactersLength = strlen($characters);
  $captchaCode = '';
  
  for ($i = 0; $i < $length; $i++) {
    $captchaCode .= $characters[rand(0, $charactersLength - 1)];
  }
  
  return $captchaCode;
}
?>
