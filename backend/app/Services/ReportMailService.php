<?php

namespace App\Services;

use PHPMailer\PHPMailer\Exception as MailException;
use PHPMailer\PHPMailer\PHPMailer;

class ReportMailService
{
    /**
     * @return array{sent: bool, error: string|null}
     */
    public function sendReportEmail(string $recipientEmail): array
    {
        $to = strtolower(trim($recipientEmail));
        if ($to === '') {
            return [
                'sent' => false,
                'error' => 'Missing recipient email address.',
            ];
        }

        $exportService = new ReportExportService();
        $payload = $exportService->getPayload();
        $config = $this->getConfig();
        $subject = 'Wedding RSVP Report';

        $logContext = [
            'to' => $to,
            'subject' => $subject,
            'smtp_host' => $config['host'] ?? '',
            'smtp_port' => $config['port'] ?? '',
            'smtp_crypto' => $config['secure'] ?? '',
            'smtp_user' => $config['username'] ?? '',
            'from_email' => $config['fromEmail'] ?? '',
            'from_name' => $config['fromName'] ?? '',
            'mail_type' => 'html',
        ];

        log_message(
            'info',
            'Report email attempt: ' . json_encode($logContext, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        );

        try {
            $mailer = new PHPMailer(true);
            $mailer->isSMTP();
            $mailer->Host = (string) $config['host'];
            $mailer->SMTPAuth = true;
            $mailer->Username = (string) $config['username'];
            $mailer->Password = (string) $config['password'];
            $mailer->Port = (int) $config['port'];
            $mailer->SMTPSecure = (string) $config['secure'];
            $mailer->CharSet = 'UTF-8';
            $mailer->WordWrap = (int) ($config['wordWrap'] ? 76 : 0);
            $mailer->Timeout = 20;
            $mailer->setFrom(
                (string) $config['fromEmail'],
                (string) $config['fromName'],
            );
            $mailer->addAddress($to);
            $mailer->Subject = $subject;
            $mailer->isHTML(true);
            $mailer->Body = view('Emails/ReportDelivery', $payload);
            $mailer->AltBody = $this->buildPlainTextMessage($payload);
            $mailer->addStringAttachment(
                $exportService->buildPdfBinary(),
                'WeddingRsvpReport.pdf',
                PHPMailer::ENCODING_BASE64,
                'application/pdf',
            );
            $mailer->addStringAttachment(
                $exportService->buildExcelBinary(),
                'WeddingRsvpReport.xlsx',
                PHPMailer::ENCODING_BASE64,
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            );
            $mailer->send();

            log_message(
                'info',
                'Report email sent: ' . json_encode($logContext, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            );

            return [
                'sent' => true,
                'error' => null,
            ];
        } catch (MailException $exception) {
            $error = $exception->getMessage();
            log_message(
                'error',
                'Report email failed: '
                . json_encode($logContext, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
                . ' Error: '
                . $error,
            );

            return [
                'sent' => false,
                'error' => $error !== '' ? $error : 'Unknown email delivery error.',
            ];
        } catch (\Throwable $exception) {
            log_message(
                'error',
                'Report email exception: '
                . json_encode($logContext, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
                . ' Exception: '
                . $exception->getMessage(),
            );

            return [
                'sent' => false,
                'error' => $exception->getMessage(),
            ];
        }
    }

    /**
     * @return array<string, mixed>
     */
    private function getConfig(): array
    {
        return [
            'host'      => (string) env('email.SMTPHost', 'smtp.hostinger.com'),
            'username'  => (string) env('email.SMTPUser', ''),
            'password'  => preg_replace('/\s+/', '', (string) env('email.SMTPPass', '')) ?? '',
            'port'      => (int) env('email.SMTPPort', 587),
            'secure'    => strtolower((string) env('email.SMTPCrypto', 'tls')),
            'wordWrap'  => filter_var((string) env('email.wordWrap', 'true'), FILTER_VALIDATE_BOOLEAN),
            'fromEmail' => (string) env('email.fromEmail', ''),
            'fromName'  => (string) env('email.fromName', 'Notification Email'),
        ];
    }

    /**
     * @param array{summary: array<string, mixed>, records: array<int, array<string, mixed>>, generatedAt: mixed} $payload
     */
    private function buildPlainTextMessage(array $payload): string
    {
        $newline = "\r\n";

        return 'Wedding RSVP Report'
            . $newline . $newline
            . 'Generated: ' . $payload['generatedAt']->format('d M Y H:i') . ' WIB'
            . $newline
            . 'Total Responses: ' . $payload['summary']['totalResponses']
            . $newline
            . 'Attending: ' . $payload['summary']['attendingYes']
            . $newline
            . 'Unable to Attend: ' . $payload['summary']['attendingNo']
            . $newline
            . 'Confirmed Seats: ' . $payload['summary']['confirmedSeats']
            . $newline . $newline
            . 'Attachments included: WeddingRsvpReport.pdf and WeddingRsvpReport.xlsx'
            . $newline . $newline
            . 'Luis & Angel';
    }
}
