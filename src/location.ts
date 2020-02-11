import {Cargo} from "./cargo";
import {Events} from "./events";
import {Subject, zip} from "rxjs";
import {Carrier} from "./carrier";

export class Location {

    private cargoQueue: Subject<Cargo> = new Subject<Cargo>();
    private carriers: Subject<Carrier> = new Subject<Carrier>();

    constructor(
        public locationId: LocationId,
        private events: Events
    ) {
        zip(
            this.cargoQueue,
            this.carriers
        ).subscribe(([cargo, carrier]) => {
            carrier.deliverCargo(cargo)
        });
        this.receiveCargo();
    }

    registerForNextCargo(carrier: Carrier) {
        this.carriers.next(carrier);
    }

    addCargoToQueue(cargo: Cargo) {
        this.cargoQueue.next(cargo);
    }

    private receiveCargo() {
        this.events.subscribe(this.locationId,
            event => {
                if (event.cargo.destination === this.locationId) {
                    console.log('Cargo delivered to final destination', JSON.stringify(event));
                } else {
                    console.log('Cargo delivered to intermediate destination', JSON.stringify(event));
                    this.addCargoToQueue(event.cargo);
                }
            }
        )
    }
}

export enum LocationId {
    FACTORY = "FACTORY", PORT = "PORT", A = "A", B = "B"
}