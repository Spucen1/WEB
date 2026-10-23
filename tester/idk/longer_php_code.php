<?php
namespace MyApp;

class Person
{
    private $name;
    private $age;
    private static $instanceCount = 0;

    public function __construct(string $name, int $age)
    {
        $this->name = $name;
        $this->age = $age;
        self::$instanceCount++;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getAge(): int
    {
        return $this->age;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function setAge(int $age): void
    {
        $this->age = $age;
    }

    public function describe(): string
    {
        return sprintf('Name: %s, Age: %d', $this->name, $this->age);
    }

    public static function getInstanceCount(): int
    {
        return self::$instanceCount;
    }
}

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

function personsToJson(array $people): string
{
    $data = array_map(function ($person) {
        return [
            'name' => $person->getName(),
            'age' => $person->getAge()
        ];
    }, $people);
    return json_encode($data, JSON_PRETTY_PRINT);
}

// Sample Data
$people = [
    new Person('Alice', 30),
    new Person('Bob', 25),
    new Person('Charlie', 35),
    new Person('Diana', 28),
];

// Sort by age ascending
usort($people, function (Person $a, Person $b) {
    return $a->getAge() <=> $b->getAge();
});

// Print sorted list
foreach ($people as $person) {
    echo $person->describe() . PHP_EOL;
}

echo PHP_EOL . 'Average Age: ' . calculateAverageAge($people) . PHP_EOL . PHP_EOL;

echo 'People JSON:' . PHP_EOL;
echo personsToJson($people) . PHP_EOL . PHP_EOL;

// Closure demonstration
$multiplier = 3;
$timesMultiplier = function ($value) use ($multiplier) {
    return $value * $multiplier;
};

$values = [1, 2, 3, 4];
$multiplied = array_map($timesMultiplier, $values);
print_r($multiplied);

/**
 * End of script.
 */
