<?php namespace App\Libraries;

use CodeIgniter\Config\Services;

class Notification
{
    protected $emailConfig = [
        'protocol' => 'smtp',
        'SMTPHost' => 'smtp.gmail.com',
        'SMTPUser' => 'richy@technokingindonesia.com',
        'SMTPPass' => 'ktlr fgwn pjno xdbu',
        'SMTPPort' => 587,
        'SMTPCrypto' => 'tls',
        'mailType' => 'text',
        'charset' => 'iso-8859-1',
        'wordWrap' => true,
        'newline' => "\r\n",
        'fromEmail' => 'richy@technokingindonesia.com',
        'fromName' => 'Support Ticket System',
    ];

    protected $fonnteApiUrl = 'https://api.fonnte.com/send';
    protected $fonnteApiKey = 'EVRYGebAJ7moyPgnYgRx';

    public function sendEmail(string $to, string $subject, string $message) : bool
    {
        $email = Services::email();
        $email->initialize($this->emailConfig);

        $email->setFrom($this->emailConfig['fromEmail'], $this->emailConfig['fromName']);
        $email->setTo($to);
        $email->setSubject($subject);
        $email->setMessage($message);
        
        try {
            if ($email->send()) {
                log_message('info', 'Email notification sent to: ' . $to . ' Subject: ' . $subject);
                return true;
            } else {
                log_message('error', 'Email failed to send to: ' . $to . ' Error: ' . $email->printDebugger(['headers']));
                return false;
            }
        } catch (\Throwable $e) {
            log_message('error', 'Email exception: ' . $e->getMessage());
            return false;
        }
    }

    public function sendWhatsapp(string $toPhone, string $message) : bool
    {
        $toPhone = preg_replace('/[^0-9]/', '', $toPhone);
        if (substr($toPhone, 0, 1) === '0') {
            $toPhone = '62' . substr($toPhone, 1);
        } elseif (substr($toPhone, 0, 2) !== '62') {
            $toPhone = '62' . $toPhone;
        }
        
        $data = [
            'target' => $toPhone,
            'message' => $message,
            'countryCode' => '62', 
        ];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $this->fonnteApiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: ' . $this->fonnteApiKey,
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        $result = json_decode($response, true);

        if ($httpCode === 200 && (isset($result['status']) && $result['status'] === true)) {
            log_message('info', 'WhatsApp notification sent to: ' . $toPhone . ' Response: ' . $response);
            return true;
        } else {
            log_message('error', 'WhatsApp failed to send to: ' . $toPhone . ' HTTP Code: ' . $httpCode . ' Response: ' . $response);
            return false;
        }
    }
}