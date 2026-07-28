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
        $templateData = $this->buildTemplateData($rsvp, $isUpdate);
        $imageSource = $this->resolveHeroImageSource($email);
        if ($imageSource !== null) {
            $templateData['heroImageSrc'] = $imageSource;
        }

        $email->setFrom(
            (string) env('email.fromEmail', ''),
            (string) env('email.fromName', 'Luis & A Wedding'),
        );
        $email->setReplyTo(
            (string) env('email.fromEmail', ''),
            (string) env('email.fromName', 'Luis & Angel Wedding'),
        );
        $email->setTo($to);
        $email->setSubject($isUpdate
            ? 'RSVP confirmation updated | Luis Meraz & Cyrilla Angel'
            : 'RSVP confirmation | Luis Meraz & Cyrilla Angel');
        $email->setAltMessage($this->buildPlainTextMessage($templateData));
        $email->setMessage(view('Emails/RsvpInvitation', $templateData));

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

    private function resolveHeroImageSource(object $email): ?string
    {
        $imagePath = FCPATH . 'assets/rsvp.png';
        if (! is_file($imagePath)) {
            return null;
        }

        $email->attach($imagePath, 'inline');
        $cid = $email->setAttachmentCID($imagePath);

        if ($cid === false) {
            return null;
        }

        return 'cid:' . $cid;
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
            'heroImageSrc'     => null,
            'fullName'         => $fullName !== '' ? $fullName : 'Dear Guest',
            'firstName'        => $firstName !== '' ? $firstName : 'Dear Guest',
            'isUpdate'         => $isUpdate,
            'attending'        => $attending,
            'attendanceLabel'  => $attending === 'yes' ? 'Attending' : 'Unable to attend',
            'attendanceCopy'   => $attending === 'yes'
                ? 'Thank you for confirming your attendance. We look forward to celebrating this special occasion with you.'
                : 'Thank you for sending your RSVP response. Your note has been recorded successfully.',
            'guestCountLabel'  => $guestCount !== null ? $guestCount . ' guest' . ($guestCount > 1 ? 's' : '') : 'Not attending',
            'dateLabel'        => '23 - 24 April 2027',
            'locationLabel'    => 'Jakarta, Indonesia',
            'detailLabel'      => 'Formal invitation details, schedule, dress code, maps, and venue information will be shared privately closer to the event date.',
            'buttonUrl'        => $frontendUrl !== '' ? $frontendUrl . '/#rsvp' : 'http://localhost:5173/#rsvp',
            'buttonLabel'      => 'View Invitation',
            'submittedLabel'   => $isUpdate
                ? 'This email confirms that your RSVP details have been updated successfully.'
                : 'This email confirms that your RSVP has been received successfully.',
        ];
    }

    /**
     * @param array<string, mixed> $data
     */
    private function buildPlainTextMessage(array $data): string
    {
        return implode("\n", [
            'Luis Meraz & Cyrilla Angel',
            'RSVP Confirmation',
            '',
            'Dear ' . (string) $data['firstName'] . ',',
            '',
            (string) $data['submittedLabel'],
            (string) $data['attendanceCopy'],
            '',
            'Response: ' . (string) $data['attendanceLabel'],
            'Guest Count: ' . (string) $data['guestCountLabel'],
            'Date: ' . (string) $data['dateLabel'],
            'Location: ' . (string) $data['locationLabel'],
            '',
            (string) $data['detailLabel'],
            '',
            'Invitation: ' . (string) $data['buttonUrl'],
            '',
            'With love and gratitude,',
            'Luis Meraz & Cyrilla Angel',
        ]);
    }
}
