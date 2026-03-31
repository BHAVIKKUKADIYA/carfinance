<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'db_config.php';

// Prepare input data
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data provided."]);
    exit;
}

try {
    $pdo = getDbConnection(true);

    $sql = "INSERT INTO applications (
        vehicle_type,
        driving_licence,
        marital_status,
        date_of_birth,
        addresses,
        employments,
        monthly_income,
        loan_amount,
        title,
        first_name,
        last_name,
        email,
        phone
    ) VALUES (
        :vehicle_type,
        :driving_licence,
        :marital_status,
        :date_of_birth,
        :addresses,
        :employments,
        :monthly_income,
        :loan_amount,
        :title,
        :first_name,
        :last_name,
        :email,
        :phone
    )";

    $stmt = $pdo->prepare($sql);

    $stmt->execute([
        ':vehicle_type'      => $data['vehicleType'] ?? null,
        ':driving_licence'   => $data['drivingLicence'] ?? null,
        ':marital_status'    => $data['maritalStatus'] ?? null,
        ':date_of_birth'     => json_encode($data['dateOfBirth'] ?? []),
        ':addresses'         => json_encode($data['addresses'] ?? []),
        ':employments'       => json_encode($data['employments'] ?? []),
        ':monthly_income'    => $data['monthlyIncome'] ?? null,
        ':loan_amount'       => $data['loanAmount'] ?? 0,
        ':title'             => $data['personalDetails']['title'] ?? null,
        ':first_name'        => $data['personalDetails']['firstName'] ?? null,
        ':last_name'         => $data['personalDetails']['lastName'] ?? null,
        ':email'             => $data['contactDetails']['email'] ?? null,
        ':phone'             => $data['contactDetails']['phone'] ?? null
    ]);

    echo json_encode(["status" => "success", "message" => "Application submitted successfully.", "id" => $pdo->lastInsertId()]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database error: " . $e->getMessage()]);
}
?>
