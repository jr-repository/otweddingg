<?php

$title = $isUpdate ? 'RSVP Updated' : 'Invitation Details';
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= esc($title) ?></title>
</head>
<body style="margin:0;padding:0;background-color:#f4efe7;font-family:Georgia,'Times New Roman',serif;color:#201b18;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4efe7;margin:0;padding:18px 8px;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:680px;background:#fbf7f0;border:1px solid #dcc8aa;border-radius:20px;overflow:hidden;">
                    <?php if (! empty($heroImageSrc)): ?>
                        <tr>
                            <td style="padding:0;">
                                <img src="<?= esc($heroImageSrc) ?>" alt="Wedding invitation" width="680" style="display:block;width:100%;max-width:680px;height:auto;border:0;">
                            </td>
                        </tr>
                    <?php endif; ?>
                    <tr>
                        <td style="padding:30px 24px 10px 24px;">
                            <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#a98b68;margin-bottom:14px;">RSVP Confirmation</div>
                            <div style="font-size:32px;line-height:1.18;color:#201b18;margin-bottom:10px;">Luis Meraz &amp; Cyrilla Angel</div>
                            <div style="font-size:17px;line-height:1.7;color:#6f6256;"><?= esc($dateLabel) ?> &middot; <?= esc($locationLabel) ?></div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:12px 24px 10px 24px;">
                            <div style="font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#a98b68;margin-bottom:12px;"><?= esc($title) ?></div>
                            <div style="font-size:18px;line-height:1.8;color:#6f6256;margin-bottom:16px;">
                                Dear <?= esc($firstName) ?>,
                            </div>
                            <div style="font-size:30px;line-height:1.24;color:#201b18;margin-bottom:12px;"><?= esc($fullName) ?></div>
                            <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.9;color:#6f6256;"><?= esc($submittedLabel) ?></div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:4px 24px 0 24px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td style="padding:0 0 18px 0;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.9;color:#6f6256;">
                                        <?= esc($attendanceCopy) ?>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding:0 0 8px 0;">
                                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e2d3bd;border-bottom:1px solid #e2d3bd;">
                                            <tr>
                                                <td style="padding:14px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#a98b68;">Your Response</td>
                                                <td align="right" style="padding:14px 0;font-size:18px;line-height:1.5;color:#201b18;"><?= esc($attendanceLabel) ?></td>
                                            </tr>
                                            <tr>
                                                <td style="padding:14px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#a98b68;border-top:1px solid #efe4d5;">Guest Count</td>
                                                <td align="right" style="padding:14px 0;font-size:18px;line-height:1.5;color:#201b18;border-top:1px solid #efe4d5;"><?= esc($guestCountLabel) ?></td>
                                            </tr>
                                            <tr>
                                                <td style="padding:14px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#a98b68;border-top:1px solid #efe4d5;">Location</td>
                                                <td align="right" style="padding:14px 0;font-size:18px;line-height:1.5;color:#201b18;border-top:1px solid #efe4d5;"><?= esc($locationLabel) ?></td>
                                            </tr>
                                            <tr>
                                                <td style="padding:14px 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#a98b68;border-top:1px solid #efe4d5;">Date</td>
                                                <td align="right" style="padding:14px 0;font-size:18px;line-height:1.5;color:#201b18;border-top:1px solid #efe4d5;"><?= esc($dateLabel) ?></td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:18px 24px 0 24px;">
                            <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.9;color:#6f6256;">
                                <?= esc($detailLabel) ?>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding:28px 24px 8px 24px;">
                            <a href="<?= esc($buttonUrl) ?>" style="display:inline-block;padding:13px 28px;border-radius:999px;background:#231b16;color:#fff7ec;text-decoration:none;font-family:Arial,Helvetica,sans-serif;font-size:12px;letter-spacing:4px;text-transform:uppercase;"><?= esc($buttonLabel) ?></a>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:28px 24px 34px 24px;">
                            <div style="border-top:1px solid #e2d3bd;padding-top:22px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.9;color:#7d7064;text-align:center;">
                                With love and gratitude,<br>
                                Luis Meraz &amp; Cyrilla Angel
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
