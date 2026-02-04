<?php
session_start();
include "db.php";

if(!isset($_SESSION['user_id'])){ header("Location: index.php"); exit(); }

$u_id = $_SESSION['user_id'];
$query = "SELECT * FROM tbl_watchlist WHERE user_id = ? ORDER BY added_at DESC";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $u_id);
$stmt->execute();
$result = $stmt->get_result();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My Watchlist - REVCOM</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        /* Use your dashboard's color scheme */
        body { background: linear-gradient(to right, #210b0c, #dd353d, #210b0c); color: white; font-family: sans-serif; padding: 50px; }
        .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 20px; }
        .card { background: white; color: black; border-radius: 10px; overflow: hidden; padding-bottom: 10px; text-align: center;}
        .card img { width: 100%; height: 300px; object-fit: cover; }
        .btn-back { color: white; text-decoration: none; font-weight: bold; display: block; margin-bottom: 20px; }
    </style>
</head>
<body>
    <a href="dashboard.php" class="btn-back">← Back to Dashboard</a>
    <h1>My Watchlist</h1>
    <div class="grid">
        <?php while($row = $result->fetch_assoc()): ?>
            <div class="card">
                <img src="https://image.tmdb.org/t/p/w500<?= $row['poster_path'] ?>">
                <h3><?= $row['movie_title'] ?></h3>
                <a href="reviews.php?movie_id=<?= $row['movie_id'] ?>" style="color: #dd353d; text-decoration:none; font-weight:bold;">View Details</a>
            </div>
        <?php endwhile; ?>
    </div>
</body>
</html>