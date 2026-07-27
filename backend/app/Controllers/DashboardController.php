<?php

namespace App\Controllers;

use App\Services\RsvpReportService;

class DashboardController extends BaseController
{
    public function index(): string
    {
        return view('Dashboard/Index', (new RsvpReportService())->getDashboardPayload());
    }
}
