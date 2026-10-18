<?php
require __DIR__ . '/src/Person.php';
require __DIR__ . '/src/utils.php';
use MyApp\Person;

// Sample Data
$people = [
    new Person('Alice', 30),
    new Person('Bob', 25),
    new Person('Charlie', 35),
    new Person('Diana', 28),
];

// Sort by age ascending
usort($people, fn(Person $a, Person $b) => $a->getAge() <=> $b->getAge());

$averageAge = calculateAverageAge($people);
$peopleJson = personsToJson($people);
?>
<?php include 'templates/header.php'; ?>
<div class="container">
    <h1>People List</h1>
    <ul>
        <?php foreach ($people as $person): ?>
            <li><?php echo htmlspecialchars($person->describe()); ?></li>
        <?php endforeach; ?>
    </ul>
    <p>Average Age: <?php echo number_format($averageAge, 2); ?></p>
    <h2>JSON Representation</h2>
    <pre><?php echo htmlspecialchars($peopleJson); ?></pre>
</div>
<?php include 'templates/footer.php'; ?>
