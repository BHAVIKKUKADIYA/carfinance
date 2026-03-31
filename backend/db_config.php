<?php
// Database configuration for XAMPP
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'car_finance_db');

/**
 * Returns a PDO connection to the MySQL server
 * @param bool $includeDb Whether to include the database name in the DSN
 * @return PDO
 */
function getDbConnection($includeDb = true) {
    $dsn = "mysql:host=" . DB_HOST;
    if ($includeDb) {
        $dsn .= ";dbname=" . DB_NAME;
    }
    
    try {
        $pdo = new PDO($dsn, DB_USER, DB_PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
        return $pdo;
    } catch (PDOException $e) {
        die("Connection failed: " . $e->getMessage());
    }
}
?>
