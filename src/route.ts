import {LocationId} from "./location";

export class Route {
    readonly origin: LocationId;
    readonly destination: LocationId;
    readonly duration: number;
}

export class Routing {
    private readonly routes: Route[] = [
        {origin: LocationId.FACTORY, destination: LocationId.PORT, duration: 1},
        {origin: LocationId.PORT, destination: LocationId.A, duration: 4},
        {origin: LocationId.FACTORY, destination: LocationId.B, duration: 5},
    ];

    findRoute(origin: LocationId, destination: LocationId): Route {
        let route = this.routes.find((route) => route.destination === destination);
        if (route.origin !== origin) {
            route = this.findRoute(origin, route.origin);
        }
        return route;
    }
}