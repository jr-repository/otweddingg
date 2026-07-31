<?php

namespace App\Services;

use App\Models\RsvpSubmissionModel;
use CodeIgniter\I18n\Time;

class RsvpReportService
{
    public function __construct(private readonly ?RsvpSubmissionModel $model = null)
    {
    }

    public function getDashboardPayload(): array
    {
        $records = $this->getModel()
            ->orderBy('submitted_at', 'DESC')
            ->findAll();

        return [
            'summary'     => $this->buildSummary($records),
            'records'     => $this->transformRecords($records),
            'generatedAt' => Time::now('Asia/Jakarta'),
        ];
    }

    public function getExportRows(): array
    {
        return $this->transformRecords(
            $this->getModel()->orderBy('submitted_at', 'DESC')->findAll(),
        );
    }

    private function getModel(): RsvpSubmissionModel
    {
        return $this->model ?? new RsvpSubmissionModel();
    }

    /**
     * @param list<array<string, mixed>> $records
     * @return array<string, int|string|null>
     */
    private function buildSummary(array $records): array
    {
        $attendingYes = 0;
        $attendingNo = 0;
        $confirmedSeats = 0;
        $latestSubmittedAt = null;

        foreach ($records as $record) {
            if (($record['attending'] ?? null) === 'yes') {
                $attendingYes++;
                $confirmedSeats += (int) ($record['guests'] ?? 0);
            } else {
                $attendingNo++;
            }

            if ($latestSubmittedAt === null && ! empty($record['submitted_at'])) {
                $latestSubmittedAt = $record['submitted_at'];
            }
        }

        return [
            'totalResponses'   => count($records),
            'attendingYes'     => $attendingYes,
            'attendingNo'      => $attendingNo,
            'confirmedSeats'   => $confirmedSeats,
            'latestSubmittedAt' => $latestSubmittedAt !== null
                ? $this->formatDateTime((string) $latestSubmittedAt)
                : null,
        ];
    }

    /**
     * @param list<array<string, mixed>> $records
     * @return list<array<string, mixed>>
     */
    private function transformRecords(array $records): array
    {
        return array_map(function (array $record): array {
            $firstName = trim((string) ($record['first_name'] ?? ''));
            $lastName = trim((string) ($record['last_name'] ?? ''));
            $fullName = trim($firstName . ' ' . $lastName);

            return [
                'id'                => (int) ($record['id'] ?? 0),
                'fullName'          => $fullName !== '' ? $fullName : 'Unknown Guest',
                'firstName'         => $firstName,
                'lastName'          => $lastName,
                'phone'             => trim((string) ($record['phone'] ?? '')),
                'email'             => (string) ($record['email'] ?? ''),
                'attending'         => (string) ($record['attending'] ?? 'no'),
                'attendingLabel'    => ($record['attending'] ?? 'no') === 'yes'
                    ? 'Attending'
                    : 'Unable to Attend',
                'guests'            => $record['guests'] !== null ? (int) $record['guests'] : null,
                'guestsLabel'       => $record['guests'] !== null
                    ? (string) $record['guests'] . ' Guest' . ((int) $record['guests'] > 1 ? 's' : '')
                    : '-',
                'events'            => $this->parseEvents($record['events'] ?? null),
                'eventsLabel'       => $this->formatEventsLabel($record['events'] ?? null),
                'submittedAt'       => (string) ($record['submitted_at'] ?? ''),
                'submittedAtLabel'  => $this->formatDateTime((string) ($record['submitted_at'] ?? '')),
                'createdAt'         => (string) ($record['created_at'] ?? ''),
                'updatedAt'         => (string) ($record['updated_at'] ?? ''),
            ];
        }, $records);
    }

    /**
     * @param mixed $events
     * @return list<string>
     */
    private function parseEvents(mixed $events): array
    {
        if (! is_string($events) || trim($events) === '') {
            return [];
        }

        $decoded = json_decode($events, true);
        if (! is_array($decoded)) {
            return [];
        }

        $mapped = [];
        foreach ($decoded as $event) {
            $mapped[] = match ((string) $event) {
                'holy_matrimony' => 'Holy Matrimony',
                'syukuran' => 'Syukuran',
                default => '',
            };
        }

        return array_values(array_filter($mapped, static fn (string $value): bool => $value !== ''));
    }

    private function formatEventsLabel(mixed $events): string
    {
        $parsed = $this->parseEvents($events);

        return $parsed !== [] ? implode(', ', $parsed) : '-';
    }

    private function formatDateTime(string $value): string
    {
        if ($value === '') {
            return '-';
        }

        return Time::parse($value, 'Asia/Jakarta')->format('d M Y, H:i');
    }
}
