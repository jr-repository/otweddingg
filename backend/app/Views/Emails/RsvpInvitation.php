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
<body style="margin:0;padding:0;background-color:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#201b18;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ffffff;margin:0;padding:0;">
        <tr>
            <td align="center">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background:#ffffff;border:1px solid #e8ddd0;border-radius:18px;overflow:hidden;">
                    <tr>
                        <td style="padding:30px 28px 24px 28px;border-bottom:1px solid #eee3d8;background:#fcfaf7;">
                            <div style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#a98b68;margin-bottom:14px;">RSVP Confirmation</div>
                            <div style="font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:1.2;color:#201b18;margin-bottom:10px;">Luis Meraz &amp; Cyrilla Angel</div>
                            <div style="font-size:14px;line-height:1.8;color:#7b6e62;"><?= esc($dateLabel) ?> &middot; <?= esc($locationLabel) ?></div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:28px 28px 10px 28px;">
                            <div style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#a98b68;margin-bottom:12px;"><?= esc($title) ?></div>
                            <div style="font-family:Georgia,'Times New Roman',serif;font-size:18px;line-height:1.8;color:#6f6256;margin-bottom:14px;">
                                Dear <?= esc($firstName) ?>,
                            </div>
                            <div style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.9;color:#6f6256;"><?= esc($submittedLabel) ?></div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:4px 28px 0 28px;">
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
                        <td style="padding:22px 28px 0 28px;">
                            <div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.9;color:#6f6256;">
                                Invitation link:
                                <a href="<?= esc($buttonUrl) ?>" style="color:#8f6f43;text-decoration:none;"><?= esc($buttonUrl) ?></a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:28px 28px 32px 28px;">
                            <div style="border-top:1px solid #e2d3bd;padding-top:20px;font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.9;color:#7d7064;">
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
