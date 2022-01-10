import {
  MorningEvents,
  AfternoonEvents,
  Dinners,
  Hotels,
  Lunches,
  ProjectSpecs,
} from "../pages/projectConfig";
import {
  HotelsMasterForm,
  EventsMasterForm,
  RestaurantsMasterForm,
  TransfersMasterForm,
} from "../pages/masterForms";

export const routes = [
  {
    path: "/project-specs",
    Component: ProjectSpecs,
    name: "projectSpecs",
  },
  {
    path: "/hotels",
    Component: Hotels,
    name: "hotelProjectForm",
  },
  {
    path: "/morning-events",
    Component: MorningEvents,
    name: "morningEvents",
  },
  {
    path: "/lunches",
    Component: Lunches,
    name: "lunches",
  },
  {
    path: "/afternoon-events",
    Component: AfternoonEvents,
    name: "afternoonEvents",
  },
  {
    path: "/dinners",
    Component: Dinners,
    name: "dinners",
  },
  {
    path: "/hotels-master-form",
    Component: HotelsMasterForm,
    name: "hotelsMasterForm",
  },
  {
    path: "/events-master-form",
    Component: EventsMasterForm,
    name: "eventsMasterForm",
  },
  {
    path: "/restaurants-master-form",
    Component: RestaurantsMasterForm,
    name: "restaurantsMasterForm",
  },
  {
    path: "/transfers-master-form",
    Component: TransfersMasterForm,
    name: "transfersMasterForm",
  },
];
