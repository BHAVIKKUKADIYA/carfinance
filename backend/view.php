<?php
require_once 'db_config.php';

try {
    $pdo = getDbConnection(true);
    
    // Fetch all applications
    $stmt = $pdo->query("SELECT * FROM applications ORDER BY created_at DESC");
    $applications = $stmt->fetchAll();

} catch (PDOException $e) {
    die("Error fetching data: " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Car Finance Applications - Backend View</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #6366f1;
            --primary-dark: #4f46e5;
            --bg: #f8fafc;
            --card-bg: #ffffff;
            --text-main: #1e293b;
            --text-dim: #64748b;
            --border: #e2e8f0;
            --success: #10b981;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg);
            color: var(--text-main);
            margin: 0;
            padding: 40px 20px;
        }

        .container {
            max-width: 1400px;
            margin: 0 auto;
        }

        header {
            margin-bottom: 32px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
        }

        h1 {
            font-size: 28px;
            font-weight: 700;
            margin: 0;
            color: var(--text-main);
        }

        .count-badge {
            background: var(--primary);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
        }

        .card {
            background: var(--card-bg);
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            overflow: hidden;
            border: 1px solid var(--border);
        }

        table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
        }

        thead {
            background: #f1f5f9;
        }

        th {
            padding: 16px;
            font-size: 13px;
            font-weight: 600;
            color: var(--text-dim);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 2px solid var(--border);
        }

        td {
            padding: 16px;
            font-size: 14px;
            border-bottom: 1px solid var(--border);
            vertical-align: top;
        }

        tr:hover {
            background-color: #f8fafc;
        }

        .user-info {
            display: flex;
            flex-direction: column;
        }

        .user-name {
            font-weight: 600;
            color: var(--text-main);
        }

        .user-email {
            font-size: 13px;
            color: var(--text-dim);
        }

        pre {
            background: #f1f5f9;
            padding: 8px;
            border-radius: 6px;
            font-size: 11px;
            margin: 0;
            max-width: 300px;
            overflow-x: auto;
            color: var(--text-dim);
        }

        .empty-state {
            padding: 64px;
            text-align: center;
            color: var(--text-dim);
        }
        
        .refresh-btn {
            background: var(--primary);
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            text-decoration: none;
            font-size: 14px;
            transition: background 0.2s;
        }
        
        .refresh-btn:hover {
            background: var(--primary-dark);
        }

        .btn-view {
            background: #f1f5f9;
            color: var(--text-dim);
            border: 1px solid var(--border);
            padding: 8px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .btn-view:hover {
            background: var(--primary);
            color: white;
            border-color: var(--primary);
        }

        .status-pill {
            display: inline-block;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 600;
            background: #e0e7ff;
            color: var(--primary);
            margin-left: 8px;
        }

        /* Modal Styles */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(15, 23, 42, 0.4);
            backdrop-filter: blur(4px);
            display: none;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
        }

        .modal {
            background: white;
            width: 100%;
            max-width: 900px;
            max-height: 90vh;
            border-radius: 16px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            display: flex;
            flex-direction: column;
            animation: modalPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes modalPop {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }

        .modal-header {
            padding: 20px 24px;
            border-bottom: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-title {
            font-size: 20px;
            font-weight: 700;
            color: var(--text-main);
        }

        .btn-close {
            background: none;
            border: none;
            font-size: 24px;
            color: var(--text-dim);
            cursor: pointer;
        }

        .modal-content {
            padding: 24px;
            overflow-y: auto;
        }

        .detail-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
            margin-bottom: 32px;
        }

        @media (max-width: 768px) {
            .detail-grid { grid-template-columns: repeat(2, 1fr); }
        }

        .detail-item label {
            display: block;
            font-size: 11px;
            font-weight: 600;
            color: var(--text-dim);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 4px;
        }

        .detail-item .value {
            font-size: 15px;
            font-weight: 500;
            color: var(--text-main);
        }

        .section-title {
            font-size: 16px;
            font-weight: 700;
            color: var(--text-main);
            margin: 40px 0 20px 0;
            padding-bottom: 10px;
            border-bottom: 2px solid var(--bg);
            display: flex;
            align-items: center;
        }

        .section-title::before {
            content: '';
            width: 4px;
            height: 18px;
            background: var(--primary);
            border-radius: 2px;
            margin-right: 10px;
        }

        .history-card {
            background: var(--bg);
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 16px;
            border: 1px solid var(--border);
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
        }

        .history-card h4 {
            grid-column: 1 / -1;
            margin: 0 0 10px 0;
            font-size: 14px;
            color: var(--primary);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        
        .history-details {
            font-size: 14px;
            color: var(--text-main);
            line-height: 1.6;
        }

        .history-details strong {
            color: var(--text-dim);
            font-weight: 600;
            margin-right: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <div>
                <h1>Car Finance Applications</h1>
                <p style="color: var(--text-dim); margin-top: 8px;">View and manage loan applications from your customers.</p>
            </div>
            <div style="display: flex; align-items: center; gap: 16px;">
                <span class="count-badge"><?php echo count($applications); ?> Total</span>
                <a href="view.php" class="refresh-btn">Refresh List</a>
            </div>
        </header>

        <div class="card">
            <?php if (count($applications) > 0): ?>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Applicant</th>
                            <th>Loan Details</th>
                            <th>Addresses</th>
                            <th>Employment</th>
                            <th>Date</th>
                            <th style="text-align: center;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($applications as $app): ?>
                            <tr>
                                <td>#<?php echo $app['id']; ?></td>
                                <td>
                                    <div class="user-info">
                                        <span class="user-name"><?php echo htmlspecialchars(($app['title'] ?? '') . ' ' . ($app['first_name'] ?? '') . ' ' . ($app['last_name'] ?? '')); ?></span>
                                        <span class="user-email"><?php echo htmlspecialchars($app['email'] ?? 'Not provided'); ?></span>
                                        <span class="user-email"><?php echo htmlspecialchars($app['phone'] ?? ''); ?></span>
                                        <span class="user-email" style="color: var(--primary); font-weight: 500;">DOB: <?php 
                                            $dob = json_decode($app['date_of_birth'] ?? '{}', true);
                                            echo isset($dob['day']) ? ($dob['day'] . '/' . $dob['month'] . '/' . $dob['year']) : 'N/A';
                                        ?></span>
                                    </div>
                                </td>
                                <td>
                                    <div style="font-weight: 700; color: var(--primary);">₹<?php echo number_UK($app['loan_amount'] ?? 0); ?></div>
                                    <div style="font-size: 13px; color: var(--text-dim);">
                                        <?php echo htmlspecialchars($app['vehicle_type'] ?? 'Unknown'); ?> | 
                                        <?php echo htmlspecialchars($app['monthly_income'] ?? 'Unknown'); ?>/mo
                                    </div>
                                </td>
                                <td>
                                    <pre><?php 
                                        $addrs = json_decode($app['addresses'] ?? '[]', true);
                                        if (is_array($addrs)) {
                                            foreach($addrs as $i => $a) {
                                                echo ($i+1) . ". " . ($a['address'] ?? 'Unknown') . "\n";
                                            }
                                        } else { echo "No data."; }
                                    ?></pre>
                                </td>
                                <td>
                                    <pre><?php 
                                        $emps = json_decode($app['employments'] ?? '[]', true);
                                        if (is_array($emps)) {
                                            foreach($emps as $i => $e) {
                                                echo ($i+1) . ". " . ($e['employmentStatus'] ?? 'Unknown') . "\n";
                                            }
                                        } else { echo "No data."; }
                                    ?></pre>
                                </td>
                                <td>
                                    <div style="font-size: 13px; color: var(--text-dim);">
                                        <?php echo isset($app['created_at']) ? date('d M Y', strtotime($app['created_at'])) : 'Unknown'; ?><br>
                                        <?php echo isset($app['created_at']) ? date('H:i', strtotime($app['created_at'])) : ''; ?>
                                    </div>
                                </td>
                                <td style="text-align: center;">
                                    <button class="btn-view" onclick='openDetails(<?php echo json_encode($app, JSON_HEX_APOS | JSON_HEX_QUOT); ?>)' title="View Full Details">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                    </button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php else: ?>
                <div class="empty-state">
                    <p>No applications found yet. Submit the form on the frontend to see results here!</p>
                </div>
            <?php endif; ?>
        </div>
    </div>

    <!-- Modal for Full Details -->
    <div id="detailsModal" class="modal-overlay" onclick="closeDetails(event)">
        <div class="modal" onclick="event.stopPropagation()">
            <div class="modal-header">
                <div class="modal-title" id="m-title-name">Application Details</div>
                <button class="btn-close" onclick="closeDetails()">&times;</button>
            </div>
            <div class="modal-content">
                <div class="section-title" style="margin-top: 0;">Personal & Loan Information</div>
                <div class="detail-grid">
                    <div class="detail-item"><label>Full Name</label><div class="value" id="m-name"></div></div>
                    <div class="detail-item"><label>Email</label><div class="value" id="m-email"></div></div>
                    <div class="detail-item"><label>Phone</label><div class="value" id="m-phone"></div></div>
                    <div class="detail-item"><label>Date of Birth</label><div class="value" id="m-dob"></div></div>
                    <div class="detail-item"><label>Marital Status</label><div class="value" id="m-marital"></div></div>
                    <div class="detail-item"><label>Driving Licence</label><div class="value" id="m-licence"></div></div>
                    <div class="detail-item"><label>Loan Amount</label><div class="value" id="m-loan" style="color: var(--primary); font-weight: 700;"></div></div>
                    <div class="detail-item"><label>Vehicle Type</label><div class="value" id="m-vehicle"></div></div>
                    <div class="detail-item"><label>Monthly Income</label><div class="value" id="m-income"></div></div>
                    <div class="detail-item"><label>Date Submitted</label><div class="value" id="m-date"></div></div>
                </div>

                <div class="section-title">Address History</div>
                <div id="m-address-history"></div>

                <div class="section-title">Employment History</div>
                <div id="m-employment-history"></div>
            </div>
        </div>
    </div>

    <script>
        function openDetails(app) {
            // Populate Basic Info
            document.getElementById('m-name').innerText = (app.title || '') + ' ' + (app.first_name || '') + ' ' + (app.last_name || '');
            document.getElementById('m-email').innerText = app.email || 'N/A';
            document.getElementById('m-phone').innerText = app.phone || 'N/A';
            
            const dob = JSON.parse(app.date_of_birth || '{}');
            document.getElementById('m-dob').innerText = dob.day ? `${dob.day}/${dob.month}/${dob.year}` : 'N/A';
            
            document.getElementById('m-marital').innerText = app.marital_status || 'N/A';
            document.getElementById('m-licence').innerText = app.driving_licence || 'N/A';
            document.getElementById('m-loan').innerText = '₹' + parseFloat(app.loan_amount || 0).toLocaleString('en-GB', {minimumFractionDigits: 2});
            document.getElementById('m-vehicle').innerText = app.vehicle_type || 'N/A';
            document.getElementById('m-income').innerText = app.monthly_income || 'N/A';
            document.getElementById('m-date').innerText = new Date(app.created_at).toLocaleString('en-GB');

            // Populate Address History
            const addrs = JSON.parse(app.addresses || '[]');
            const addrContainer = document.getElementById('m-address-history');
            addrContainer.innerHTML = addrs.length ? '' : '<p class="user-email">No history recorded.</p>';
            addrs.forEach((a, i) => {
                addrContainer.innerHTML += `
                    <div class="history-card">
                        <h4>Address #${i + 1} ${i === 0 ? '<span class="status-pill">Current</span>' : ''}</h4>
                        <div class="history-details"><strong>Address:</strong><br>${a.address || 'N/A'}</div>
                        <div class="history-details">
                            <strong>Status:</strong> ${a.residentialStatus || 'N/A'}<br>
                            <strong>Duration:</strong> ${a.duration.years || 0} Years, ${a.duration.months || 0} Months
                        </div>
                    </div>
                `;
            });

            // Populate Employment History
            const emps = JSON.parse(app.employments || '[]');
            const empContainer = document.getElementById('m-employment-history');
            empContainer.innerHTML = emps.length ? '' : '<p class="user-email">No history recorded.</p>';
            emps.forEach((e, i) => {
                const details = e.employmentDetails || {};
                empContainer.innerHTML += `
                    <div class="history-card">
                        <h4>Employment #${i + 1} ${i === 0 ? '<span class="status-pill">Current</span>' : ''}</h4>
                        <div class="history-details">
                            <strong>Status:</strong> ${e.employmentStatus || 'N/A'}<br>
                            <strong>Duration:</strong> ${e.workDuration.years || 0} Years, ${e.workDuration.months || 0} Months
                        </div>
                        <div class="history-details">
                            ${details.employerName ? `<strong>Employer:</strong> ${details.employerName}<br>` : ''}
                            ${details.jobTitle ? `<strong>Job Title:</strong> ${details.jobTitle}<br>` : ''}
                            ${details.workLocation ? `<strong>Location:</strong> ${details.workLocation}<br>` : ''}
                        </div>
                    </div>
                `;
            });

            document.getElementById('detailsModal').style.display = 'flex';
            document.body.style.overflow = 'hidden'; 
        }

        function closeDetails() {
            document.getElementById('detailsModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    </script>
</body>
</html>
<?php
function number_UK($number) {
    return number_format((float)$number, 2, '.', ',');
}
?>
