import {Location, LocationId} from "./location";
import {Events} from "./events";
import {Carrier, CarrierType} from "./carrier";
import {Routing} from "./route";
import {Cargo} from "./cargo";

console.log("Starting Transport Tycoon");

//global services
const events = new Events();
const routing = new Routing();

//create locations
const factory = new Location(LocationId.FACTORY, events);
const port = new Location(LocationId.PORT, events);
const a = new Location(LocationId.A, events);
const b = new Location(LocationId.B, events);

//create carriers
const truck1 = new Carrier(1, CarrierType.TRUCK, factory, events, routing);
const truck2 = new Carrier(2, CarrierType.TRUCK, factory, events, routing);
const ship = new Carrier(3, CarrierType.SHIP, port, events, routing);

//add cargo
process.argv.slice(2).forEach((arg, index) => {
    factory.addCargoToQueue(new Cargo(index + 1, LocationId[arg]));
});
