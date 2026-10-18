<?php
/**
 * Utility functions for the application.
 */

use MyApp\Person;

/**
 * Calculates the average age of an array of Person objects.
 */
function calculateAverageAge(array $people): float
{
    if (empty($people)) {
        return 0.0;
    }
    $total = 0;
    foreach ($people as $person) {
        $total += $person->getAge();
    }
    return $total / count($people);
}

/**
 * Converts an array of Person objects to JSON.
 */
function personsToJson(array $people): string
{
    $data = array_map(fn($p) => [
        'name' => $p->getName(),
        'age' => $p->getAge()
    ], $people);
    return json_encode($data, JSON_PRETTY_PRINT);;
}
