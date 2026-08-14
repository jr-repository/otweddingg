<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Services\ReportMailService;
use CodeIgniter\HTTP\ResponseInterface;

class ReportController extends BaseController
{
    public function options(): ResponseInterface
    {
        return $this->withCors($this->response->setStatusCode(204));
    }

    public function sendEmail(): ResponseInterface
    {
        $payload = $this->request->getJSON(true);
        if (! is_array($payload) || $payload === []) {
            $payload = $this->request->getPost();
        }

        $email = strtolower(trim((string) ($payload['email'] ?? '')));
        if ($email === '' || ! filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->withCors(
                $this->response
                    ->setStatusCode(422)
                    ->setJSON([
                        'message' => 'Please enter a valid email address.',
                    ]),
            );
        }

        $result = (new ReportMailService())->sendReportEmail($email);
        if (! $result['sent']) {
            return $this->withCors(
                $this->response
                    ->setStatusCode(500)
                    ->setJSON([
                        'message' => $result['error'] ?? 'Unable to send the report email right now.',
                    ]),
            );
        }

        return $this->withCors(
            $this->response
                ->setStatusCode(200)
                ->setJSON([
                    'message' => 'Report email sent successfully.',
                ]),
        );
    }

    private function withCors(ResponseInterface $response): ResponseInterface
    {
        $requestOrigin = $this->request->getHeaderLine('Origin');
        $configuredOrigin = (string) env('app.frontendUrl', '');
        $origin = $requestOrigin !== '' ? $requestOrigin : $configuredOrigin;

        if ($origin === '') {
            $origin = '*';
        }

        return $response
            ->setHeader('Access-Control-Allow-Origin', $origin)
            ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
            ->setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
            ->setHeader('Vary', 'Origin');
    }
}
