<?php
require_once 'db_config.php';

try {
    // Connect to MySQL server
    $pdo = new PDO("mysql:host=" . DB_HOST, DB_USER, DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create database if not exists
    $sql_db = "CREATE DATABASE IF NOT EXISTS " . DB_NAME;
    $pdo->exec($sql_db);
    echo "Database '" . DB_NAME . "' checked/created successfully.\n";

    // Re-connect with database name
    $pdo = getDbConnection(true);

    // Disable foreign key checks to force drop
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 0");

    // DROP current table to reset and update schema
    $sql_drop = "DROP TABLE IF EXISTS applications";
    $pdo->exec($sql_drop);
    echo "Old 'applications' table dropped.\n";

    // Re-enable foreign key checks
    $pdo->exec("SET FOREIGN_KEY_CHECKS = 1");

    // Create applications table with complete schema
    $sql_table = "CREATE TABLE IF NOT EXISTS applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        vehicle_type VARCHAR(50) DEFAULT NULL,
        driving_licence VARCHAR(50) DEFAULT NULL,
        marital_status VARCHAR(50) DEFAULT NULL,
        date_of_birth JSON DEFAULT NULL,
        addresses JSON DEFAULT NULL,
        employments JSON DEFAULT NULL,
        monthly_income VARCHAR(50) DEFAULT NULL,
        loan_amount DECIMAL(10, 2) DEFAULT NULL,
        title VARCHAR(20) DEFAULT NULL,
        first_name VARCHAR(100) DEFAULT NULL,
        last_name VARCHAR(100) DEFAULT NULL,
        email VARCHAR(150) DEFAULT NULL,
        phone VARCHAR(20) DEFAULT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;";
    
    $pdo->exec($sql_table);
    echo "Table 'applications' created with updated schema successfully.\n";
    echo "Setup complete. You can now submit the form.";

} catch (PDOException $e) {
    die("Setup failed: " . $e->getMessage());
}
?>
