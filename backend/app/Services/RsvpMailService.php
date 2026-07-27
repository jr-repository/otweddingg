<?php

namespace App\Services;

use CodeIgniter\Config\Services;

class RsvpMailService
{
    /**
     * @param array<string, mixed> $rsvp
     * @return array{sent: bool, error: string|null}
     */
    public function sendInvitationEmail(array $rsvp, bool $isUpdate = false): array
    {
        $to = strtolower(trim((string) ($rsvp['email'] ?? '')));
        if ($to === '') {
            return [
                'sent'  => false,
                'error' => 'Missing recipient email address.',
            ];
        }

        $email = Services::email();
        $email->initialize($this->getConfig());
        $email->setFrom(
            (string) env('email.fromEmail', ''),
            (string) env('email.fromName', 'Luis & A Wedding'),
        );
        $email->setTo($to);
        $email->setSubject($isUpdate ? 'Your RSVP Has Been Updated' : 'Your Wedding Invitation');
        $email->setMessage(view('Emails/RsvpInvitation', $this->buildTemplateData($rsvp, $isUpdate)));

        try {
            if ($email->send()) {
                log_message('info', 'RSVP invitation email sent to {email}', ['email' => $to]);

                return [
                    'sent'  => true,
                    'error' => null,
                ];
            }

            $error = strip_tags((string) $email->printDebugger(['headers']));
            log_message('error', 'RSVP invitation email failed to {email}: {error}', [
                'email' => $to,
                'error' => $error,
            ]);

            return [
                'sent'  => false,
                'error' => $error !== '' ? $error : 'Unknown email delivery error.',
            ];
        } catch (\Throwable $exception) {
            log_message('error', 'RSVP invitation email exception to {email}: {error}', [
                'email' => $to,
                'error' => $exception->getMessage(),
            ]);

            return [
                'sent'  => false,
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
            'protocol'   => 'smtp',
            'SMTPHost'   => (string) env('email.SMTPHost', 'smtp.gmail.com'),
            'SMTPUser'   => (string) env('email.SMTPUser', ''),
            'SMTPPass'   => preg_replace('/\s+/', '', (string) env('email.SMTPPass', '')) ?? '',
            'SMTPPort'   => (int) env('email.SMTPPort', 587),
            'SMTPCrypto' => (string) env('email.SMTPCrypto', 'tls'),
            'mailType'   => (string) env('email.mailType', 'html'),
            'charset'    => (string) env('email.charset', 'UTF-8'),
            'wordWrap'   => true,
            'newline'    => "\r\n",
            'CRLF'       => "\r\n",
            'SMTPTimeout' => 15,
        ];
    }

    /**
     * @param array<string, mixed> $rsvp
     * @return array<string, mixed>
     */
    private function buildTemplateData(array $rsvp, bool $isUpdate): array
    {
        $firstName = trim((string) ($rsvp['first_name'] ?? ''));
        $lastName = trim((string) ($rsvp['last_name'] ?? ''));
        $fullName = trim($firstName . ' ' . $lastName);
        $attending = (string) ($rsvp['attending'] ?? 'no');
        $guestCount = $attending === 'yes' ? max(1, (int) ($rsvp['guests'] ?? 1)) : null;
        $frontendUrl = rtrim((string) env('app.frontendUrl', 'http://localhost:5173'), '/');

        return [
            'heroImage'        => 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=80',
            'fullName'         => $fullName !== '' ? $fullName : 'Dear Guest',
            'firstName'        => $firstName !== '' ? $firstName : 'Dear Guest',
            'isUpdate'         => $isUpdate,
            'attending'        => $attending,
            'attendanceLabel'  => $attending === 'yes' ? 'We are delighted to welcome you' : 'Thank you for letting us know',
            'attendanceCopy'   => $attending === 'yes'
                ? 'Your RSVP has been received beautifully, and we would be honored to celebrate this chapter with you.'
                : 'Your RSVP has been recorded, and we truly appreciate your thoughtful response.',
            'guestCountLabel'  => $guestCount !== null ? $guestCount . ' guest' . ($guestCount > 1 ? 's' : '') : 'Not attending',
            'dateLabel'        => '23 - 24 April 2027',
            'locationLabel'    => 'Jakarta, Indonesia',
            'detailLabel'      => 'Formal invitation, venue details, schedule, dress code, and maps will be shared privately closer to the celebration.',
            'buttonUrl'        => $frontendUrl !== '' ? $frontendUrl . '/#rsvp' : 'http://localhost:5173/#rsvp',
            'buttonLabel'      => 'Open Invitation',
            'submittedLabel'   => $isUpdate ? 'Your RSVP has been updated successfully.' : 'Your RSVP has been saved successfully.',
        ];
    }
}
