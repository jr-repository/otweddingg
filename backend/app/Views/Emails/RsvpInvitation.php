<?php

$title = $isUpdate ? 'RSVP Updated' : 'RSVP Confirmation';
$eventList = is_array($events ?? null) ? $events : [];
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= esc($title) ?></title>
</head>
<body style="margin:0;padding:0;background-color:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#201b18;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 auto;background-color:#ffffff;">
        <tr>
            <td align="center" style="padding:0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:680px;background:#ffffff;">
                    <tr>
                        <td style="padding:24px 26px 22px 26px;background:#2d231e;background-image:linear-gradient(135deg,#2b211c 0%,#3b2b23 55%,#5a4637 100%);text-align:center;border-radius:10px 10px 0 0;">
                            <div style="font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#d9be98;margin-bottom:14px;">
                                RSVP Confirmation
                            </div>
                            <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.18;color:#fff8f1;">
                                Luis &amp; Angel
                            </div>
                            <div style="width:72px;height:1px;background:#cfae84;margin:14px auto 12px auto;"></div>
                            <div style="font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#ead8c1;white-space:nowrap;">
                                <?= esc($dateLabel) ?> &middot; <?= esc($locationLabel) ?>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:28px 26px 12px 26px;">
                            <div style="font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#a98b68;margin-bottom:10px;">
                                <?= esc($title) ?>
                            </div>
                            <div style="font-family:Georgia,'Times New Roman',serif;font-size:30px;line-height:1.2;color:#201b18;">
                                <?= esc($fullName) ?>
                            </div>
                            <div style="margin-top:10px;font-size:14px;line-height:1.8;color:#6f6256;">
                                <?= esc($submittedLabel) ?>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:6px 26px 0 26px;">
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-top:1px solid #e6d9ca;border-bottom:1px solid #e6d9ca;">
                                <tr>
                                    <td style="padding:14px 0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#b09270;white-space:nowrap;">Response</td>
                                    <td align="right" style="padding:14px 0;font-size:15px;line-height:1.5;color:#201b18;white-space:nowrap;"><?= esc($attendanceLabel) ?></td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 0;border-top:1px solid #efe4d5;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#b09270;white-space:nowrap;">Guest Count</td>
                                    <td align="right" style="padding:14px 0;border-top:1px solid #efe4d5;font-size:15px;line-height:1.5;color:#201b18;white-space:nowrap;"><?= esc($guestCountLabel) ?></td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 0;border-top:1px solid #efe4d5;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#b09270;white-space:nowrap;">Date</td>
                                    <td align="right" style="padding:14px 0;border-top:1px solid #efe4d5;font-size:15px;line-height:1.5;color:#201b18;white-space:nowrap;"><?= esc($dateLabel) ?></td>
                                </tr>
                                <tr>
                                    <td style="padding:14px 0;border-top:1px solid #efe4d5;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#b09270;white-space:nowrap;">Location</td>
                                    <td align="right" style="padding:14px 0;border-top:1px solid #efe4d5;font-size:15px;line-height:1.5;color:#201b18;white-space:nowrap;"><?= esc($locationLabel) ?></td>
                                </tr>
                                <?php if ($eventList !== []): ?>
                                    <tr>
                                        <td style="padding:14px 0;border-top:1px solid #efe4d5;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#b09270;white-space:nowrap;">Reserved Event</td>
                                        <td align="right" style="padding:14px 0;border-top:1px solid #efe4d5;font-size:15px;line-height:1.5;color:#201b18;white-space:nowrap;"><?= esc(implode(' · ', $eventList)) ?></td>
                                    </tr>
                                <?php endif; ?>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding:22px 26px 18px 26px;">
                            <a
                                href="<?= esc($buttonUrl) ?>"
                                style="display:inline-block;padding:14px 22px;background:#2c211c;background-image:linear-gradient(135deg,#2c211c 0%,#453329 100%);border-radius:6px;color:#fff9f2;text-decoration:none;font-size:11px;letter-spacing:3px;text-transform:uppercase;"
                            >
                                <?= esc($buttonLabel) ?>
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding:0 26px 26px 26px;">
                            <div style="border-top:1px solid #eadfce;padding-top:16px;font-size:12px;line-height:1.8;color:#7b6e62;text-align:center;">
                                Luis &amp; Angel
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
