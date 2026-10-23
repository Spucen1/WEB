<?php
namespace MyApp;

class Person
{
    private string $name;
    private int $age;
    private static int $instanceCount = 0;

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
?>