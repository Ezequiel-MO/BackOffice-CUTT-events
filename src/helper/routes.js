import {
  MorningEvents,
  AfternoonEvents,
  Dinners,
  Hotels,
  Lunches,
  ProjectSpecs,
  TransfersIn,
  TransfersOut,
} from "../pages/projectConfig";
import {
  HotelsMasterForm,
  EventsMasterForm,
  RestaurantsMasterForm,
  TransfersMasterForm,
} from "../pages/masterForms";
import Login from "../components/login/Login";

export const routes = [
  {
    path: "/login",
    Component: Login,
    name: "login",
  },
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
    path: "/transfers-in",
    Component: TransfersIn,
    name: "transfersIn",
  },
  {
    path: "/transfers-out",
    Component: TransfersOut,
    name: "transfersOut",
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
