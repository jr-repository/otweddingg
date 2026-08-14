<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wedding RSVP Report</title>
  </head>
  <body style="margin:0;padding:24px;background:#f7f2eb;font-family:Arial,sans-serif;color:#2d241d;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;border-collapse:collapse;background:#ffffff;border:1px solid #e3d8cd;">
            <tr>
              <td style="padding:24px 28px;background:linear-gradient(135deg,#342821 0%,#6f5947 100%);color:#fffaf5;">
                <div style="font-size:11px;letter-spacing:0.34em;text-transform:uppercase;opacity:0.8;">Wedding RSVP Report</div>
                <div style="margin-top:12px;font-family:Georgia,serif;font-size:32px;line-height:1.1;">Luis &amp; Angel</div>
                <div style="margin-top:12px;font-size:13px;line-height:1.6;opacity:0.92;">
                  Report generated on <?= esc($generatedAt->format('d M Y, H:i')) ?> WIB
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 28px 16px;">
                <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#6d6054;">
                  Attached to this email are the latest RSVP report files in both PDF and Excel format.
                </p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:1px solid #eadfd5;">
                  <tr>
                    <td style="padding:12px 14px;border-bottom:1px solid #eadfd5;font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:#8c7765;">Total Responses</td>
                    <td align="right" style="padding:12px 14px;border-bottom:1px solid #eadfd5;font-family:Georgia,serif;font-size:20px;color:#2d241d;"><?= esc((string) $summary['totalResponses']) ?></td>
                  </tr>
                  <tr>
                    <td style="padding:12px 14px;border-bottom:1px solid #eadfd5;font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:#8c7765;">Attending</td>
                    <td align="right" style="padding:12px 14px;border-bottom:1px solid #eadfd5;font-family:Georgia,serif;font-size:20px;color:#2d241d;"><?= esc((string) $summary['attendingYes']) ?></td>
                  </tr>
                  <tr>
                    <td style="padding:12px 14px;border-bottom:1px solid #eadfd5;font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:#8c7765;">Unable to Attend</td>
                    <td align="right" style="padding:12px 14px;border-bottom:1px solid #eadfd5;font-family:Georgia,serif;font-size:20px;color:#2d241d;"><?= esc((string) $summary['attendingNo']) ?></td>
                  </tr>
                  <tr>
                    <td style="padding:12px 14px;font-size:11px;letter-spacing:0.24em;text-transform:uppercase;color:#8c7765;">Confirmed Seats</td>
                    <td align="right" style="padding:12px 14px;font-family:Georgia,serif;font-size:20px;color:#2d241d;"><?= esc((string) $summary['confirmedSeats']) ?></td>
                  </tr>
                </table>
                <p style="margin:18px 0 0;font-size:13px;line-height:1.7;color:#6d6054;">
                  Attachments included: <strong>WeddingRsvpReport.pdf</strong> and <strong>WeddingRsvpReport.xlsx</strong>.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 28px 22px;font-size:12px;color:#8f8072;text-align:center;">
                Luis &amp; Angel Wedding Administration
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
