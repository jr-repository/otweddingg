<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');
$routes->get('reports/rsvp/excel', 'ReportExportController::excel');
$routes->get('reports/rsvp/pdf', 'ReportExportController::pdf');

$routes->group('api', static function ($routes): void {
    $routes->options('rsvp', 'Api\RsvpController::options');
    $routes->post('rsvp', 'Api\RsvpController::store');
    $routes->get('rsvps', 'Api\RsvpController::index');
});
