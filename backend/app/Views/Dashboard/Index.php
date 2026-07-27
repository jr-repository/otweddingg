<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wedding RSVP Dashboard</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap"
    >
    <link rel="stylesheet" href="<?= base_url('assets/dashboard.css') ?>">
  </head>
  <body>
    <main class="dashboard-shell">
      <section class="hero-panel">
        <div class="hero-copy">
          <p class="eyebrow">Wedding RSVP Report</p>
          <h1>L &amp; A Invitation Dashboard</h1>
          <p class="hero-text">
            A refined overview of every RSVP response received from the wedding invitation page.
          </p>
          <p class="meta">
            Generated on <?= esc($generatedAt->format('d M Y, H:i')) ?> WIB
          </p>
        </div>
        <div class="hero-actions">
          <a href="<?= site_url('reports/rsvp/excel') ?>" class="action-button">Export Excel</a>
          <a href="<?= site_url('reports/rsvp/pdf') ?>" class="action-button action-button-secondary">Export PDF</a>
        </div>
      </section>

      <section class="summary-grid">
        <article class="summary-card">
          <span class="summary-label">Total Responses</span>
          <strong><?= esc((string) $summary['totalResponses']) ?></strong>
        </article>
        <article class="summary-card">
          <span class="summary-label">Attending</span>
          <strong><?= esc((string) $summary['attendingYes']) ?></strong>
        </article>
        <article class="summary-card">
          <span class="summary-label">Unable to Attend</span>
          <strong><?= esc((string) $summary['attendingNo']) ?></strong>
        </article>
        <article class="summary-card">
          <span class="summary-label">Confirmed Seats</span>
          <strong><?= esc((string) $summary['confirmedSeats']) ?></strong>
        </article>
      </section>

      <section class="table-panel">
        <div class="table-toolbar">
          <div>
            <p class="eyebrow">Guest Responses</p>
            <h2>RSVP Table</h2>
          </div>
          <label class="search-box">
            <span>Search</span>
            <input id="rsvpSearch" type="search" placeholder="Name, email, phone">
          </label>
        </div>

        <div class="table-wrap">
          <table id="rsvpTable">
            <thead>
              <tr>
                <th>Submitted</th>
                <th>Guest Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Attendance</th>
                <th>Guests</th>
              </tr>
            </thead>
            <tbody>
              <?php if ($records === []): ?>
                <tr>
                  <td colspan="6">
                    <div class="empty-state">No RSVP submissions have been received yet.</div>
                  </td>
                </tr>
              <?php endif; ?>
              <?php foreach ($records as $record): ?>
                <tr>
                  <td><?= esc($record['submittedAtLabel']) ?></td>
                  <td><?= esc($record['fullName']) ?></td>
                  <td><?= esc($record['email']) ?></td>
                  <td><?= esc($record['phone'] !== '' ? $record['phone'] : '-') ?></td>
                  <td>
                    <span class="badge <?= $record['attending'] === 'yes' ? 'badge-yes' : 'badge-no' ?>">
                      <?= esc($record['attendingLabel']) ?>
                    </span>
                  </td>
                  <td><?= esc($record['guestsLabel']) ?></td>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        </div>
      </section>
    </main>

    <script>
      const searchInput = document.getElementById('rsvpSearch');
      const tableRows = Array.from(document.querySelectorAll('#rsvpTable tbody tr'));

      searchInput?.addEventListener('input', (event) => {
        const query = event.target.value.trim().toLowerCase();

        tableRows.forEach((row) => {
          const content = row.textContent.toLowerCase();
          row.style.display = content.includes(query) ? '' : 'none';
        });
      });
    </script>
  </body>
</html>
