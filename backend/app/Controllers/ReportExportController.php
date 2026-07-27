<?php

namespace App\Controllers;

use App\Services\RsvpReportService;
use Dompdf\Dompdf;
use Dompdf\Options;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class ReportExportController extends BaseController
{
    public function excel()
    {
        $payload = (new RsvpReportService())->getDashboardPayload();
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('RSVP Report');

        $sheet->mergeCells('A1:G1');
        $sheet->setCellValue('A1', 'Wedding RSVP Report');
        $sheet->mergeCells('A2:G2');
        $sheet->setCellValue(
            'A2',
            'Generated on ' . $payload['generatedAt']->format('d M Y, H:i') . ' WIB',
        );

        $sheet->fromArray(
            [
                ['Total Responses', $payload['summary']['totalResponses']],
                ['Attending', $payload['summary']['attendingYes']],
                ['Unable to Attend', $payload['summary']['attendingNo']],
                ['Confirmed Seats', $payload['summary']['confirmedSeats']],
            ],
            null,
            'A4',
        );

        $headerRow = 10;
        $sheet->fromArray(
            [['Submitted At', 'Guest Name', 'Email', 'Phone', 'Attendance', 'Guests', 'Notes']],
            null,
            "A{$headerRow}",
        );

        $row = $headerRow + 1;
        foreach ($payload['records'] as $record) {
            $sheet->fromArray(
                [[
                    $record['submittedAtLabel'],
                    $record['fullName'],
                    $record['email'],
                    $record['phone'] !== '' ? $record['phone'] : '-',
                    $record['attendingLabel'],
                    $record['guestsLabel'],
                    $record['attending'] === 'yes' ? 'Reserved seat(s)' : 'Warm wishes sent',
                ]],
                null,
                "A{$row}",
            );
            $row++;
        }

        $sheet->getStyle('A1:G1')->applyFromArray([
            'font' => ['bold' => true, 'size' => 18, 'name' => 'Georgia', 'color' => ['rgb' => '33261F']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
        ]);
        $sheet->getStyle('A2:G2')->applyFromArray([
            'font' => ['italic' => true, 'size' => 11, 'color' => ['rgb' => '7A6A5E']],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
        ]);
        $sheet->getStyle("A{$headerRow}:G{$headerRow}")->applyFromArray([
            'font' => ['bold' => true, 'color' => ['rgb' => 'FFFFFF']],
            'fill' => [
                'fillType'   => Fill::FILL_SOLID,
                'startColor' => ['rgb' => '6F5946'],
            ],
            'alignment' => ['horizontal' => Alignment::HORIZONTAL_CENTER],
        ]);
        $sheet->getStyle("A4:B7")->applyFromArray([
            'font' => ['bold' => true],
            'fill' => [
                'fillType'   => Fill::FILL_SOLID,
                'startColor' => ['rgb' => 'F7F0E8'],
            ],
            'borders' => ['allBorders' => ['borderStyle' => Border::BORDER_THIN, 'color' => ['rgb' => 'E0D2C4']]],
        ]);
        $sheet->getStyle("A{$headerRow}:G" . max($headerRow, $row - 1))->applyFromArray([
            'borders' => ['allBorders' => ['borderStyle' => Border::BORDER_THIN, 'color' => ['rgb' => 'E7DDD3']]],
            'alignment' => ['vertical' => Alignment::VERTICAL_CENTER],
        ]);

        foreach (range('A', 'G') as $column) {
            $sheet->getColumnDimension($column)->setAutoSize(true);
        }

        $writer = new Xlsx($spreadsheet);
        ob_start();
        $writer->save('php://output');
        $binary = (string) ob_get_clean();

        return $this->response
            ->setHeader(
                'Content-Type',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            )
            ->setHeader('Content-Disposition', 'attachment; filename="WeddingRsvpReport.xlsx"')
            ->setBody($binary);
    }

    public function pdf()
    {
        $payload = (new RsvpReportService())->getDashboardPayload();
        $html = view('Exports/RsvpPdf', $payload);

        $options = new Options();
        $options->set('isRemoteEnabled', false);

        $dompdf = new Dompdf($options);
        $dompdf->setPaper('A4', 'landscape');
        $dompdf->loadHtml($html);
        $dompdf->render();

        return $this->response
            ->setHeader('Content-Type', 'application/pdf')
            ->setHeader('Content-Disposition', 'attachment; filename="WeddingRsvpReport.pdf"')
            ->setBody($dompdf->output());
    }
}
