<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Wedding RSVP Report</title>
    <style>
      body {
        font-family: DejaVu Sans, sans-serif;
        color: #2f261f;
        font-size: 11px;
        line-height: 1.5;
        margin: 26px 28px 30px;
      }

      h1, h2, h3 {
        font-family: Georgia, serif;
        margin: 0;
        font-weight: normal;
      }

      .eyebrow {
        text-transform: uppercase;
        letter-spacing: 0.32em;
        color: #8c7868;
        font-size: 9px;
      }

      .report-shell {
        border: 1px solid #e2d6ca;
        padding: 22px 24px 18px;
      }

      .header {
        border-bottom: 1px solid #dccfbe;
        padding-bottom: 14px;
      }

      .header-title {
        margin-top: 10px;
        font-size: 27px;
        color: #241c16;
      }

      .header-meta {
        margin-top: 8px;
        color: #75685e;
        font-size: 11px;
      }

      .sub-meta {
        margin-top: 16px;
        width: 100%;
        border-collapse: collapse;
      }

      .sub-meta td {
        width: 33.33%;
        padding: 0 8px 0 0;
        vertical-align: top;
      }

      .meta-label {
        display: block;
        text-transform: uppercase;
        letter-spacing: 0.24em;
        color: #9a8774;
        font-size: 8.5px;
        margin-bottom: 4px;
      }

      .meta-value {
        color: #30261f;
        font-size: 11px;
      }

      .section-title {
        margin-top: 22px;
        margin-bottom: 10px;
        font-size: 18px;
        color: #241c16;
      }

      .summary-table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 6px;
      }

      .summary-table td {
        width: 25%;
        padding: 10px 12px;
        border: 1px solid #e8ddd1;
        vertical-align: top;
      }

      .summary-label {
        display: block;
        text-transform: uppercase;
        letter-spacing: 0.22em;
        color: #8e7b69;
        font-size: 8.5px;
        margin-bottom: 8px;
      }

      .summary-value {
        font-family: Georgia, serif;
        font-size: 20px;
        color: #241c16;
      }

      .summary-note {
        margin-top: 14px;
        padding-top: 10px;
        border-top: 1px solid #e6dbcf;
        color: #7c6f65;
        font-size: 10px;
      }

      table.report {
        width: 100%;
        border-collapse: collapse;
        margin-top: 8px;
      }

      .report thead th {
        padding: 10px 8px;
        border-top: 1px solid #6f5946;
        border-bottom: 1px solid #6f5946;
        background: #6f5946;
        color: #fffaf5;
        text-align: left;
        font-size: 9.5px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.18em;
      }

      .report td {
        padding: 9px 8px;
        border-bottom: 1px solid #e9ded2;
        vertical-align: top;
        font-size: 10.5px;
      }

      .report tbody tr:nth-child(even) {
        background: #fcf8f3;
      }

      .col-no {
        width: 30px;
        text-align: center;
      }

      .col-submitted {
        width: 88px;
      }

      .attendance {
        font-weight: bold;
        color: #3a2d22;
      }

      .muted {
        color: #7b6e63;
      }

      .footer {
        margin-top: 18px;
        padding-top: 10px;
        border-top: 1px solid #e2d6ca;
        text-align: right;
        font-size: 9.5px;
        color: #8b7d70;
      }
    </style>
  </head>
  <body>
    <section class="report-shell">
      <div class="header">
        <div class="eyebrow">Wedding RSVP Report</div>
        <h1 class="header-title">Luis &amp; Angel Invitation Report</h1>
        <div class="header-meta">Generated on <?= esc($generatedAt->format('d M Y, H:i')) ?> WIB</div>

        <table class="sub-meta">
          <tr>
            <td>
              <span class="meta-label">Celebration</span>
              <span class="meta-value">23 - 24 April 2027</span>
            </td>
            <td>
              <span class="meta-label">Location</span>
              <span class="meta-value">Jakarta, Indonesia</span>
            </td>
            <td>
              <span class="meta-label">Prepared For</span>
              <span class="meta-value">Wedding Administration</span>
            </td>
          </tr>
        </table>
      </div>

      <h2 class="section-title">Summary</h2>
      <table class="summary-table">
        <tr>
          <td>
            <span class="summary-label">Total Responses</span>
            <span class="summary-value"><?= esc((string) $summary['totalResponses']) ?></span>
          </td>
          <td>
            <span class="summary-label">Attending</span>
            <span class="summary-value"><?= esc((string) $summary['attendingYes']) ?></span>
          </td>
          <td>
            <span class="summary-label">Unable to Attend</span>
            <span class="summary-value"><?= esc((string) $summary['attendingNo']) ?></span>
          </td>
          <td>
            <span class="summary-label">Confirmed Seats</span>
            <span class="summary-value"><?= esc((string) $summary['confirmedSeats']) ?></span>
          </td>
        </tr>
      </table>

      <div class="summary-note">
        This document summarizes RSVP submissions, guest attendance responses, and selected event preferences.
      </div>

      <h2 class="section-title">Guest Responses</h2>
      <table class="report">
        <thead>
          <tr>
            <th class="col-no">No</th>
            <th class="col-submitted">Submitted</th>
            <th>Guest Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Attendance</th>
            <th>Guests</th>
            <th>Events</th>
          </tr>
        </thead>
        <tbody>
          <?php if ($records === []): ?>
            <tr>
              <td colspan="8" style="text-align:center;padding:18px 8px;" class="muted">
                No RSVP responses are available for this report.
              </td>
            </tr>
          <?php endif; ?>

          <?php foreach ($records as $index => $record): ?>
            <tr>
              <td class="col-no"><?= esc((string) ($index + 1)) ?></td>
              <td class="col-submitted"><?= esc($record['submittedAtLabel']) ?></td>
              <td><?= esc($record['fullName']) ?></td>
              <td><?= esc($record['email']) ?></td>
              <td><?= esc($record['phone'] !== '' ? $record['phone'] : '-') ?></td>
              <td class="attendance"><?= esc($record['attendingLabel']) ?></td>
              <td><?= esc($record['guestsLabel']) ?></td>
              <td><?= esc($record['eventsLabel']) ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>

      <div class="footer">
        Luis &amp; Angel Wedding Report
      </div>
    </section>
  </body>
</html>
