import {interval, Subject} from "rxjs";
import {filter} from "rxjs/operators";
import {LocationId} from "./location";
import {Cargo} from "./cargo";

export class Events {

    public currentTime = 0;
    private cargoDeliveredToDestinationEvents: Subject<CargoDeliverdToDestination> = new Subject<CargoDeliverdToDestination>();

    constructor() {
        interval(1000).subscribe(t => this.currentTime++);
    }

    publish(event: CargoDeliverdToDestination, delayTime: number = 0) {
        event.time = this.currentTime + delayTime;
        setTimeout(() => {
            this.cargoDeliveredToDestinationEvents.next(event)
        }, delayTime * 1000);
    }

    subscribe(location: LocationId, observer: (event: CargoDeliverdToDestination) => any) {
        this.cargoDeliveredToDestinationEvents.asObservable()
            .pipe(filter(e => e.destinationId === location))
            .subscribe((event) => observer(event));
    }
}

export class CargoDeliverdToDestination {

    public time: number = 0;

    constructor(
        public originId: LocationId,
        public destinationId: LocationId,
        public cargo: Cargo,
        public carrier: number,
    ) {
    }
}