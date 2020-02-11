# Transport Tycoon DDD

Solutions for the exercises listed on
https://github.com/Softwarepark/exercises

## How to run

1. Install dependencies

`npm install`

2. Run application

`ts-node src/transport-tycoon.ts [cargo destinations ...]`

example:

`ts-node src/transport-tycoon.ts A A B A B B A B`

## Exercise 1
https://github.com/Softwarepark/exercises/blob/master/transport-tycoon-1.md

For this implementation I used an reactive programming approach.
Event streams and observers propagate change, no need for a central process manager or orchestrator

Magic happens in following part of the code. \
The zip operator acts a a matchmaker between cargo and carrier by combining the emmissions of both streams and 
emitting single items for each combination.

```
zip(
    this.cargoQueue,    #stream of cargo to be delivered
    this.carriers       #stream of carriers available for delivery
    ).subscribe(([cargo, carrier]) => {
        carrier.deliverCargo(cargo)
    });
```

In this solution carriers hold a reference to their origin location and vice versa.
Further decoupling could be done by introducing more events.
