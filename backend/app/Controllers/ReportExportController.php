<?php

namespace App\Controllers;

use App\Services\ReportExportService;

class ReportExportController extends BaseController
{
    public function excel()
    {
        $binary = (new ReportExportService())->buildExcelBinary();

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
        $binary = (new ReportExportService())->buildPdfBinary();

        return $this->response
            ->setHeader('Content-Type', 'application/pdf')
            ->setHeader('Content-Disposition', 'attachment; filename="WeddingRsvpReport.pdf"')
            ->setBody($binary);
    }
}
