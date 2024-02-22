import { object, string, ref, number, date, InferType } from "yup";
import { PassengerAmount } from "../constants/passenger-amount.constants";

export const ticketSearchFilterSchema = object({
  originCity: string().required(),
  destinationCity: string()
    .required()
    .notOneOf([ref("originCity")], "destinationCity must be different from originCity"),
  departureTime: date().required(),
  arrivalTime: date().optional().min(
    ref('departureTime'),
    "arrivalDate must be later than departureDate"
  ),
  passengerAmount: number().typeError('passengerAmount must be a number').required().min(PassengerAmount.Min).max(PassengerAmount.Max)
});

export type TicketSearchFilterYup = InferType<typeof ticketSearchFilterSchema>;
