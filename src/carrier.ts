import {Cargo} from "./cargo";
import {Routing} from "./route";
import {CargoDeliverdToDestination, Events} from "./events";
import {Location} from "./location";

export class Carrier {

    constructor(private id: number, private type: CarrierType, private origin: Location,
                private events: Events, private routing: Routing) {
        this.waitForNextCargo();
    }

    waitForNextCargo() {
        this.origin.registerForNextCargo(this);
    }

    deliverCargo(cargo: Cargo) {
        console.log('start delivery', cargo, this.id);
        const route = this.routing.findRoute(this.origin.locationId, cargo.destination);
        this.events.publish(new CargoDeliverdToDestination(
            route.origin, route.destination, cargo, this.id), route.duration);
        setTimeout(() => this.waitForNextCargo(), route.duration * 2 * 1000);
    }
}

export enum CarrierType {
    TRUCK, SHIP
}